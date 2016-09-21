var Tile = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileColor = 0;
    this.isSeeker = false;
    this.isGoal = false;
    this.isObstacle = false;
    this.hCost = 0;
    this.gCost = 0;
    this.fCost = 0;
    this.visited = false;
    this.parent = null;
};

Tile.prototype.drawTiles = function (ctx) {
        ctx.strokeStyle = "#000080";
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.closePath();
        ctx.stroke();

        if(this.tileColor == 0)
            ctx.fillStyle = "#000000";
        if(this.tileColor == 1)
            ctx.fillStyle = "#008000";
        if(this.tileColor == 2)
            ctx.fillStyle = "#FF0000";
        if(this.tileColor == 3)
            ctx.fillStyle = "#0000FF";
        if(this.tileColor == 4)
            ctx.fillStyle = "#82E0AA";
        if(this.tileColor == 5)
            ctx.fillStyle = "#00FFFF";
        if(this.tileColor == 6)
            ctx.fillStyle = "#FFFF00";

        
        ctx.fill();
    
        if(this.tileColor == 1){
            sprite = new Image();
            sprite.src = "sprite.png";
            sprite.overflowX = this.x;
            sprite.overflowY = this.y;
            sprite.width = this.width;
            sprite.height = this.height;
            sprite.onload = function() {
                ctx.drawImage(this,this.overflowX,this.overflowY,sprite.width,sprite.height);
            }
        }
        if(this.tileColor == 2){
            coin = new Image();
            coin.src = "coin.png";
            coin.overflowX = this.x;
            coin.overflowY = this.y;
            coin.width = this.width;
            coin.height = this.height;
            coin.onload = function() {
                ctx.drawImage(this,this.overflowX,this.overflowY,coin.width,coin.height);
            }
        }
        if(this.tileColor == 3){
            boss = new Image();
            boss.src = "boss.png";
            boss.overflowX = this.x;
            boss.overflowY = this.y;
            boss.width = this.width;
            boss.height = this.height;
            boss.onload = function() {
                ctx.drawImage(this,this.overflowX,this.overflowY,boss.width,boss.height);
            }
        }
    
        ctx.font ="10pt sans=serif";
        ctx.fillStyle = "#000000";
        
        if(this.height >= 50){
            if(this.hCost > 0)
                ctx.fillText(this.hCost, this.x + this.width -20, this.y + this.height -5);
            if(this.gCost > 0)
                ctx.fillText(this.gCost, this.x+2,this.y+this.height-5);
            if(this.fCost > 0)
                ctx.fillText(this.fCost, this.x+2, this.y +15);
        }
    
};

Tile.prototype.getNeighbors = function (Tile){
    var neighbors = [];
    var topL,top,topR,left,right,bottomL,bottom,bottomR;
    for(var i = 0; i < tiles.length; i++){
        if(tiles[i].x == Tile.x - tileWidth && tiles[i].y == Tile.y - tileHeight && tiles[i].isObstacle == false && tiles[i].parent == null){
            console.log(Tile.x,Tile.y);
            tiles[i].parent = Tile;
            tiles[i].gCost = 14;
            topL = tiles[i];
            neighbors.push(topL);
        }
        if(tiles[i].x == Tile.x && tiles[i].y == Tile.y - tileHeight && tiles[i].isObstacle == false && tiles[i].parent == null){
            tiles[i].parent = Tile;
            tiles[i].gCost = 10;
            top = tiles[i];
            neighbors.push(top);
        }
        if(tiles[i].x == Tile.x + tileWidth && tiles[i].y == Tile.y - tileHeight && tiles[i].isObstacle == false && tiles[i].parent == null){
            tiles[i].parent = Tile;
            tiles[i].gCost = 14;
            topR = tiles[i];
            neighbors.push(topR);
        }
        if(tiles[i].x == Tile.x - tileWidth && tiles[i].y == Tile.y && tiles[i].isObstacle == false && tiles[i].parent == null){
            tiles[i].parent = Tile;
            tiles[i].gCost = 10;
            left = tiles[i];
            neighbors.push(left);
        }
        if(tiles[i].x == Tile.x + tileWidth && tiles[i].y == Tile.y && tiles[i].isObstacle == false && tiles[i].parent == null){
            tiles[i].parent = Tile;
            tiles[i].gCost = 10;
            right = tiles[i];
            neighbors.push(right);
        }
        if(tiles[i].x == Tile.x - tileWidth && tiles[i].y == Tile.y + tileHeight && tiles[i].isObstacle == false && tiles[i].parent == null){
            tiles[i].parent = Tile;
            tiles[i].gCost = 14;
            bottomL = tiles[i];
            neighbors.push(bottomL);
        }
        if(tiles[i].x == Tile.x && tiles[i].y == Tile.y + tileHeight && tiles[i].isObstacle == false && tiles[i].parent == null){
            tiles[i].parent = Tile;
            tiles[i].gCost = 10;
            bottom = tiles[i];
            neighbors.push(bottom);
        }
        if(tiles[i].x == Tile.x + tileWidth && tiles[i].y == Tile.y + tileHeight && tiles[i].isObstacle == false && tiles[i].parent == null){
            tiles[i].parent = Tile;
            tiles[i].gCost = 14;
            bottomR = tiles[i];bottom
            neighbors.push(bottomR);
        }
    }
    return neighbors;
    
}


