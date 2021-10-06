const inquirer = require('inquirer');
const Player = require('./Player');
const Enemy = require('./Enemy');

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function() {
  this.enemies.push(new Enemy('Draco', 'broomstick'));
  this.enemies.push(new Enemy('Crabbe', 'fists'));
  this.enemies.push(new Enemy('Umbridge', 'scarf'));

  this.currentEnemy = this.enemies[0];

  inquirer
    .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your player name?'
    })
    .then(({name}) => {
      this.player = new Player(name);

      this.startNewBattle();
    });
};
module.exports = Game;
