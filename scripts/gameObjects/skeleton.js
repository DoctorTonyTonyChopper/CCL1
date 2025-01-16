import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { setupGame, displayGameOverScreen } from "../modules/main.js";
import { Shuriken } from "./shuriken.js";
import {dmgEffect, healthEffect } from "../modules/sound.js";


class Skeleton extends BaseGameObject {
    name = "Skeleton";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;
    currentHealth = 3;
    maxHealth = 6;
    hasCollided = false;
    canTakeDamage = true;
    timeoutDamage = 0;
    faceRight = false;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Heart") {
            this.changeCurrentHealth(1);
            console.log(this.currentHealth);
            healthEffect.play();
        }
        if(collidingObject.name == "Enemy") {
            this.changeCurrentHealth(-1);
            console.log(this.currentHealth);

            if (this.x < collidingObject.x) { // collision from the left
                this.x -= 100;
            } else if (this.x > collidingObject.x) { // collision from the right
                this.x += 100;
            }
            dmgEffect.play();
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

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
    }

    /*draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.loadImagesFromSpritesheet("./images/BODY_skeleton.png", 9, 4, 9);
        this.switchCurrentSprites(18, 18);
        this.updateHealthDisplay();
    }

    updateHealthDisplay = function () {
        let healthContainer = document.getElementById("health-bar");
        healthContainer.innerHTML = "";
        for (let i = 0; i < this.currentHealth; i++) {
            let heart = document.createElement("img");
            heart.src = "./images/apple.png";
            heart.classList.add("heart");
            healthContainer.appendChild(heart);
        }
    }




    changeCurrentHealth = function (dmg) {
        if (dmg < 0) {
            if (this.canTakeDamage == true) {
                this.currentHealth += dmg;
                this.canTakeDamage = false;
                window.setTimeout(() => { this.canTakeDamage = true; }, this.timeoutDamage);


            }
        }
        else {
            if (this.currentHealth < this.maxHealth) {
                this.currentHealth += dmg;



            }
        }

        this.updateHealthDisplay();


        
    }

    throwing = function() {
            new Shuriken(global.playerObject.faceRight == true ? global.playerObject.x - 15 + global.playerObject.width : global.playerObject.x, global.playerObject.y, 40, 40, global.playerObject.faceRight);
    }
    
}



export { Skeleton }
