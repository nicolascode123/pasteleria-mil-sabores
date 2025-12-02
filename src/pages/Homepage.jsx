// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProductos } from '../data/store';
import PersonalizeModal from '../components/PersonalizeModal';
import { Star, Heart, Award, Clock } from 'lucide-react';
import '../styles/styleindex.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importar imágenes localmente (con fallback si no existe)
let banner1;
try {
  banner1 = require('../imagenes/banner1.png');
} catch (e) {
  console.log('Banner1 no encontrado, usando fallback');
  banner1 = null;
}

export default function Homepage() {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // 🔹 Productos para la home (cargados desde la API/fallback)
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductos();
        const lista = Array.isArray(data) ? data : [];
        console.log("HomePage - productos cargados:", lista);
        setProductos(lista);
      } catch (error) {
        console.error("Error al cargar productos en Homepage:", error);
        setProductos([]);
      }
    };
    cargar();
  }, []);

  // Siempre aseguramos array
  const listaProductos = Array.isArray(productos) ? productos : [];

  // Productos destacados (los primeros 6)
  const productosDestacados = listaProductos.slice(0, 6);

  // Productos más vendidos (selección curada)
  const productosMasVendidosIds = [1, 3, 5, 7];
  const productosMasVendidos = listaProductos.filter(producto =>
    productosMasVendidosIds.includes(producto.id)
  );

  const handlePersonalizar = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleAgregarRapido = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="hero" style={{ position: 'relative', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {banner1 ? (
          <img 
            src={banner1}
            alt="Pastelería Mil Sabores" 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #d2691e 0%, #b25014 100%)',
            zIndex: 0
          }} />
        )}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}></div>
        <div className="hero-content">
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1rem',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨𝐬 𝐚 𝐏𝐚𝐬𝐭𝐞𝐥𝐞𝐫í𝐚 𝐌𝐢𝐥 𝐒𝐚𝐛𝐨𝐫𝐞𝐬
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            marginBottom: '2rem',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            🎂 Creando momentos dulces desde 1995 🎂
          </p>
          <button 
            onClick={() => navigate('/productos')}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #d2691e 0%, #b25014 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 5px 20px rgba(210, 105, 30, 0.4)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Ver Productos
          </button>
        </div>
      </section>

      {/* ===== CARACTERÍSTICAS ===== */}
      <section className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Star size={50} style={{ color: '#d2691e', marginBottom: '1rem' }} />
            <h3 style={{ color: '#7a4b2d', marginBottom: '0.5rem' }}>Calidad Premium</h3>
            <p style={{ color: '#666' }}>Ingredientes de primera calidad en todos nuestros productos</p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Heart size={50} style={{ color: '#d2691e', marginBottom: '1rem' }} />
            <h3 style={{ color: '#7a4b2d', marginBottom: '0.5rem' }}>Hecho con Amor</h3>
            <p style={{ color: '#666' }}>Cada producto es elaborado artesanalmente con dedicación</p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Clock size={50} style={{ color: '#d2691e', marginBottom: '1rem' }} />
            <h3 style={{ color: '#7a4b2d', marginBottom: '0.5rem' }}>Entrega Rápida</h3>
            <p style={{ color: '#666' }}>Entregamos tu pedido fresco el mismo día</p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Award size={50} style={{ color: '#d2691e', marginBottom: '1rem' }} />
            <h3 style={{ color: '#7a4b2d', marginBottom: '0.5rem' }}>29 Años de Experiencia</h3>
            <p style={{ color: '#666' }}>Desde 1995 endulzando tus momentos especiales</p>
          </div>
        </div>
      </section>

      {/* 🧁 Productos Más Vendidos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-amber-800 mb-6">
            🧁 Productos Más Vendidos
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Los favoritos de nuestros clientes, elaborados con amor y calidad premium
          </p>

          {!!productosMasVendidos.length && (
            <div className="relative">
              <Slider
                infinite
                autoplay
                autoplaySpeed={2600}
                slidesToShow={Math.min(productosMasVendidos.length, 4)}
                slidesToScroll={1}
                pauseOnHover
                arrows={false}
                responsive={[
                  { breakpoint: 1280, settings: { slidesToShow: 3 } },
                  { breakpoint: 1024, settings: { slidesToShow: 2 } },
                  { breakpoint: 768, settings: { slidesToShow: 1 } },
                ]}
              >
                {productosMasVendidos.map((producto) => (
                  <div key={producto.id} className="px-3">
                    <div
                      className="rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300 bg-white overflow-hidden flex flex-col"
                      style={{ border: "1px solid #f0e6d8" }}
                    >
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-56 object-cover"
                      />

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-amber-900 mb-2">
                          {producto.nombre}
                        </h3>

                        <div
                          style={{
                            background: "white",
                            padding: "10px 15px",
                            borderRadius: "12px",
                            border: "1px solid #efddb5",
                            marginBottom: "10px",
                            color: "#6d4b33",
                            lineHeight: "1.4",
                            fontSize: "14px",
                            minHeight: "70px",
                          }}
                        >
                          {producto.descripcion}
                        </div>

                        <p className="text-amber-700 font-bold text-lg mb-4">
                          ${producto.precio.toLocaleString("es-CL")}
                        </p>

                        <button
                          onClick={() => handlePersonalizar(producto)}
                          style={{
                            width: "100%",
                            background:
                              "linear-gradient(135deg, #d2691e, #b25014)",
                            color: "white",
                            padding: "10px 15px",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "25px",
                            cursor: "pointer",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            transition: "background 0.3s",
                          }}
                          className="mt-auto hover:opacity-90"
                        >
                          Personalizar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </section>

      {/* ===== PRODUCTOS DESTACADOS ===== */}
      <section className="container products" style={{ padding: '4rem 2rem' }}>
        <h2 className="section-title" style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          fontSize: '2.5rem',
          color: '#7a4b2d'
        }}>
          𝐏𝐫𝐨𝐝𝐮𝐜𝐭𝐨𝐬 𝐃𝐞𝐬𝐭𝐚𝐜𝐚𝐝𝐨𝐬
        </h2>

        <div className="cards">
          {productosDestacados.map(producto => (
            <article key={producto.id} className="card">
              <img src={producto.imagen} alt={producto.nombre} />
              <div className="card-body">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <div className="product-price">
                  ${producto.precio.toLocaleString('es-CL')}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="add-to-cart"
                    onClick={() => handlePersonalizar(producto)}
                    style={{ flex: 1 }}
                  >
                    Personalizar
                  </button>
                  <button
                    onClick={() => handleAgregarRapido(producto)}
                    style={{
                      padding: '0.8rem 1rem',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MODAL DE PERSONALIZACIÓN */}
      {showModal && productoSeleccionado && (
        <PersonalizeModal
          producto={productoSeleccionado}
          onClose={() => {
            setShowModal(false);
            setProductoSeleccionado(null);
          }}
        />
      )}
    </div>
  );
}
