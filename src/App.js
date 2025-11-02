// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import AppRouter from './router/AppRouter';
import { inicializarDatos } from './data/store';
import './index.css';
import './styles/styleindex.css';

function App() {
  useEffect(() => {
    // Inicializar datos al cargar la app
    inicializarDatos();
  }, []);

  return (
    <Router>
      <AppProvider>
        <div className="app-shell">
          <Navbar />
          <main className="app-content">
            <AppRouter />
          </main>
          <Footer />
          <Toast />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
