//collide of particles against each other

function Collide(){
	this.apply = function(particles){
		
		for (var i in particles){
			for (var j in particles){
				//console.log(particles[i].position.x,",",particles[i].position.y,":",particles[j].position.x,",",particles[j].position.y,"!",particles[i].dist(particles[j]));
				if(i != j && particles[i].dist(particles[j]) <= (particles[i].size+particles[j].size)){
					
					particles[i].size = Math.sqrt(particles[i].size*particles[i].size + particles[j].size*particles[j].size);
					particles[i].position = particles[i].position.add(particles[j].position).divide(2);
					//if(particles[i].age > particles[j].age)
					//	particles[i].age = particles[j].age;
					if (particles.length > 1)
			            particles[j] = particles[particles.length - 1];
			        particles.pop();
			        //document.write("!");
				}
			}
		}
	}
}