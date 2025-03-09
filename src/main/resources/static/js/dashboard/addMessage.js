// Add and display message in chat
export function addMessage(sender, content, timestamp, sentByMe) {
    const messageContainer = document.getElementById('chat-messages');

    const messageElement = document.createElement('div');
    sentByMe ? messageElement.className = 'message message-sent' : messageElement.className = 'message message-received';

    const messageHeader = document.createElement('div');
    messageHeader.className = 'message-header';

    const messageSender = document.createElement('span');
    messageSender.className = 'message-sender';
    messageSender.textContent = "@" +sender;

    const messageTimestamp = document.createElement('span');
    messageTimestamp.className = 'message-timestamp';
    messageTimestamp.textContent = timestamp;

    messageHeader.appendChild(messageSender);
    messageHeader.appendChild(messageTimestamp);

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = content.replace(/\n/g, '<br>');

    messageElement.appendChild(messageHeader);
    messageElement.appendChild(messageContent);

    messageContainer.appendChild(messageElement);
}

// Scroll to bottom of chat
export function scrollToBottom() {
    const chat_messages = document.getElementById('chat-messages');
    chat_messages.scrollTop = chat_messages.scrollHeight;
}