// ==============================
//   SEED DE DATOS DEMO
// ==============================
(function seedDemoData(){
  if(localStorage.getItem('productos')) return; // evitar sobreescribir cambios

  const demoProductos = [
    {id:1, nombre:"Torta Cuadrada de Chocolate", precio:45000, categoria:"Tortas Cuadradas"},
    {id:2, nombre:"Torta Cuadrada de Frutas", precio:50000, categoria:"Tortas Cuadradas"},
    {id:3, nombre:"Bizcocho de Vainilla", precio:40000, categoria:"Tortas Cuadradas"},
    {id:4, nombre:"Torta Circular de Manjar", precio:42000, categoria:"Tortas Circulares"},
    {id:5, nombre:"Mousse de Chocolate", precio:5000, categoria:"Postres Individuales"},
    {id:6, nombre:"Tiramisú Clásico", precio:5500, categoria:"Postres Individuales"},
    {id:7, nombre:"Torta Sin Azúcar de Naranja", precio:48000, categoria:"Sin Azúcar"},
    {id:8, nombre:"Cheesecake Sin Azúcar", precio:47000, categoria:"Sin Azúcar"},
    {id:9, nombre:"Galletas de Chocolate", precio:3000, categoria:"Postres Individuales"},
    {id:10, nombre:"Tarta de Santiago", precio:6000, categoria:"Postres Individuales"},
    {id:11, nombre:"Brownie Sin Gluten", precio:4000, categoria:"Sin Gluten"},
    {id:12, nombre:"Pan Sin Gluten", precio:3500, categoria:"Sin Gluten"},
    {id:13, nombre:"Torta Vegana de Chocolate", precio:50000, categoria:"Vegana"},
    {id:14, nombre:"Galletas Veganas de Avena", precio:4500, categoria:"Vegana"},
    {id:15, nombre:"Torta Especial de Cumpleaños", precio:55000, categoria:"Especiales"},
    {id:16, nombre:"Torta Especial de Boda", precio:60000, categoria:"Especiales"}
  ];
  localStorage.setItem('productos', JSON.stringify(demoProductos));

  const nombres = ["Juan","María","Pedro","Ana","Luis","Carla","Diego","Paula","Jorge","Camila","Sebastián","Valentina","Rodrigo","Florencia","Andrés","Fernanda","Matías","Josefa","Felipe","Constanza"];
  const apellidos = ["Pérez","González","Ramírez","Torres","Soto","Castillo","Morales","Herrera","Vega","Rojas"];
  let demoUsuarios = [];
  for(let i=1; i<=15; i++){
    const nombre = nombres[Math.floor(Math.random()*nombres.length)];
    const apellido = apellidos[Math.floor(Math.random()*apellidos.length)];
    const username = (nombre.charAt(0)+apellido+i).toLowerCase();
    demoUsuarios.push({
      id:i,
      name:`${nombre} ${apellido}`,
      username,
      email:`${username}@example.com`,
      telefono:`9${Math.floor(10000000 + Math.random()*89999999)}`,
      direccion:`Calle ${apellido} #${Math.floor(Math.random()*500+1)}`
    });
  }
  localStorage.setItem('users', JSON.stringify(demoUsuarios));

  let demoPedidos = [];
  for(let j=1; j<=18; j++){
    const usuario = demoUsuarios[Math.floor(Math.random()*demoUsuarios.length)];
    const numItems = Math.floor(Math.random()*3)+1;
    let items = [];
    let total = 0;
    for(let k=0; k<numItems; k++){
      const prod = demoProductos[Math.floor(Math.random()*demoProductos.length)];
      const cantidad = Math.floor(Math.random()*2)+1;
      items.push({nombre: prod.nombre, cantidad, precio: prod.precio});
      total += prod.precio * cantidad;
    }
    const estados = ["En preparación","En camino","Entregado","Cancelado"];
    demoPedidos.push({
      id:100+j,
      usuario:usuario.username,
      total,
      fecha: Date.now() - (Math.floor(Math.random()*10)*86400000),
      estado: estados[Math.floor(Math.random()*estados.length)],
      items
    });
  }
  localStorage.setItem('pedidos', JSON.stringify(demoPedidos));
})();

// ==============================
//   TOASTS / NOTIFICACIONES
// ==============================
function createToastContainer(){
  if(document.getElementById('toast')) return;
  const t = document.createElement('div');
  t.id = 'toast';
  t.style.position = 'fixed';
  t.style.right = '20px';
  t.style.bottom = '20px';
  t.style.zIndex = '9999';
  t.style.padding = '10px 14px';
  t.style.borderRadius = '8px';
  t.style.display = 'none';
  t.style.color = '#fff';
  t.style.fontWeight = '600';
  t.style.transition = 'opacity 0.4s';
  t.style.opacity = 0;
  document.body.appendChild(t);
}

function showToast(msg, type='success', time=2200){
  createToastContainer();
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = (type==='error') ? '#e74c3c' : '#2ecc71';
  t.style.display = 'block';
  t.style.opacity = 1;
  setTimeout(()=> t.style.opacity = 0, time);
  setTimeout(()=> t.style.display = 'none', time + 400);
}

// ==============================
//   AUTENTICACIÓN
// ==============================
function checkAdminAuth(){
  const isAdmin = sessionStorage.getItem('isAdmin');
  if(!isAdmin || isAdmin !== 'true'){
    window.location.href = 'auth.html';
    return false;
  }
  const adminUser = JSON.parse(sessionStorage.getItem('adminUser') || '{}');
  const nameEl = document.getElementById('admin-name');
  if(nameEl) nameEl.textContent = adminUser.name || adminUser.username || 'Administrador';
  const avatar = document.getElementById('admin-avatar');
  if(avatar && adminUser.avatar) avatar.src = adminUser.avatar;
  return true;
}

// ==============================
//   NAVEGACIÓN DINÁMICA
// ==============================
function marcarNavActiva(){
  const hash = (location.hash || '#resumen').replace('#','');
  document.querySelectorAll('.admin-sidebar nav a').forEach(a=>{
    const target = (a.getAttribute('href')||'').replace('#','');
    if(target === hash) a.classList.add('active'); else a.classList.remove('active');
  });
}

function renderByHash(){
  marcarNavActiva();
  const hash = (location.hash || '#resumen').replace('#','');
  switch(hash){
    case 'resumen': renderResumen(); break;
    case 'productos': renderProductos(); break;
    case 'pedidos': renderPedidos(); break;
    case 'usuarios': renderUsuarios(); break;
    case 'config': renderConfig(); break;
    default: renderResumen();
  }
}

// ==============================
//   RESUMEN
// ==============================
function renderResumen(){
  const main = document.querySelector('.admin-main');
  const users = JSON.parse(localStorage.getItem('users')||'[]');
  const pedidos = JSON.parse(localStorage.getItem('pedidos')||'[]');
  const productos = JSON.parse(localStorage.getItem('productos')||'[]');

  const ultimosPedidos = pedidos.sort((a,b)=>b.fecha - a.fecha).slice(0,3);

  main.innerHTML = `
    <section class="admin-section">
      <h2>📊 Resumen General</h2>
      <div class="grid-summary">
        <div class="card"><strong>${users.length}</strong><small>Usuarios Registrados</small></div>
        <div class="card"><strong>${pedidos.length}</strong><small>Pedidos Totales</small></div>
        <div class="card"><strong>${productos.length}</strong><small>Productos Disponibles</small></div>
      </div>
      <h3 style="margin-top:2rem;">Últimos Pedidos</h3>
      <ul>
        ${ultimosPedidos.map(p=>`<li>Pedido #${p.id} — ${p.usuario} — $${p.total.toLocaleString('es-CL')}</li>`).join('')}
      </ul>
    </section>`;
}

// ==============================
//   PRODUCTOS
// ==============================
function renderProductos(){
  const main = document.querySelector('.admin-main');
  const productos = JSON.parse(localStorage.getItem('productos') || '[]');
  if(productos.length === 0){
    main.innerHTML = `<section class="admin-section"><h2>Productos</h2><p>No hay productos cargados.</p></section>`;
    return;
  }
  let html = `<section class="admin-section"><h2>Productos</h2><table class="admin-table"><thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>`;
  productos.forEach(p => {
    html += `<tr data-id="${p.id}">
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${(p.precio).toLocaleString('es-CL')}</td>
      <td>
        <button onclick="editarProducto(${p.id})">✏️ Editar</button>
        <button onclick="borrarProducto(${p.id})">🗑 Eliminar</button>
      </td>
    </tr>`;
  });
  html += `</tbody></table></section>`;
  main.innerHTML = html;
}

function editarProducto(id){ showToast('Función editar producto (placeholder)'); }
function borrarProducto(id){
  if(!confirm('¿Eliminar producto?')) return;
  let productos = JSON.parse(localStorage.getItem('productos') || '[]');
  productos = productos.filter(p => p.id != id);
  localStorage.setItem('productos', JSON.stringify(productos));
  showToast('Producto eliminado');
  renderProductos();
}

// ==============================
//   PEDIDOS
// ==============================
function renderPedidos(){
  const main = document.querySelector('.admin-main');
  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  if(pedidos.length === 0){
    main.innerHTML = `<section class="admin-section"><h2>Pedidos</h2><p>No hay pedidos.</p></section>`;
    return;
  }
  let html = `<section class="admin-section"><h2>Pedidos</h2><table class="admin-table"><thead><tr><th>ID</th><th>Usuario</th><th>Total</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>`;
  pedidos.sort((a,b)=>b.fecha - a.fecha).forEach(p => {
    const fecha = new Date(p.fecha).toLocaleString();
    html += `<tr data-id="${p.id}">
      <td>${p.id}</td>
      <td><button class="link-btn" onclick="buscarUsuarioPorPedido('${p.usuario}')">Ver</button></td>
      <td>$${p.total.toLocaleString('es-CL')}</td>
      <td>${fecha}</td>
      <td>
        <select onchange="cambiarEstadoPedido('${p.id}', this.value)">
          <option value="En preparación"${p.estado==='En preparación'?' selected':''}>En preparación</option>
          <option value="En camino"${p.estado==='En camino'?' selected':''}>En camino</option>
          <option value="Entregado"${p.estado==='Entregado'?' selected':''}>Entregado</option>
          <option value="Cancelado"${p.estado==='Cancelado'?' selected':''}>Cancelado</option>
        </select>
      </td>
      <td><button onclick="verDetallePedido('${p.id}')">Detalles</button></td>
    </tr>`;
  });
  html += `</tbody></table></section>`;
  main.innerHTML = html;
}

function cambiarEstadoPedido(id, nuevo){
  let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  const idx = pedidos.findIndex(x => x.id == id);
  if(idx === -1) return showToast('Pedido no encontrado','error');
  pedidos[idx].estado = nuevo;
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  showToast('Estado actualizado');
  renderPedidos();
}

function verDetallePedido(id){
  const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
  const p = pedidos.find(x => x.id == id);
  if(!p) return showToast('Pedido no encontrado','error');
  const main = document.querySelector('.admin-main');
  let html = `<section class="admin-section"><h2>Detalle Pedido #${p.id}</h2>
    <p><strong>Usuario:</strong> ${p.usuario}</p>
    <p><strong>Fecha:</strong> ${new Date(p.fecha).toLocaleString()}</p>
    <p><strong>Total:</strong> $${p.total.toLocaleString('es-CL')}</p>
    <h3>Items</h3><ul>`;
  (p.items||[]).forEach(it => {
    html += `<li>${it.nombre} — ${it.cantidad} x $${it.precio.toLocaleString('es-CL')}</li>`;
  });
  html += `</ul><button onclick="renderByHash(); location.hash='pedidos'">Volver</button></section>`;
  main.innerHTML = html;
}

// ==============================
//   USUARIOS
// ==============================
function renderUsuarios(){
  const main = document.querySelector('.admin-main');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if(users.length === 0){
    main.innerHTML = `<section class="admin-section"><h2>Usuarios</h2><p>No hay usuarios registrados.</p></section>`;
    return;
  }
  let html = `<section class="admin-section"><h2>Usuarios</h2><table class="admin-table"><thead><tr><th>ID</th><th>Nombre</th><th>Usuario</th><th>Email</th><th>Acciones</th></tr></thead><tbody>`;
  users.forEach(u => {
    html += `<tr data-id="${u.id}">
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.username}</td>
      <td>${u.email}</td>
      <td><button onclick="verUsuario('${u.id}')">Ver</button> <button onclick="eliminarUsuario('${u.id}')">Eliminar</button></td>
    </tr>`;
  });
  html += `</tbody></table></section>`;
  main.innerHTML = html;
}

function verUsuario(id){
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const u = users.find(x => x.id == id);
  if(!u) return showToast('Usuario no encontrado','error');
  const main = document.querySelector('.admin-main');
  main.innerHTML = `<section class="admin-section"><h2>Usuario: ${u.name}</h2>
    <p><strong>ID:</strong> ${u.id}</p>
    <p><strong>Email:</strong> ${u.email}</p>
    <p><strong>Teléfono:</strong> ${u.telefono}</p>
    <p><strong>Dirección:</strong> ${u.direccion}</p>
    <button onclick="renderByHash(); location.hash='usuarios'">Volver</button></section>`;
}

function eliminarUsuario(id){
  if(!confirm('¿Eliminar usuario permanentemente?')) return;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users = users.filter(u => u.id != id);
  localStorage.setItem('users', JSON.stringify(users));
  showToast('Usuario eliminado');
  renderUsuarios();
}

function buscarUsuarioPorPedido(usuarioRef){
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const u = users.find(x => x.username === usuarioRef || x.email === usuarioRef || x.name === usuarioRef);
  if(!u) return showToast('Usuario del pedido no encontrado','error');
  verUsuario(u.id);
}

// ==============================
//   CONFIGURACIÓN
// ==============================
function renderConfig(){
  const main = document.querySelector('.admin-main');
  const currentColor = localStorage.getItem('site_primary_color') || '#d2691e';
  const siteName = localStorage.getItem('site_name') || 'Pastelería Mil Sabores';
  const contactEmail = localStorage.getItem('contact_email') || 'contacto@pastesabores.cl';
  const showStock = localStorage.getItem('show_stock') === 'true';

  main.innerHTML = `
    <section class="admin-section">
      <h2>⚙️ Configuración General</h2>
      
      <div class="form-group">
        <label>Nombre del sitio:</label>
        <input type="text" id="cfgSiteName" value="${siteName}" />
      </div>
      
      <div class="form-group">
        <label>Email de contacto:</label>
        <input type="email" id="cfgEmail" value="${contactEmail}" />
      </div>
      
      <div class="form-group">
        <label>Color principal:</label>
        <input type="color" id="cfgColor" value="${currentColor}" />
      </div>

      <div class="form-group">
        <label><input type="checkbox" id="cfgStock" ${showStock?'checked':''}/> Mostrar stock de productos en catálogo</label>
      </div>

      <div style="margin-top:1rem;">
        <button onclick="guardarConfig()">💾 Guardar</button>
      </div>
    </section>
  `;
}

function guardarConfig(){
  const name = document.getElementById('cfgSiteName').value;
  const email = document.getElementById('cfgEmail').value;
  const color = document.getElementById('cfgColor').value;
  const stock = document.getElementById('cfgStock').checked;

  localStorage.setItem('site_name', name);
  localStorage.setItem('contact_email', email);
  localStorage.setItem('site_primary_color', color);
  localStorage.setItem('show_stock', stock);

  showToast('✅ Configuración guardada');
}

// ==============================
//   LOGOUT & INIT
// ==============================
function adminLogout(){
  if(confirm('¿Cerrar sesión de administrador?')){
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminUser');
    window.location.href = 'auth.html';
  }
}

function initAdmin(){
  if(!checkAdminAuth()) return;

  renderByHash();
  window.addEventListener('hashchange', renderByHash);

  const logoutBtn = document.getElementById('admin-logout');
  if(logoutBtn) logoutBtn.addEventListener('click', adminLogout);
}

document.addEventListener('DOMContentLoaded', initAdmin);
