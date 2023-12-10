const port = 3300;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
  cors: true,
  path: '/socket.io',
  //origins: ['http://sc-chatting.com:80'],
});

const mainRouter = require("./routes/main");
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signup");
const boardRouter = require("./routes/board");
const chatRouter = require("./routes/chat");
const cors = require('cors');
app.use(cors({
  origin: true,
  credentials: true
}));
// app.set('views', __dirname + '/views');
// app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({
  secret: 'keysecret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    secure: true,
    maxAge: 24 * 6 * 60 * 1000
  }
}));

app.use("/api", mainRouter);
app.use("/api/login", loginRouter);
app.use("/api/signup", signUpRouter);
app.use("/api/board", boardRouter);
app.use("/api/chat", chatRouter);

module.exports = server;
