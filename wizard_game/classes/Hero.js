class Hero extends Character{
    static l_hero_classes = [];

    constructor(){
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
				g.current_stage.shot_group.contents.push(new Shot(this.pos.clone(), new Vector(xs[i] * 12, ys[i] * 12), this.color));
			}

			this.ability_cooldown = 300;
		}
	}
}