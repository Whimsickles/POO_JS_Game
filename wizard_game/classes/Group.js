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