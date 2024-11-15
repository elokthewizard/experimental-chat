export class Animator {
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