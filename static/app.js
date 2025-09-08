// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Formulario contacto
const form = document.querySelector('form');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    alert("¡Gracias por preferirnos, te responderemos a la brevedad!");
    form.reset();
  });
}

// SLIDER productos destacados (loop infinito)
const track = document.querySelector('.slider-track');
if (track) {
  // 1) Guardamos los originales
  const originals = Array.from(track.children);
  if (originals.length === 0) return;

  // 2) Clonamos: al final y al inicio (una vez cada uno)
  originals.forEach(s => track.appendChild(s.cloneNode(true)));
  originals.forEach(s => track.insertBefore(s.cloneNode(true), track.firstChild));

  // 3) Estado
  let slides = Array.from(track.children);
  const originalsCount = originals.length;
  const GAP = 24; // ajusta si tu CSS usa otro gap
  let slideWidth = 0;
  let index = originalsCount; // empezamos en el primer "real"

  // 4) Medir ancho y posicionar
  function measure() {
    slideWidth = slides[0].getBoundingClientRect().width + GAP;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    // forzar reflow para que luego la transición vuelva a funcionar
    // eslint-disable-next-line no-unused-expressions
    track.offsetHeight;
    track.style.transition = 'transform 0.5s ease';
  }

  window.addEventListener('load', measure);
  window.addEventListener('resize', measure);
  measure(); // por si ya está todo listo

  // 5) Avanzar
  function moveSlider() {
    index += 1;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  // 6) Al terminar la transición, si caemos en clones → saltamos al real
  track.addEventListener('transitionend', () => {
    // zona clon del final (originalsCount..originalsCount*2-1 son "reales")
    if (index >= originalsCount * 2) {
      track.style.transition = 'none';
      index = originalsCount;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
      // reactivar transición para el próximo paso
      track.offsetHeight;
      track.style.transition = 'transform 0.5s ease';
    }
  });

  // 7) autoplay
  setInterval(moveSlider, 3000);
}

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
  