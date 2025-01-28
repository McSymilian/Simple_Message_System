import {signIn} from './signIn.js';
import {signUp} from './signUp.js';
import {switchToRegisterForm, switchToLoginForm} from './switchForm.js';
import {validateInput} from "./inputValidation.js";


// Attach login event listener to submit button
export function attachLoginEventListener() {
    document.getElementById('login-form')
        .addEventListener('submit', async function (event) {
            event.preventDefault();

            let passedValidation = await validateInput();
            if (passedValidation) {
                const username = document.getElementsByClassName('input100')[0].value;
                const password = document.getElementsByClassName('input100')[1].value;

                await signIn(username, password);
            }
        });
}


// Attach register event listener to submit button
export function attachRegisterEventListener() {
    document.getElementById('register-form')
        .addEventListener('submit', async function (event) {
            event.preventDefault();

            let passedValidation = await validateInput();
            if (passedValidation) {

                const username = document.getElementsByClassName('input100')[0].value;
                const password = document.getElementsByClassName('input100')[1].value;
                // const confirm_password = document.getElementsByClassName('input100')[2].value;

                await signUp(username, password);

            }
        });
}


// Attach event listener to switch to register form
export function attachChangeToRegisterFormEventListener() {
    document.getElementById('signUpLink').addEventListener('click', function (event) {
        event.preventDefault();
        switchToRegisterForm();
    });
}


// Attach event listener to switch to log in form
export function attachChangeToLoginFormEventListener() {
    document.getElementById('loginLink').addEventListener('click', function(event) {
        event.preventDefault();
        switchToLoginForm();
    });
}