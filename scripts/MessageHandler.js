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

    // Message display
    function displayMessage(player, message) {
        player.addMessage(message)
    }
}