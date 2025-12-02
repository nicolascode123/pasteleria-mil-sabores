// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ShoppingCart, User, LogOut } from 'lucide-react';
import "../styles/styleindex.css";

export default function Navbar() {
  const { currentUser, totalItems, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar">
        {/* LOGO */}
        <div className="nav-left">
          <Link to="/">
            <img
              src={require("../imagenes/logo.png")}
              alt="Pastelería Mil Sabores"
              className="logo"
            />
          </Link>
        </div>

        {/* LINKS */}
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Nosotros</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/stores">Tiendas</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>

        {/* DERECHA: PERFIL + CARRITO */}
        <div className="nav-right">
          {/* PERFIL / AUTH */}
          {currentUser ? (
            <>
              {/* Mostrar enlace Admin solo si es administrador */}
              {currentUser.role === 'admin' && (
                <Link
                  to="/admin"
                  className="perfil"
                  style={{
                    background: 'linear-gradient(135deg, #d2691e, #b25014)',
                    color: 'white'
                  }}
                >
                  Admin Panel
                </Link>
              )}
              
              <button
                onClick={handleLogout}
                className="perfil"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={18} />
                Salir
              </button>
            </>
          ) : (
            <Link to="/auth" className="perfil">
              Iniciar Sesión
            </Link>
          )}

          {/* CARRITO */}
          <Link to="/cart" className="carrito-btn">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="carrito-count">{totalItems}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
