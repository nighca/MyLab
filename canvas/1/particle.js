//particle.js

Particle = function(position, velocity, life, color, size) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = Vector2.zero;
    this.age = 0;
    this.life = life;
    this.color = color;
    this.size = size;

    this.dist = function(particle2){
    	return this.position.subtract(particle2.position).length();
    }
};
