// Fetch username of Principal
export async function getPrincipalUsername() {
    const response = await fetch(`http://localhost:6942/getUsername`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        return await response.text();
    }
    return 'Not Found';
}