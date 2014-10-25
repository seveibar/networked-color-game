var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/../client/'));

io.on('connection', function(socket){
	console.log("New Player Connected");

	var clientName = "";

  	socket.on('position', function(position){
    	io.emit('position', position);
		clientName = position[0];
    	console.log(position);
    });
  	socket.on('status', function(status){
    	io.emit('status', status);
    	console.log(status);
    });
	socket.on('color', function(color){
    	io.emit('color', color);
    	console.log(color);
  	});
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('exit', clientName);
  });

});


http.listen(3000, function(){
	console.log('listen on *:3000');
});
