
var playerSize = 25;
var playerSpeed = 5;
var isHost = true;

function Player(name,x,y,color){
    return {name:name,x:x,y:y,color:color,convertingTo:null,conversionProgress:0};
}

window.onload = function(){

    // Get canvas and context for drawing
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    // Set game bounds
    canvas.width = 500;
    canvas.height = 500;

    // All the players in the game
    var allplayers = [];

    // All the colors a player can be
    var colors = ["#f00","#0f0","#00f"];

    // Your player's color
    var mycolor = Math.floor(Math.random() * colors.length);

    // The player you control
    var myplayer = Player("seve",250,250,mycolor);

    // Mouse x and y positions
    var mx,my;

    // Whether or not the mouse is down on canvas
    var mouseDown = false;

    // Host specific variables
    if (isHost){
    }

    // Testing stuff
    allplayers.push(myplayer);
    allplayers.push(Player("guy1",150,150,0));
    allplayers.push(Player("guy2",200,100,0));
    allplayers.push(Player("guy3",400,100,0));

    // Add mouse listeners to canvas to allow player movement
    canvas.addEventListener("mousedown", function(e){
        mouseDown = true;
    },false);
    canvas.addEventListener("mouseup", function(e){
        mouseDown = false;
    },false);
    canvas.addEventListener("mousemove", function(e){
        var canvasRect = canvas.getBoundingClientRect();

        mx = e.clientX - canvasRect.left;
        my = e.clientY - canvasRect.top;

    },false);

    // Draw player
    function drawPlayer(x,y,color){
        // Draw an inner and outer circle
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, playerSize/2, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(x, y, playerSize*2, 0, 2 * Math.PI, false);
        context.globalAlpha = .1;
        context.fill();
        context.globalAlpha = 1;
        context.closePath();
    }

    // Draw players to screen
    function drawCanvas(){

        // Clear Canvas
        context.fillStyle = "#fff";
        context.fillRect(0,0,canvas.width,canvas.height);

        // Draw all the players in the game
        for (var i = 0;i < allplayers.length;i++){
            drawPlayer(allplayers[i].x,
                       allplayers[i].y,
                       colors[allplayers[i].color]);
        }

    }

    function update(){
        // Move player if mouse is down
        if (mouseDown){
            var a = myplayer.x - mx;
            var b = myplayer.y - my;
            var c = Math.sqrt(a*a + b*b);

            if (c > playerSize/2){

                // Calculate player movement from normalized
                // vector
                var dx = -a/c * playerSpeed;
                var dy = -b/c * playerSpeed;


                // Collision Detection
                var hitX = false;
                var hitY = false;
                for (var i = 1; i < allplayers.length;i++){
                    if (Math.abs(myplayer.x + dx - allplayers[i].x) < playerSize/2 &&
                        Math.abs(myplayer.y - allplayers[i].y) < playerSize/2){
                        hitX = true;
                    }
                    if (Math.abs(myplayer.y + dy - allplayers[i].y) < playerSize/2 &&
                        Math.abs(myplayer.x - allplayers[i].x) < playerSize/2){
                        hitY = true;
                    }
                }
                if (!hitX){
                    myplayer.x += dx;
                }
                if (!hitY){
                    myplayer.y += dy;
                }
            }
        }

        if (isHost){

            // Convert players
            for (var i = 0;i < allplayers.length;i++){

                var colorCounts = [];
                for (var u = 0;u < colors.length;u++){
                    colorCounts.push(0);
                }

                for (var u = 0;u < allplayers.length;u++){
                    var a = allplayers[i].x - allplayers[u].x;
                    var b = allplayers[i].y - allplayers[u].y;
                    var c = Math.sqrt(a*a + b*b);

                    if (allplayers[i].color != allplayers[u].color && c < playerSize * 2){
                        colorCounts[allplayers[u].color] ++;
                    }

                }

                var max = 0;
                var maxColorIndex = 0;
                for (var u = 0;u < colorCounts.length;u++){
                    if (colorCounts[u] > max){
                        max = colorCounts[u];
                        maxColorIndex = u;
                    }
                }
                if (max >= 2 && maxColorIndex != allplayers[i].color){
                    if (allplayers[i].convertingTo == maxColorIndex){
                        allplayers[i].conversionProgress ++;
                        if (allplayers[i].conversionProgress > 50){
                            // TODO network color changing
                            allplayers[i].color = maxColorIndex;
                        }
                    }else{
                        allplayers[i].convertingTo = maxColorIndex;
                        allplayers[i].conversionProgress = 0;
                    }
                }else{
                    allplayers[i].conversionProgress = 0;
                }

            }
        }

        // Draw the canvas with the updates
        drawCanvas();
    }

    drawCanvas();
    setInterval(update, 1000/24);

};
