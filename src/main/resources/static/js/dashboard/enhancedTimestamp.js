// Get precise timestamp of message
export function getEnhancedTimestamp(message_date) {
    const elapsed = (new Date() - message_date)
    let timestamp;

    if (elapsed > 86_400_000) { // older than 24 hours
        timestamp = (message_date).toLocaleString();
    } else if (elapsed > 900_000) { // older 15 minutes
        const hours = String(message_date.getHours()).padStart(2, '0');
        const minutes = String(message_date.getMinutes()).padStart(2, '0');

        timestamp = message_date.toDateString() + ' ' + `${hours}:${minutes}`;
    } else if (elapsed > 60_000) { // older than 1 minute
        timestamp = `${Math.floor(elapsed / 60_000)} minutes ago`;
    } else {
        timestamp = 'Just now';
    }

    return timestamp;
}