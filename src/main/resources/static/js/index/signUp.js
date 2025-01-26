import {signIn} from './signIn.js';

// Signup url endpoint
const signUpUrl = 'http://localhost:6942/signUp';

// User sign up function
export async function signUp(username, password) {
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