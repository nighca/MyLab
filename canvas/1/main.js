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
ps.systemEffectors.push(new Combine());
var dt = 0.01;
var i = 0;

function sampleDirection(angle1, angle2) {
    var t = Math.random();
    var theta = angle1 * t + angle2 * (1 - t);
    return new Vector2(Math.cos(theta), Math.sin(theta));
}

function sampleColor(color1, color2) {
    var t = Math.random();
    return color1.multiply(t).add(color2.multiply(1 - t));
}

function sampleSize(maxSize){
	return maxSize * Math.random();
}

function sampleLife(maxLife){
	return maxLife * Math.random();
}

function step() {
	i++;
	if(i%40 == 0)
    	ps.emit(
    		new Particle(new Vector2(sampleSize(400), sampleSize(400)), 
	    		sampleDirection(Math.PI * 0, Math.PI * 2).multiply(500), 
	    		sampleLife(5), 
	    		sampleColor(Color.white, Color.black), 
	    		sampleSize(50)));
    ps.simulate(dt);

    ctx.fillStyle="rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ps.render(ctx);
}

start("mycanvas", step);


//step();