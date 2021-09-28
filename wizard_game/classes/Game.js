class Game {
	game_div
	hero_class
	nb_stages
	canvas
	current_stage
	
	create_div(){
		// Title screens
		var titleHtml = `	
		<h2 id="main_message">Welcome to the game !</h2>		
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
		var classes = Hero.l_hero_classes
		console.log(classes)
		var option_item;
		for (var hero_i in classes){
			var hero_class = classes[hero_i]
			option_item = document.createElement("option")
			option_item.value = hero_class
			option_item.innerText = hero_class

			hero_list.appendChild(option_item)
		}
	}

	begin_screen(){
		document.getElementById('canvas').hidden = true;
		this.game_div.style.display = "flex";

		// Start game when pushing start
		var start_bt = document.getElementById("start_game");
		start_bt.addEventListener("click", this.start_game)
	}

	init_game(){
		document.getElementById("game").style.display = "none";
		this.canvas = document.getElementById("canvas");
		this.canvas.hidden = false;
		this.canvas.height = 640;
		this.canvas.width = 1080;
		this.canvas.style.height = this.canvas.height + "px";
		this.canvas.style.width = this.canvas.width + "px";

		ctx = this.canvas.getContext("2d");
		keys = new Controller();

		document.body.addEventListener("keydown", function(event) {var k = keys;k.press(event);});
		document.body.addEventListener("keyup", function(event) {var k = keys;keys.release(event);});
		document.body.addEventListener("click", function(event) {var k = keys;keys.click(event);});


		this.canvas.hidden = false;
		document.getElementById("game").style.display = "none";
		var hero_select = document.getElementById("heroes");
		this.hero_class = hero_select.options[hero_select.selectedIndex].value;
		this.nb_stages = document.getElementById("nb_stages").value;

		// launch stages
		this.num_stage = 1;
		this.current_stage = new Stage(this.hero_class, this.num_stage)
		this.current_stage.play()
	}

	start_stage(){
		if (this.num_stage <= this.nb_stages){
			if (this.current_stage.is_finished){
				this.current_stage = new Stage(this.hero_class, this.num_stage)
				this.current_stage.play()
				this.num_stage += 1
			}
		}else{
			console.log("You won the game <3")
			document.getElementById("main_message").innerText = "You won the game ! Restart ?"
			this.begin_screen()
		}
	}

	start_game(this_game){
		console.log("start !")
		g.init_game()
	}
}
