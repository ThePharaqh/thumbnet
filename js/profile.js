// profile.js
document.addEventListener('DOMContentLoaded', () => {
    const userJson = sessionStorage.getItem('user');
    const profileInfo = document.getElementById('profile-info');

    if (!userJson) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(userJson);
    
    profileInfo.innerHTML = `
        <div class="profile-details">
            <h2>Username: ${user.username}</h2>
        </div>
        <div class="role">
            <h2>Role: ${user.role}</h2>
            <button class="profile-button" id="profile-button">
                Switch t
            </button>
        </div>
    `;
});

    
