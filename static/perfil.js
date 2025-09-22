// ==============================
//   PERFIL DE USUARIO
// ==============================
function getCurrentUser() {
  // Intentamos claves comunes en sessionStorage
  const possible = ['currentUser', 'user', 'loggedInUser', 'adminUser'];
  for (const k of possible) {
    try {
      const v = JSON.parse(sessionStorage.getItem(k) || 'null');
      if (v) return v;
    } catch (e) {}
  }
  // Fallback: si solo hay 1 user en localStorage, lo asumimos
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users && users.length === 1) return users[0];
  } catch (e) {}
  return null;
}

function llenarPerfil() {
  const u = getCurrentUser();
  const profileSection = document.getElementById("profile-section");
  const profileAvatar = document.getElementById("profile-avatar");
  const profileName = document.getElementById("profile-name");
  const profileType = document.getElementById("profile-type");
  const profileAge = document.getElementById("profile-age");
  const profileEmail = document.getElementById("profile-email");
  const profilePhone = document.getElementById("profile-phone");
  const profileDiscounts = document.getElementById("profile-discounts");
  const purchaseHistory = document.getElementById("purchase-history");

  if(!u){
    if(profileName) profileName.textContent = 'Invitado';
    if(profileType) profileType.textContent = 'Visitante';
    if(profileSection) profileSection.classList.remove('hidden');
    if(profileDiscounts) profileDiscounts.innerHTML = '<li>No tienes descuentos activos</li>';
    if(purchaseHistory) purchaseHistory.innerHTML = '<tr><td colspan="4">No hay historial</td></tr>';
    return;
  }

  // Datos básicos
  if(profileName) profileName.textContent = u.name || u.nombre || u.username || 'Usuario';
  if(profileType) profileType.textContent = u.type || (u.isAdmin ? 'Administrador' : 'Cliente');
  if(profileAge) profileAge.textContent = (u.edad || u.age) || '-';
  if(profileEmail) profileEmail.textContent = u.email || u.reg_email || '-';
  if(profilePhone) profilePhone.textContent = u.telefono || u.phone || '-';
  if(profileAvatar && u.avatar) profileAvatar.src = u.avatar;

  // Descuentos
  if(profileDiscounts){
    profileDiscounts.innerHTML = '';
    const discounts = u.descuentos || u.discounts || u.beneficios || [];
    if(discounts.length === 0){
      profileDiscounts.innerHTML = '<li>No tienes descuentos activos</li>';
    } else {
      discounts.forEach(d => {
        const li = document.createElement('li');
        li.textContent = `${d.nombre || d.name || d.title || ''} ${d.valor?(' - '+d.valor):''}`;
        profileDiscounts.appendChild(li);
      });
    }
  }

  // Historial de compras
  if(purchaseHistory){
    purchaseHistory.innerHTML = '';
    try {
      const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
      const myPedidos = pedidos.filter(p => p.usuario == u.id || p.usuario == u.username || p.user == u.username || p.user == u.id);
      if(myPedidos.length === 0){
        purchaseHistory.innerHTML = '<tr><td colspan="4">No hay compras registradas</td></tr>';
      } else {
        myPedidos.sort((a,b) => (b.fecha || 0) - (a.fecha || 0));
        myPedidos.forEach(p => {
          const tr = document.createElement('tr');
          const producto = document.createElement('td');
          producto.textContent = (p.items && p.items[0] && (p.items[0].nombre || p.items[0].name)) || '-';
          const fecha = document.createElement('td');
          fecha.textContent = new Date(p.fecha || Date.now()).toLocaleDateString();
          const monto = document.createElement('td');
          monto.textContent = (p.total || p.monto || 0).toLocaleString('es-CL');
          const estado = document.createElement('td');
          estado.textContent = p.estado || '-';
          tr.appendChild(producto);
          tr.appendChild(fecha);
          tr.appendChild(monto);
          tr.appendChild(estado);
          purchaseHistory.appendChild(tr);
        });
      }
    } catch(e){
      purchaseHistory.innerHTML = '<tr><td colspan="4">Error al leer historial</td></tr>';
    }
  }

  if(profileSection) profileSection.classList.remove('hidden');
}

// ==============================
//   FUNCIONES DE NAVEGACIÓN / ACCIONES
// ==============================
function editarPerfil(){ alert('Editar perfil — en desarrollo'); }
function verCarrito(){ location.href = 'index.html#carrito'; }
function verPedidos(){ location.href = 'perfil.html#pedidos'; }
function compartirProducto(){ alert('Compartir — en desarrollo'); }
function cerrarSesion(){
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('loggedInUser');
  sessionStorage.removeItem('isAdmin');
  window.location.href = 'auth.html';
}

// ==============================
//   INIT
// ==============================
document.addEventListener('DOMContentLoaded', llenarPerfil);
