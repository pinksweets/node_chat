var app = module.parent.exports,
  io = app.get('io');

var userHash = {};

io.sockets.on("connection", socket => {
  // 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
  socket.on("connected", name => {
    userHash[socket.id] = name;
    io.sockets.emit("loginlist", {
      users: userHash,
      self: socket.id
    });
    io.to(socket.id).emit("selfid", socket.id);
  });
  // メッセージ送信カスタムイベント
  socket.on("publish", args => {
    console.log(`publish:${args.name}：${args.msg}`);
    io.sockets.emit("publish", {
      message: args.msg,
      user: socket.id,
      users: userHash
    });
  });
  // 接続終了組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
  socket.on("disconnect", () => {
    if (userHash[socket.id]) {
      var msg = `${userHash[socket.id]}が退出しました`;
      delete userHash[socket.id];
      console.log(`disconnect:${msg}`);
      io.sockets.emit("disconnect", {
        message: msg,
        user: socket.id,
        users: userHash
      });
    }
  });
});