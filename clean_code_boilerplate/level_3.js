class Entity {
	constructor(pos, vel) {
		this.pos = pos;
		this.vel = vel;
		this.acc = new Vector(0,0);
	}

	move() {
		this.vel.add(this.acc);

		this.vel.mul(0.8);
		this.pos.add(this.vel);

		this.limit_position();

		this.acc = new Vector(0,0);
	}

	limit_position() {
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
}

class Shot extends Entity {
	constructor(pos, vel, color) {
		super(pos, vel);

		this.radius = 4;
		this.color = color;
		this.lifetime = 60;
	}

	move() {
		this.pos.add(this.vel);
		this.limit_position();
		this.lifetime--;
	}

	draw() {
		draw_circle(this.pos, this.radius, this.color);
	}
}

class Character extends Entity {
	constructor(pos, rad, col) {
		super(pos, new Vector(0, 0));

		this.radius = rad;
		this.color = col;
	}

	move() {
		super.move();
	}

	apply_force(f) {
		this.acc.add(f);
	}

	shoot(x, y) {
		let len = Math.sqrt((x - this.pos.x) * (x - this.pos.x) + (y - this.pos.y) * (y - this.pos.y));
		let shot_vel = new Vector((x - this.pos.x)/ len * 12, (y - this.pos.y) / len * 12);
		let shot = new Shot(this.pos.clone(), shot_vel, this.color);

		s.contents.push(shot);
	}

	collides(e) {
		let sqlen = (this.pos.x - e.pos.x) * (this.pos.x - e.pos.x) + (this.pos.y - e.pos.y) * (this.pos.y - e.pos.y);
		if(sqlen <= (this.radius + e.radius) * (this.radius * e.radius)) {
			return true;
		}
		return false;
	}

	draw() {
		draw_circle(this.pos, this.radius, this.color);
	}
}

class Hero extends Character {
	constructor() {
		super(new Vector(64, 64), 16, "#00ff00");

		this.ability_cooldown = 0;
	}

	move() {
		if(keys.pressed.indexOf("ArrowRight") != -1)
			this.apply_force(new Vector(2, 0));
		if(keys.pressed.indexOf("ArrowLeft") != -1)
			this.apply_force(new Vector(-2, 0));
		if(keys.pressed.indexOf("ArrowUp") != -1)
			this.apply_force(new Vector(0, -2));
		if(keys.pressed.indexOf("ArrowDown") != -1)
			this.apply_force(new Vector(0, 2));

		if(keys.pressed.indexOf(" ") != -1)
			this.use_ability();
		if(keys.mouse != undefined) {
			this.shoot(keys.mouse.clientX, keys.mouse.clientY);
			keys.mouse = undefined;
		}

		if(this.ability_cooldown > 0) {
			this.ability_cooldown--;
		}

		super.move();
	}

	use_ability() {
		if(this.ability_cooldown <= 0) {
			let xs = [0, 0.7, 1, 0.7, 0, -0.7, -1, -0.7];
			let ys = [1, 0.7, 0, -0.7, -1, -0.7, 0, 0.7];

			for(let i = 0 ; i < 8 ; i++) {
				s.contents.push(new Shot(this.pos.clone(), new Vector(xs[i] * 12, ys[i] * 12), this.color));
			}

			this.ability_cooldown = 300;
		}
	}
}

class Ennemy extends Character {
	constructor() {
		super(new Vector(Math.random() * cnv.width, Math.random() * cnv.height), 12, "#ff0000");
	}

	move() {
		let speed = (Math.random() + 1) * 2;
		let angle = Math.random() * 2 * Math.PI;

		this.apply_force(new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed));

		super.move();
	}
}

class Group {
	constructor(a) {
		this.contents = a;
		this.killlist = [];
	}

	kill(x) {
		this.killlist.push(x);
	}

	clear_kills() {
		for(let i = 0 ; i < this.killlist.length ; i++) {
			this.contents.splice(this.killlist[i], 1);
			this.killlist.splice(i, 1);
		}
	}

	draw() {
		for(let i = 0 ; i < this.contents.length ; i++) {
			this.contents[i].draw();
		}
	}
}

class UI {
	constructor(player) {
		this.player = player;
	}

	draw() {
		if(this.player.ability_cooldown != 0) {
			draw_rect(new Vector(32, 32), new Vector(this.player.ability_cooldown * 120 / 300, 16), "#690000");
		}
	}
}

var c, s, ui;

function setup() {
	c = new Group([new Hero()]);
	s = new Group([]);
	ui = new UI(c.contents[0]);

	for(let i = 0 ; i < 8 ; i++) {
		c.contents.push(new Ennemy());
	}
}

function loop() {
	if(Math.random() * 100 < 1) {
		c.contents.push(new Ennemy());
	}

	for(let j = 0 ; j < s.contents.length ; j++) {
		s.contents[j].move();
		if(s.contents[j].lifetime <= 0) {
			s.kill(j);
		}
	}

	for(let i = 0 ; i < c.contents.length ; i++) {
		c.contents[i].move();
		for(let j = 0 ; j < s.contents.length ; j++) {
			if(c.contents[i].collides(s.contents[j]) == true && c.contents[i].color != s.contents[j].color) {
				c.kill(i);
			}
		}
	}

	s.clear_kills();
	c.clear_kills();

	s.draw();
	c.draw();
	ui.draw();
}
