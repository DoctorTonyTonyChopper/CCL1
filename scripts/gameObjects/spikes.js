import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Shuriken } from "./shuriken.js";

class Spikes extends BaseGameObject {
    name = "Spikes";
    xVelocity = 50;
    yVelocity = 0;
    useGravityForces = true;


/*
reactToCollision = function (collidingObject) {
    if (collidingObject.name == "Skeleton") {
        if (this.x > collidingObject.x) { // collision from the left
            collidingObject.x -= 100;
        } else if (this.x < collidingObject.x) { // collision from the right
            collidingObject.x += 100;
        }
    }
*/
    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }




    constructor(x, y, width, height){
        super(x, y, width, height);
        //this.loadImages(["./images/enemy.png"]);
        this.loadImages(["./images/spikes.png"])
    }

}


export {Spikes};
