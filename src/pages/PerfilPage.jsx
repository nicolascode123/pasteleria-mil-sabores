// src/pages/PerfilPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getPedidos } from '../data/store';
import '../styles/styleperfil.css';

export default function PerfilPage() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = React.useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    } else {
      // Cargar pedidos del usuario
      const todosPedidos = getPedidos();
      const pedidosUsuario = todosPedidos.filter(p => p.usuario === currentUser.id);
      setPedidos(pedidosUsuario);
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusClass = (estado) => {
    switch (estado) {
      case 'Entregado': return 'status-delivered';
      case 'En preparación': return 'status-preparing';
      default: return 'status-preparing';
    }
  };

  return (
    <div className="profile-container">
      {/* HEADER */}
      <div className="profile-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-name">{currentUser.name}</h2>
        <span className="profile-type">Cliente Premium</span>
      </div>

      {/* INFORMACIÓN PERSONAL */}
      <div className="profile-grid">
        <div className="profile-card">
          <h3>📋 Información Personal</h3>
          <div className="info-item">
            <span className="info-label">Nombre:</span>
            <span className="info-value">{currentUser.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{currentUser.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Edad:</span>
            <span className="info-value">{currentUser.age || '-'} años</span>
          </div>
          <div className="info-item">
            <span className="info-label">Miembro desde:</span>
            <span className="info-value">
              {new Date(currentUser.id).toLocaleDateString('es-CL')}
            </span>
          </div>
        </div>

        {/* DESCUENTOS Y BENEFICIOS */}
        <div className="profile-card">
          <h3>🎁 Descuentos Activos</h3>
          <ul className="discount-list">
            {currentUser.discounts && currentUser.discounts.length > 0 ? (
              currentUser.discounts.map((discount, index) => (
                <li key={index}>
                  {discount.description}
                </li>
              ))
            ) : (
              <li style={{ background: '#f0f0f0', borderLeft: '3px solid #999' }}>
                No tienes descuentos activos
              </li>
            )}
            {currentUser.freeBirthday && (
              <li>
                🎂 Torta gratis en tu cumpleaños (Estudiante Duoc UC)
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* HISTORIAL DE PEDIDOS */}
      <div className="profile-card">
        <h3>📦 Historial de Compras</h3>
        {pedidos.length > 0 ? (
          <div className="table-responsive">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Pedido #</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Productos</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>#{pedido.id}</td>
                    <td>{new Date(pedido.fecha).toLocaleDateString('es-CL')}</td>
                    <td>${pedido.total.toLocaleString('es-CL')}</td>
                    <td>
                      <span className={getStatusClass(pedido.estado)}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td>{pedido.items.length} productos</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            Aún no has realizado ninguna compra.
            <br />
            <a href="/productos" style={{ color: '#d2691e', textDecoration: 'none', fontWeight: 'bold' }}>
              ¡Explora nuestros productos!
            </a>
          </p>
        )}
      </div>

      {/* ACCIONES RÁPIDAS */}
      <div className="quick-actions">
        <button className="action-btn" onClick={() => navigate('/')}>
          🏠 Ir al Inicio
        </button>
        <button className="action-btn" onClick={() => navigate('/productos')}>
          🍰 Ver Productos
        </button>
        <button className="action-btn" onClick={() => navigate('/cart')}>
          🛒 Ver Carrito
        </button>
      </div>

      {/* BOTÓN CERRAR SESIÓN */}
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Cerrar Sesión
      </button>
    </div>
  );
}