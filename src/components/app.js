import '../styles/styleindex.css';

// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

//ANIMACIONES 
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
// IntersectionObserver: detecta cuando un elemento entra al viewport
// (pantalla visible) para ejecutar animaciones o acciones al hacer scroll.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        //la animación sea solo 1 vez:
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar animaciones a elementos seleccionados
  document.querySelectorAll('.card, .section-title, .about-text, .about-img')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
});

// Cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.card, .section-title, .about-text, .about-img').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

function irPerfil() {
  window.location.href = "perfil.html";
}

// Efectos hover en tarjetas y lazy loading de imágenes
document.addEventListener('DOMContentLoaded', () => {

  // Hover en .card
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

  // Lazy loading de imágenes usando IntersectionObserver
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loaded'); // puedes definir animación CSS en .loaded
        observer.unobserve(img);     // deja de observar la imagen ya cargada
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});
//ANIMACIONES

// Usuario normal por defecto
sessionStorage.setItem("defaultUser", "usuario1");
sessionStorage.setItem("defaultPass", "123");

// Admin por defecto
sessionStorage.setItem("defaultAdminUser", "admin1");
sessionStorage.setItem("defaultAdminPass", "1234");

// Cambiar de pestaña
function mostrarTab(tabId) {
  document.querySelectorAll(".tab").forEach(div => div.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

function register() {
  const nombre = document.getElementById("reg-nombre").value;
  const email = document.getElementById("reg-email").value;
  const telefono = document.getElementById("reg-telefono").value;
  const direccion = document.getElementById("reg-direccion").value;
  const usuario = document.getElementById("reg-usuario").value;
  const password = document.getElementById("reg-password").value;
  const edad = parseInt(document.getElementById("reg-edad").value);
  const codigo = document.getElementById("reg-codigo").value.trim();

  if (!nombre || !email || !telefono || !direccion || !usuario || !password || !edad) {
  mostrarNotificacion("❌ Completa todos los campos", "error");
  return;
  }

  // Guardar datos
  sessionStorage.setItem("nombre", nombre);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("telefono", telefono);
  sessionStorage.setItem("direccion", direccion);
  sessionStorage.setItem("user", usuario);
  sessionStorage.setItem("pass", password);
  sessionStorage.setItem("age", edad);

  // Calcular beneficios
  let beneficios = [];

  if (edad > 50) {
    beneficios.push("50% de descuento en todos los productos");
  }
  if (codigo.toUpperCase() === "FELICES50") {
    beneficios.push("10% de descuento de por vida");
  }
  if (email.toLowerCase().endsWith("@duoc.cl")) {
    beneficios.push("Torta gratis en tu cumpleaños por ser estudiante DUOC");
  }

  sessionStorage.setItem("beneficios", JSON.stringify(beneficios));

  // Redirigir al perfil
  window.location.href = "perfil.html";
}

// Login normal
function login() {
  const user = document.getElementById("login-username").value;
  const pass = document.getElementById("login-password").value;

  // Si existe un usuario creado, úsalo. Si no, usa los default
  const savedUser = sessionStorage.getItem("user") || "usuario1";
  const savedPass = sessionStorage.getItem("pass") || "1234";

  if (user === savedUser && pass === savedPass) {
    sessionStorage.setItem("user", user);
    mostrarNotificacion("Inicio de sesión correcto ✅","success");
    window.location.href = "index.html";
  } else {
    mostrarNotificacion("Usuario o contraseña incorrectos ❌","error");

  }
  
}

// Login admin
function adminLogin() {
  const user = document.getElementById("admin-username").value;
  const pass = document.getElementById("admin-password").value;

  if (user === "admin1" && pass === "1234") {
    sessionStorage.setItem("admin", user);
    mostrarNotificacion("Bienvenido administrador ✅","success");
    window.location.href = "administrador.html";
  } else {
    mostrarNotificacion("Credenciales de administrador incorrectas ❌","error");
  }
}
  
  // Mostrar perfil
  function mostrarPerfil(usuario) {
    document.getElementById('profile-name').textContent = usuario.nombre;
    document.getElementById('profile-age').textContent = usuario.edad;
    document.getElementById('profile-email').textContent = usuario.email;
    document.getElementById('profile-phone').textContent = usuario.telefono;
    document.getElementById('profile-avatar').src = usuario.avatar;
    document.getElementById('profile-type').textContent = usuario.tipo;
    
    const ul = document.getElementById('profile-discounts');
    ul.innerHTML = '';
    usuario.descuentos.forEach(d => {
      const li = document.createElement('li');
      li.textContent = d;
      ul.appendChild(li);
    });
  
    const tbody = document.querySelector('#purchase-history tbody');
    tbody.innerHTML = '';
    usuario.historial.forEach(h => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${h.producto}</td><td>${h.fecha}</td><td>${h.monto}</td><td>${h.estado}</td>`;
      tbody.appendChild(tr);
    });
  }

// ==========================
// Función para notificaciones
// ==========================
function mostrarNotificacion(mensaje, tipo = "info") {
  const notificacion = document.getElementById("notificacion");
  if (!notificacion) return; // si no existe el contenedor, evita errores

  notificacion.textContent = mensaje;
  notificacion.className = "notificacion " + tipo; // aplica clase de estilo
  notificacion.style.display = "block";

  // Quitar notificación después de 3s
  setTimeout(() => {
    notificacion.style.display = "none";
  }, 3000);
}

