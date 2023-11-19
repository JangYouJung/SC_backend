const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/", function (req, res) {
  const user_email = req.body.email;
  const pwd = req.body.pwd;
  const check_pw = req.body.check_pw;
  const nickname = req.body.nickname;
  const pwdBy = bcrypt.hashSync(pwd, 5);
  console.log(req.body);
  const sql = "INSERT INTO User (user_email, user_pwd, user_name) VALUES (?,  ?, ?)";
  const params = [user_email, pwdBy, nickname,]

  if (user_email.length > 0 && pwd.length > 0 && check_pw.length > 0 && nickname.length > 0) { //빈칸없이 입력
    if (pwd == check_pw) { //비밀번호 재확인
      db.query(sql, params, function (err) {
        if (err) {
          console.log(err);
          res.send(401); // 아이디 중복
        } else {  //회원가입성공
          res.send(201);
        }
      })
    } else {
      res.send(402); // 비밀번호 틀림
    }
  } else {
    res.send(403); // 빈칸임
  }
})

module.exports = router;