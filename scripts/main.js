import { Player } from "./Player.js";
import { setUpMessageHandler } from "./MessageHandler.js";
import { createGameWorld, loadTexture, loadSprite, drawBackGround } from "./WorldHandler.js";

// Create game world
const { canvas, context } = createGameWorld();

// Load textures (Attribute Comp-3 Interactive for tilesheet!)
const background = loadTexture('../assets/grassBackground.png')

// Load spritesheet (dont forget to attribute AxulArt from itch.io)
const sprite = loadSprite('../assets/testPlayerSprites.png');

// Initialize player
const player = new Player(canvas, sprite);

// Setup message handling
setUpMessageHandler(player);

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackGround(context, canvas, background)
    player.update();
    player.draw(context);
    requestAnimationFrame(gameLoop);
}

// start game when sprites are loaded
sprite.onload = () => {
    gameLoop();
}
