class UI{
	constructor(player) {
		this.player = player;
	}

	draw() {
		if(this.player.ability_cooldown != 0) {
			draw_rect(new Vector(32, 32), new Vector(this.player.ability_cooldown * 120 / 300, 16), "#690000");
		}
	}
}