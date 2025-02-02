import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Shuriken } from "./shuriken.js";

class Enemy extends BaseGameObject {
    name = "Enemy";
    xVelocity = 50;
    yVelocity = 0;
    useGravityForces = true;
    movingRight = true; // Tracks the direction of the movement
    directionChangeInterval = 3000; // 🚨🚨🚨🚨🚨🚨 Change movement direction every 3 seconds
    lastDirectionChangeTime = Date.now(); // 🚨🚨🚨🚨🚨🚨 This stores the last time the direction changed


    // 🟡🟡 /SHURIKEN COLLISION DETECTION !!! 🟡🟡 
    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Shuriken") {
            this.active = false; // Enemy disappears once colliding with the shuriken
        }
    }

    // Box bounds of the object are defined
    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    // Updates the enemy's position and direction over time
    update = function () {
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
        }
    }


    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/spritesheets/enemy.png", 4, 1, 4);
        this.switchCurrentSprites(0, 3);
    }

}


export { Enemy };
