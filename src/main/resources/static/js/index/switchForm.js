import {
    attachChangeToLoginFormEventListener,
    attachChangeToRegisterFormEventListener,
    attachLoginEventListener,
    attachRegisterEventListener
} from "./attachListener.js";
import {attachInputValidation} from "./inputValidation.js";


let loginFormInnerHtml = document.querySelector('.wrap-login100').innerHTML;

export function switchToRegisterForm() {
    const form = document.querySelector('.wrap-login100');
    fetch('extraHTML/registerForm.html')
        .then(response => response.text())
        .then(html => {
            form.innerHTML = html;
            attachChangeToLoginFormEventListener();
            attachRegisterEventListener();
            attachInputValidation(jQuery);
        }).catch(error => {
        console.error('Error during fetching register form:', error)
    });


}

// Change (back) document content to log in form and attach listeners
export function switchToLoginForm() {
    const form = document.querySelector('.wrap-login100');
    form.innerHTML = loginFormInnerHtml;
    attachChangeToRegisterFormEventListener();
    attachLoginEventListener();
    attachInputValidation(jQuery);

}