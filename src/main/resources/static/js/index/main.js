import {attachInputValidation} from './inputValidation.js';
import {
    attachChangeToRegisterFormEventListener,
    attachLoginEventListener,}
    from './attachListener.js';


// When page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Attach starting listeners
    attachChangeToRegisterFormEventListener();
    attachLoginEventListener();
    attachInputValidation(jQuery);
});