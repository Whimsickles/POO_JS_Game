class LightHero extends Hero{
    constructor(){
        super(new Vector(64, 64), 16, "#ffffff");
    };

    static add_hero(){
        if (this.name != "Hero"){
            console.log(this.name)
            Hero.l_hero_classes.unshift(this.name);
        }
    }
}

LightHero.add_hero();