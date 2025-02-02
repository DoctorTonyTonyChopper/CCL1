import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class BlockObject extends BaseGameObject {
    blockGravityForces = true;
    // Prevents the object from falling

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            collidingObject.x = collidingObject.previousX;
            // If the Player ("Skeleton") collides with the block object (platform wall), the Player is moved back to its previous horizontal position
            collidingObject.y = collidingObject.previousY;
            // If the Player ("Skeleton") collides with the block object (platfrom wall), the Player is moved back to its previous vertical position
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/platforms/wall.png"]);
    }
}

export { BlockObject };