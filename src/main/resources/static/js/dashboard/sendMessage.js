import {sendMessageViaSocket} from "./socketHandling.js";
import {addMessage, scrollToBottom} from "./addMessage.js";
import {getEnhancedTimestamp} from "./enhancedTimestamp.js";

// Submit and send message
export async function sendMessage(stompClient) {
    document.getElementsByClassName('chat-input')[0].addEventListener('submit', async function(event) {
        event.preventDefault();

        const input_content = document.getElementById('message-input').value;
        if (input_content) {
            await sendMessageViaSocket(stompClient, input_content);

            addMessage('You', input_content, getEnhancedTimestamp(new Date()), true);
            document.getElementById('message-input').value = '';
            scrollToBottom();
        }
    });

    document.getElementById('message-input').setAttribute('autocomplete', 'off');
}