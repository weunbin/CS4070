/*####################################################################
 # Class used to manage collision responce and movement of the balls #
 #####################################################################*/
var Simulation = (function (Context) {
	var canvas_Width;
	var canvas_Height;

	function Simulation(inWidth,inHeight) {
	    // set simulations canvas width and height.
	    canvas_Width = inWidth;
	    canvas_Height = inHeight;
	}
	Simulation.prototype.update = function (deltaTime, ballArray) {
	    /*#### Move balls ####### */
	    updateBallPos(deltaTime, ballArray);
	    /*##### Wall collision ####### */
	    checkWallCollision(ballArray);
	    /*###### ball ball collision ######## */
	    for (var i = 0; i < ballArray.length; i++) {
		for (var j = 0; j < ballArray.length; j++) {
		    if (ballArray[i] != ballArray[j]) {
			if (checkBallCollision(ballArray[i], ballArray[j])) {
			    ballCollisionResponce(ballArray[i], ballArray[j]);
			}
		    }
		}
	    }
	}


	function updateBallPos(deltaTime, ballArray) {
	    for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].lastGoodPosition = ballArray[i].position; // save the balls last good position.
		ballArray[i].position = ballArray[i].position.add((ballArray[i].velocity.multiply(deltaTime/10))); // add the balls (velocity * deltaTime) to position. 
	    }
	}
	function checkWallCollision(ballArray) {
	    for (var i = 0; i < ballArray.length; i++) {
		/*##### Collisions on the X axis ##### */
		if (ballArray[i].getX() + (ballArray[i].getRadius()) >= canvas_Width || ballArray[i].getX() - (ballArray[i].getRadius()) <= 0) {
		    ballArray[i].velocity.setX(-ballArray[i].velocity.getX()); // if collided with a wall on x Axis, reflect Velocity.X.
		    ballArray[i].position = ballArray[i].lastGoodPosition; // reset ball to the last good position (Avoid objects getting stuck in each other).
		}
		/*##### Collisions on the Y axis ##### */
		if (ballArray[i].getY() - (ballArray[i].getRadius()) <= 0 || ballArray[i].getY() + (ballArray[i].getRadius()) >= canvas_Height) { // check for y collisions.
		    ballArray[i].velocity.setY(-ballArray[i].velocity.getY()); // if collided with a wall on x Axis, reflect Velocity.X. 
		    ballArray[i].position = ballArray[i].lastGoodPosition;
		}
	    }
	}
	function checkBallCollision(ball1, ball2) {
	    var xDistance = (ball2.getX() - ball1.getX()); // subtract the X distances from each other. 
	    var yDistance = (ball2.getY() - ball1.getY()); // subtract the Y distances from each other. 
	    var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance)); // the distance between the balls is the sqrt of X squard + Ysquared. 

	    var sumOfRadius = ((ball1.getRadius()) + (ball2.getRadius())); // add the balls radius together
         var collisionPointX = ((ball1.getX() * ball2.getRadius()) + (ball2.getX() * ball1.getRadius())) / (ball1.getRadius() + ball2.getRadius());
 
        var collisionPointY = ((ball1.getY() * ball2.getRadius()) + (ball2.getY() * ball1.getRadius())) / (ball1.getRadius() + ball2.getRadius());
        var ball1color = ball1.getColour();
        var ball2color = ball2.getColour();
	    if (distanceBetween < sumOfRadius) { // if the distance between them is less than the sum of radius they have collided.
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.beginPath();
        ctx.arc(collisionPointX, collisionPointY, 5, 0, Math.PI*2, true);
        ctx.fillStyle = '#2E2EFE';
        ctx.closePath();
        ctx.fill();
        
        ball1.colour = '#FF00FF';
        ball2.colour = '#F4FA58';
		return true;
	    }
	    else {
            ball1.colour = ball1color;
            ball2.colour = ball2color;
		return false;
	    }
        
	}
	function ballCollisionResponce(ball1, ball2) {

	    ball1.position = ball1.lastGoodPosition;
	    ball2.position = ball2.lastGoodPosition;

	    var xDistance = (ball2.getX() - ball1.getX());
	    var yDistance = (ball2.getY() - ball1.getY());

	    var normalVector = new vector(xDistance, yDistance); // normalise this vector store the return value in normal vector.
	    normalVector = normalVector.normalise();

	    var tangentVector = new vector((normalVector.getY() * -1), normalVector.getX());
       
	    // create ball scalar normal direction.
	    var ball1scalarNormal =  normalVector.dot(ball1.velocity);
	    var ball2scalarNormal = normalVector.dot(ball2.velocity);

	    // create scalar velocity in the tagential direction.
	    var ball1scalarTangential = tangentVector.dot(ball1.velocity); 
	    var ball2scalarTangential = tangentVector.dot(ball2.velocity); 

	    var ball1ScalarNormalAfter = (ball1scalarNormal * (ball1.getMass() - ball2.getMass()) + 2 * ball2.getMass() * ball2scalarNormal) / (ball1.getMass() + ball2.getMass());
	    var ball2ScalarNormalAfter = (ball2scalarNormal * (ball2.getMass() - ball1.getMass()) + 2 * ball1.getMass() * ball1scalarNormal) / (ball1.getMass() + ball2.getMass());

	    var ball1scalarNormalAfter_vector = normalVector.multiply(ball1ScalarNormalAfter); // ball1Scalar normal doesnt have multiply not a vector.
	    var ball2scalarNormalAfter_vector = normalVector.multiply(ball2ScalarNormalAfter);

	    var ball1ScalarNormalVector = (tangentVector.multiply(ball1scalarTangential));
	    var ball2ScalarNormalVector = (tangentVector.multiply(ball2scalarTangential));;

	    ball1.velocity = ball1ScalarNormalVector.add(ball1scalarNormalAfter_vector);
	    ball2.velocity = ball2ScalarNormalVector.add(ball2scalarNormalAfter_vector);
	}

	return Simulation;
    })();