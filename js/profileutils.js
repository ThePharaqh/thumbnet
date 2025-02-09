function updateProfileDisplay() {
    const userJson = sessionStorage.getItem('user');

    if (userJson) {
        const user = JSON.parse(userJson);
        document.getElementById('username-text').innerHTML = user.username;
        // Set profile picture if it exists, otherwise use default
        const profilePic = document.getElementById('profile-pic');
        if (user.profilePicture) {
            profilePic.src = user.profilePicture;
        } else {
            profilePic.src = './images/default-profile.png';
        }
         
        document.getElementById('login-button').style.display='none'
        document.getElementById('profile-container').style.display='block'

        // Add logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('user');
                window.location.href = 'index.html';
                });
            }

        // Add dropdown funtionality

    } else {
        document.getElementById('login-button').style.display='block'
        document.getElementById('profile-container').style.display='none'
    }
}

document.body.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        var loginModal = document.getElementById("login");
        var registerModal = document.getElementById("register");
        var registerOne = document.getElementById("reg1");
        var registerTwo = document.getElementById("reg2");

        if (loginModal) {
            var isLoginVisible = getComputedStyle(loginModal).display === 'flex';
            if (isLoginVisible) {
                loginModal.style.display = 'none';
            }
        }

        if (registerOne && registerTwo) {
            var isReg1Visible = getComputedStyle(registerOne).display === 'block';
            var isReg2Visible = getComputedStyle(registerTwo).display === 'block';

            if (isReg1Visible) {
                registerModal.style.display = 'none';
                registerOne.style.display = 'none';
                loginModal.style.display = 'flex';
            }

            if (isReg2Visible) {
                registerTwo.style.display = 'none';
                registerOne.style.display = 'block';
            }
        }
    }
});

