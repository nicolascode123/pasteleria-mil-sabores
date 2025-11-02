// src/pages/ProductsPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PersonalizeModal from '../components/PersonalizeModal';
import '../styles/styleindex.css';

export default function ProductsPage() {
  const { productos, filtrarPorCategoria } = useApp();
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'tortas-cuadradas', nombre: 'Tortas Cuadradas' },
    { id: 'tortas-circulares', nombre: 'Tortas Circulares' },
    { id: 'postres-individuales', nombre: 'Postres Individuales' },
    { id: 'sin-azucar', nombre: 'Sin Azúcar' },
    { id: 'sin-gluten', nombre: 'Sin Gluten' },
    { id: 'vegana', nombre: 'Vegana' },
    { id: 'especiales', nombre: 'Especiales' }
  ];

  const productosFiltrados = filtrarPorCategoria(categoriaActiva);

  const handlePersonalizar = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  return (
    <section id="productos" className="container products">
      <h2 className="section-title">𝐍𝐮𝐞𝐬𝐭𝐫𝐨𝐬 𝐩𝐫𝐨𝐝𝐮𝐜𝐭𝐨𝐬</h2>

      {/* FILTROS */}
      <div className="product-filters">
        {categorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`filter-btn ${categoriaActiva === cat.id ? 'active' : ''}`}
          >
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* PRODUCTOS */}
      <div className="cards" id="productosContainer">
        {productosFiltrados.map(producto => (
          <article key={producto.id} className="card">
            <img src={producto.imagen} alt={producto.nombre} />
            <div className="card-body">
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <div className="product-price">
                ${producto.precio.toLocaleString('es-CL')}
              </div>
              <button 
                className="add-to-cart"
                onClick={() => handlePersonalizar(producto)}
              >
                Personalizar y Agregar
              </button>
            </div>
          </article>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <p style={{ fontSize: '1.2rem' }}>No hay productos en esta categoría</p>
        </div>
      )}

      {/* MODAL DE PERSONALIZACIÓN */}
      {showModal && (
        <PersonalizeModal
          producto={productoSeleccionado}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}