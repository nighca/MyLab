//particlesystem.js

function ParticleSystem(){
	//private
	var that = this;
	var particles = new Array();

	//public
	this.graity = new Vector2(0,100);
	this.effectors = new Array();

	this.emit = function(particle){
		particles.push(particle);
	};

	this.simulate = function(dt){
		aging(dt);
		applyGravity();
		applyEffectors();
		kinematics(dt);
	};

	function aging(dt){
		for(var i=0; i<particles.length;){
			var p = particles[i];
			p.age += dt;
			if(p.age >= p.life)
				kill(i);
			else
				i++;
		}
	}

	function kill(index){
		if(particles.length >1)
			particles[index] = particles[particles.length-1];
		particles.pop();
	}
}