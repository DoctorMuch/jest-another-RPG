const Character = require('./Character');
const Potion = require('./Potion');

class Enemy extends Character{
  constructor(name, weapon) {
    super(name);

    this.weapon = weapon;
    this.potion = new Potion();

  }
  getDescription() {
    return `${this.name}, wielding ${this.weapon} has appeared in front of you!`;
  }
}



module.exports = Enemy;