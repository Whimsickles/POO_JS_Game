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