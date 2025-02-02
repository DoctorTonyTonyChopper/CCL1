import { global, resetGlobals } from "./global.js";
import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { BlockObject2 } from "../gameObjects/blockObject2.js";
import { Floor } from "../gameObjects/floor.js";
import { Heart } from "../gameObjects/heart.js";
import { ShurikenCollect } from "../gameObjects/shurikenCollect.js";
import { Enemy } from "../gameObjects/enemy.js";
import { Shuriken } from "../gameObjects/shuriken.js";
import { Door } from "../gameObjects/door.js";
import { Capsule } from "../gameObjects/capsule.js";
import { Drone } from "../gameObjects/drone.js";
import { Spikes } from "../gameObjects/spikes.js";
import {backgroundMusic, dmgEffect, healthEffect } from "./sound.js";


// gameOverButton that is displayed on the GameOverScreen
let gameOverButton = document.getElementById("gameOverButton");
gameOverButton.addEventListener("click", setupGame);

// gameClearedButton that is displayed on the GameClearedScreen
let gameClearedButton = document.getElementById("gameClearedButton");
gameClearedButton.addEventListener("click", () => {
    // Hide the game cleared screen
    let gameClearedScreen = document.getElementById("gameClearedScreen");
    gameClearedScreen.style.display = "none";
    global.currentHealth = 3;
    // Start the game start screen
    displayGameStartScreen();
});

// gameStartButton that is displayed on the GameStartScreen/Home screen (when the website is launched)
let gameStartButton = document.getElementById("gameStartButton");
gameStartButton.addEventListener("click", () => {
    // Hide the game start screen
    let gameStartScreen = document.getElementById("gameStartScreen");
    gameStartScreen.style.display = "none";
    // Start the displayStoryScreen 
    displayStoryScreen();
});

// Start Button that is displayed on the StoryScreen
let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
    // Hide the story screen
    document.getElementById("background").style.backgroundImage = "url(./images/levelbackgrounds/background.jpg)";
    let storyScreen = document.getElementById("storyScreen");
    storyScreen.style.display = "none";
    // Start the game setup
    setupGame();
    
});

// Function to display a screen when the game is finished
function displayGameClearedScreen () {
    console.log("displayGameClearedScreen() executed");

    let gameClearedScreen = document.getElementById("gameClearedScreen");
    gameClearedScreen.style.display = "block";
    //global.currentHealth = 3;
    backgroundMusic.pause();
}

// Function to display a screen when the game is over
function displayGameOverScreen () {
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "block";
    global.currentHealth = 3;
    backgroundMusic.pause();


}

// Function to display the GameStartScreen (home screen) which is called once the website is opened
 function displayGameStartScreen (){
    let gameStartScreen = document.getElementById("gameStartScreen");
    gameStartScreen.style.display = "block";

}

// Function to display the game story screen which is displayed once the  gameStartButton is pressed on the GameStartScreen (home screen)
function displayStoryScreen (){
    let storyScreen = document.getElementById("storyScreen");
    storyScreen.style.display = "block";

}



function gameLoop(totalRunningTime) {
    if (global.prevTotalRunningTime == 0) {
        global.prevTotalRunningTime = totalRunningTime;
    }

    if(global.currentHealth <= 0){
        displayGameOverScreen();
        global.gameRunning = false;
    }

    // Logs to monitor game state
    console.log("gameRunning:", global.gameRunning);
    console.log("Player position:", global.playerObject.x, global.playerObject.y);

    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (!global.gameRunning){
            global.allGameObjects[i].active = false;
        }
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely

}

// This function sets up the first level of the game
function setupGame() {
    document.getElementById("background").style.backgroundImage = "url(./images/levelbackgrounds/background.jpg)";
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "none";

    let storyScreen = document.getElementById("storyScreen");
    storyScreen.style.display = "none";

    let gameClearedScreen = document.getElementById("gameClearedScreen");
    gameClearedScreen.style.display = "none";

    backgroundMusic.loop = true;
    backgroundMusic.play();

    resetGlobals();
    global.playerObject = new Skeleton(0, 400, 80, 80);
    global.leftMoveTrigger = new MoveTrigger(0, 0, 20, 900);
    global.rightMoveTrigger = new MoveTrigger(800, 0, 20, 900);
    new Floor(0, 400, 9000, 50);

    new Heart(400, 200, 50, 65);
    new Enemy(400, 400, 75, 80);
    new Spikes(500, 0, 50, 50, 8000);   
    new ShurikenCollect (630, 400, 50, 50);

    new BlockObject(200, 280, 50, 50);
    new BlockObject(400, 200, 50, 50);
    new BlockObject(450, 200, 50, 50);
    new BlockObject(500, 200, 50, 50);
    new BlockObject(550, 200, 50, 50);

    new Drone (600, 25, 75, 80);

    new BlockObject(600, 200, 50, 50);
    new BlockObject(650, 200, 50, 50);
    new BlockObject(650, 200, 50, 50);
    new BlockObject(700, 250, 50, 50);
    new BlockObject(700, 300, 50, 50);
    new BlockObject(700, 350, 50, 50);

    new ShurikenCollect (800, 400, 50, 50);

    new BlockObject(950, 200, 50, 50);
    new BlockObject(1000, 200, 50, 50);
    new BlockObject(1050, 200, 50, 50);
    new BlockObject(1100, 200, 50, 50);
    new Heart(1000, 250, 50, 65);
    new ShurikenCollect (1050, 150, 50, 50);

    new Enemy(1000, 175, 75, 80);

    new Spikes(1100, 0, 50, 50, 13000);   

    new BlockObject(1300, 250, 50, 50);
    new BlockObject(1300, 350, 50, 50);
    new BlockObject(1300, 300, 50, 50);

    new Spikes(1400, 0, 50, 50, 18000);   
    new Drone (1500, 175, 75, 80);
    new Door(1600, 300, 100, 110);

    console.log(global.playerObject)

    requestAnimationFrame(gameLoop);
}

// This function sets up the second level of the game
function setupGame1() {
    console.log("Current health when entering Level 2:", global.currentHealth);
    console.log("setupGame1() executed");
    document.getElementById("background").style.backgroundImage = "url(./images/levelbackgrounds/background2.png)";
    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style.display = "none";

    let gameClearedScreen = document.getElementById("gameClearedScreen");
    gameClearedScreen.style.display = "none";

    backgroundMusic.loop = true;
    backgroundMusic.play();

    resetGlobals();
    global.playerObject = new Skeleton(0, 400, 80, 80);
    global.leftMoveTrigger = new MoveTrigger(0, 0, 20, 900);
    global.rightMoveTrigger = new MoveTrigger(800, 0, 20, 900);

    new Floor(0, 400, 9000, 50);

    new BlockObject2(200, 280, 50, 50);

    new Enemy(400, 400, 75, 80);

    new Heart(400, 150, 50, 65);
    new BlockObject2(400, 200, 50, 50);

    new Spikes(500, 0, 50, 50, 5000);
    new BlockObject2(500, 200, 50, 50);

    new ShurikenCollect (600, 150, 50, 50);
    new BlockObject2(600, 200, 50, 50);

    new Drone(700, 100, 75, 80);

    new BlockObject2(800, 250, 50, 50);
    new BlockObject2(800, 200, 50, 50);
    new BlockObject2(800, 300, 50, 50);
    new BlockObject2(800, 350, 50, 50);
    new BlockObject2(850, 200, 50, 50);

    new ShurikenCollect(850, 400, 50, 50);

    new Drone(1000, 85, 75, 80);
    new Spikes(1000, 400, 50, 50);
    new BlockObject2(1000, 250, 50, 50);

    new ShurikenCollect(1150, 400, 50, 50);
    new BlockObject2(1150, 200, 50, 50);
    new Heart(1150, 150, 50, 65);

    new BlockObject2(1200, 250, 50, 50);
    new BlockObject2(1200, 200, 50, 50);
    new BlockObject2(1200, 300, 50, 50);
    new BlockObject2(1200, 350, 50, 50);

    new Spikes(1200, 0, 50, 50, 15000);

    new ShurikenCollect(1250, 400, 50, 50);

    new Heart(1400, 200, 50, 65);
    new BlockObject2(1400, 250, 50, 50);

    new Enemy(1400, 400, 75, 80);

    new ShurikenCollect(1650, 400, 50, 50);

    new Drone(1600, 175, 75, 80)

    new Capsule(1750, 275, 75, 150);

    console.log(global.playerObject)

    requestAnimationFrame(gameLoop);
}




export {setupGame, displayGameClearedScreen, displayGameStartScreen, displayStoryScreen, setupGame1, displayGameOverScreen};



