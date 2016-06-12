var ctx;
var NUM_OF_ROWS;
var NUM_OF_COLS;
var numOfclicks = 0;
var WIDTH;
var HEIGHT;
var tileWidth;
var tileHeight;
var tiles;
var seekerIndex = 0;
var goalIndex = 0;
var obstacles = [];
var sprite,coin;

function initGrid() {
    tiles = [];
    ctx = document.getElementById("canvas");
    ctx.addEventListener("click",click,false);
    ctx = document.getElementById("canvas").getContext("2d");
    NUM_OF_COLS = document.getElementById("width").value;
    NUM_OF_ROWS = document.getElementById("height").value;
    WIDTH = ctx.canvas.width;
    HEIGHT = ctx.canvas.height;
    tileWidth = Math.floor(WIDTH / NUM_OF_COLS);
    tileHeight = Math.floor(HEIGHT / NUM_OF_ROWS);
    for (var i = 0; i < NUM_OF_COLS;i++) {
        for (var j = 0; j < NUM_OF_ROWS;j++) {
            tiles.push(new Tile(i*tileWidth,j*tileHeight,tileWidth,tileHeight));
            
        }
    }
    for (var k = 0; k < tiles.length;k++) {
       tiles[k].drawTiles(ctx); 
    }
    document.getElementById("pathlength").innerHTML = "Path Length: 0 <br/>";
    document.getElementById("pathlength").innerHTML += "Number of steps taken: 0";
    
}

function updateGrid() {
    for (var k = 0; k < tiles.length;k++) {
        tiles[k].drawTiles(ctx); 
    }
}

function clearGrid(){
    interval = 1000;
    tiles = [];
    obstacles = [];
    openList = [];
    closedList = [];
    startAnimation = false;
    beginPathFinding = null;
    steps = 0;
    pathlength = 0;
    seekerIndex = 0;
    goalIndex = 0;
    obstacles = [];
    numOfclicks = 0;
    NUM_OF_COLS = document.getElementById("width").value;
    NUM_OF_ROWS = document.getElementById("height").value;
    WIDTH = ctx.canvas.width;
    HEIGHT = ctx.canvas.height;
    tileWidth = Math.floor(WIDTH / NUM_OF_COLS);
    tileHeight = Math.floor(HEIGHT / NUM_OF_ROWS);
    for (var i = 0; i < NUM_OF_COLS;i++) {
        for (var j = 0; j < NUM_OF_ROWS;j++) {
            tiles.push(new Tile(i*tileWidth,j*tileHeight,tileWidth,tileHeight));
            
        }
    }
    for (var k = 0; k < tiles.length;k++) {
       tiles[k].drawTiles(ctx); 
    }
    document.getElementById("pathlength").innerHTML = "Path Length: 0 <br/>";
    document.getElementById("pathlength").innerHTML += "Number of steps taken: 0";
}

function click(event){
    var x = event.x;
    var y = event.y;
    var canvas = document.getElementById("canvas");
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var neighbor = [];
    x = Math.floor(x / tileWidth)*tileWidth;
    y = Math.floor(y / tileHeight)*tileHeight;
    for(var i =0; i < tiles.length; i++){
        if(tiles[i].x == x && tiles[i].y == y){
            if(numOfclicks == 0){
                tiles[i].tileColor = 1;
                tiles[i].isSeeker = true;
                seekerIndex = i;
            }else if(numOfclicks == 1){
                tiles[i].tileColor = 2;
                tiles[i].isGoal = true;
                goalIndex = i;
            }else if(numOfclicks > 1){
                tiles[i].tileColor = 3;
                tiles[i].isObstacle = true;
                obstacles.push(i);
            }
            /*
            neighbor = tiles[i].getNeighbors(tiles[i]);
            for(var q = 0; q < neighbor.length; q ++){
                console.log(neighbor[q].x,neighbor[q].y);
            }
            */
        }  
    }
    
    numOfclicks ++;
    updateGrid();
}












