import React from "react";
import "../styles/styleadmin.css";

const AdminPage = () => (
  <main className="admin-wrapper">
    <aside className="admin-sidebar">
      <img src={require("../imagenes/avatar.png")} alt="Avatar" />
      <h3>Administrador</h3>
      <button onClick={() => (window.location.href = "/")}>Cerrar sesión</button>
    </aside>
    <section className="admin-main"></section>
  </main>
);

export default AdminPage;
