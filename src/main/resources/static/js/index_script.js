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
document.getElementById('login-form')
    .addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        await signIn(username, password);
    });

// Register User
document.getElementById('register-form')
    .addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirm_password = document.getElementById('register-confirm-password').value;

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
