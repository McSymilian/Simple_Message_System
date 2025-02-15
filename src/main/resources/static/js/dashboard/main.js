import {getEnhancedTimestamp} from './enhancedTimestamp.js';

// Extract user uuid from url
const uuid = new URLSearchParams(window.location.search).get('uuid');

if (uuid) {
    // Add and display message in chat
    function addMessage(sender, content, timestamp, sentByMe) {
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
        messageContent.textContent = content;

        messageElement.appendChild(messageHeader);
        messageElement.appendChild(messageContent);

        messageContainer.appendChild(messageElement);
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        const chat_messages = document.getElementById('chat-messages');
        chat_messages.scrollTop = chat_messages.scrollHeight;
    }


    // Fetch username by uuid
    async function getUsernameByUUID(uuid) {
        const response = await fetch(`http://localhost:6942/getUsername?uuid=${uuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.text();
        }
    }


    // Fetch chat history for given uuid and connect to websocket
    document.addEventListener('DOMContentLoaded', async function() {
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

                if (message.senderUUID === uuid) {
                    addMessage('You', message.content, timestamp, true);
                } else {
                    addMessage(await getUsernameByUUID(message.senderUUID), message.content, timestamp, false);
                }
            }
            scrollToBottom();
        }

        const socket = new SockJS('/sms_ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function(frame) {
            console.log("Connected: " + frame);

            stompClient.subscribe('/sms/chat', async function(messageOutput) {
                const message = JSON.parse(messageOutput.body);
                if (message.senderUUID !== uuid) {
                    const name = await getUsernameByUUID(message.senderUUID);
                    addMessage(name, message.content, getEnhancedTimestamp(message.timestamp));
                    scrollToBottom();
                }
            }, function(error) {
                console.error("Subscription error: " + error);
            });
        });

        // Submit and send message
        document.getElementsByClassName('chat-input')[0].addEventListener('submit', async function(event) {
            event.preventDefault();

            const input_content = document.getElementById('message-input').value;
            if (input_content) {
                const chatMessage = {
                    senderUUID: uuid,
                    content: input_content,
                    timestamp: new Date().toISOString()
                };

                stompClient.send('/app/messages', {}, JSON.stringify(chatMessage));

                addMessage('You', input_content, getEnhancedTimestamp(new Date()), true);

                document.getElementById('message-input').value = '';
                scrollToBottom();
            }
        });
        // Disable autocomplete for the message input field
        document.getElementById('message-input').setAttribute('autocomplete', 'off');
    });

    // Redirect to 404 if not found user
} else {
    window.location.href = '/404';
}
