var network = (function(){

	var socket = io();

	socket.on("color", function(nameColor){
		console.log("Name: " + nameColor[0] + " Color: " + nameColor[1]);
		network.onColorChange(nameColor[0], nameColor[1]);
	});

	socket.on("position", function(namePosition){
		network.onPositionChange(namePosition[0], namePosition[1], namePosition[2], namePosition[3]);
	});

	socket.on("status", function(status){
		console.log("Name: " + status);
		network.onStatusChange(status);
	});

	socket.on("exit", function(name){
		console.log("Player: " +name + " has exited");
		network.onPlayerExit(name);
	});


    function hostSendColor(name, color){
    	var nameColor = [ name, color];
	    socket.emit("color", nameColor);
    }

    function hostSendStatus(status){
	    socket.emit("status", status);
    }

    function updatePosition(name, xpos, ypos, color){
    	var namePosition = [name, xpos, ypos, color];
	    socket.emit("position", namePosition);
    }



	return{
		"onColorChange": null, // (name, color)
		"onPositionChange": null, // (name, position)
		"onPlayerExit": null, // (name)
		"onStatusChange": null, // (newStatus)
		"hostSendColor": hostSendColor, // (name, color)
		"updatePosition": updatePosition, // (name, xpos, ypos)
		"hostSendStatus": hostSendStatus, // (status)
	};
})();
