// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/styleindex.css';

export default function CheckoutPage() {
  const { carrito, calcularTotal, procesarCompra, currentUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    comuna: '',
    metodoPago: 'tarjeta'
  });

  useEffect(() => {
    if (carrito.length === 0) {
      navigate('/cart');
    }
    if (!currentUser) {
      navigate('/auth');
    }
    
    // Pre-llenar datos del usuario si existe
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        nombre: currentUser.name || '',
        email: currentUser.email || ''
      }));
    }
  }, [carrito, currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const success = procesarCompra();
    
    if (success) {
      // Simular procesamiento de pago
      setTimeout(() => {
        navigate('/checkout-success');
      }, 1500);
    } else {
      navigate('/checkout-fail');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h2 className="section-title">💳 Finalizar Compra</h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '3rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* FORMULARIO */}
        <div>
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#7a4b2d', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              📋 Datos de Envío
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#7a4b2d', fontWeight: '600' }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #e8e8e8',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#7a4b2d', fontWeight: '600' }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #e8e8e8',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#7a4b2d', fontWeight: '600' }}>
                Teléfono *
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="+56 9 1234 5678"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #e8e8e8',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#7a4b2d', fontWeight: '600' }}>
                Dirección *
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                placeholder="Calle, número, depto"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #e8e8e8',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#7a4b2d', fontWeight: '600' }}>
                  Ciudad *
                </label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e8e8e8',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#7a4b2d', fontWeight: '600' }}>
                  Comuna *
                </label>
                <input
                  type="text"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e8e8e8',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <h3 style={{ color: '#7a4b2d', marginBottom: '1.5rem', marginTop: '2rem', fontSize: '1.5rem' }}>
               Método de Pago
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '1rem', 
                border: '2px solid #e8e8e8',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '1rem',
                background: formData.metodoPago === 'tarjeta' ? '#fff7f0' : 'white'
              }}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="tarjeta"
                  checked={formData.metodoPago === 'tarjeta'}
                  onChange={handleChange}
                  style={{ marginRight: '1rem' }}
                />
                💳 Tarjeta de Crédito/Débito
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '1rem', 
                border: '2px solid #e8e8e8',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '1rem',
                background: formData.metodoPago === 'transferencia' ? '#fff7f0' : 'white'
              }}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="transferencia"
                  checked={formData.metodoPago === 'transferencia'}
                  onChange={handleChange}
                  style={{ marginRight: '1rem' }}
                />
                🏦 Transferencia Bancaria
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '1rem', 
                border: '2px solid #e8e8e8',
                borderRadius: '10px',
                cursor: 'pointer',
                background: formData.metodoPago === 'efectivo' ? '#fff7f0' : 'white'
              }}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="efectivo"
                  checked={formData.metodoPago === 'efectivo'}
                  onChange={handleChange}
                  style={{ marginRight: '1rem' }}
                />
                 Pago en Efectivo (al recibir)
              </label>
            </div>

            <button
              type="submit"
              className="btn"
              style={{
                width: '100%',
                padding: '1.2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginTop: '1rem'
              }}
            >
              Confirmar Pedido
            </button>
          </form>
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #fff7f0 0%, #ffefd6 100%)',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ color: '#7a4b2d', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              📦 Resumen del Pedido
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              {carrito.map((item) => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e8e8e8'
                }}>
                  <img 
                    src={item.imagen} 
                    alt={item.nombre}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 'bold', color: '#7a4b2d', marginBottom: '0.3rem' }}>
                      {item.nombre}
                    </p>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                      Cantidad: {item.cantidad}
                    </p>
                    <p style={{ color: '#d2691e', fontWeight: 'bold' }}>
                      ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: '1.5rem', borderTop: '2px solid #e8e8e8' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px solid #e8e8e8' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#7a4b2d' }}>Total:</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#d2691e' }}>
                  ${calcularTotal().toLocaleString('es-CL')}
                </span>
              </div>
            </div>

            <div style={{ 
              background: '#e8f5e8', 
              padding: '1rem', 
              borderRadius: '10px', 
              marginTop: '1.5rem',
              fontSize: '0.9rem'
            }}>
              <p style={{ color: '#2e7d32', margin: 0 }}>
                Envío gratis en toda la Región Metropolitana
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}