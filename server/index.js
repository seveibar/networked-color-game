var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log("New Player Connected");

  	socket.on('position', function(position){
    	io.emit('position', position);
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
});


http.listen(3000, function(){
	console.log('listen on *:3000');
});
