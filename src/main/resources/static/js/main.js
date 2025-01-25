
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    // $('.validate-form').on('submit',function(){
    //     var check = true;
    //
    //     for(var i=0; i<input.length; i++) {
    //         if(validate(input[i]) == false){
    //             showValidate(input[i]);
    //             check=false;
    //         }
    //     }
    //
    //     return check;
    // });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
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


})(jQuery);



const signInUrl = 'http://localhost:6942/signIn';
const signUpUrl = 'http://localhost:6942/signUp';

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


document.addEventListener('DOMContentLoaded', function() {
    function attachLoginEventListener() {
        document.getElementById('login-form')
            .addEventListener('submit', async function (event) {
                event.preventDefault();

                const username = document.getElementsByClassName('input100')[0].value;
                const password = document.getElementsByClassName('input100')[1].value;

                await signIn(username, password);
            });
    }

    function attachRegisterEventListener() {
        document.getElementById('register-form')
            .addEventListener('submit', async function (event) {
                event.preventDefault();

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
            });
    }

    let loginFormInnerHtml = document.querySelector('.wrap-login100').innerHTML;

    function attachChangeToRegisterFormEventListener() {
        document.getElementById('signUpLink').addEventListener('click', function (event) {
            event.preventDefault();
            switchToRegisterForm();
        });
    }

    function attachChangeToLoginFormEventListener() {
        document.getElementById('loginLink').addEventListener('click', function(event) {
            event.preventDefault();
            switchToLoginForm();
        });
    }

    function switchToRegisterForm() {
        const form = document.querySelector('.wrap-login100');
        form.innerHTML = `
            <form class="login100-form validate-form" id="register-form">
                <span class="login100-form-title p-b-26">
                    Register
                </span>
                <span class="login100-form-title p-b-48">
                    <i class="zmdi zmdi-cloud-outline"></i>
                </span>

                <div class="wrap-input100 validate-input" data-validate="Enter username">
                    <input class="input100" type="text" name="username">
                    <span class="focus-input100" data-placeholder="Username"></span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="Enter password">
                    <span class="btn-show-pass">
                        <i class="zmdi zmdi-eye"></i>
                    </span>
                    <input class="input100" type="password" name="pass">
                    <span class="focus-input100" data-placeholder="Password"></span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="Confirm password">
                    <span class="btn-show-pass">
                        <i class="zmdi zmdi-eye"></i>
                    </span>
                    <input class="input100" type="password" name="confirm-pass">
                    <span class="focus-input100" data-placeholder="Confirm Password"></span>
                </div>

                <div class="container-login100-form-btn">
                    <div class="wrap-login100-form-btn">
                        <div class="login100-form-bgbtn"></div>
                        <button type="submit" class="login100-form-btn">
                            Register
                        </button>
                    </div>
                </div>

                <div class="text-center p-t-50">
                    <span class="txt1">
                        Already have an account?
                    </span>
                    <a class="txt2" href="" id="loginLink">
                        Login
                    </a>
                </div>
            </form>
        `;
        attachChangeToLoginFormEventListener();
        attachRegisterEventListener();
    }


    function switchToLoginForm() {
        const form = document.querySelector('.wrap-login100');
        form.innerHTML = loginFormInnerHtml;
        attachChangeToRegisterFormEventListener();
        attachLoginEventListener();
    }

    attachChangeToRegisterFormEventListener();
    attachLoginEventListener();
});