class Ennemy extends Character{
	constructor() {
		super(new Vector(Math.random() * g.canvas.width, Math.random() * g.canvas.height), 12, "#ff0000");
	}

	move() {
		let speed = (Math.random() + 1) * 2;
		let angle = Math.random() * 2 * Math.PI;

		this.apply_force(new Vector(Math.cos(angle) * speed, Math.sin(angle) * speed));

		super.move();
	}
}