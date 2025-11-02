// src/pages/CheckoutSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '70vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <CheckCircle size={100} style={{ color: '#4caf50', marginBottom: '2rem' }} />
      <h1 style={{ color: '#7a4b2d', fontSize: '2.5rem', marginBottom: '1rem' }}>
        ¡Compra Exitosa!
      </h1>
      <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px' }}>
        Tu pedido ha sido procesado correctamente. 
        Recibirás un email de confirmación con los detalles de tu compra y el seguimiento del envío.
      </p>
      <div style={{ background: '#e8f5e8', padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem', maxWidth: '500px' }}>
        <p style={{ color: '#2e7d32', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          📦 Estado del pedido: En preparación
        </p>
        <p style={{ color: '#2e7d32', fontSize: '0.9rem' }}>
          Te notificaremos cuando tu pedido esté listo para envío
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #d2691e 0%, #b25014 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Volver al Inicio
        </button>
        <button 
          onClick={() => navigate('/perfil')}
          style={{
            padding: '1rem 2rem',
            background: 'white',
            color: '#d2691e',
            border: '2px solid #d2691e',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Ver Mi Perfil
        </button>
      </div>
    </div>
  );
}
