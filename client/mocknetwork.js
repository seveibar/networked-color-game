var network = function(){

    function hostSendColor(name, color){
        console.log("Sending color:", name, color);
    }

    function hostSendStatus(status){
        console.log("Sending status:", status);
    }

    function updatePosition(name, xpos, ypos){
        console.log("Updating position:", name, xpos, ypos);
    }

    return {
        "onColorChange" : null, // (name, color)
        "onPositionChange" : null, // (name, position)
        "onPlayerExit" : null, // (name)
        "onStatusChange" : null, // (newStatus)
        "hostSendColor" : hostSendColor, // (name, color)
        "updatePosition": updatePosition, // (name, xpos, ypos)
        "hostSendStatus": hostSendStatus // (status)
    };
}();
