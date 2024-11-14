const canvas = document.getElementById('gameCanvas');
canvas.width = 800;
canvas.height = 600;

const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

// Track mouse posiiton
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});


// Load spritesheet (dont forget to attribute AxulArt from itch.io)
const sprite = new Image();
sprite.src = '../assets/testPlayerSprites.png';

// Define animation handler
class AnimationState {
    constructor(frameWidth, frameHeight) {
        this.frameX = 0;
        this.frameY = 0;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.animationSpeed = 0.2;
        this.frameTimer = 0;

        // Layout constants
        this.framesPerColumn = 3;

        // Direction state
        this.lastDirectionX = 0;
        this.lastDirectionY = 0;

        // Direciton raw indices
        this.FACING_N = 0;
        this.FACING_NE = 1;
        this.FACING_E = 2;
        this.FACING_SE = 3;
        this.FACING_S = 4;
        this.FACING_SW = 5
        this.FACING_W = 6;
        this.FACING_NW = 7
    }

    updateFrame(isMoving) {
        if (isMoving) {
            this.frameTimer += this.animationSpeed;
            if (this.frameTimer >= 1) {
                this.frameTimer = 0;
                this.frameY = (this.frameY + 1) % this.framesPerColumn;
            }
        } else {
            // Reset to idle frame when not moving
            this.frameY = 1;
            this.frameTimer = 0;
        }
    }

    setDirection(dx, dy) {
        if (dx === 0 && dy === 0) {
            dx = this.lastDirectionX;
            dy = this.lastDirectionXY;
        } else {
            this.lastDirectionX = dx;
            this.lastDirectionY = dy;
        }
        const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Calculate angle in degrees

        if (angle >= -22.5 && angle < 22.5) {
            this.frameX = this.FACING_E; // East
        } else if (angle >= 22.5 && angle < 67.5) {
            this.frameX = this.FACING_SE; // Southeast
        } else if (angle >= 67.5 && angle < 112.5) {
            this.frameX = this.FACING_S; // South
        } else if (angle >= 112.5 && angle < 157.5) {
            this.frameX = this.FACING_SW; // Southwest
        } else if ((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle < -157.5)) {
            this.frameX = this.FACING_W; // West
        } else if (angle >= -157.5 && angle < -112.5) {
            this.frameX = this.FACING_NW; // Northwest
        } else if (angle >= -112.5 && angle < -67.5) {
            this.frameX = this.FACING_N; // North
        } else if (angle >= -67.5 && angle < -22.5) {
            this.frameX = this.FACING_NE; // Northeast
        }
    }
}

// Define movement handler
class MovementHandler {
    constructor(speed = 5) {
        this.speed = speed; 
        this.targetX = 100; 
        this.targetY = 100; 
        this.moving = false; 
    }

    setTarget(x, y) {
        this.targetX = x;
        this.targetY = y;
        this.moving = true;
    }

    updatePosition(player) {
        if (!this.moving) return {moving: false, dx: 0, dy: 0};

        const dx = this.targetX - player.x;
        const dy = this.targetY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            player.x = this.targetX;
            player.y = this.targetY;
            this.moving = false;
        } else {
            const normalizedDx = (dx / distance) * this.speed;
            const normalizedDy = (dy / distance) * this.speed;

            player.x += normalizedDx;
            player.y += normalizedDy;

            return {moving: true, dx: normalizedDx, dy:normalizedDy}
        }

        return {moving: false, dx: 0, dy: 0};
    }
}

// Define character properties
class PlayerCharacter {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.movement = new MovementHandler(2.5);
        this.animation = new AnimationState(16, 16);
        this.scale = 2;
    }

    update() {
        const moveState = this.movement.updatePosition(this);

        if (!moveState.moving) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            this.animation.setDirection(dx, dy)
        } else {
            this.animation.setDirection(moveState.dx, moveState.dy)
        }
        
        this.animation.updateFrame(moveState.moving);
    }
    
    draw(context) {
        // Calculate centered position
        const displayWidth = this.animation.frameWidth * this.scale;
        const displayHeight = this.animation.frameHeight * this.scale;

        const xOffset = this.animation.frameX * this.animation.frameWidth
        const yOffset = (this.animation.frameY * (this.animation.frameHeight + 7))

        context.drawImage(
            sprite,
            xOffset,
            yOffset,
            this.animation.frameWidth,
            this.animation.frameHeight,
            this.x - this.animation.frameWidth / 2,
            this.y - this.animation.frameHeight / 2,
            displayWidth,
            displayHeight
        );
    }

    handleClick(x, y) {
        this.movement.setTarget(x, y);
    }
}

const player = new PlayerCharacter();

// Mouse click event listener
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    player.targetX = event.clientX - rect.left;
    player.targetY = event.clientY - rect.top;
    player.movement.setTarget(player.targetX, player.targetY)
});

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw(context);
    requestAnimationFrame(gameLoop);
}

// start game when sprites are loaded
sprite.onload = () => {
    gameLoop();
}
