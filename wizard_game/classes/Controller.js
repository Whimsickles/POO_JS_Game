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