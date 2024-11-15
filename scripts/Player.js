import { Animator } from "./Animator.js";
import { MovementHandler } from "./MovementHandler.js";

export class Player {
    constructor(canvas, sprite) {
        this.sprite = sprite
        this.x = 400;
        this.y = 210;

        this.movement = new MovementHandler(1, canvas);
        this.animation = new Animator(16, 16);

        this.scale = 2;

        this.messages = [];
        this.messageDuration = 10000;
    }

    update() {
        const moveState = this.movement.updatePosition(this);
        const { mouseX, mouseY } = this.movement;

        if (!moveState.moving) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            this.animation.setDirection(dx, dy)
        } else {
            this.animation.setDirection(moveState.dx, moveState.dy)
        }
        
        this.animation.updateFrame(moveState.moving);

        // Remove expired messages
        const currentTime = Date.now();
        this.messages = this.messages.filter(msg => currentTime - msg.time < this.messageDuration)
    }
    
    draw(context) {
        // Calculate centered position
        const displayWidth = this.animation.frameWidth * this.scale;
        const displayHeight = this.animation.frameHeight * this.scale;

        // Calculate shadow position and size
        const shadowWidth = displayWidth * 0.75; // Adjust width of shadow
        const shadowHeight = displayHeight * 0.2; // Adjust height of shadow
        const shadowX = this.x - shadowWidth / 5;
        const shadowY = this.y + (displayHeight - shadowHeight - 2);

        // Draw the shadow as a semi-transparent ellipse
        context.fillStyle = 'rgba(28, 47, 96, 1)'; // Semi-transparent black
        context.beginPath();
        context.ellipse(shadowX + shadowWidth / 2, shadowY, shadowWidth / 2, shadowHeight / 2, 0, 0, Math.PI * 2);
        context.fill();

        const xOffset = this.animation.frameX * this.animation.frameWidth
        const yOffset = (this.animation.frameY * (this.animation.frameHeight + 7))

        context.drawImage(
            this.sprite,
            xOffset,
            yOffset,
            this.animation.frameWidth,
            this.animation.frameHeight,
            this.x - this.animation.frameWidth / 2,
            this.y - this.animation.frameHeight / 2,
            displayWidth,
            displayHeight
        );

        // Draw messages above the player
        this.messages.forEach((msg, index) => {
            context.font = "16px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";

            // Adjust x position to be the player's x position
            const textX = this.x;

            // Draw text in the correct position
            context.fillText(msg.text, textX, this.y - 20 - index * 20);
        });
    }

    handleClick(x, y) {
        this.movement.setTarget(x, y);
    }

    addMessage(message) {
        const currentTime = Date.now();
        this.messages.push({ text: message, time: currentTime })
    }
}