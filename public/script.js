document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const accountActionForm = document.getElementById('account-action-form');
    const loader = document.getElementById('loader');

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            loader.classList.remove('hidden');

            setTimeout(() => {
                signupForm.submit();
            }, 3000); // Retraso de 3 segundos para probar el loader
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            loader.classList.remove('hidden');

            setTimeout(() => {
                loginForm.submit();
            }, 3000); // Retraso de 3 segundos para probar el loader
        });
    }

    if (accountActionForm) {
        accountActionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            loader.classList.remove('hidden');

            setTimeout(() => {
                accountActionForm.submit();
            }, 3000); // Retraso de 3 segundos para probar el loader
        });
    }
});