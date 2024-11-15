export class MovementHandler {
    constructor(speed, canvas) {
        this.speed = speed; 
        this.targetX = 100; 
        this.targetY = 100; 
        this.moving = false; 
        this.mouseX = 0;
        this.mouseY = 0;

        // Track mouse position
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;
        });

        // Mouse click event listener
        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            this.targetX = event.clientX - rect.left;
            this.targetY = event.clientY - rect.top;
            this.setTarget(this.targetX, this.targetY);
        });
    }

    getMousePosition() {
        return { x: this.mouseX, y: this.mouseY}
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