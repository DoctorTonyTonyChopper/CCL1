import { global } from "./global.js";
import { Shuriken } from "../gameObjects/shuriken.js"; // Ensure correct path
import {shurikenEffect } from "./sound.js";


let lastShurikenTime = 0; // This is the last time a shuriken was thrown
const shurikenCooldown = 250; // This is a cooldown in milliseconds for the shuriken so it does not get spammed too much (0.25 seconds)

// This function handles the player movement when pressing the keys d, a and w
function move(event) {
    switch(event.key) {
        case "d":
            if (!global.playerObject.faceRight || global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(27, 35);
            global.playerObject.xVelocity = 200;
            global.playerObject.yVelocity = 0;
            global.playerObject.faceRight = true;
            
            break;
        case "a":            
            if (global.playerObject.faceRight || global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(9, 17);
            global.playerObject.xVelocity = -200;
            global.playerObject.yVelocity = 0;
            global.playerObject.faceRight = false;

            break;
        case "w":
            global.playerObject.setJumpForce(.8);
            break;
    }
}

// The movement stops when the keys d and a are released
function stop(event) {
    switch(event.key) {
        case "d":
            if (global.playerObject.xVelocity == 200) {
                global.playerObject.xVelocity = 0;
            }
            break;
        case "a":
            if (global.playerObject.xVelocity == -200) {
                global.playerObject.xVelocity = 0;
            }
            break;  
    }
}

// Spacebar event to spawn a Shuriken with a cooldown
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !Shuriken.shurikenExists) {

        let currentTime = Date.now();
        if (currentTime - lastShurikenTime >= shurikenCooldown) { // Enforce cooldown
            lastShurikenTime = currentTime;
            
        global.playerObject.throwing(); // declaration is in Skeleton, shuriken gets thrown
        shurikenEffect.play(); // Sound effect when shuriken is thrown
        }
    }}
);

// Remove the shurikenExists flag when the shuriken is removed
document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
        Shuriken.shurikenExists = false; // Allowing new shurikens to be thrown
    }
});

// Adding event listeners for movement and stopping
document.addEventListener("keypress", move);
document.addEventListener("keyup", stop);