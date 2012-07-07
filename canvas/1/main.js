//javascript
var canvas, ctx, isContinue, timeoutID;

function start(canvasName, func) {
    if (timeoutID)
        stop();

    canvas = document.getElementById(canvasName);
    ctx = canvas.getContext("2d");
    isContinue = true;

    var loop = function() {
        func();
        if (isContinue)
            timeoutID = setTimeout(loop, 20);
    }

    loop();
}

function stop() {
    clearTimeout(timeoutID);
    isContinue = false;
}

function clearCanvas() {
    if (ctx != null)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/*
----------------------main----------------
*/

var ps = new ParticleSystem();
ps.particleEffectors.push(new ChamberBox(0, 0, 400, 400));
//ps.systemEffectors.push(new Combine());
var dt = 0.01;
var i = 0;

var oldMousePosition = Vector2.zero, newMousePosition = new Vector2(200, 200);

function sampleDirection(angle1, angle2) {
    var t = Math.random();
    var theta = angle1 * t + angle2 * (1 - t);
    return new Vector2(Math.cos(theta), Math.sin(theta));
}

function sampleColor(color1, color2) {
    //var t = Math.random();
    var t = 0.8;
    return color1.multiply(t).add(color2.multiply(1 - t));
}

function sampleNumber(value1, value2) {
    var t = Math.random();
    return value1 * t + value2 * (1 - t);
}

function step() {
	i++;
    var direction = newMousePosition.subtract(oldMousePosition).normalize().negate();

	if(i%2 == 0)
    	ps.emit(
    		new Particle(newMousePosition, //position
	    		//sampleDirection(Math.PI * 0, Math.PI * 2).multiply(500), //velocity
                direction.multiply(500),
	    		sampleNumber(0, 3), //life
	    		sampleColor(Color.white, Color.black), 
	    		sampleNumber(0, 10))); //size

    oldMousePosition = newMousePosition;

    ps.simulate(dt);

    ctx.fillStyle="rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ps.render(ctx);
}

start("mycanvas", step);

canvas.onmousemove = function(e) {
    if (e.layerX || e.layerX == 0) { // Firefox 
        e.target.style.position='relative';
        newMousePosition = new Vector2(e.layerX, e.layerY);
    }
    else
        newMousePosition = new Vector2(e.offsetX, e.offsetY);
};


//step();