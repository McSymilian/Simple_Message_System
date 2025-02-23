// Login url endpoint
const signInUrl = 'http://localhost:6942/login';

// Sign in function
export async function signIn(username, password) {
    try {
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
            credentials: "include",
        });

        if (response.status === 200) {
            window.location.href = "/dashboard";
        } else {
            const errorMessage = await response.json();
            Swal.fire({
                icon: "error",
                title: "Login failed",
                text: errorMessage.error,
            });
        }
    } catch (error) {
        console.error("Error during login request:", error);
    }
}
