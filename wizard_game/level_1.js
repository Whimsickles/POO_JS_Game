class Character {
	constructor() {
		let speed = (Math.random() + 1) * 2;
		let angle = Math.random() * 2 * Math.PI;

		this.pos = new Vector(Math.random() * cnv.width, Math.random() * cnv.height);
		this.vel = new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed);

		this.radius = 8;
		this.color = "#ff0000";
	}

	move() {
		this.pos.add(this.vel);

		if(this.pos.x > cnv.width) {
			this.pos.x = 0;
		} else if(this.pos.x < 0) {
			this.pos.x = cnv.width;
		}
		if(this.pos.y > cnv.height) {
			this.pos.y = 0;
		} else if(this.pos.y < 0) {
			this.pos.y = cnv.height;
		}
	}

	draw() {
		draw_circle(this.pos, this.radius, this.color);
	}
}

var c;
var g = new Game();
g.begin_screen();

function setup() {
	
	g.begin_screen()
	c = new Character();
}

function loop() {
	c.move();
	c.draw();
}
