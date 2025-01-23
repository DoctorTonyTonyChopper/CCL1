import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Shuriken } from "./shuriken.js";

class Enemy extends BaseGameObject {
    name = "Enemy";
    xVelocity = 50;
    yVelocity = 0;
    useGravityForces = true;
    movingRight = true;
    directionChangeInterval = 3000; // 🚨🚨🚨🚨🚨🚨 Change direction every 3 seconds
    lastDirectionChangeTime = Date.now(); // 🚨🚨🚨🚨🚨🚨 

/*
reactToCollision = function (collidingObject) {
    if (collidingObject.name == "Skeleton") {
        if (this.x > collidingObject.x) { // collision from the left
            collidingObject.x -= 100;
        } else if (this.x < collidingObject.x) { // collision from the right
            collidingObject.x += 100;
        }
    }
*/

// 🟡🟡 /SHURIKEN COLLISION DETECTION !!! 🟡🟡 
    reactToCollision = function (collidingObject) {   
    if (collidingObject.name == "Shuriken") { // ENEMY SHOULD DISAPPEAR ONCE COLLIDING WITH THE SHURIKEN
            this.active = false; // or this.setVisible(false) 
            // collidingObject.name.active = false; //❌❌❌❌❌❌❌❌❌
        } 
}




    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    update = function() { 
        // Move left or right based on direction
        if (this.movingRight) {
            this.x += this.xVelocity * global.deltaTime;
        } else {
            this.x -= this.xVelocity * global.deltaTime;
        }
    

    // Change direction every few seconds
    if (Date.now() - this.lastDirectionChangeTime > this.directionChangeInterval) {
        this.movingRight = !this.movingRight; // Flip direction
        this.lastDirectionChangeTime = Date.now(); // Reset timer
    } }


    constructor(x, y, width, height){
        super(x, y, width, height);
        //this.loadImages(["./images/enemy.png"]);
        this.loadImagesFromSpritesheet("./images/enemy.png", 4, 1, 4);
        this.switchCurrentSprites(0, 3);
    }

}


export {Enemy};
