class Game {
	game_div
	hero_class
	nb_stages
	canvas

	begin_screen(){
		// Title screen
		var titleHtml = `	
			<h2>Welcome to the game !</h2>		
			<h3>Please select a class and the number of stages</h3>
			<label for="heroes">Class</label>
			<select id="heroes" />
			</select>
			<label for="nb_stages">Number of stages</label>
			<input type="number" id="nb_stages" value="1" />
			<input type="button" id="start_game" value="Start Game !">
		`;

		// Add Title screen to gameDiv
		this.game_div = document.getElementById("game");
		console.log(this.gameDiv)
		this.game_div.innerHTML = titleHtml;
		
		// Populate datalist
		var hero_list = document.getElementById("heroes");

		// TMP : emulate different classes
		var classes = [
			"Light Mage",
			"Dark Mage",
			"Bob"
		]
		var option_item;
		classes.forEach(hero_class => {
			option_item = document.createElement("option")
			option_item.value = hero_class
			option_item.innerText = hero_class

			hero_list.appendChild(option_item)
		})

		// Start game when pushing start
		var start_bt = document.getElementById("start_game");
		console.log(start_bt)
		start_bt.addEventListener("click", this.start_game)
	}

	start_game(){
		console.log("start !")
		this.init_game
		init()
	}

	init_game(){
		this.canvas = document.getElementById("canvas");
		var hero_select = document.getElementById("heroes");
		this.hero_class = hero_select.options[hero_select.selectedIndex].value;
		this.nb_stages = document.getElementById("nb_stages").value;
	}
}
