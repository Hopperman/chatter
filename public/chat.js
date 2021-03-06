window.onload = function() {
  var socketUrl = window.chatter_env.URL || 'http://localhost:3700';

  var messages = [];
  var socket = io.connect(socketUrl);
  var field = document.getElementById("field");
  var sendButton = document.getElementById("send");
  var content = document.getElementById("content");

  socket.on('message', function (data) {
    if(data.message) {
      messages.push(data.message);
      var html = '';
      for(var i=0; i<messages.length; i++) {
        html += messages[i] + '<br />';
      }
      content.innerHTML = html;
    } else {
      console.log("There is a problem:", data);
    }
  });


  sendButton.onclick = sendMessage = function() {
    var text = field.value;
    socket.emit('send', { message: text });
  };

  $(document).ready(function() {
    $("#field").keyup(function(e) {
      if(e.keyCode == 13) {
        sendMessage();
      }
    });
  });
}
