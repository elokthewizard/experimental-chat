import { Player } from "./Player.js";
import { setUpMessageHandler, drawMessages } from "./MessageHandler.js";
import { createGameWorld, loadTexture, loadSprite, drawBackGround } from "./WorldHandler.js";

// Create game world
const { canvas, context } = createGameWorld();

// Load textures and sprites (Attribute Comp-3 Interactive and AxulArt from itch.io!)
const background = loadTexture('../assets/grassBackground.png')
const sprite = loadSprite('../assets/testPlayerSprites.png');

// Initialize player
const player = new Player(canvas, sprite);

// Setup message handling
setUpMessageHandler(player, context);

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackGround(context, canvas, background)
    player.update();
    player.draw(context);
    drawMessages(player, context);
    requestAnimationFrame(gameLoop);
}

// start game when sprites are loaded
sprite.onload = () => {
    gameLoop();
}
