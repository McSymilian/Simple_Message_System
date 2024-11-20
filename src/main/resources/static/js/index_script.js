// Login User
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:6942/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        // Handle the response
        if (response.ok) {
            const data = await response.text(); // Assuming the back-end returns a plain string
            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: 'Redirecting to dashboard...',
            }).then(() => {
                window.location.href = `/dashboard?uuid=${data}`;
            });
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
});

// Register User
document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('http://localhost:6942/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        // Handle the response
        if (response.ok) {
            const data = await response.text(); // Assuming the back-end returns a plain string
            Swal.fire({
                icon: 'success',
                title: 'Registration successful',
                text: 'Now you can login!',
            });
        } else {
            const errorMessage = await response.text();
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: errorMessage,
            });
            console.error('Registration failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during registration request:', error);
    }
});