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



// Cerrar sesión
const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('usuario'); 
    window.location.href = "index.html";
  });
}
// Datos de ejemplo para el perfil
const usuarioEjemplo = {
    nombre: "Juan Pérez",
    edad: 28,
    email: "juan.perez@mail.com",
    telefono: "+56912345678",
    avatar: "imagenes/avatar.png",
    tipo: "VIP",
    descuentos: ["10% por código FELICES50", "50% mayores de 50 años", "Torta gratis Duoc"],
    historial: [
      {producto: "Torta Chocolate", fecha: "01/09/2025", monto: "$20.000", estado: "Entregado"},
      {producto: "Cheesecake", fecha: "15/08/2025", monto: "$18.000", estado: "En preparación"}
    ]
  };
  
  // Login
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if(username && password){
      localStorage.setItem('usuario', username);
      mostrarPerfil(usuarioEjemplo);
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('profile-section').style.display = 'block';
    } else {
      alert('Usuario o contraseña incorrecta');
    }
  });
  
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
  
  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('usuario');
    document.getElementById('profile-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
  });
  