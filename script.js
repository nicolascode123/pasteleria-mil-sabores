const loginForm = document.getElementById('login-form');

if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username && password){
      localStorage.setItem('usuario', username);
      window.location.href = 'perfil.html';
    } else {
      alert('Usuario o contraseña incorrecta');
    }
  });
}
