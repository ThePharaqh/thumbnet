// Check login status on every page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof updateProfileDisplay === 'function') {
        updateProfileDisplay();
    }
    if (typeof updateFreelancerDisplay === 'function') {
        updateFreelancerDisplay();
    }
    document.getElementById('usernameTakenStatus').style.display="none"
});
