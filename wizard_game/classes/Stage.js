class Stage{
    canvas = document.getElementById("canvas");
    hero
    character_group
    shot_group
    ui
    is_finished

    constructor(hero_class, num_stage){
        ctx.clearRect(0, 0, g.canvas.width, g.canvas.height);
        this.canvas.style.backgroundColor = "green"
        //this.ennemies = setEnnemies(num_stage)
        var expr = "this.hero = new LightHero()"
        this.hero = eval(expr)
        console.log(this.hero)
        this.character_group = new Group([this.hero]);
        this.shot_group = new Group([]);
        this.ui = new UI(this.character_group.contents[0]);
        this.is_finished = false;

        for(let i = 0 ; i < num_stage * 3 ; i++) {
            this.character_group.contents.push(new Ennemy());
        }
    }

    play(){
        var state = "You won the stage !"
        g.current_stage.hidden_loop()
        return state
    }

    loop(){
        //shots group
        for(let j = 0 ; j < this.shot_group.contents.length ; j++) {
            this.shot_group.contents[j].move();
            if(this.shot_group.contents[j].lifetime <= 0) {
                this.shot_group.kill(j);
            }
        }
        //character group
        for(let i = 0 ; i < this.character_group.contents.length ; i++) {
            this.character_group.contents[i].move();
            for(let j = 0 ; j < this.shot_group.contents.length ; j++) {
                if(this.character_group.contents[i].collides(this.shot_group.contents[j]) == true && this.character_group.contents[i].color != this.shot_group.contents[j].color) {
                    this.character_group.kill(i);
                }
            }
        }

        this.character_group.clear_kills();
        this.shot_group.clear_kills();

        this.shot_group.draw();
        this.character_group.draw();
        this.ui.draw();

        // stage end condition
        if (g.current_stage.character_group.contents.length == 1){
            this.is_finished = true;
            g.start_stage()
        }
    }

    hidden_loop() {
        ctx.clearRect(0, 0, g.canvas.width, g.canvas.height);
        g.current_stage.loop();
        
        if (!g.current_stage.is_finished){
            window.requestAnimationFrame(g.current_stage.hidden_loop);
            g.start_stage()
        }
    }
}