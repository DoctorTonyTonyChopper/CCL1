import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class ShurikenCollect extends BaseGameObject {
    name = "ShurikenCollect";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            this.active = false; // Once the Player ("Skeleton") collides with the COLLECTIBLE Shuriken, the shuriken disappears
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

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/collectibles/shuriken_collectible.png", 1, 1, 1);

    }
}

export { ShurikenCollect }