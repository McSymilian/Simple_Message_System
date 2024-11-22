
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


// Login User
document.getElementsByClassName('login100-form validate-form')[0]
    .addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementsByClassName('input100')[0].value;
        const password = document.getElementsByClassName('input100')[1].value;

        await signIn(username, password);
    });

// Register User
// document.getElementById('register-form')
//     .addEventListener('submit', async function(event) {
//         event.preventDefault();
//
//         const username = document.getElementById('register-username').value;
//         const password = document.getElementById('register-password').value;
//         const confirm_password = document.getElementById('register-confirm-password').value;
//
//         if (password !== confirm_password) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Registration failed',
//                 text: 'Passwords do not match',
//             });
//         } else {
//             await signUp(username, password);
//         }
//     });
