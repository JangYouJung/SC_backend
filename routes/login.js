const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

let is_login = false;

router.get('/loginCheck', (req, res) => {
  console.log("is_login : ", is_login);
  if (is_login == true)
    res.sendStatus(200);
  else res.sendStatus(403);
})

router.post('/enter', function (req, res) {
  console.log("login");
  const email = req.body.email;
  const password = req.body.pwd;
  console.log(email, password);
  if (email.length > 0 && password.length > 0) { //빈칸모두 채우기
    db.query('SELECT * FROM User WHERE user_email =?', [email], (err, rows) => {
      if (err)
        console.log(err);
      // console.log("rows : ", rows);
      if (rows.length > 0) {
        console.log(rows[0].user_pwd);
        bcrypt.compare(password, rows[0].user_pwd, (err, ret) => {
          if (ret) {
            is_login = true;
            res.send(rows[0]);
          } else {
            console.log("비번틀림");
            res.sendStatus(403); // 비밀번호 틀림
          }
        })
      } else {
        console.log("아이디 없음");
        res.sendStatus(401); // 아이디 없음
      }
    })
  } else {
    console.log("빈칸")
    res.sendStatus(400); // 빈칸임
  }
});

module.exports = router;