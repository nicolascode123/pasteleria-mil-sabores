import React from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/56912345678',
      Icon: MessageCircle,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      Icon: Instagram,
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com',
      Icon: Youtube,
    },
  ];

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
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  transition: 'transform 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </a>
            ))}
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