/* 
* @requires Vector2, Particle
*/
var collideRsv = 0.8;
function ChamberBox(x1, y1, x2, y2) {
    this.apply = function(particle) {
        if (particle.position.x - particle.size < x1 || particle.position.x + particle.size > x2){
            console.log(particle.velocity.x, "--------x");
            particle.velocity.x = -particle.velocity.x * collideRsv;
            console.log(particle.velocity.x);
        }

        if (particle.position.y - particle.size < y1 || particle.position.y + particle.size > y2){
        	console.log(particle.velocity.y, "--------y");
            particle.velocity.y = -particle.velocity.y * collideRsv;
            console.log(particle.velocity.y);
        }
    };
}
