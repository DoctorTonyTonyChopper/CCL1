import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Shuriken extends BaseGameObject {
    name = "Shuriken";
    xVelocity = 10; // velocity von null auf 10 geändert
    yVelocity = 0;
    useGravityForces = true;
    
}

