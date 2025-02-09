
// Login Function
async function loginUser(username, password) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful');
            
            // Store user session data
            if (data.user) {
                sessionStorage.setItem('user', JSON.stringify(data.user));

                
                if (typeof updateProfileDisplay === 'function') {
                    updateProfileDisplay();
                }
            }

            alert('Login successful!');
            window.location.href = './index.html';
        } else {
            console.error('Login failed:', data.error);
            alert(data.error || 'Login failed. Please try again.');
        }

    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again. (Did you forget to run server.js?');
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // This is crucial - prevents default form submission
            
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            await loginUser(username, password);
        });
    }
});