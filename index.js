var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//var room = uuid.v4();
//socket.join(room);

io.on('connection', function(socket){
    socket.broadcast.emit('hi');
});
/*
io.on('connection', function(socket){
    socket.join('room123');
});
*/


io.on('connection', function(socket){
    socket.join('room123');
    io.to('room123').emit('greeting', 'Hello everybody!');
    socket.broadcast.emit('chat message', 'new user is added');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(8888, function(){
    console.log('listening on *:8888');
});
/**
 * Created by HP on 11/6/2016.
 */
