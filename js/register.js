// Sends queries to backend
async function registerUser(name, email, username, password, confirmPassword) {
    console.log("Sending: "+name+", "+email+", "+username+", "+password+", "+confirmPassword)
    if (password === confirmPassword) {

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data.message);
                alert('Registration successful!');
                document.getElementById('register').style.display='none'; // Hides register modal
                document.getElementById('reg2').style.display='none';
                document.getElementById('login').style.display='block'; // Shows login modal
            } else {
                console.error('Registration Error:', data.error || 'Unknown error');
                alert(`Error: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration');
        }
    }

    else {
        console.log('Passwords do not match')
        alert('Password do not match')
    };
}

// Checks for duplicate names
var cachedUsernames = [];
async function cacheUsernames() {
    try {
        const response = await fetch('http://localhost:5000/api/freeLancer/users')
        const users = await response.json()
    

        if (response.ok) {
            cachedUsernames = users.map(user => user.username);
            console.log('Cached usernames:', cachedUsernames);
        } else {
            console.error('Error fetching users for cache:', users.error);
        }
    } catch (error) {
        console.error('Error caching usernames:', error);
    }
}

const registerButton = document.getElementById('registerButton')
registerButton.addEventListener('click', () => {
    cacheUsernames()
});

const nextButton = document.getElementById('nextButton')
nextButton.addEventListener('click', () => {
    const takenUsernames = cachedUsernames;
    const usernameElement = document.getElementById('registerUsername')
    console.log("taken usernames: " + takenUsernames);
    const usernameToCheck = usernameElement.value.toLowerCase();
    if (takenUsernames.map(username => username.toLowerCase()).includes(usernameToCheck)) {  document.getElementById('usernameTakenStatus').style.display="block"
    }
    else {
        console.log("username available")
        document.getElementById('reg1').style.display='none';
        document.getElementById('usernameTakenStatus').style.display="none";
        document.getElementById('reg2').style.display='block';
    }
});

// Defines queries
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    
    if (form) {
        console.log('Adding submit listener to form');
        form.addEventListener('submit', async (e) => {
            console.log('Form submitted');
            e.preventDefault();

            const nameElement = document.getElementById('registerName');
            const emailElement = document.getElementById('registerEmail');
            const usernameElement = document.getElementById('registerUsername');
            const passwordElement = document.getElementById('registerPassword');
            const confirmPasswordElement = document.getElementById('registerConfirmPassword')

            if (!nameElement || !usernameElement || !passwordElement || !emailElement) {
                alert('Form elements not found');
                return;
            }
            
            const name = nameElement.value;
            const email = emailElement.value.trim();
            const username = usernameElement.value.trim();
            const password = passwordElement.value;
            const confirmPassword = confirmPasswordElement.value;
            
            
            if (!name || !username || !password || !emailElement) {
                alert('Please fill in all fields');
                return;
            }
            
            await registerUser(name, email, username, password, confirmPassword);
        });
    }
});