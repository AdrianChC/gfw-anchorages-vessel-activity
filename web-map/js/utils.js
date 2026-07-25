
// shared helper functions

// date format to en-GB
export function formatDate(dateString, options) {
    
    return new Intl.DateTimeFormat("en-GB", {
        ...options,
        // avoids convertion to local time zome (UTC -5)
        timeZone: "UTC"
    }).format(new Date(dateString));

}