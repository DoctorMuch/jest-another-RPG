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

Game.prototype.startNewBattle = function() {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  console.log('Your player stats are as follows:');
  console.table(this.player.getStats());

  console.log(this.currentEnemy.getDescription());

  this.battle();
};

Game.prototype.battle = function() {
  if(this.isPlayerTurn) {
    inquirer
      .prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['Attack', 'Use potion']
      })
      .then(({ action }) => {
        if (action === 'Use potion') {
          if(!this.player.getInventory()) {
            console.log('You do not have any potions to use!');
            return;
          }
          
          inquirer
            .prompt({
              type: 'list',
              message: 'Which potion would you like to use?',
              name: 'action',
              choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
            })
            .then(({ action }) => {
              const potionDetails = action.split(': ');

              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} potion.`);
            });

        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          console.log(`You attacked ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
        }
      });
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
  }
};

module.exports = Game;
