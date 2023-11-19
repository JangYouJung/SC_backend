const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', (req, res) => {
  console.log("params", req.query.id);
  const sql = "SELECT * FROM Post WHERE post_id=?";
  db.query(sql, [req.query.id], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(500);
    }
    if (rows.length > 0) {
      res.send(rows);
    } else {
      console.log("글이 존재하지 않습니다");
      res.send(404);
    }
  })
})

router.delete('/', (req, res) => {
  console.log("params", req.query.id);
  const sql = "DELETE FROM Post WHERE post_id=?";
  db.query(sql, [req.query.id], (err, rows) => {
    if (err) {
      console.log(err);
      res.send(500);
    }
    console.log(rows);
    res.send(rows);
  })
})

router.get('/list', function (req, res) {
  db.query('SELECT * FROM Post', (err, rows) => {
    if (err)
      console.log(err);
    if (rows.length > 0) {
      console.log(rows);
      res.send(rows);
    } else {
      console.log("글없음");
      res.sendStatus(204);
    }
  })
})

router.post('/free/upload', function (req, res) {
  p_date = new Date();
  p_type = 'free';
  const sql = 'INSERT INTO Post (post_title, post_content, post_writer, post_create, post_name, post_type) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [req.body.p_title, req.body.p_content, req.body.p_writer, p_date, req.body.p_name, p_type]
  db.query(sql, params, (err) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(201);
    }
  })
})

router.post('/info/upload', function (req, res) {
  p_date = new Date();
  p_type = 'info';
  const sql = 'INSERT INTO Post (post_title, post_content, post_writer, post_create, post_name, post_type) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [req.body.p_title, req.body.p_content, req.body.p_writer, p_date, req.body.p_name, p_type]
  db.query(sql, params, (err) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(201);
    }
  })
})

router.post('/edit', function (req, res) {
  p_new_date = new Date();
  const sql = 'UPDATE Post SET post_title = ?, post_content = ?, post_update = ? WHERE post_id = ?';
  const params = [req.body.p_title, req.body.p_content, p_new_date, req.body.p_id];
  db.query(sql, params, (err) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(201);
    }
  })
})

module.exports = router;