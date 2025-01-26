function attachInputValidation($) {
    "use strict";

    // Focus view and raise label if input is not empty
    $('.input100').each(function(){
        $(this).on('blur', function (){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
        if($(this).val().trim() != "") {
            $(this).addClass('has-val');
        }
    })

    // Validate input
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(! validate(input[i])){
                showValidate(input[i]);
                check=false;
            }
        }
        window.formValidationResult = check

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-.]+)@(([a-zA-Z0-9\-]+\.)+)([a-zA-Z]{1,5})$/) == null) {
                return false;
            }
        } else if ($(input).attr('name') == 'pass') {
            if ($(input).val().trim().length < 6) {
                return false;
            }
        } else if ($(input).attr('name') == 'confirm-pass') {
            const passContent = $('input[name="pass"]').val().trim();
            if ($(input).val().trim() !== passContent) {
                return false;
            }
        }
        return true;
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    // Show or hide password
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


}

// Url endpoints
const signInUrl = 'http://localhost:6942/signIn';
const signUpUrl = 'http://localhost:6942/signUp';

// User sign in function
async function signIn(username, password) {
    try {
        const response = await fetch(signInUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            const data = await response.text();
            window.location.href = `/dashboard?uuid=${data}`;
        } else {
            const errorMessage = await response.text();
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: errorMessage,
            });
            console.error('Login failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during login request:', error);
    }
}

// User sign up function
async function signUp(username, password) {
    try {
        const response = await fetch(signUpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registration successful',
                text: 'Now you can login!',
            }).then(() => {
                signIn(username, password);
            });
        } else {
            const errorMessage = await response.text();
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: errorMessage,
            });
        }
    } catch (error) {
        console.error('Error during registration request:', error);
    }
}


// When page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Attach login event listener to submit button
    function attachLoginEventListener() {
        document.getElementById('login-form')
            .addEventListener('submit', async function (event) {
                event.preventDefault();

                if (window.formValidationResult) {
                    const username = document.getElementsByClassName('input100')[0].value;
                    const password = document.getElementsByClassName('input100')[1].value;

                    await signIn(username, password);
                }
            });
    }

    // Attach register event listener to submit button
    function attachRegisterEventListener() {
        document.getElementById('register-form')
            .addEventListener('submit', async function (event) {
                event.preventDefault();

                if (window.formValidationResult) {

                    const username = document.getElementsByClassName('input100')[0].value;
                    const password = document.getElementsByClassName('input100')[1].value;
                    const confirm_password = document.getElementsByClassName('input100')[2].value;

                    if (password !== confirm_password) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Registration failed',
                            text: 'Passwords do not match',
                        });
                    } else {
                        await signUp(username, password);
                    }
                }
            });
    }

    let loginFormInnerHtml = document.querySelector('.wrap-login100').innerHTML;

    // Attach event listener to switch to register form
    function attachChangeToRegisterFormEventListener() {
        document.getElementById('signUpLink').addEventListener('click', function (event) {
            event.preventDefault();
            switchToRegisterForm();
        });
    }

    // Attach event listener to switch to login form
    function attachChangeToLoginFormEventListener() {
        document.getElementById('loginLink').addEventListener('click', function(event) {
            event.preventDefault();
            switchToLoginForm();
        });
    }

    // Change document content to register form and attach listeners
    function switchToRegisterForm() {
        const form = document.querySelector('.wrap-login100');
        fetch('registerForm.html')
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

    // Change (back) document content to login form and attach listeners
    function switchToLoginForm() {
        const form = document.querySelector('.wrap-login100');
        form.innerHTML = loginFormInnerHtml;
        attachChangeToRegisterFormEventListener();
        attachLoginEventListener();
        attachInputValidation(jQuery);

    }

    // When page is loaded attach listeners
    attachChangeToRegisterFormEventListener();
    attachLoginEventListener();
    attachInputValidation(jQuery);
});