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

		g.current_stage.shot_group.contents.push(shot);
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