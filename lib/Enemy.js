const Potion = require('./Potion');

function Enemy(name, weapon) {
  this.name = name;
  this.weapon = weapon;
  this.potion = new Potion();

  this.health = Math.floor(Math.random() * 10 + 90);
  this.strength = Math.floor(Math.random() * 5 + 6);
  this.agility = Math.floor(Math.random() * 5 + 6);
}

Enemy.prototype.getHealth = function() {
  return `${this.name}'s health is ${this.health}!`
};

Enemy.prototype.isAlive = function() {
  if(this.health > 0){
    return true;
  }
  return false;
};

Enemy.prototype.reduceHealth = function(health) {
  this.health -= health;

  if(this.health < 0) {
    this.health = 0;
  }
};

Enemy.prototype.getAttackValue = function() {
  const min = this.strength - 4;
  const max = this.strength + 4;

  return Math.floor(Math.random() * (max - min) + min);
};

Enemy.prototype.getDescription = function(){
  return `${this.name}, wielding ${this.weapon} has appeared!`;
}

module.exports = Enemy;