import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

// The floor is used as the floor of the game, haha. The player can walk on it without falling down. The specific x and y coordinates are set in the setupGame function.
class Floor extends BaseGameObject {
    name = "Floor";
    blockGravityForces = true; // This object blocks gravity effects and therefore prevents falling.



    draw = function () {
    }

    constructor(x, y, width, height) {
        super(x, y, width, height); // Calls the parent class constructor
    }
}

export { Floor };