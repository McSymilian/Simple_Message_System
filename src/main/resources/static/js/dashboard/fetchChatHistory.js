import {getEnhancedTimestamp} from "./enhancedTimestamp.js";
import {addMessage, scrollToBottom} from "./addMessage.js";

// Fetch chat history and display in chat
export async function fetchChatHistory(username) {
    const response = await fetch('http://localhost:6942/chat_history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const chat_history = await response.json();
        for (const message of chat_history) {
            const timestamp = getEnhancedTimestamp(new Date(message.timestamp));

            if (message.username === username) {
                addMessage('You', message.content, timestamp, true);
            } else {
                addMessage(message.username, message.content, timestamp, false);
            }
        }
        scrollToBottom();
    }
}