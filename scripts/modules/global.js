const global = {}; 

function resetGlobals(){
global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.ctx.imageSmoothingEnabled = true; // This makes the images look smoother (better graphics)

global.deltaTime = 0; // Stores time difference between frames
global.allGameObjects = []; // Array to store all game objects
global.playerObject = {}; // Object to store player data
global.backgroundShift = 0; // Variable for background movement
global.backgroundMaxShift = -1000; // Maximum shift allowed for the background
global.gravityForce = 9.8; // Gravity force value for physics calculations
global.pixelToMeter = 100; // Conversion factor between pixels and meters
global.leftMoveTrigger; // Left movement trigger which needs to be defind 
global.rightMoveTrigger; // Right movement trigger which needs to be defined
global.gameRunning = true; // Boolean that indicates whether the game is running or not 
global.prevTotalRunningTime = 0; // Stores the previous total running time
}

global.currentHealth = 3; // Player's ("Skeleton") health at the beginning of the game

// This function gets the boundaries of the canvas
global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

// This function checks if an object collides with any other object
global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}


// This function checks if two objects have collided using their bounding boxes
global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}


export { global, resetGlobals };