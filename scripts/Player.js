import { MovementHandler } from "./MovementHandler.js";
import { Animator } from "./Animator.js";
import { drawShadow, drawSprite } from "./DrawHelpers.js";

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
        this.messages = this.messages.filter(
            msg => currentTime - msg.time < this.messageDuration
        )
    }
    
    draw(context) {
        // Calculate centered position
        const displayWidth = this.animation.frameWidth * this.scale;
        const displayHeight = this.animation.frameHeight * this.scale;

        drawShadow(context, this, displayWidth, displayHeight);
        drawSprite(context, this, displayWidth, displayHeight);
    }

    handleClick(x, y) {
        this.movement.setTarget(x, y);
    }

    addMessage(message) {
        const currentTime = Date.now();
        this.messages.push({ text: message, time: currentTime })
    }
}