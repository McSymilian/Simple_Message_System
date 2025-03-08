import {getPrincipalUsername} from "./getPrincipalUsername.js";
import {fetchChatHistory} from "./fetchChatHistory.js";
import {connectToChatSocket} from "./socketHandling.js";
import {sendMessage} from "./sendMessage.js";

// Fetch username of the Principal
const username = await getPrincipalUsername();

if (document.readyState !== 'loading') {
    await initPage();
} else {
    document.addEventListener('DOMContentLoaded', async function () {
        await initPage();
    });
}

async function initPage() {
    insertUsername(username);
    attachListeners();

    await fetchChatHistory(username);

    const socket = new SockJS('/sms_ws');
    const stompClient = Stomp.over(socket);

    await connectToChatSocket(stompClient, username);

    await sendMessage(stompClient);
}



function insertUsername(username) {
    const usernameElement = document.getElementById('username-insert');
    usernameElement.textContent = "Welcome, " + username + "!";
}

function attachListeners() {
    addLogOutListener();
    addInputListener();
    addSubmitByEnterListener();
}

function addLogOutListener() {
    const logOutButton = document.getElementById('log-out-button');
    logOutButton.addEventListener('click', function () {
        window.location.href = "/logout";
    });
}

function addInputListener() {
    const textarea = document.getElementById('message-input');

    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight - 30) + 'px';
    });
}

function addSubmitByEnterListener() {
    document.getElementById('message-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            document.getElementById('send-button').click();
        }
    });
}