//javascript
var canvas, ctx, isContinue, timeoutID;

function start(canvasName, func){
	if(timeoutID) stop;

	canvas = document.getElementById(canvasName);
	ctx = canvas.getContext("2d");
	isContinue = true;

	var loop = function(){
		func();
		if(isContinue)
			timeoutID = setTimeout(loop, 10);
	}



	loop();	
}

function stop(){
	clearTimeout(timeoutID);
	isContinue = false;
}

function clearCanvas(){
	if(ctx != null)
		ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*
----------------------main----------------
*/

var position = new Vector2(10, 200);
var velocity = new Vector2(50, -50);
var acceleration = new Vector2(0, 10);
var dt = 0.1;

function step(){
	position = position.add(velocity.multiply(dt));
	velocity = velocity.add(acceleration.multiply(dt));

	ctx.strokeStyle = "#000";
	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.arc(position.x, position.y, 5, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	 
}

start("mycanvas", step);

//step();