const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', function (req, res) {
  // console.log("hello?");
  // const sql = 'SELECT * FROM User';
  // db.query(sql, function (err, results) {
  //   if (err)
  //     console.log(err);
  //   console.log(results[0].user_id);
  //   return res.json(results[0]);
  // })
});

module.exports = router;