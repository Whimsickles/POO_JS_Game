class Controller {
	constructor() {
		this.pressed = [];
		this.mouse = undefined;
	}

	press(event) {
		event.preventDefault();

		if(this.pressed.indexOf(event.key) == -1) {
			this.pressed.push(event.key);
		}
	}

	release(event) {
		if(this.pressed.indexOf(event.key) != -1) {
			this.pressed.splice(this.pressed.indexOf(event.key), 1);
		}
	}

	click(event) {
		this.mouse = event;
	}
}

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

function init() {
	cnv = document.getElementById("canvas");
	cnv.height = 640;
	cnv.width = 1080;
	cnv.style.height = cnv.height + "px";
	cnv.style.width = cnv.width + "px";

	ctx = cnv.getContext("2d");

	keys = new Controller();

	document.body.addEventListener("keydown", function(event) {var k = keys;k.press(event);});
	document.body.addEventListener("keyup", function(event) {var k = keys;keys.release(event);});
	document.body.addEventListener("click", function(event) {var k = keys;keys.click(event);});

	setup();

	hidden_loop();
};

function hidden_loop() {
	ctx.clearRect(0, 0, cnv.width, cnv.height);

	loop();

	window.requestAnimationFrame(hidden_loop);
};

window.onload = init;

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
