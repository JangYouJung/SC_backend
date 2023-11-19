const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/getMessages", (req, res) => {
  const query = "SELECT * FROM Message WHERE m_is_public = true";
  db.query(query, (err, rows) => {
    if (err)
      console.log(err);
    res.send(rows);
  })
})

router.get("/getBeforeDm", (req, res) => {
  const user = req.query.user_id;
  const partner = req.query.partner_id;
  const query = "SELECT * FROM Message WHERE m_is_public = false AND (m_sender = ? AND m_receiver = ?) OR (m_sender = ? AND m_receiver = ?)";
  db.query(query, [user, partner, partner, user], (err, rows) => {
    if (err)
      console.log(err);
    console.log(rows);
    res.send(rows);
  })
})

router.get("/getName", (req, res) => {
  const id = req.query.id;
  console.log("paramsID", id);
  const query = "SELECT user_name FROM User WHERE user_id = ?";
  db.query(query, [id], (err, rows) => {
    if (err)
      console.log(err);
    res.send(rows[0]);
  })
})

router.get("/dm", (req, res) => {
  const res_list = [];
  const id = req.query.user_id;
  const query = "SELECT * FROM Message WHERE m_receiver = ?";
  db.query(query, [id], (err, rows) => {
    if (err)
      console.log(err);
    if (rows.length > 0) {
      rows.forEach(element => {
        if (!res_list.includes(element.m_sender))
          res_list.push(element.m_sender);
      });
    }
    const query2 = "SELECT * FROM Message WHERE NOT m_receiver = 'null' AND m_sender = ?";
    db.query(query2, id, (err2, rows2) => {
      if (err2)
        console.log(err2);
      if (rows2.length > 0) {
        rows2.forEach(element => {
          if (!res_list.includes(element.m_receiver))
            res_list.push(element.m_receiver);
        });
        res.send(res_list);
      }
    })
  })
})

module.exports = router;