var express = require("express");
var engines = require('consolidate');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get("/", function (req, res) {
    res.render("index.html");
});

var io = require('socket.io').listen(app.listen(process.env.PORT || 3700));

console.log(`VE ARE LISTENING TO ZE MESSAGES ON ${process.env.PORT || 3700}`);
io.sockets.on('connection', function (socket, username) {

    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });

    socket.on('hello', function(username) {
        socket.username = username;
        io.sockets.emit('message', {message: `<i>${username} has connected!</i>`});
    });
});
