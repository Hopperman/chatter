window.onload = function () {
    var socketUrl = window.chatter_env.URL || 'http://localhost:3700';

    var messages = [];
    var connected_users = [];
    var connectButton = document.getElementById("connect");
    var socket = socket = io.connect(socketUrl);
    var usernameField = document.getElementById("username");
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var username = null;
    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data.message);
            var html = '';
            for (var i = 0; i < messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });


    connectButton.onclick = function () {
        username = usernameField.value;
        var result = socket.emit('hello', username);
        enableSendInputs();
        disableConnectInputs();
    };

    var disableConnectInputs = function () {
        $("#connect").prop('disabled', true);
        $("#username").prop('disabled', true);
        $("#js-username-inputs").prop('hidden', true);
    };

    var enableSendInputs = function () {
        $("#js-chat-inputs").prop('hidden', false);
    };

    sendButton.onclick = sendMessage = function () {
        var text = field.value;
        socket.emit('send', {message: `<b>${username}: </b>${text}`});
        $("#field").val('');
    };

    $(document).ready(function () {
        $("#js-chat-inputs").prop('hidden', true);
        $("#field").keyup(function (e) {
            if (e.keyCode == 13) {
                sendMessage();
            }
        });
    });
};
