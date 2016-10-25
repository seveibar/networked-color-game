const __dirname = require('__dirname');

var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var app = express();

app.use('/', express.static(__dirname + '/../client/'));

io.on('connection', function(socket){
	console.log("New Player Connected");

	var clientName = "";

	socket.on('position', function(position){
		io.emit('position', position);
		clientName = position[0];
	});
	socket.on('status', function(status){
		io.emit('status', status);
	});
	socket.on('color', function(color){
		io.emit('color', color);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

});


http.listen(3000, function(){
	console.log('listen on *:3000');
});
