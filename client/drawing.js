var drawing = function(){

    function init(){
        // Get canvas and context for drawing
        drawing.canvas = document.getElementById("canvas");
        drawing.context = drawing.canvas.getContext("2d");

        // Set game bounds
        drawing.canvas.width = 500;
        drawing.canvas.height = 500;
    }

    // Draw player
    function drawPlayer(x,y,color){

        var context = drawing.context;

        // Draw an inner and outer circle
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, playerSize/4, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(x, y, playerSize*2, 0, 2 * Math.PI, false);
        context.globalAlpha = .1;
        context.fill();
        context.globalAlpha = 1;
        context.closePath();
    }

    // Draw player
    function drawMyPlayer(x,y,color){

        var context = drawing.context;

        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, playerSize*2, 0, 2 * Math.PI, false);
        context.globalAlpha = .1;
        context.fill();
        context.globalAlpha = 1;
        context.closePath();

        // Draw an inner and outer circle
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, playerSize/2, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    }

    // Draw players to screen
    function drawCanvas(allplayers, myPlayerName){

        if (drawing.context == null)
            return;

        var context = drawing.context;
        var colors = drawing.colors;

        // Clear Canvas
        context.fillStyle = "#fff";
        context.fillRect(0,0,canvas.width,canvas.height);

        // Draw all the players in the game
        for (var i = 0;i < allplayers.length;i++){
            if (allplayers[i].name == myPlayerName){
                drawMyPlayer(allplayers[i].x,
                           allplayers[i].y,
                           colors[allplayers[i].color]);
            }else{
                drawPlayer(allplayers[i].x,
                           allplayers[i].y,
                           colors[allplayers[i].color]);
            }
        }
    }

    return {
        "canvas": null,
        "context": null,
        "init": init,
        "drawCanvas": drawCanvas,
        "drawPlayer": drawPlayer
    };

}();
