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

// Example: Connect to backend for login
if (document.querySelector('.form-box.login form')) {
    document.querySelector('.form-box.login form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.querySelector('.form-box.login input[type="email"]').value;
        const password = document.querySelector('.form-box.login input[type="password"]').value;
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Login successful!');
                // Save token, redirect, etc.
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            alert('Error connecting to backend');
        }
    });
}

// Example: Connect to backend for register
if (document.querySelector('.form-box.register form')) {
    document.querySelector('.form-box.register form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('.form-box.register input[type="text"]').value;
        const email = document.querySelector('.form-box.register input[type="email"]').value;
        const password = document.querySelector('.form-box.register input[type="password"]').value;
        const roleSelect = document.querySelector('.form-box.register select');
        const role = roleSelect ? roleSelect.value : '';
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Registration successful!');
                // Save token, redirect, etc.
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            alert('Error connecting to backend');
        }
    });
}
