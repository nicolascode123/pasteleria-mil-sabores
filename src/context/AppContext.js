// src/context/AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getCarrito, 
  saveCarrito, 
  clearCarrito,
  getCurrentUser,
  setCurrentUser as saveCurrentUser,
  createPedido,
  getProductos
} from '../data/store';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Cargar datos iniciales
  useEffect(() => {
    setCarrito(getCarrito());
    setCurrentUser(getCurrentUser());
    
    // Cargar productos de la API
    const cargarProductos = async () => {
      const productosData = await getProductos();
      setProductos(productosData);
    };
    cargarProductos();
  }, []);

  // Guardar carrito cuando cambia
  useEffect(() => {
    if (carrito.length >= 0) {
      saveCarrito(carrito);
    }
  }, [carrito]);

  // ==================== CARRITO ====================

  const agregarAlCarrito = (producto, personalizacion = null) => {
    let productoFinal = { ...producto };

    // Si hay personalización, ajustar precio
    if (personalizacion) {
      const precioExtra = personalizacion.precioExtra || 0;
      productoFinal = {
        ...producto,
        id: `${producto.id}-${Date.now()}`, // ID único para productos personalizados
        precio: producto.precio + precioExtra,
        personalizacion,
        nombre: `${producto.nombre} - ${personalizacion.forma} ${personalizacion.tamaño}`
      };
    }

    // Aplicar descuentos del usuario
    if (currentUser && currentUser.discounts && currentUser.discounts.length > 0) {
      let precioConDescuento = productoFinal.precio;
      currentUser.discounts.forEach(discount => {
        precioConDescuento -= (precioConDescuento * discount.value / 100);
      });
      productoFinal.precio = Math.round(precioConDescuento);
    }

    const itemExistente = carrito.find(item => 
      item.id === productoFinal.id && 
      JSON.stringify(item.personalizacion || {}) === JSON.stringify(productoFinal.personalizacion || {})
    );

    if (itemExistente && !personalizacion) {
      setCarrito(carrito.map(item =>
        item.id === productoFinal.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...productoFinal, cantidad: 1 }]);
    }

    mostrarToast(`${producto.nombre} agregado al carrito`);
  };

  const cambiarCantidad = (id, cambio) => {
    setCarrito(prevCarrito => {
      return prevCarrito.map(item =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad + cambio) }
          : item
      );
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
    mostrarToast('Producto eliminado del carrito', 'info');
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    clearCarrito();
  };

  const calcularTotal = () => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  // ==================== USUARIO ====================

  const login = (userData) => {
    setCurrentUser(userData);
    saveCurrentUser(userData);
    mostrarToast(`¡Bienvenido ${userData.name}!`);
  };

  const logout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
    vaciarCarrito();
    mostrarToast('Sesión cerrada correctamente');
  };

  const registrar = (userData) => {
    // Aplicar descuentos según condiciones
    const newUser = { 
      ...userData, 
      id: Date.now(),
      discounts: [], 
      freeBirthday: false 
    };

    if (userData.age >= 50) {
      newUser.discounts.push({
        type: 'age',
        value: 50,
        description: 'Descuento del 50% por ser mayor de 50 años'
      });
    }

    if (userData.promoCode === 'FELICES50') {
      newUser.discounts.push({
        type: 'promo',
        value: 10,
        description: 'Descuento del 10% de por vida con código FELICES50'
      });
    }

    if (userData.email && userData.email.includes('@duocuc.cl')) {
      newUser.freeBirthday = true;
    }

    login(newUser);
    return newUser;
  };

  // ==================== PEDIDOS ====================

  const procesarCompra = () => {
    if (carrito.length === 0) {
      mostrarToast('Tu carrito está vacío', 'error');
      return false;
    }

    if (!currentUser) {
      mostrarToast('Debes iniciar sesión para comprar', 'error');
      return false;
    }

    const total = calcularTotal();
    const pedido = {
      usuario: currentUser.id,
      items: [...carrito],
      total: total,
      fecha: new Date().toISOString()
    };

    createPedido(pedido);

    let mensaje = `¡Gracias por tu compra de $${total.toLocaleString('es-CL')}!`;
    
    if (currentUser.freeBirthday && carrito.some(item => 
      item.categoria && item.categoria.includes('torta')
    )) {
      mensaje += ' ¡Como estudiante Duoc, tu primera torta es gratis! 🎉';
    }

    mostrarToast(mensaje, 'success', 5000);
    vaciarCarrito();
    return true;
  };

  // ==================== TOAST ====================

  const mostrarToast = (message, type = 'success', duration = 3000) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, duration);
  };

  // ==================== BÚSQUEDA Y FILTROS ====================

  const buscarProductos = (termino) => {
    if (!termino || termino.trim() === '') {
      return productos;
    }
    
    const terminoLower = termino.toLowerCase().trim();
    
    return productos.filter(p => {
      // Verificar que las propiedades existan antes de hacer toLowerCase
      const nombre = p.nombre ? p.nombre.toLowerCase() : '';
      const descripcion = p.descripcion ? p.descripcion.toLowerCase() : '';
      
      // Manejar categorías tanto si es array como string
      let categorias = '';
      if (Array.isArray(p.categorias)) {
        categorias = p.categorias.join(' ').toLowerCase();
      } else if (p.categoria) {
        categorias = p.categoria.toLowerCase();
      }
      
      return nombre.includes(terminoLower) || 
             descripcion.includes(terminoLower) || 
             categorias.includes(terminoLower);
    });
  };

  const filtrarPorCategoria = (categoria) => {
    if (categoria === 'todos') return productos;
    
    return productos.filter(p => {
      // Manejar tanto 'categoria' como 'categorias'
      if (Array.isArray(p.categorias)) {
        return p.categorias.includes(categoria);
      }
      return p.categoria === categoria;
    });
  };

  const value = {
    // Estado
    carrito,
    currentUser,
    productos,
    toast,
    totalItems,
    
    // Carrito
    agregarAlCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    calcularTotal,
    
    // Usuario
    login,
    logout,
    registrar,
    
    // Pedidos
    procesarCompra,
    
    // Utilidades
    mostrarToast,
    buscarProductos,
    filtrarPorCategoria
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};