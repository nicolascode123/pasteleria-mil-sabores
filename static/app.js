// ==========================
// ANIMACIONES
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .section-title, .about-text, .about-img')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
});

// ==========================
// EFECTOS HOVER + LAZY LOADING
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('card')) {
      e.target.style.transform = 'translateY(-10px) scale(1.02)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('card')) {
      e.target.style.transform = 'translateY(0) scale(1)';
    }
  });

  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => imageObserver.observe(img));
});

// ==========================
// CAMBIO DE TABS EN AUTH
// ==========================
function mostrarTab(tabId) {
  document.querySelectorAll(".tab").forEach(div => div.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

// ==========================
// NOTIFICACIONES
// ==========================
function mostrarNotificacion(mensaje, tipo = "info") {
  const notificacion = document.getElementById("notificacion");
  if (!notificacion) return;
  notificacion.textContent = mensaje;
  notificacion.className = "notificacion " + tipo;
  notificacion.style.display = "block";
  setTimeout(() => notificacion.style.display = "none", 3000);
}

// ==========================
// LOGIN NORMAL
// ==========================
function login() {
  const user = document.getElementById("login-username").value;
  const pass = document.getElementById("login-password").value;

  // Obtener usuarios guardados en localStorage, si no hay, crear el predeterminado
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if(users.length === 0){
    users = [
      { id: 1, username: "usuario1", password: "123", name: "Usuario Predeterminado", isAdmin: false }
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

  const found = users.find(u => u.username === user && u.password === pass);

  if(found){
    sessionStorage.setItem("currentUser", JSON.stringify(found));
    localStorage.setItem("lastUser", JSON.stringify(found)); // mantener sesión
    mostrarNotificacion("Inicio de sesión correcto ✅", "success");
    window.location.href = "perfil.html";
  } else {
    mostrarNotificacion("Usuario o contraseña incorrectos ❌", "error");
  }
}

// ==========================
// LOGIN ADMIN
// ==========================
function adminLogin() {
  const user = document.getElementById("admin-username").value;
  const pass = document.getElementById("admin-password").value;

  if (user === "admin1" && pass === "1234") {
    sessionStorage.setItem("isAdmin", "true");
    sessionStorage.setItem("adminUser", JSON.stringify({ username: "admin1", name: "Administrador" }));
    mostrarNotificacion("Bienvenido administrador ✅", "success");
    window.location.href = "administrador.html";
  } else {
    mostrarNotificacion("Credenciales de administrador incorrectas ❌", "error");
  }
}

// ==========================
// REGISTRO USUARIO NORMAL CON DESCUENTOS Y PEDIDOS RANDOM
// ==========================
function register() {
  const nombre = document.getElementById('reg-nombre').value;
  const usuario = document.getElementById('reg-usuario').value;
  const password = document.getElementById('reg-password').value;
  const edad = parseInt(document.getElementById('reg-edad').value);
  const codigo = document.getElementById('reg-codigo').value.trim();
  const email = document.getElementById('reg-email').value;
  const telefono = document.getElementById('reg-telefono').value;
  const direccion = document.getElementById('reg-direccion').value;

  if(!nombre || !usuario || !password || !edad || !email || !telefono || !direccion){
    return mostrarNotificacion('Completa todos los campos obligatorios','error');
  }

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if(users.find(u => u.username === usuario || u.email === email)){
    return mostrarNotificacion('Usuario o correo ya registrado','error');
  }

  const id = users.length > 0 ? Math.max(...users.map(u=>u.id))+1 : 1;

  const descuentos = [];
  if(edad >= 50) descuentos.push({name:'50% descuento mayores 50 años', valor:'50%'} );
  if(codigo.toUpperCase() === 'FELICES50') descuentos.push({name:'10% descuento de por vida', valor:'10%'} );
  if(email.toLowerCase().endsWith('@duoc.cl')) descuentos.push({name:'Torta gratis cumpleaños', valor:'1 torta'} );

  const newUser = {
    id,
    name: nombre,
    username: usuario,
    password,
    edad,
    email,
    telefono,
    direccion,
    isAdmin: false,
    descuentos
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  sessionStorage.setItem('currentUser', JSON.stringify(newUser));
  localStorage.setItem('lastUser', JSON.stringify(newUser)); // mantener sesión
  mostrarNotificacion('Usuario registrado con éxito','success');

  // Crear pedidos aleatorios
  try {
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');

    const numPedidos = Math.floor(Math.random()*3)+1;
    for(let i=0;i<numPedidos;i++){
      const numItems = Math.floor(Math.random()*3)+1;
      let items = [];
      let total = 0;
      for(let j=0;j<numItems;j++){
        const prod = productos[Math.floor(Math.random()*productos.length)];
        const cantidad = Math.floor(Math.random()*2)+1;
        items.push({nombre: prod.nombre, cantidad, precio: prod.precio});
        total += prod.precio*cantidad;
      }
      const estados = ["En preparación","En camino","Entregado","Cancelado"];
      pedidos.push({
        id: 1000 + pedidos.length + 1,
        usuario: usuario,
        total,
        fecha: Date.now() - (Math.floor(Math.random()*10)*86400000),
        estado: estados[Math.floor(Math.random()*estados.length)],
        items
      });
    }
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  } catch(e){
    console.error('Error creando pedidos de ejemplo:', e);
  }

  setTimeout(()=> location.href='perfil.html', 800);
}

// ==========================
// CARGAR USUARIO SI EXISTE EN LOCALSTORAGE
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const lastUser = JSON.parse(localStorage.getItem('lastUser') || 'null');
  if(lastUser && !sessionStorage.getItem('currentUser')){
    sessionStorage.setItem('currentUser', JSON.stringify(lastUser));
  }
});

// ==========================
// CERRAR SESIÓN
// ==========================
function cerrarSesion(){
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('isAdmin');
  sessionStorage.removeItem('adminUser');
  localStorage.removeItem('lastUser'); // limpiar sesión persistente
  window.location.href = 'auth.html';
}
