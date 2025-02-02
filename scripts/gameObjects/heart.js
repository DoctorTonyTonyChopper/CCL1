import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Heart extends BaseGameObject {
    name = "Heart";
    xVelocity = 0; // The heart has no movement, therefore the velocities are 0
    yVelocity = 0;
    useGravityForces = true;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            this.active = false;
            // If the Player "Skeleton" collides with the heart, the heart disappears
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

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            // Even with no movement, the spritesheet animation works because the xvelocity is 0 in this if statement
            this.switchCurrentSprites(this.animationData.firstSpriteIndex);
        }
    }

    /* draw = function () {
         global.ctx.fillStyle = "#000000";
         global.ctx.fillRect(this.x, this.y, this.width, this.height);
     }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/collectibles/heart.png", 16, 1, 16);
        // The heart has a movement animation, therefore I linked it as a spritesheet
        this.switchCurrentSprites(0, 15);
    }
}

export { Heart }