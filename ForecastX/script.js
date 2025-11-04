// --- 1. CHECK LOGIN STATUS ON PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

function checkLoginStatus() {
    const token = localStorage.getItem('userToken');
    // ** UPDATED: Find the auth-buttons in the navbar **
    const authButtons = document.querySelector('.navbar .auth-buttons'); 
    
    // If authButtons doesn't exist, stop
    if (!authButtons) return;

    if (token) {
        // User is LOGGED IN
        authButtons.innerHTML = `
            <a href="settings.html" class="btn btn-icon" title="Profile & Settings">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </a>
            <a href="#" id="logout-btn" class="btn btn-secondary">Logout</a>
        `;
        
        // Add event listener for the new logout button
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userToken'); // Clear the token
            localStorage.removeItem('userEmail'); // Clear the email
            window.location.reload(); // Refresh the page
        });

    } else {
        // User is LOGGED OUT
        authButtons.innerHTML = `
            <a href="login.html" class="btn btn-primary">Sign In</a>
            <a href="register.html" class="btn btn-secondary">Register</a>
        `;
        
        // Add listeners for the login/register buttons
        authButtons.querySelector('.btn-primary').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "login.html";
        });
        authButtons.querySelector('.btn-secondary').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "register.html";
        });
    }
}


// --- 2. SEARCH LOGIC ---
document.querySelector('.search-button').addEventListener('click', () => {
    const location = document.querySelector('.search-bar').value;
    if (location) {
        window.location.href = `dashboard.html?location=${encodeURIComponent(location)}`;
    } else {
        alert('Please enter a location to search.');
    }
});

// Also allow search on pressing Enter
document.querySelector('.search-bar').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('.search-button').click();
    }
});