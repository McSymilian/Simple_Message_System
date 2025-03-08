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
    addLogOutListener()

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

function addLogOutListener() {
    const logOutButton = document.getElementById('log-out-button');
    logOutButton.addEventListener('click', function () {
        window.location.href = "/logout";
    });
}