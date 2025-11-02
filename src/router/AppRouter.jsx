// src/router/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/Homepage';
import AuthPage from '../pages/AuthPage';
import PerfilPage from '../pages/PerfilPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutSuccess from '../pages/CheckoutSuccess';
import CheckoutFail from '../pages/CheckoutFail';  // ⬅️ Sin llaves {}
import AdminDashboard from '../pages/AdminDashboard';
import ProductsPage from '../pages/ProductsPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Stores from '../pages/Stores';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/checkout-fail" element={<CheckoutFail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
      <Route path="*" element={
        <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '4rem', color: '#d2691e' }}>404</h1>
          <h2 style={{ color: '#7a4b2d' }}>Página no encontrada</h2>
          <a href="/" style={{ padding: '1rem 2rem', background: '#d2691e', color: 'white', textDecoration: 'none', borderRadius: '10px', marginTop: '1rem' }}>
            Volver al Inicio
          </a>
        </div>
      } />
    </Routes>
  );
}


