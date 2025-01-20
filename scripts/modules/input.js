import { global } from "./global.js";
import { Shuriken } from "../gameObjects/shuriken.js"; // Ensure correct path
import {shurikenEffect } from "./sound.js";


let lastShurikenTime = 0;
const shurikenCooldown = 250;

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

// Spacebar event to spawn a Shuriken only once
document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && !Shuriken.shurikenExists) {

        let currentTime = Date.now();
        if (currentTime - lastShurikenTime >= shurikenCooldown) { // Enforce cooldown
            lastShurikenTime = currentTime;
            
        global.playerObject.throwing(); // declaration is in skeleton
        shurikenEffect.play();




        // Adjust position
        /*if (global.gameObjects) {
            global.gameObjects.push(newShuriken);
            Shuriken.shurikenExists = true; // Prevent multiple instances
        } else {
            console.error("Error: global.gameObjects is undefined.");*/
        }
    }}
);

// Remove the shurikenExists flag when the shuriken is removed
document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
        Shuriken.shurikenExists = false;
    }
});

document.addEventListener("keypress", move);
document.addEventListener("keyup", stop);