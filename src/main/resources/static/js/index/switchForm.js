import {
    attachChangeToLoginFormEventListener,
    attachChangeToRegisterFormEventListener,
    attachLoginEventListener,
    attachRegisterEventListener
} from "./attachListener.js";
import {attachInputFocus} from "./inputValidation.js";


export function switchToRegisterForm() {
    const form = document.querySelector('.wrap-login100');

    loadRegisterForm(form)
}


// Change (back) document content to log in form and attach listeners
export function switchToLoginForm() {
    const form = document.querySelector('.wrap-login100');

    loadLoginForm(form)
}


function loadRegisterForm(form) {
    fetch('extraHTML/registerForm.html')
        .then(response => response.text())
        .then(html => {
            form.innerHTML = html;

            attachChangeToLoginFormEventListener();
            attachRegisterEventListener();
            attachInputFocus(jQuery);
        }).catch(error => {
        console.error('Error during fetching register form:', error)
    });
}


function loadLoginForm(form) {
    fetch('extraHTML/loginForm.html')
        .then(response => response.text())
        .then(html => {
            form.innerHTML = html;

            attachChangeToRegisterFormEventListener();
            attachLoginEventListener();
            attachInputFocus(jQuery);
        }).catch(error => {
        console.error('Error during fetching login form:', error)
    })
}