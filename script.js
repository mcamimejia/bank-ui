const loginForm = document.getElementById('login-form');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const cancelBtn = document.getElementById('cancel-btn');
const logoutBtn = document.getElementById('logout-btn');
const welcomeMessage = document.getElementById('welcome-message');
const loginContainer = document.querySelector('.login-container');
const homeContainer = document.querySelector('.home-container');

function clearErrors() {
    usernameError.textContent = '';
    passwordError.textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const username = localStorage.getItem('username');
        loginContainer.style.display = 'none';
        homeContainer.style.display = 'block';
        welcomeMessage.textContent = `¡Bienvenido, ${username}!`;
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    clearErrors();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    if (username.length < 6) {
        usernameError.textContent = 'El nombre de usuario debe tener al menos 6 caracteres.';
        isValid = false;
    }

    if (password.length < 6) {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        isValid = false;
    }

    if (isValid) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        loginContainer.style.display = 'none';
        homeContainer.style.display = 'block';
        welcomeMessage.textContent = `¡Bienvenido, ${username}!`;
    }
});

cancelBtn.addEventListener('click', () => {
    loginForm.reset();
    clearErrors();
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    loginContainer.style.display = 'block';
    homeContainer.style.display = 'none';
});