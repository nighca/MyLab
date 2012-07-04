//vector2.js

Vector2 = function(x, y) {this.x=x; this.y=y;};

Vector2.prototype = {
	copy : function(){
		return new Vector2(this.x, this.y);
	},
	length : function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},
	sqrLength : function(){
		return this.x*this.x + this.y*this.y;
	},
}