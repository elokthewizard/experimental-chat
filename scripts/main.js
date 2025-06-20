import { Player } from "./Player.js";
import { setUpMessageHandler, drawMessages } from "./MessageHandler.js";
import { createGameWorld, loadTexture, loadSprite, drawBackGround } from "./WorldHandler.js";
import { playerSprites } from "./Sprites.js";

console.log("Hello Chat!");

// Create game world
const { canvas, context } = createGameWorld();
let currentSprite = 0;

function loadPlayerSprite(index) {
    console.log("Loading Sprites...");
    const spritePath = playerSprites[index];
    return loadSprite(spritePath);
}

function changeSprite() {
    console.log("Changing sprite...")
    currentSprite = (currentSprite + 1) % playerSprites.length;
    sprite = loadPlayerSprite(currentSprite);
    sprite.onload = () => {
        player.sprite = sprite;
    }
}

const changeSpriteButton = document.createElement('button');
changeSpriteButton.innerText = 'Change Sprite';
changeSpriteButton.onclick = changeSprite;
document.body.append(changeSpriteButton);

let sprite = loadPlayerSprite(currentSprite);

// Load textures and sprites (Attribute Comp-3 Interactive and AxulArt from itch.io!)
const background = loadTexture('./grassBackground.png')

// Initialize player
const player = new Player(canvas);
player.sprite = sprite;

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
