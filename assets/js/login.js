document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation (you can add more complex validation if needed)
        if (username.toLowerCase() === 'admin' && password === 'password') { // Replace with actual validation logic
            const token = 'yourTokenValue'; // Generate a token or use a real authentication service
            sessionStorage.setItem('loginToken', token);
            sessionStorage.setItem('loginTimestamp', new Date().getTime());
            window.location.href = 'service.html';
        } else {
            alert('Invalid username or password');
        }
    });
});
