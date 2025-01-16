import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { displayGameOverScreen } from "../modules/main.js";
import { openingDoor } from "../modules/sound.js";
import { setupGame2 } from "../modules/main.js";


class Door2 extends BaseGameObject {
    blockGravityForces = true;

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Skeleton") {
            setupGame2();

        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/wall.jpg"]);
    }
}

export {Door2};