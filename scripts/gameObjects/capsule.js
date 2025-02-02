import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { displayGameOverScreen } from "../modules/main.js";
import { openingDoor } from "../modules/sound.js";
import { displayGameClearedScreen } from "../modules/main.js";


class Capsule extends BaseGameObject {
    blockGravityForces = true;
    // The capsule blocks gravity forcess

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            // If the Player ("Skeleton") collides with the capsule at the end of the second level, the game is cleared by calling the displayGameClearedScreen function
            //global.currentHealth = 3;
            displayGameClearedScreen();
            // If the Player ("Skeleton") collides with the capsule at the end of the second level, the game is cleared by calling the displayGameClearedScreen function

        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/capsule.png"]);
    }
}

export { Capsule };