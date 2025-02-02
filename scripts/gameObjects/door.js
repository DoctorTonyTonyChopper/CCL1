import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { openingDoor } from "../modules/sound.js";
import { setupGame1 } from "../modules/main.js";


class Door extends BaseGameObject {
    blockGravityForces = true; // The door is not affected by gravity

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            setupGame1();
            // If the Player ("Skeleton") collides with the door, the second level starts by calling the setupGame1 function
            openingDoor.play();
            // Opening door sound is played
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/door.png"]);
    }
}

export { Door };