// src/pages/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import '../styles/styleindex.css';

export default function CartPage() {
  const { carrito, cambiarCantidad, eliminarDelCarrito, calcularTotal, totalItems, currentUser } = useApp();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  if (carrito.length === 0) {
    return (
      <div style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <ShoppingBag size={80} style={{ color: '#d2691e', marginBottom: '1rem' }} />
        <h2 style={{ color: '#7a4b2d', marginBottom: '1rem' }}>Tu carrito está vacío</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>¡Agrega algunos deliciosos productos!</p>
        <button 
          className="btn"
          onClick={() => navigate('/productos')}
          style={{ 
            padding: '1rem 2rem', 
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #d2691e 0%, #b25014 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        🛒 Mi Carrito
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>
        {totalItems} producto{totalItems !== 1 ? 's' : ''} en tu carrito
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '2rem', 
        maxWidth: '1400px', 
        margin: '0 auto',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        {/* LISTA DE PRODUCTOS */}
        <div>
          {carrito.map((item) => (
            <div 
              key={item.id} 
              className="cart-item"
              style={{
                background: 'white',
                borderRadius: '15px',
                padding: '1.5rem',
                marginBottom: '1rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              {/* IMAGEN */}
              <img 
                src={item.imagen || '/imagenes/placeholder.jpg'} 
                alt={item.nombre}
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
                onError={(e) => {
                  e.target.src = '/imagenes/placeholder.jpg';
                }}
              />

              {/* INFO */}
              <div>
                <h3 style={{ color: '#7a4b2d', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                  {item.nombre}
                </h3>
                
                {item.personalizacion && (
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.8rem', lineHeight: '1.6' }}>
                    {item.personalizacion.forma && (
                      <p style={{ margin: '0.2rem 0' }}>
                        📐 Forma: <strong>{item.personalizacion.forma}</strong>
                      </p>
                    )}
                    {item.personalizacion.tamaño && (
                      <p style={{ margin: '0.2rem 0' }}>
                        📏 Tamaño: <strong>{item.personalizacion.tamaño}</strong>
                      </p>
                    )}
                    {item.personalizacion.mensaje && (
                      <p style={{ margin: '0.2rem 0' }}>
                        💬 Mensaje: <strong>"{item.personalizacion.mensaje}"</strong>
                      </p>
                    )}
                    {item.personalizacion.fechaEntrega && (
                      <p style={{ margin: '0.2rem 0' }}>
                        📅 Entrega: <strong>{new Date(item.personalizacion.fechaEntrega).toLocaleDateString('es-CL')}</strong>
                      </p>
                    )}
                  </div>
                )}

                <p style={{ color: '#d2691e', fontSize: '1.3rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                  ${item.precio.toLocaleString('es-CL')} c/u
                </p>

                {/* CONTROLES DE CANTIDAD */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => cambiarCantidad(item.id, -1)}
                    disabled={item.cantidad <= 1}
                    style={{
                      background: item.cantidad <= 1 ? '#e0e0e0' : '#f0f0f0',
                      border: 'none',
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      cursor: item.cantidad <= 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Minus size={18} />
                  </button>
                  
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem', minWidth: '30px', textAlign: 'center' }}>
                    {item.cantidad}
                  </span>
                  
                  <button
                    onClick={() => cambiarCantidad(item.id, 1)}
                    style={{
                      background: '#f0f0f0',
                      border: 'none',
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* SUBTOTAL Y ELIMINAR */}
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  Subtotal
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7a4b2d', marginBottom: '1rem' }}>
                  ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                </p>
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s'
                  }}
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #fff7f0 0%, #ffefd6 100%)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '100px',
            height: 'fit-content'
          }}
        >
          <h3 style={{ color: '#7a4b2d', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            📋 Resumen del Pedido
          </h3>
          
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '2px solid #e8e8e8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ color: '#666' }}>Subtotal:</span>
              <span style={{ fontWeight: 'bold', color: '#7a4b2d' }}>
                ${calcularTotal().toLocaleString('es-CL')}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ color: '#666' }}>Envío:</span>
              <span style={{ fontWeight: 'bold', color: '#4caf50' }}>Gratis</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.3rem' }}>
            <span style={{ fontWeight: 'bold', color: '#7a4b2d' }}>Total:</span>
            <span style={{ fontWeight: 'bold', color: '#d2691e', fontSize: '1.8rem' }}>
              ${calcularTotal().toLocaleString('es-CL')}
            </span>
          </div>

          {currentUser && currentUser.discounts && currentUser.discounts.length > 0 && (
            <div style={{ 
              background: '#e8f5e8', 
              padding: '1rem', 
              borderRadius: '10px', 
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}>
              <p style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.5rem' }}>
                ✨ Descuentos aplicados:
              </p>
              {currentUser.discounts.map((discount, index) => (
                <p key={index} style={{ color: '#2e7d32', margin: '0.3rem 0' }}>
                  • {discount.description}
                </p>
              ))}
            </div>
          )}

          <button
            onClick={handleCheckout}
            style={{
              width: '100%',
              padding: '1.2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #d2691e 0%, #b25014 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Proceder al Pago
          </button>

          <button
            onClick={() => navigate('/productos')}
            style={{
              width: '100%',
              padding: '1rem',
              marginTop: '1rem',
              background: 'white',
              color: '#d2691e',
              border: '2px solid #d2691e',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );
}