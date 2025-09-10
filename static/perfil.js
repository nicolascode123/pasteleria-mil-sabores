// perfil.js
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const profileSection = document.getElementById('profile-section');
const logoutBtn = document.getElementById('logout-btn');

// Usuario de ejemplo
const USUARIO_EJEMPLO = 'juan';
const CONTRASENA_EJEMPLO = '1234';

// Revisar si ya hay usuario logueado
if(localStorage.getItem('usuario')) {
    loginSection.style.display = 'none';
    profileSection.style.display = 'block';
    document.getElementById('profile-name').textContent = localStorage.getItem('usuario');
}

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === USUARIO_EJEMPLO && password === CONTRASENA_EJEMPLO) {
        localStorage.setItem('usuario', username);
        loginSection.style.display = 'none';
        profileSection.style.display = 'block';

        // Datos de ejemplo
        document.getElementById('profile-name').textContent = 'Juan Pérez';
        document.getElementById('profile-age').textContent = '28 años';
        document.getElementById('profile-email').textContent = 'juan@example.com';
        document.getElementById('profile-phone').textContent = '+56912345678';
        document.getElementById('profile-avatar').src = 'imagenes/avatar.png';
    } else {
        alert('Usuario o contraseña incorrecta');
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('usuario');
    loginSection.style.display = 'block';
    profileSection.style.display = 'none';
});
