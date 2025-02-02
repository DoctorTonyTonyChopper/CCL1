import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Enemy } from "./enemy.js";
import { enemyDeathEffect } from "../modules/sound.js";


class Shuriken extends BaseGameObject {
    name = "Shuriken";
    xVelocity = 0;
    movementSpeed = 400; // The speed at which the shuriken moves
    yVelocity = 0;
    useGravityForces = false;
    hasCollided = false;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Enemy" || collidingObject.name == "Drone") {
            this.active = false; // If the Shuriken collides with the enemy or the drone, it disappears
            enemyDeathEffect.play();
        }
    }

    // Box bounds of the object are defined
    getBoxBounds = function () {
        return {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        };
    };

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;

        if (this.xVelocity == 0) {
            this.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }

    }

    constructor(x, y, width, height, moveRight) {
        super(x, y, width, height);
        this.xVelocity = (moveRight == true) ? this.movementSpeed : this.movementSpeed * -1;
        this.loadImages(["./images/shuriken.png"]);

        setTimeout(() => {
            this.active = false; // Mark as inactive
        }, 750);
    }
}

export { Shuriken };
