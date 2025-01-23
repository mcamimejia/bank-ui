document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');

    loaderText.textContent = '';

    const socket = io();

    socket.on('progress', (message) => {
        loader.classList.remove('hidden');
        loaderText.textContent = message;
    });    
});