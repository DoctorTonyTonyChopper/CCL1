import { global } from "../modules/global.js"

// Here, we define the BaseGameObject class that serves as the foundation for all other game objects and is their parent, basically.
class BaseGameObject {
    active = true;
    name = "";
    x = 100;
    y = 500;
    previousX = 0;
    previousY = 0;
    width = 50;
    height = 50;
    useGravityForces = false;
    blockGravityForces = false;
    prevFallingVelocity = 0;
    index = -1; // Index of this object in the global game objects array

    // Stores physics properties such as gravity, velocity, and jump force
    physicsData = {
        "fallVelocity": 0,
        "terminalVelocity": 53,
        "jumpForce": 0,
        "prevFallingVelocity": 0,
        "jumpForceDecay": 2,
        "isGrounded": false
    }

    // Stores animation properties for sprite-based animation
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    // Stores the object's position from the previous frame
    storePositionOfPreviousFrame = function () {
        this.previousX = this.x;
        this.previousY = this.y;
    };

    // Returns the bounding box of the object for collision detection
    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };

    // Updates object behavior (to be overridden by subclasses)
    update = function () {

    };

    // Applies gravity effects to the object if enabled
    applyGravity = function () {
        if (!this.useGravityForces || !global.gameRunning)
            return;

        this.physicsData.fallVelocity += global.gravityForce * global.deltaTime * global.pixelToMeter;

        if (this.physicsData.jumpForce > 0) {
            if (this.physicsData.isGrounded == true) {
                this.physicsData.fallVelocity = 0;
            }
            this.physicsData.isGrounded = false;
            this.physicsData.fallVelocity -= (global.gravityForce * global.deltaTime * global.pixelToMeter) * 2;
            this.physicsData.jumpForce -= this.physicsData.jumpForceDecay * global.deltaTime;
            this.physicsData.jumpForce = Math.max(0, this.physicsData.jumpForce);
            if (this.physicsData.fallVelocity > 0 || this.physicsData.jumpForce == 0) {
                this.physicsData.jumpForce = 0;
            }
        }

        if (this.physicsData.fallVelocity > this.physicsData.terminalVelocity * global.pixelToMeter) {
            this.physicsData.fallVelocity = this.physicsData.terminalVelocity * global.pixelToMeter;
        }

        this.y += (this.physicsData.fallVelocity * global.deltaTime + this.physicsData.prevFallingVelocity) / 2;
        this.physicsData.prevFallingVelocity = this.physicsData.fallVelocity * global.deltaTime;

        for (let i = 0; i < global.allGameObjects.length; i++) {
            let otherObject = global.allGameObjects[i];
            if (otherObject.active == true && otherObject.blockGravityForces == true) {
                let collisionHappened = global.detectBoxCollision(this, otherObject);
                if (collisionHappened) {
                    if (this.physicsData.fallVelocity > 0) {
                        this.physicsData.isGrounded = true;
                        this.y = otherObject.getBoxBounds().top - this.height - (this.getBoxBounds().bottom - (this.y + this.height)) - 0.1;
                    }
                    else if (this.physicsData.fallVelocity < 0) {
                        this.y = otherObject.getBoxBounds().bottom + 0.1;
                    }
                    this.physicsData.jumpForce = 0;
                    this.physicsData.fallVelocity = 0;
                    this.physicsData.prevFallingVelocity = 0;
                }
            }
        }
    };

    // Allows the object to jump by setting a jump force
    setJumpForce = function (jumpForce) {
        if (this.physicsData.isGrounded == true) {
            this.physicsData.jumpForce = jumpForce;
        }
    };

    // Draws the object's sprite onto the canvas
    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    // Gets the next sprite for animation
    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };


    loadImages = function (imageSources) {
        /* first load images from path */

        for (let i = 0; i < imageSources.length; i++) {
            let image = new Image();
            image.src = imageSources[i];

            /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
            this.animationData.animationSprites.push(image);
        }

    };

    loadImagesFromSpritesheet(spritesheetPath, cols, rows, lastrow) {
        // Calculate the number of rows and columns
        //const cols = Math.floor(spritesheetWidth / singleSpriteWidth);
        //const rows = Math.floor(spritesheetHeight / singleSpriteHeight);
        const totalSprites = cols * (rows - 1) + lastrow;

        // Pre-create an array with `Image` objects for all sprites
        this.animationData.animationSprites = Array.from({ length: totalSprites }, () => new Image());

        // Load the spritesheet
        const spritesheet = new Image();
        spritesheet.src = spritesheetPath;

        // Add a "load" event listener to the spritesheet
        spritesheet.addEventListener("load", () => {
            const spritesheetWidth = spritesheet.width;
            const spritesheetHeight = spritesheet.height;
            const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
            const singleSpriteHeight = Math.floor(spritesheetHeight / rows);


            // Create a temporary canvas to extract sprites from the spritesheet
            const tempSpritesheetCanvas = document.createElement("canvas");
            const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
            tempSpritesheetCanvas.width = singleSpriteWidth;
            tempSpritesheetCanvas.height = singleSpriteHeight;

            // Loop through each sprite's row and column position
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    // if(row == rows - 1 && col == lastrow - 1) {
                    //     break;
                    // }

                    // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                    tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx.drawImage(
                        spritesheet,
                        col * singleSpriteWidth,
                        row * singleSpriteHeight,
                        singleSpriteWidth,
                        singleSpriteHeight,
                        0,
                        0,
                        singleSpriteWidth,
                        singleSpriteHeight
                    );

                    // assign it to the corresponding Image object
                    const index = row * cols + col;
                    this.animationData.animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        });
    }

    switchCurrentSprites = function (firstSpriteIndex, lastSpriteIndex) {
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }

    reactToCollision = function (collidingObject) {

    }

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.previousX = x;
        this.previousY = y;
        global.allGameObjects.push(this);
        this.index = global.allGameObjects.length - 1;
    }

}

export { BaseGameObject }