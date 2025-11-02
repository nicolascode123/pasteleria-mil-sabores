// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import AppRouter from './router/AppRouter';
import { inicializarDatos } from './data/store';
import './styles/styleindex.css';

function App() {
  useEffect(() => {
    // Inicializar datos al cargar la app
    inicializarDatos();
  }, []);

  return (
    <BrowserRouter>
      <AppProvider>
        <div className="App" style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <Navbar />
          <main style={{ flex: '1' }}>
            <AppRouter />
          </main>
          <Footer />
          <Toast />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;