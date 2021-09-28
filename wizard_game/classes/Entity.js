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
		if(this.pos.x > g.canvas.width) {
			this.pos.x = 0;
		} else if(this.pos.x < 0) {
			this.pos.x = g.canvas.width;
		}
		if(this.pos.y > g.canvas.height) {
			this.pos.y = 0;
		} else if(this.pos.y < 0) {
			this.pos.y = g.canvas.height;
		}
	}
}