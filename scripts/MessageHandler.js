export function setUpMessageHandler(player) {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');

    // Listen for click of 'send' button
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            displayMessage(player, message);
            messageInput.value = '';
        }
    });

    // Allow return key to send message
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (messageInput.value.trim() !== "") {
                event.preventDefault();
                sendButton.click();
            }
        }
    });
}

// Message display
export function displayMessage(player, message) {
    player.addMessage(message)
}

// Draw messages above the player
export function drawMessages(player, context) {
    player.messages.forEach((msg, index) => {
        context.save();

        context.font = "10px 'Press Start 2P'";
        context.fillStyle = "white";
        context.textAlign = "center";

        // Set shadow properties 
        context.shadowColor = 'rgba(0, 0, 0, 1)'; // Semi-transparent black 
        context.shadowOffsetX = 2; // Horizontal shadow offset 
        context.shadowOffsetY = 2; // Vertical shadow offset 

        // Adjust x position to be the player's x position
        const textX = player.x;

        // Draw text in the correct position
        context.fillText(msg.text, textX, player.y - 25 - index * 20);

        context.restore();
    });
}