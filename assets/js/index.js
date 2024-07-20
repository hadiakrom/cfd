// Function to check login status every 60 seconds and expire the token after 60 minutes of inactivity
function checkLogin() {
    // Retrieve the login token and its timestamp from session storage
    const token = sessionStorage.getItem('loginToken');
    const tokenTimestamp = sessionStorage.getItem('loginTimestamp');

    // Check if both token and timestamp exist
    if (token && tokenTimestamp) {
        const currentTime = new Date().getTime();
        const lastActivity = parseInt(tokenTimestamp);
        const oneHour = 60 * 60 * 1000; // One hour in milliseconds

        // If the token is expired due to inactivity, remove it
        if (currentTime - lastActivity >= oneHour) {
            sessionStorage.removeItem('loginToken');
            sessionStorage.removeItem('loginTimestamp');
            window.location.href = 'pages/login.html';
        }
    } else {
        // If no valid token is found, navigate to login.html
        window.location.href = 'pages/login.html';
    }
}

// Function to reset the activity timer
function resetActivityTimer() {
    document.addEventListener('mousemove', updateTimestamp);
    document.addEventListener('keypress', updateTimestamp);
}

// Function to update the timestamp in session storage
function updateTimestamp() {
    sessionStorage.setItem('loginTimestamp', new Date().getTime());
}

// Set up event listeners to update the timestamp on user activity
window.onload = function() {
    checkLogin();
    resetActivityTimer();
    // Run checkLogin() every minute (60000 milliseconds)
    setInterval(checkLogin, 60000);
};
