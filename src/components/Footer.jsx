import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #7a4b2d 0%, #5a3621 100%)',
      color: 'white',
      padding: '3rem 2rem 1rem',
      marginTop: '4rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* SOBRE NOSOTROS */}
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>
            Pastelería Mil Sabores
          </h3>
          <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
            Creando momentos dulces desde 1995. Productos artesanales con los mejores ingredientes.
          </p>
        </div>

        {/* CONTACTO */}
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Contacto</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} />
              <span>+56 9 1234 5678</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} />
              <span>contacto@milsabores.cl</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} />
              <span>Av. Principal 123, Santiago</span>
            </div>
          </div>
        </div>

        {/* REDES SOCIALES */}
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Síguenos</h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '1.5rem' }}>
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer"
               style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.3s' }}
               onMouseEnter={(e) => e.target.style.opacity = '0.7'}
               onMouseLeave={(e) => e.target.style.opacity = '1'}>
              WhatsApp
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.3s' }}
               onMouseEnter={(e) => e.target.style.opacity = '0.7'}
               onMouseLeave={(e) => e.target.style.opacity = '1'}>
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
               style={{ color: 'white', textDecoration: 'none', transition: 'opacity 0.3s' }}
               onMouseEnter={(e) => e.target.style.opacity = '0.7'}
               onMouseLeave={(e) => e.target.style.opacity = '1'}>
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.2)',
        paddingTop: '1rem',
        textAlign: 'center',
        opacity: 0.8
      }}>
        <p>© 2025 Pastelería Mil Sabores — Todos los derechos reservados</p>
      </div>
    </footer>
  );
}