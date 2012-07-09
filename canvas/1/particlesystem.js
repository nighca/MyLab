/* 
* @requires Vector2, Color, Particle
*/
function ParticleSystem() {
    // Private fields
    var that = this;
    var particles = new Array();

    // Public fields
    this.gravity = new Vector2(0, 10000);
    this.particleEffectors = new Array();
    this.systemEffectors = new Array();

    // Public methods
        
    this.emit = function(particle) {
        particles.push(particle);
    };

    this.simulate = function(dt) {
        aging(dt);
        applyGravity();
        applyParticleEffectors();
        applySystemEffectors();
        kinematics(dt);
    };

    this.render = function(ctx) {
        for (var i in particles) {
            var p = particles[i];
            var alpha = 1 - p.age / p.life;
            ctx.fillStyle = "rgba("
                + Math.floor(p.color.r * 255) + ","
                + Math.floor(p.color.g * 255) + ","
                + Math.floor(p.color.b * 255) + ","
                + alpha.toFixed(2) + ")";
            //console.log(alpha.toFixed(2));
            
            ctx.shadowOffSetX=6 * (p.position.x-200)/200; 
            ctx.shadowOffsetY=-6 * (p.position.y-200)/200;  
            //ctx.shadowColor="rgba(50,50,100,0.5)";  
            ctx.shadowColor = "rgba("
                + Math.floor(p.color.r * 255) + ","
                + Math.floor(p.color.g * 255) + ","
                + Math.floor(p.color.b * 255) + ","
                + (alpha/2).toFixed(2) + ")";
            ctx.shadowBlur=2.5;

            ctx.beginPath();
            ctx.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill(); 

        }
    }

    // Private methods
    
    function aging(dt) {
        for (var i = 0; i < particles.length; ) {
            var p = particles[i];
            p.age += dt;
            if (p.age >= p.life)
                kill(i);
            else
                i++;
        }
    }

    function kill(index) {
        if (particles.length > 1)
            particles[index] = particles[particles.length - 1];
        particles.pop();
    }

    function applyGravity() {
        for (var i in particles)
            particles[i].acceleration = that.gravity;
    }

    function applyParticleEffectors() {
        for (var j in that.particleEffectors) {
            var apply = that.particleEffectors[j].apply;
            for (var i in particles)
                apply(particles[i]);    
        }
    }

    function applySystemEffectors(){
    	for (var j in that.systemEffectors) {
    		var apply = that.systemEffectors[j].apply;
    		apply(particles);
    	}
    }
    
    function kinematics(dt) {
        for (var i in particles) {
            var p = particles[i];
            p.position = p.position.add(p.velocity.multiply(dt));
            p.velocity = p.velocity.add(p.acceleration.multiply(dt));
        }
    }
}
