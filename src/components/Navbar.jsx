// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Search, ShoppingCart, User, LogOut } from 'lucide-react';
import "../styles/styleindex.css";

export default function Navbar() {
  const { currentUser, totalItems, buscarProductos, logout } = useApp();
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleBusqueda = (e) => {
    const query = e.target.value;
    setBusqueda(query);
    
    if (query.length >= 2) {
      const results = buscarProductos(query);
      setResultados(results);
      setShowResults(true);
    } else {
      setResultados([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (producto) => {
    setBusqueda('');
    setShowResults(false);
    navigate(`/productos`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">
            <img
              src={require("../imagenes/logo.png")}
              alt="Pastelería Mil Sabores"
              className="logo"
            />
          </Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Nosotros</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/stores">Tiendas</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>

        <div className="nav-right">
          {/* BÚSQUEDA */}
          <div className="search-container">
            <input
              type="text"
              id="searchInput"
              placeholder="Buscar productos..."
              className="search-bar"
              value={busqueda}
              onChange={handleBusqueda}
              onFocus={() => resultados.length > 0 && setShowResults(true)}
            />
            <button className="search-btn">
              <Search size={20} />
            </button>
            
            {/* RESULTADOS DE BÚSQUEDA */}
            {showResults && resultados.length > 0 && (
              <div className="search-results" style={{ display: 'block' }}>
                {resultados.map(producto => (
                  <div
                    key={producto.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(producto)}
                  >
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre} 
                      className="search-result-img"
                    />
                    <div className="search-result-info">
                      <h4>{producto.nombre}</h4>
                      <p>{producto.descripcion.substring(0, 60)}...</p>
                      <div className="search-result-price">
                        ${producto.precio.toLocaleString('es-CL')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PERFIL / AUTH */}
          {currentUser ? (
            <>
              <Link to="/perfil" className="perfil" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} />
                {currentUser.name}
              </Link>
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