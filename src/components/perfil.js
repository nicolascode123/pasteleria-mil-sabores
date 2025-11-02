if (!sessionStorage.getItem("user")) {
  window.location.href = "auth.html";
}

// Referencias DOM
const profileSection = document.getElementById("profile-section");
const profileAvatar = document.getElementById("profile-avatar");
const profileName = document.getElementById("profile-name");
const profileType = document.getElementById("profile-type");
const profileAge = document.getElementById("profile-age");
const profileEmail = document.getElementById("profile-email");
const profilePhone = document.getElementById("profile-phone");
const profileDiscounts = document.getElementById("profile-discounts");
const purchaseHistory = document.getElementById("purchase-history");

document.addEventListener("DOMContentLoaded", () => {
  mostrarPerfil();
});

function mostrarPerfil() {
  profileSection.classList.remove("hidden");
  cargarDatosPerfil();
}

function cargarDatosPerfil() {
  const usuario = {
    nombre: sessionStorage.getItem("nombre") || "Invitado",
    email: sessionStorage.getItem("email") || "-",
    telefono: sessionStorage.getItem("telefono") || "-",
    direccion: sessionStorage.getItem("direccion") || "-",
    edad: sessionStorage.getItem("age") || "-",
    beneficios: JSON.parse(sessionStorage.getItem("beneficios")) || []
  };

  // Mostrar info
  profileName.textContent = usuario.nombre;
  profileAge.textContent = usuario.edad + " años";
  profileEmail.textContent = usuario.email;
  profilePhone.textContent = usuario.telefono;
  profileAvatar.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  profileType.textContent = "Cliente";

  // Mostrar beneficios
  profileDiscounts.innerHTML = "";
  if (usuario.beneficios.length > 0) {
    usuario.beneficios.forEach(b => {
      const li = document.createElement("li");
      li.textContent = b;
      profileDiscounts.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "No tienes descuentos activos";
    profileDiscounts.appendChild(li);
  }

  // Historial (ejemplo)
  purchaseHistory.innerHTML = `
    <tr>
      <td>Torta de Chocolate</td>
      <td>21/09/2025</td>
      <td>$20.000</td>
      <td><span class="status-delivered">Entregado</span></td>
    </tr>
  `;
}

// Acciones
function editarPerfil() { alert("Editar perfil en desarrollo"); }
function verCarrito() { alert("Ver carrito en desarrollo"); }
function verPedidos() { alert("Ver pedidos en desarrollo"); }
function compartirProducto() { alert("Compartir producto en desarrollo"); }

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "auth.html";
}
