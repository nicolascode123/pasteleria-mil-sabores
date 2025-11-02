// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/styleauth.css';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [showAgeDiscount, setShowAgeDiscount] = useState(false);
  const { login, registrar, currentUser } = useApp();
  const navigate = useNavigate();

  // Si ya está logueado, redirigir al perfil
  useEffect(() => {
    if (currentUser) {
      navigate('/perfil');
    }
  }, [currentUser, navigate]);

  // Formulario de Login
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Formulario de Registro
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    promoCode: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulación de login (en producción validarías con backend)
    const userData = {
      id: Date.now(),
      name: loginForm.email.split('@')[0],
      email: loginForm.email,
      discounts: []
    };

    login(userData);
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    const newUser = registrar({
      id: Date.now(),
      name: registerForm.name,
      email: registerForm.email,
      age: parseInt(registerForm.age),
      promoCode: registerForm.promoCode
    });

    if (newUser) {
      navigate('/');
    }
  };

  const handleAgeChange = (e) => {
    const age = parseInt(e.target.value);
    setRegisterForm({ ...registerForm, age: e.target.value });
    setShowAgeDiscount(age >= 50);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={activeTab === 'register' ? 'active' : ''}
            onClick={() => setActiveTab('register')}
          >
            Registrarse
          </button>
        </div>

        {/* LOGIN FORM */}
        <div className={`tab ${activeTab === 'login' ? 'active' : ''}`}>
          <h3>Iniciar Sesión</h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
            <button type="submit" className="action-btn">
              Ingresar
            </button>
          </form>
        </div>

        {/* REGISTER FORM */}
        <div className={`tab ${activeTab === 'register' ? 'active' : ''}`}>
          <h3>Crear Cuenta</h3>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Edad"
              value={registerForm.age}
              onChange={handleAgeChange}
              min="1"
              max="120"
              required
            />
            {showAgeDiscount && (
              <div className="age-discount" style={{ display: 'block' }}>
                ✨ ¡Descuento del 50% por ser mayor de 50 años!
              </div>
            )}
            <input
              type="password"
              placeholder="Contraseña"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              required
              minLength="6"
            />
            
            <div className="promo-code-section">
              <h4>¿Tienes un código promocional?</h4>
              <p>Usa el código <strong>FELICES50</strong> para obtener 10% de descuento de por vida</p>
              <input
                type="text"
                placeholder="Código promocional (opcional)"
                value={registerForm.promoCode}
                onChange={(e) => setRegisterForm({ ...registerForm, promoCode: e.target.value })}
              />
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                💡 Tip: Si eres estudiante de Duoc UC, usa tu email @duocuc.cl para una torta gratis en tu cumpleaños
              </p>
            </div>

            <button type="submit" className="action-btn">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}