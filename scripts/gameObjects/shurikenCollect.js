import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class ShurikenCollect extends BaseGameObject {
    name = "ShurikenCollect";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Skeleton") {
            this.active = false;
        }
    }


    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }



   /* draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/shuriken.png", 1, 1, 1);
        
  }
}

export {ShurikenCollect}