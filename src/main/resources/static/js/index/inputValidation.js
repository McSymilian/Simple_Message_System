export function attachInputValidation($) {
    "use strict";

    // Focus view and raise label if input is not empty
    $('.input100').each(function(){
        $(this).on('blur', function (){
            if($(this).val().trim() !== "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
        if($(this).val().trim() !== "") {
            $(this).addClass('has-val');
        }
    })

    // Validate input
    let input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        let check = true;

        for(let i=0; i<input.length; i++) {
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
        if($(input).attr('name') === 'username') {
            if($(input).val().trim() === '') {
                $(input).parent().attr('data-validate', 'Username is required');
                return false;
            }
            else if ($(input).val().trim().match(/@/)) {
                $(input).parent().attr('data-validate', 'Don\'t use \"@\" in username');
                return false;
            }
        } else if ($(input).attr('name') === 'pass') {
            if ($(input).val().trim().length < 6) {
                return false;
            }
        } else if ($(input).attr('name') === 'confirm-pass') {
            const passContent = $('input[name="pass"]').val().trim();
            if ($(input).val().trim() !== passContent) {
                return false;
            }
        }
        return true;
    }

    function showValidate(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    // Show or hide password
    let showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass === 0) {
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