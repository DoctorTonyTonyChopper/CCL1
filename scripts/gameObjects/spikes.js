import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Spikes extends BaseGameObject {
    name = "Spikes";
    xVelocity = 0;
    yVelocity = 0; // Gravity will control the fall
    useGravityForces = true; //
    blockGravityForces = false;
 

    constructor(x, y, width, height, fallDelay) {
        super(x, y, width, height);
        this.loadImages(["./images/spikes.png"]);
        this.active = false;
        window.setTimeout(() => this.active = true, fallDelay);
    }
}

export { Spikes };