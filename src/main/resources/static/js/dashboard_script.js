const uuid = new URLSearchParams(window.location.search).get('uuid');

if (uuid) {
    function addMessage(sender, content, timestamp, sentByMe) {
        const messageContainer = document.getElementById('chat-messages');

        const messageElement = document.createElement('div');
        sentByMe ? messageElement.className = 'message message-sent' : messageElement.className = 'message message-received';

        const messageHeader = document.createElement('div');
        messageHeader.className = 'message-header';

        const messageSender = document.createElement('span');
        messageSender.className = 'message-sender';
        messageSender.textContent = sender;

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

    function scrollToBottom() {
        const chat_messages = document.getElementById('chat-messages');
        chat_messages.scrollTop = chat_messages.scrollHeight;
    }


    function getEnhancedTimestamp(message_date) {
        const elapsed = (new Date() - message_date)
        let timestamp;

        if (elapsed > 86_400_000) { // older than 24 hours
            timestamp = (message_date).toLocaleString();
        } else if (elapsed > 900_000) { // older 15 minutes
            const hours = String(message_date.getHours()).padStart(2, '0');
            const minutes = String(message_date.getMinutes()).padStart(2, '0');

            timestamp = message_date.toDateString() + ' ' + `${hours}:${minutes}`;
        } else if (elapsed > 60_000) { // older than 1 minute
            timestamp = `${Math.floor(elapsed / 60_000)} minutes ago`;
        } else {
            timestamp = 'Just now';
        }

        return timestamp;
    }

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
                }
            }, function(error) {
                console.error("Subscription error: " + error);
            });
        });

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
    });





} else {
    window.location.href = '/404';
}
