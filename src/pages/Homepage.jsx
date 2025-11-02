// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PersonalizeModal from '../components/PersonalizeModal';
import { Star, Heart, Award, Clock } from 'lucide-react';
import '../styles/styleindex.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importar imágenes localmente (con fallback si no existe)
let banner1, personas;
try {
  banner1 = require('../imagenes/banner1.png');
} catch (e) {
  console.log('Banner1 no encontrado, usando fallback');
  banner1 = null;
}

try {
  personas = require('../imagenes/personas.png');
} catch (e) {
  console.log('Personas no encontrada');
  personas = null;
}

export default function HomePage() {
  const navigate = useNavigate();
  const { productos, agregarAlCarrito } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Productos destacados (los primeros 6)
  const productosDestacados = productos.slice(0, 6);

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
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 30px rgba(210, 105, 30, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 5px 20px rgba(210, 105, 30, 0.4)';
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

    <div className="relative">
      <Slider
        infinite
        autoplay
        autoplaySpeed={2500}
        slidesToShow={4}
        slidesToScroll={1}
        pauseOnHover
        arrows={false}
        responsive={[
          { breakpoint: 1280, settings: { slidesToShow: 3 } },
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } },
        ]}
      >
        {productos.slice(0, 8).map((producto) => (
          <div key={producto.id} className="px-3">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300 overflow-hidden">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-amber-900 mb-2">
                  {producto.nombre}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {producto.descripcion}
                </p>
                <p className="text-amber-700 font-bold text-lg mb-4">
                  ${producto.precio.toLocaleString("es-CL")}
                </p>
                <button
                  onClick={() =>{
    setProductoActual(producto);
    setMostrarPersonalizacion(true);
  }}
  className="bg-amber-600 text-white px-5 py-2 rounded-full hover:bg-amber-700 transition"
>
  Personalizar
</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
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
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
              />
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
                    onMouseOver={(e) => {
                      e.target.style.background = '#218838';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#28a745';
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={() => navigate('/productos')}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              background: 'white',
              color: '#d2691e',
              border: '3px solid #d2691e',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#d2691e';
              e.target.style.color = 'white';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#d2691e';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Ver Todos los Productos
          </button>
        </div>
      </section>

      {/* ===== NOSOTROS ===== */}
      <section id="nosotros" style={{ 
        padding: '4rem 2rem',
        background: 'white'
      }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            color: '#7a4b2d',
            marginBottom: '2rem'
          }}>
            📖 Nuestra Historia
          </h2>
          <p style={{ 
            fontSize: '1.2rem',
            color: '#666',
            lineHeight: '1.8'
          }}>
            Pastelería Mil Sabores celebra su 50 aniversario como un referente en la repostería chilena. 
            Famosa por su participación en un récord Guinness en 1995, cuando colaboró en la creación de la torta más grande del mundo, 
            nuestra pastelería busca ofrecer una experiencia dulce y memorable a nuestros clientes.
          </p>
        </div>
      </section>

      {/* ===== BENEFICIOS ESPECIALES ===== */}
      <section style={{ 
        background: 'linear-gradient(135deg, #fff7f0 0%, #ffefd6 100%)', 
        padding: '4rem 2rem'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            fontSize: '2.5rem',
            color: '#7a4b2d'
          }}>
            ✨ 𝐁𝐞𝐧𝐞𝐟𝐢𝐜𝐢𝐨𝐬 𝐄𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐞𝐬
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👴👵</div>
              <h3 style={{ color: '#d2691e', marginBottom: '1rem' }}>Mayores de 50 años</h3>
              <p style={{ color: '#666', fontSize: '1.1rem', fontWeight: 'bold' }}>
                50% de descuento en todos los productos
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
              <h3 style={{ color: '#d2691e', marginBottom: '1rem' }}>Estudiantes Duoc UC</h3>
              <p style={{ color: '#666', fontSize: '1.1rem', fontWeight: 'bold' }}>
                Primera torta de cumpleaños GRATIS
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <h3 style={{ color: '#d2691e', marginBottom: '1rem' }}>Código FELICES50</h3>
              <p style={{ color: '#666', fontSize: '1.1rem', fontWeight: 'bold' }}>
                10% de descuento de por vida
              </p>
            </div>
          </div>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(210, 105, 30, 0.1)',
            borderRadius: '10px'
          }}>
            <p style={{ color: '#7a4b2d', fontSize: '1.1rem', margin: 0 }}>
              💡 <strong>¿Sabías que?</strong> Los descuentos son acumulables. Regístrate para aplicarlos automáticamente.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CATEGORÍAS POPULARES ===== */}
      <section className="container" style={{ padding: '4rem 2rem' }}>
        <h2 className="section-title" style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          fontSize: '2.5rem',
          color: '#7a4b2d'
        }}>
          🍰 𝐂𝐚𝐭𝐞𝐠𝐨𝐫í𝐚𝐬 𝐏𝐨𝐩𝐮𝐥𝐚𝐫𝐞𝐬
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { nombre: 'Tortas Circulares', emoji: '🎂', categoria: 'tortas-circulares' },
            { nombre: 'Tortas Cuadradas', emoji: '🎨', categoria: 'tortas-cuadradas' },
            { nombre: 'Postres Individuales', emoji: '🧁', categoria: 'postres-individuales' },
            { nombre: 'Sin Azúcar', emoji: '🍃', categoria: 'sin-azucar' },
            { nombre: 'Sin Gluten', emoji: '🌾', categoria: 'sin-gluten' },
            { nombre: 'Veganas', emoji: '🥬', categoria: 'vegana' }
          ].map(cat => (
            <button
              key={cat.categoria}
              onClick={() => navigate('/productos')}
              style={{
                padding: '2rem 1rem',
                background: 'linear-gradient(135deg, #fff 0%, #f9f9f9 100%)',
                border: '2px solid #e8e8e8',
                borderRadius: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#7a4b2d'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.borderColor = '#d2691e';
                e.target.style.boxShadow = '0 10px 25px rgba(210, 105, 30, 0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                {cat.emoji}
              </div>
              {cat.nombre}
            </button>
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