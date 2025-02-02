import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveTrigger extends BaseGameObject {
    backGroundDiv = null;

    // This method updates the background position
    update = function () {
        this.backGroundDiv.style.backgroundPositionX = global.backgroundShift + "px"; // Moves the background based on the global background shift value
        global.canvas.style.marginLeft = global.backgroundShift + "px"; // Moves the element to create a parallax effect
    }

    draw = function () {
        //global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Collision detection with other objects
    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            let shiftBy = collidingObject.xVelocity * global.deltaTime; // Computes how much the Player ("Skeleton") moved in the last frame.
            global.backgroundShift += shiftBy * -1; // Moves the background in the opposite direction of the Player's ("Skeleton") movement

            if (global.backgroundShift < global.backgroundMaxShift) {
                global.backgroundShift = global.backgroundMaxShift;
                collidingObject.x = collidingObject.previousX; // Resets object position
            }
            else if (global.backgroundShift > 0) {
                global.backgroundShift = 0;
                collidingObject.x = collidingObject.previousX;
            }
            else {
                // Updates the left and right movement triggers
                global.leftMoveTrigger.x += shiftBy;
                global.rightMoveTrigger.x += shiftBy;
            }
        }

    }

    constructor(x, y, width, height) {
        super(x, y, width, height); // Calls the parent class constructor
        this.backGroundDiv = document.querySelector("#background");
    }
}

export { MoveTrigger }