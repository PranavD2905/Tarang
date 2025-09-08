const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const iconClose = document.querySelector('.icon-close');

// Show login popup automatically when the page loads
window.addEventListener("load", () => {
    wrapper.classList.add('active-popup');
    
});

// Switch to Register form
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// Switch back to Login form
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Close popup
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');

});

const roleSelect = document.querySelector('.form-box.register select');

document.querySelector('.form-box.register form').addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedRole = roleSelect.value;

    if (!selectedRole) {
        alert("Please select a role: Buyer or Seller");
        return;
    }

    // Example: Just logging the role for now
    console.log("Selected Role:", selectedRole);

    // Later: You can send this role to your backend
});
