const dmgEffect = new Audio('./sounds/hit.mp3'); // Damage sound effect when colliding with enemy, drone or spike

const shurikenEffect = new Audio('./sounds/shuriken.mp3'); // Shuriken throwing sound effect

const healthEffect = new Audio('./sounds/health.mp3'); // Gaining health sound effect

const enemyDeathEffect = new Audio('./sounds/enemydeath.mp3'); // Sound effect when enemy dies

const openingDoor = new Audio('./sounds/opendoor.mp3'); // Sound effect when opening door 

const backgroundMusic = new Audio('./sounds/backgroundmusic.mp3'); // Music playing in the background when the game starts until it ends



export {dmgEffect, shurikenEffect, healthEffect, enemyDeathEffect, backgroundMusic, openingDoor};