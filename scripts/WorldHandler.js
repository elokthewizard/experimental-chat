export function createGameWorld() {
    // Create game world
    const canvas = document.getElementById('gameCanvas');
    canvas.width = 800;
    canvas.height = 450;
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;

    return { canvas, context }
}

export function loadTexture(src) {
    const image = new Image();
    image.src = src;
    return image;
}

export function loadSprite(src) {
    const sprite = new Image();
    sprite.src = src;
    return sprite;
}

export function drawBackGround(context, canvas, background) {
    const desiredWidth = background.width / 2; 
    const desiredHeight = background.height / 2;

    // Calculate the position to center the image on the canvas
    const x = (canvas.width - desiredWidth) / 2; 
    const y = (canvas.height - desiredHeight) / 2; 

    // Draw the image so it "hangs off" the edges 
    context.drawImage(background, x, y, desiredWidth, desiredHeight);
}