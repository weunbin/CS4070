var interval = 1000;
var beginPathFinding;
var openList = [];
var closedList = [];
var startAnimation = true;
var steps = 0;
var pathlength = 0;
function startPathFinding(){
    animationSpeed = document.getElementById("speed").value;
    animationSpeed *= 150;
    steps = 0;
    pathlength = 0;
    startAnimation = true;
    beginPathFinding = setInterval(findPath,interval -= animationSpeed);
    openList.push(tiles[seekerIndex]);
}

function findPath(){
    var currentNode;
    var neighbors;
    if(openList.length > 0 && startAnimation){
        currentNode = openList[0];
        for(var i = 0; i < openList.length; i++){
            if( openList[i].fCost < currentNode.fCost ){
                currentNode = openList[i];
            }
        }
        var index = openList.indexOf(currentNode);
        openList.splice(index,1);
        currentNode.visited = true;
        if(currentNode != tiles[seekerIndex] && currentNode != tiles[goalIndex])
            currentNode.tileColor = 5;
        closedList.push(currentNode);
        if(currentNode == tiles[goalIndex]){
            var drawpath = [];
            startAnimation = false;
            while(currentNode != tiles[seekerIndex]){
                currentNode.tileColor = 6;
                drawpath.push(currentNode);
                currentNode = currentNode.parent;
                pathlength++;
            }
            document.getElementById("pathlength").innerHTML = "Path Length: " + pathlength + "<br/>";
            document.getElementById("pathlength").innerHTML += "Number of steps taken: " + steps;
            return;
        }
        neighbors = currentNode.getNeighbors(currentNode);
        for( var k = 0; k < neighbors.length; k++){
            if( closedList.indexOf(neighbors[k]) == -1){
                var newGCost = currentNode.gCost + neighbors[k].gCost;
                if(newGCost < neighbors[k].gCost || !(neighbors[k] in openList)){
                    
                    neighbors[k].gCost += currentNode.gCost;
                    neighbors[k].hCost = getHCost(neighbors[k],tiles[goalIndex]);
                    neighbors[k].fCost = neighbors[k].gCost + neighbors[k].hCost;
                    neighbors[k].parent = currentNode;
                    if(neighbors[k] != tiles[goalIndex])
                        neighbors[k].tileColor = 4;
                    if(!(neighbors[k] in openList)){
                        openList.push(neighbors[k]);
                    }
                }
            }
        }
    }
    steps++;
    updateGrid();
}

function startDijkstra(){
    animationSpeed = document.getElementById("speed").value;
    animationSpeed *= 150;
    steps = 0;
    pathlength = 0;
    startAnimation = true;
    beginPathFinding = setInterval(findDijkstra,interval -= animationSpeed);
    openList.push(tiles[seekerIndex]);
}

function findDijkstra(){
    var currentNode;
    var neighbors;
    if(openList.length > 0 && startAnimation){
        currentNode = openList[0];
        for(var i = 0; i < openList.length; i++){
            if( openList[i].hCost < currentNode.hCost ){
                currentNode = openList[i];
            }
        }
        var index = openList.indexOf(currentNode);
        openList.splice(index,1);
        currentNode.visited = true;
        if(currentNode != tiles[seekerIndex] && currentNode != tiles[goalIndex])
            currentNode.tileColor = 5;
        closedList.push(currentNode);
        if(currentNode == tiles[goalIndex]){
            var drawpath = [];
            startAnimation = false;
            while(currentNode != tiles[seekerIndex]){
                currentNode.tileColor = 6;
                drawpath.push(currentNode);
                currentNode = currentNode.parent;
                pathlength++;
            }
            document.getElementById("pathlength").innerHTML = "Path Length: " + pathlength + "<br/>";
            document.getElementById("pathlength").innerHTML += "Number of steps taken: " + steps;
            return;
        }
        neighbors = currentNode.getNeighbors(currentNode);
        for( var k = 0; k < neighbors.length; k++){
            if( closedList.indexOf(neighbors[k]) == -1){
                var newGCost = currentNode.gCost + neighbors[k].gCost;
                if(newGCost < neighbors[k].gCost || !(neighbors[k] in openList)){
                    
                    neighbors[k].gCost += currentNode.gCost;
                    neighbors[k].hCost = getHCost(neighbors[k],tiles[goalIndex]);
                    neighbors[k].fCost = neighbors[k].gCost + neighbors[k].hCost;
                    neighbors[k].parent = currentNode;
                    if(neighbors[k] != tiles[goalIndex])
                        neighbors[k].tileColor = 4;
                    if(!(neighbors[k] in openList)){
                        openList.push(neighbors[k]);
                    }
                }
            }
        }
    }
    steps++;
    updateGrid();
}

function startBestFirst(){
    animationSpeed = document.getElementById("speed").value;
    animationSpeed *= 150;
    steps = 0;
    pathlength = 0;
    startAnimation = true;
    beginPathFinding = setInterval(findBestFirst,interval -= animationSpeed);
    openList.push(tiles[seekerIndex]);
}

function findBestFirst(){
    var currentNode;
    var neighbors;
    if(openList.length > 0 && startAnimation){
        currentNode = openList[0];
        for(var i = 0; i < openList.length; i++){
            if( openList[i].gCost < currentNode.gCost ){
                currentNode = openList[i];
            }
        }
        var index = openList.indexOf(currentNode);
        openList.splice(index,1);
        currentNode.visited = true;
        if(currentNode != tiles[seekerIndex] && currentNode != tiles[goalIndex])
            currentNode.tileColor = 5;
        closedList.push(currentNode);
        if(currentNode == tiles[goalIndex]){
            var drawpath = [];
            startAnimation = false;
            while(currentNode != tiles[seekerIndex]){
                currentNode.tileColor = 6;
                drawpath.push(currentNode);
                currentNode = currentNode.parent;
                pathlength++;
            }
            document.getElementById("pathlength").innerHTML = "Path Length: " + pathlength + "<br/>";
            document.getElementById("pathlength").innerHTML += "Number of steps taken: " + steps;
            return;
        }
        neighbors = currentNode.getNeighbors(currentNode);
        for( var k = 0; k < neighbors.length; k++){
            if( closedList.indexOf(neighbors[k]) == -1){
                var newGCost = currentNode.gCost + neighbors[k].gCost;
                if(newGCost < neighbors[k].gCost || !(neighbors[k] in openList)){
                    
                    neighbors[k].gCost += currentNode.gCost;
                    neighbors[k].hCost = getHCost(neighbors[k],tiles[goalIndex]);
                    neighbors[k].fCost = neighbors[k].gCost + neighbors[k].hCost;
                    neighbors[k].parent = currentNode;
                    if(neighbors[k] != tiles[goalIndex])
                        neighbors[k].tileColor = 4;
                    if(!(neighbors[k] in openList)){
                        openList.push(neighbors[k]);
                    }
                }
            }
        }
    }
    steps++;
    updateGrid();
}




function getHCost(seeker,goal){
    var distX = Math.abs(seeker.x - goal.x);
    var distY = Math.abs(seeker.y - goal.y);
    distX = Math.floor(distX/tileWidth);
    distY = Math.floor(distY/tileHeight);
    
    return 10*distY + 10*distX;
    
}
