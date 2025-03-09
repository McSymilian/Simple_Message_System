import {sendMessageViaSocket} from "./socketHandling.js";
import {addMessage, scrollToBottom} from "./addMessage.js";
import {getEnhancedTimestamp} from "./enhancedTimestamp.js";

// Submit and send message
export async function sendMessage(stompClient) {
    let input = document.getElementsByClassName('chat-input')[0];
    input.addEventListener('submit', async function(event) {
        event.preventDefault();

        const input_content = document.getElementById('message-input').value.trim();
        if (!validateInput(input_content)) {
            input.classList.add('alert-validate');
            attachListeners(input);

            return;
        }

        document.getElementById('message-input').style.height = '20px';

        if (input_content) {
            await sendMessageViaSocket(stompClient, input_content);

            addMessage('You', input_content, getEnhancedTimestamp(new Date()), true);
            document.getElementById('message-input').value = '';
            scrollToBottom();
        }
    });

    document.getElementById('message-input').setAttribute('autocomplete', 'off');
}

function validateInput(input_content) {
    return !(input_content.length > 2000 || input_content.length === 0);
}

function attachListeners(input) {
    input.addEventListener('change', function() {
        input.classList.remove('alert-validate');
    });
    input.addEventListener('click', function() {
        input.classList.remove('alert-validate');
    });
}