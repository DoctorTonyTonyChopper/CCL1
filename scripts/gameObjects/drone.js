import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { droneDeathEffect } from "../modules/sound.js";


class Drone extends BaseGameObject {
    name = "Drone";
    xVelocity = 0;
    yVelocity = 50; // Vertical movement speed
    useGravityForces = false;
    movingDown = true; // Start by moving down
    directionChangeInterval = 2000; // It changes its direction every 2 seconds
    lastDirectionChangeTime = Date.now(); // This tracks the last time the direction changed

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Shuriken") {
            this.active = false; // If the drone collides with the shuriken, the drone disappears
            droneDeathEffect.play();

        }
    };

    // Box bounds of the object are defined
    getBoxBounds = function () {
        return {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3,
        };
    };

    // THis function updates the drone's movement and direction over time
    update = function () {
        // Based on the direction, move up or down
        if (this.movingDown) {
            this.y += this.yVelocity * global.deltaTime; // Move down
        } else {
            this.y -= this.yVelocity * global.deltaTime; // Move up
        }

        // Change direction every few seconds
        if (Date.now() - this.lastDirectionChangeTime > this.directionChangeInterval) {
            this.movingDown = !this.movingDown; // Flip vertical direction
            this.lastDirectionChangeTime = Date.now(); // Reset timer
        }

        // This ensures that the drone stays within the game bounds
        if (this.y <= 0) {
            this.y = 0;
            this.movingDown = true; // Force it to move down
        } else if (this.y + this.height >= global.canvas.height) {
            this.y = global.canvas.height - this.height;
            this.movingDown = false; // Force it to move up
        }
    };

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/spritesheets/drone.png", 4, 1, 4);
        this.switchCurrentSprites(0, 3);
    }
}

export { Drone };