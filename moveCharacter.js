const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Define character properties
class PlayerCharacter {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.size = 50;
        this.speed = 5;
        this.targetX = 100;
        this.targetY = 100;
        this.moving = false;
    }
}

const player = new PlayerCharacter();

// Mouse click event listener
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    player.targetX = event.clientX - rect.left;
    player.targetY = event.clientY - rect.top;
    player.moving = true;
});

function update() {
    if (player.moving) {
        const dx = player.targetX - player.x;
        const dy = player.targetY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.speed) {
            player.x = player.targetX;
            player.y = player.targetY;
            player.moving = false;
        } else {
            player.x += (dx / distance) * player.speed;
            player.y += (dy / distance) * player.speed;
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);
    context.fillStyle = 'red';
    context.fillRect(
        player.x - player.size / 2, 
        player.y - player.size / 2, 
        player.size, 
        player.size);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();