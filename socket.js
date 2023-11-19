const db = require("./db");
const SocketIO = require("socket.io");
const http = require("./app");
const io = SocketIO(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function saveMessage(data) {
  const query = "INSERT INTO Message (m_sender, m_sender_name, m_content, m_create, m_is_public) VALUES (?, ?, ?, ?, ?)";
  const params = [data.sender, data.s_name, data.message, new Date(), true];
  db.query(query, params, (err, res) => {
    if (err)
      console.log(err);
  })
}

function saveDm(data) {
  const query = "INSERT INTO Message (m_sender, m_receiver, m_sender_name, m_content, m_create, m_is_public) VALUES (?, ?, ?, ?, ?, ?)";
  const params = [data.sender, data.receiver, data.s_name, data.message, new Date(), false];
  db.query(query, params, (err) => {
    if (err)
      console.log(err);
  })
}

io.on('connection', function (socket) {
  console.log('Connect from Client Chat: ' + socket.id);
  socket.on('send', function (data) {
    saveMessage(data);
    socket.broadcast.emit('send', data.message, data.sender, data.s_name);
  });
  socket.on('sendDm', function (data) {
    saveDm(data);
    socket.broadcast.emit('sendDm', data.message, data.sender, data.s_name, data.receiver);
  });
})