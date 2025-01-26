// Login url endpoint
const signInUrl = 'http://localhost:6942/signIn';

// Sign in function
export async function signIn(username, password) {
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