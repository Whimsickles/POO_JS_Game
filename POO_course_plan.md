# Cours de POO

## Objectifs

- Découvrir la Programmation Orientée Objet et ses principes
- Découvrir les avantages et inconvénients de la POO
- Créer des classes
- Comprendre l'héritage
- Connaitre les overloads et overrides
- Connaitre les interfaces 
- Prendre connaissance 'Design Patterns'

## C'est quoi la POO ?

La programmation Orientée Objet est l'un des paradigmes de programmation.
Là où on apprend souvent d'abord avec de la programmation impérative ou fonctionnelle, la POO va proposer une nouvelle logique algorithmique pour coder.
Si vous connaissez les structures en C par exemple, c'est le même principe.

## Avantages

- Permet de représenter des concepts abstraits facilement
- Améliore la modularité du code
- Code plus simple à comprendre car illustré à travers les classes

## Inconvénients

- Demande de la rigueur
- Pas adapté pour de petits bouts de code (syntaxe lourde)
- Beaucoup de concepts à prendre en compte


## Faire de la POO

Pour pratiquer la POO, nous allons utiliser du JS ici, mais d'autres langages peuvent fonctionner comme le C++, le Python ou le Java.
On va commencer par un peu de Jargon pour comprendre les classes en général.

### Le jargon de base

On va créer des **classes** qui sont des templates de nos données, avec des **attributs** et des **méthodes**.
Ces classes vont agir comme des types, et on va pouvoir **instancier** ces classes pour les manipuler.
Une **instance** d'objet peut utiliser toutes les méthodes définies dans la classe. 
La fonction qui permet d'instancier une classe est **constructor()** en JS.


#### Exemple

```javascript
class Personnage{
    // déclarer les attributs ici n'est pas obligatoire, juste plus simple à retenir
    nom
    prenom
    age

    // 'this' représente l'instance, constructor return 'this'
    constructor(n, pn, a){
        this.nom = n;
        this.prenom = pn;
        this.age = a;
    }
    
    // on ajoute ensuite des méthodes
    manger(aliment){
        console.log(this.nom + " " + this.prenom + " mange " + aliment);
    }
}
// new fait appel a contructor()
var p = new Personnage("foo", "bar", 20);
// p est une instance de Personnage avec : nom = "foo"; prenom = "bar"; age = 20
```

Voici pour un exemple basique d'une classe.

## L'héritage

Nous avons vu une classe personnage, mais elle est limitée.
Prenons un RPG comme exemple :

Dans des RPGs en général, nous devons choisir une 'classe' pour son personnage. Prenons l'exemple d'une classe 'Magicien'.
Un magicien a toujours un nom, un prénom et un age, mais connait également comment lancer des sorts. Plutôt que de réécrire une nouvelle classe de zéro, on peut la faire **hériter** de Personnage. Ceci avec le mot clé **extends**.


```javascript
class Magicien extends Personnage{
    liste_sorts

    constructor(n, pn, a, l_sorts){
        super(n, pn, a); // toujours en 1er
        this.liste_sorts = l_sorts;
    }

    attaquer(nom_sort){
        if (this.liste_sorts.includes(nom_sort)){
            console.log(this.nom + " " + this.prenom + " attaque avec " + nom_sort);
        }
    }
}
var m = new Magicien("foo", "bar", 20, ["Fireball", "Frostbolt"])
m.manger("Pomme")
// -> "foo bar mange Pomme"
```
On a donc la **classe fille** Magicien, qui hérite des attributs et méthodes de la **classe mère** Personnage.
Il faudra ainsi juste mettre la fonction **super() au début du constructor** pour utiliser le constructor() de la classe mère.

### Classe abstraite (abstract)

On voit maintenant qu'instancier la classe Personnage ne sert plus à rien maintenant que nous avons une sous-classe. Une classe qui ne s'instancie pas se marque alors **abstraite**. Ce sont des classes qui sont principalement destinées à créer des sous-classes à instancier.

La plupart des langages utiliisent le mot clé 'abstract' devant leur classe (abstract class Personnage), mais JS n'a pas encore ce mot clé. Pour réaliser des classes abstraites en JS, il faut juste ajouter une condition pour vérifier si on est dans une classe abstraite ou non (c'est un peu moche en JS):


```javascript
class Personnage{
    constructor(n, pn, a){
        if (this.constructor === Personnage) {
            throw new TypeError('La classe abstraite Personnage ne peut être instanciée directement');
        }
        this.nom = n;
        this.prenom = pn;
        this.age = a;
    }
    ...
}
```

## Overloads er Overrides

### Overloads (surcharge)

On peut imaginer dans certains cas, qu'il n'y a pas qu'une seule façon de créer un magicien ou d'attaquer. Pour chaque fonction, il est possible de la surcharger. C'est à dire, créer une nouvelle version de la même fonction, avec des paramètres différents :

```javascript
class Magicien extends Personnage{
    ...
     attaquer(nom_sort){
        if (this.liste_sorts.includes(nom_sort)){
            console.log(this.nom + " " + this.prenom + " attaque avec " + nom_sort);
        }
    }
}
    attaquer(){ //attaque avec l'arme de base : les poings
        console.log(this.nom + " " + this.prenom + " attaque avec ses poings");
    }

```

### Overrides (redéfinition)

Pour X raison, on peut imaginer qu'un magicien ne mange pas comme n'importe qui, on peut alors redéfinir une fonction de la classe Personnage dans sa propre classe, on redéfinit alors la fonction manger(aliment) :

```javascript
class Magicien extends Personnage{
    ...
    manger(aliment){ //même nom, même paramètre
        console.log(this.nom + " " + this.prenom + " consomme " + aliment + " et regagne du mana");
    }
}
```

## Interfaces

Chaque classe peut hériter uniquement d'une seule classe.
Mais une classe peut **implémenter** plusieurs **interfaces**.

Les interfaces sont des ensembles d'attributs et méthodes qui peuvent s'appliquer à des classes. On peut voir l'ajout d'une interface sur une classe comme l'ajout d'une particularité.

Si on reste dans les RPGs, dans les classes disponibles, certaines utilisent du mana (Magicien, Prêtre), et d'autres de la stamina (Guerrier, Archer).

Nous allons donc avoir des méthodes différentes selon ces attributs.

Le JS n'a pas encore le mot clé interface, nous allons l'utiliser juste pour l'exemple, mais cela ne fonctionnera pas en JS.

Imaginons donc ces 2 interfaces :

```javascript
interface ManaUser{
    regain_energie(){
        console.log(this.nom + " " + this.prenom  " regagne tout son mana")
    }
}

interface StaminaUser{
    regain_energie(){
        console.log(this.nom + " " + this.prenom  " récupère toute sa stamina")
    }
}
```

On peut ainsi implémenter l'interface ManaUser dans la classe Magicien pour accéder à sa version de regain_energie() :

```javascript
class Magicien implements ManaUser{
    ...
}
var m = new Magicien("foo", "bar", 20, ["Fireball", "Frostbolt"])
m.regain_energie()
// -> "foo bar récupère tout son mana"
```

## Design patterns

Pour aller plus loin en POO, certaines situations demandent des solutions spécifiques. Ces solutions s'appellent des **Design Patterns**.

### Design pattern 'Etat'

Exemple d'une classe Voiture :
- si la voiture est éteinte, la méthode 'avancer()' ne fera rien
- si la voiture est allumée, la méthode 'avancer()' va agir

Le design pattern état est juste l'introduction d'une variable ou du'ne interface qui stocke l'état allumé ou éteint de la voiture :

```javascript
class Voiture{
    est_allume = false;
    demarrer(){
        this.est_allume = true;
    }

    eteindre(){
        this.est_allume = false;
    }

    avancer(){
        if (est_allume){
            console.log("La voiture avance...")
        }else{
            console.log("Allumez la voiture avant")
        }
}
```

### Pour aller plus loin

Le Design pattern Etat est le plus basique des Design Patterns, mais il en existe d'autres : Observer (attente d'événement), Fabrique (classe qui fabrique des instances d'autres classes), Singleton (instance unique) etc...

```javascript
/*
interface ManaUser{
    regain_energie(){
        console.log(this.nom + " " + this.prenom  " récupère tout son mana")
    }
}

interface StaminaUser{
    regain_energie(){
        console.log(this.nom + " " + this.prenom  " regagne toute sa stamina")
    }
}
*/

class Personnage{
    constructor(n, pn, a){
        if (this.constructor === Personnage) {
            throw new TypeError('La classe abstraite Personnage ne peut être instanciée directement');
        }
        this.nom = n;
        this.prenom = pn;
        this.age = a;
    }

    manger(aliment){
        console.log(this.nom + " " + this.prenom + " mange " + aliment);
    }
}

class Magicien extends Personnage /*implements ManaUser*/{
    liste_sorts

    constructor(n, pn, a, l_sorts){
        super(n, pn, a); // toujours en 1er
        this.liste_sorts = l_sorts;
    }

    attaquer(nom_sort){
        if (this.liste_sorts.includes(nom_sort)){
            console.log(this.nom + " " + this.prenom + " attaque avec " + nom_sort);
        }
    }

    attaquer(){ //attaque avec l'arme de base : les poings
        console.log(this.nom + " " + this.prenom + " attaque avec ses poings");
    }

    manger(aliment){ //même nom, même paramètre
        console.log(this.nom + " " + this.prenom + " consomme " + aliment + " et regagne du mana");
    }
}
var m = new Magicien("foo", "bar", 20, ["Fireball", "Frostbolt"])
m.manger("Pomme")
m.attaquer()
//m.regain_energie()
```