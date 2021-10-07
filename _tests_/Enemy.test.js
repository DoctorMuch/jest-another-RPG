
const Enemy = require('../lib/Enemy');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

test('creates an enemy object', () => {
  const enemy = new Enemy('Voldemort', 'wand');

  expect(enemy.name).toBe('Voldemort');
  expect(enemy.weapon).toBe('wand');
  expect(enemy.health).toEqual(expect.any(Number));
  expect(enemy.strength).toEqual(expect.any(Number));
  expect(enemy.agility).toEqual(expect.any(Number));
  expect(enemy.potion).toEqual(expect.any(Object));
});

test('gets enemy health value', () => {
  const enemy = new Enemy('Wormtail', 'golden fist');

  expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

test('checks to see if enemy is alive or dead', () => {
  const enemy = new Enemy('Draco', 'broomstick');

  expect(enemy.isAlive()).toBeTruthy();

  enemy.health = 0;

  expect(enemy.isAlive()).toBeFalsy();
});

test('subtracts from enemy health', () => {
  const enemy = new Enemy('Dolores Umbridge', 'wand');
  const oldHealth = enemy.health;

  enemy.reduceHealth(5);

  expect(enemy.health).toBe(oldHealth - 5);

  enemy.reduceHealth(99999);

  expect(enemy.health).toBe(0);
});

test('gets enemy attack value', () => {
  const enemy = new Enemy('Beatrix LeStrange', 'curtain');
  enemy.strength = 8;
  
  expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(3);
  expect(enemy.getAttackValue()).toBeLessThanOrEqual(13);
});

test('gives description of enemy, including name and weapon', () => {
  const enemy = new Enemy('Fenrir', 'Fangs');
  
  expect(enemy.getDescription()).toEqual(expect.stringContaining('Fenrir'));
  expect(enemy.getDescription()).toEqual(expect.stringContaining('Fangs'));
});