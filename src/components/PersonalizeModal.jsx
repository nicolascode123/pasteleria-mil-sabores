// src/components/PersonalizeModal.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/styleindex.css';

export default function PersonalizeModal({ producto, onClose }) {
  const { agregarAlCarrito } = useApp();
  
  const [personalizacion, setPersonalizacion] = useState({
    forma: 'circular',
    tamaño: 'pequeño',
    mensaje: '',
    fechaEntrega: '',
    precioExtra: 0
  });

  const tamaños = [
    { id: 'pequeño', nombre: 'Pequeño', personas: '8-10', precio: 0 },
    { id: 'mediano', nombre: 'Mediano', personas: '12-15', precio: 5000 },
    { id: 'grande', nombre: 'Grande', personas: '18-20', precio: 10000 }
  ];

  const calcularPrecioFinal = () => {
    return producto.precio + personalizacion.precioExtra;
  };

  const handleTamañoChange = (tamaño) => {
    const precioExtra = tamaño.precio;
    setPersonalizacion({ 
      ...personalizacion, 
      tamaño: tamaño.id,
      precioExtra 
    });
  };

  const handleAgregar = () => {
    agregarAlCarrito(producto, personalizacion);
    onClose();
  };

  // Cerrar modal al hacer click fuera
  const handleOverlayClick = (e) => {
    if (e.target.className === 'personalize-modal active') {
      onClose();
    }
  };

  return (
    <div className="personalize-modal active" onClick={handleOverlayClick}>
      <div className="personalize-container">
        <button className="auth-close" onClick={onClose}>×</button>
        
        <h3>Personalizar Producto</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            style={{ 
              width: '100%', 
              maxHeight: '200px', 
              objectFit: 'cover', 
              borderRadius: '10px',
              marginBottom: '1rem'
            }}
          />
          <h4 style={{ color: '#7a4b2d', marginBottom: '0.5rem' }}>{producto.nombre}</h4>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>{producto.descripcion}</p>
        </div>

        {/* FORMA */}
        <div className="form-group">
          <label>Forma:</label>
          <div className="shape-options">
            <div 
              className={`shape-option ${personalizacion.forma === 'cuadrada' ? 'selected' : ''}`}
              onClick={() => setPersonalizacion({ ...personalizacion, forma: 'cuadrada' })}
            >
              <h4>Cuadrada</h4>
              <p>Clásica y elegante</p>
            </div>
            <div 
              className={`shape-option ${personalizacion.forma === 'circular' ? 'selected' : ''}`}
              onClick={() => setPersonalizacion({ ...personalizacion, forma: 'circular' })}
            >
              <h4>Circular</h4>
              <p>Tradicional y perfecta</p>
            </div>
          </div>
        </div>

        {/* TAMAÑO */}
        <div className="form-group">
          <label>Tamaño:</label>
          <div className="size-options">
            {tamaños.map(tamaño => (
              <div 
                key={tamaño.id}
                className={`size-option ${personalizacion.tamaño === tamaño.id ? 'selected' : ''}`}
                onClick={() => handleTamañoChange(tamaño)}
              >
                <h4>{tamaño.nombre}</h4>
                <p>{tamaño.personas} personas</p>
                <p>{tamaño.precio === 0 ? 'Sin costo adicional' : `+$${tamaño.precio.toLocaleString('es-CL')}`}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MENSAJE PERSONALIZADO */}
        <div className="form-group">
          <label htmlFor="customMessage">Mensaje Personalizado:</label>
          <input 
            type="text" 
            id="customMessage" 
            placeholder="Ej: Feliz Cumpleaños María" 
            maxLength="50"
            value={personalizacion.mensaje}
            onChange={(e) => setPersonalizacion({ ...personalizacion, mensaje: e.target.value })}
          />
        </div>

        {/* FECHA DE ENTREGA */}
        <div className="form-group">
          <label htmlFor="deliveryDate">Fecha de Entrega Preferida:</label>
          <input 
            type="date" 
            id="deliveryDate"
            value={personalizacion.fechaEntrega}
            onChange={(e) => setPersonalizacion({ ...personalizacion, fechaEntrega: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* PRECIO FINAL */}
        <div className="carrito-total">
          <span>Precio Final:</span>
          <span id="finalPrice">${calcularPrecioFinal().toLocaleString('es-CL')}</span>
        </div>

        <button className="btn" onClick={handleAgregar}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}