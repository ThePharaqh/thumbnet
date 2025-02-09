async function updateFreelancerDisplay() {
    const userlist = document.getElementById('freelancer');
    try {
        const response = await fetch('http://localhost:5000/api/freeLancer/users');
        const users = await response.json();

        if (response.ok) {
            userlist.innerHTML = ''; // Clear any existing content
            users.forEach(user => {
                if (user.role === "seller") {
                    // Create the freelancer card
                    const freelancerCard = document.createElement("div");
                    freelancerCard.classList.add("freelancer-card");
                
                    // Add freelancer details and image
                    freelancerCard.innerHTML = `
                        <h3>${user.username}</h3>
                        <p>Role: ${user.role}</p>
                    `;
                
                    // Assign an ID to the card based on the freelancer's ID
                    freelancerCard.id = user.id;
                
                    // Attach click event listener to redirect to payment page
                    freelancerCard.addEventListener('click', () => {
                        // Serialize the freelancer data and encode it
                        const freelancerData = encodeURIComponent(JSON.stringify(user));
                        
                        // Redirect to payment.html with freelancer data as a query parameter
                        window.location.href = `./payment.html?data=${freelancerData}`;
                    });
                
                    // Append the card to the list
                    userlist.appendChild(freelancerCard);
                }
            });
        } else {
            console.error('Error fetching users:', users.error);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateFreelancerDisplay);
