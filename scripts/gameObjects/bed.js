import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { displayGameOverScreen } from "../modules/main.js";
import { openingDoor } from "../modules/sound.js";


class Bed extends BaseGameObject {
    blockGravityForces = true;

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            openingDoor.play();
            displayGameOverScreen();

        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/bed.png"]);
    }
}

export { Bed };