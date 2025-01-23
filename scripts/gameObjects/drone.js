import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Drone extends BaseGameObject {
    name = "Drone";
    xVelocity = 0; 
    yVelocity = 50; 
    useGravityForces = false; 
    movingDown = true; // Start by moving down
    directionChangeInterval = 2000; 
    lastDirectionChangeTime = Date.now();

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Shuriken") {
            this.active = false; 
        }
    };

    getBoxBounds = function () {
        return {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3,
        };
    };

    update = function () {
  
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

        // Ensure the drone stays within the game bounds
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
        this.loadImagesFromSpritesheet("./images/drone.png", 4, 1, 4);
        this.switchCurrentSprites(0, 3);
    }
}

export { Drone };