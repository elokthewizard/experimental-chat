export function drawShadow(context, player, displayWidth, displayHeight) {
    // Calculate shadow position and size
    const shadowWidth = displayWidth * 0.75; // Adjust width of shadow
    const shadowHeight = displayHeight * 0.2; // Adjust height of shadow
    const shadowX = player.x - shadowWidth / 2 - 1;
    const shadowY = player.y + displayHeight / 2 - shadowHeight / 2 - 8;

    // Draw the shadow as a semi-transparent ellipse
    context.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
    context.beginPath();
    context.ellipse(
        shadowX + shadowWidth / 2, 
        shadowY + shadowWidth / 2, 
        shadowWidth / 2,
        shadowHeight / 2, 
        0, 
        0, 
        Math.PI * 2
    );
    context.fill();
}

export function drawSprite(context, player, displayWidth, displayHeight) {
    const xOffset = player.animation.frameX * player.animation.frameWidth
    const yOffset = (player.animation.frameY * (player.animation.frameHeight + 7))

    const drawX = player.x - displayWidth / 2;
    const drawY = player.y - displayHeight / 2;

    context.drawImage(
        player.sprite,
        xOffset,
        yOffset,
        player.animation.frameWidth,
        player.animation.frameHeight,
        drawX,
        drawY,
        displayWidth,
        displayHeight
    );
}