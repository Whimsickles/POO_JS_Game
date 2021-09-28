function draw_rect(pos, diagonal, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(pos.x, pos.y, diagonal.x, diagonal.y);
}

function draw_circle(pos, radius, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
	ctx.fill();
}

function hidden_loop() {
	ctx.clearRect(0, 0, g.canvas.width, g.canvas.height);
	g.current_stage.loop();

	if (!g.current_stage.is_finished){
		window.requestAnimationFrame(hidden_loop);
	}
};

var cnv, ctx, keys;

/*! https://evanw.github.io/lightgl.js/docs/vector.html */
function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

Vector.prototype = {
	negative: function() {
		this.x *= -1; this.y *= -1;
	},
	add: function(v) {
		if (v instanceof Vector){
			this.x += v.x; this.y += v.y;
		} else {
			this.x += v; this.y += v;
		}
	},
	sub: function(v) {
		if (v instanceof Vector) {
			this.x -= v.x; this.y -= v.y;
		} else {
			this.x -= v; this.y -= v;
		}
	},
	mul: function(v) {
		if (v instanceof Vector) {
			this.x *= v.x; this.y *= v.y;
		} else {
			this.x *= v; this.y *= v;
		}
	},
	div: function(v) {
		if (v instanceof Vector) {
			this.x /= v.x; this.y /= v.y;
		} else if(v != 0) {
			this.x /= v; this.y /= v;
		}
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	len_sq: function() {
		return this.x * this.x + this.y * this.y;
	},
	unit:function() {
		if(this.length() != 0) {
			this.x /= this.length(); this.y /= this.length();
		} else {
			console.log("Trying to get unit of vector who's length is 0.");
		}
	},
	clone: function() {
		return new Vector(this.x, this.y);
	},
	limit: function(max) {
		if(this.length() > max) {
			this.unit();
			this.mult(max);
		}
	},
	init: function(x, y) {
		this.x = x; this.y = y;
		return this;
	}
};
