const uuid = new URLSearchParams(window.location.search).get('uuid');

if (uuid) {
    function addMessage(sender, content, timestamp) {
        const messageContainer = document.getElementById('chat-messages');

        const messageElement = document.createElement('div');
        messageElement.className = 'message';

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


    document.addEventListener('DOMContentLoaded', async function(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:6942/chat_history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const chat_history = await response.json();
            for (const message of chat_history) {
                const name = message.senderUUID === uuid ? 'You' : await getUsernameByUUID(message.senderUUID);
                addMessage(name, message.content, message.timestamp);
            }
        }

        const socket = new SockJS('/sms_ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function(frame) {
            console.log("Connected: " + frame);

            stompClient.subscribe('/sms/chat', async function(messageOutput) {
                const message = JSON.parse(messageOutput.body);
                if (message.senderUUID !== uuid) {
                    const name = await getUsernameByUUID(message.senderUUID);
                    addMessage(name, message.content, message.timestamp);
                }
            }, function(error) {
                console.error("Subscription error: " + error);
            });
        });

        document.getElementsByClassName('chat-input')[0].addEventListener('submit', async function(event) {
            event.preventDefault();

            const input_content = document.getElementById('message-input').value;

            const chatMessage = {
                senderUUID: uuid,
                content: input_content,
                timestamp: new Date().toISOString()
            };

            stompClient.send('/app/messages', {}, JSON.stringify(chatMessage));

            addMessage('You', input_content, new Date().toISOString());

            document.getElementById('message-input').value = '';
        });
    });



} else {
    window.location.href = '/404';
}