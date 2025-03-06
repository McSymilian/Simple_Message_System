import {addMessage, scrollToBottom} from "./addMessage.js";
import {getEnhancedTimestamp} from "./enhancedTimestamp.js";

// Connect to chat socket
// Add incoming messages to chat
export async function connectToChatSocket(stompClient, username) {
    stompClient.connect({}, function(frame) {
        console.log("Connected: " + frame);

        stompClient.subscribe('/sms/chat', async function(messageOutput) {
            const message = JSON.parse(messageOutput.body);
            if (message.username !== username) {
                addMessage(message.username, message.content, getEnhancedTimestamp(message.timestamp));
                scrollToBottom();
            }
        }, function(error) {
            console.error("Subscription error: " + error);
        });
    });
}

// Send message via socket
export async function sendMessageViaSocket(stompClient, input_content) {
    const chatMessage = {
        content: input_content,
    };

    stompClient.send('/app/messages', {}, JSON.stringify(chatMessage));
}