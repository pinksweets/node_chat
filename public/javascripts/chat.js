(function() {
  var socket = io(),
      ready = function(){
        var loginlist = function(ret) {
          var message = $('<ul class="-">').append($('<li class="-">').text(ret.users[ret.self] + 'がログインしました。'));
          $('#myname').val(ret.users[ret.self]);
          $('#messages').append(message);
          for(var key in ret.users) {
            $('#user').append($('<option>').text(ret.users[key]));
          }
        },
        publish = function(ret) {
          var messages = $('#messages'), cls = "-", tree = "<ul>";
          if(ret.user=="/#"+socket.id) {
            cls = "+";
            tree = '<ol>';
          }
          messages.append($(tree).append($('<div class="name">').text(ret.users[ret.user])).append($('<li class="'+cls+'">').text(ret.message)));
        },
        disconnect = function(ret) {
          $('#messages').append($('<ul>')).append($('<li class="-">').text(ret.message));
          for(var key in ret.users) {
            $('#user').append($('<option>').text(ret.users[key]));
          }
        },
        post = function(){
          var args = { name : $('#myname').val(), msg : $('#message').val()};
          socket.emit('publish', args);
          $('#message').val('');
        };

        // socket.io受信処理
        socket.on('loginlist', loginlist);
        socket.on('publish', publish);
        socket.on('disconnect', disconnect);
        // socket.io画面表示時の送信処理
        socket.emit('connected', $('#id').val());
        // メッセージ送信イベント
        $('#post').click(post);
      };
  $(document).ready(ready);
})();
