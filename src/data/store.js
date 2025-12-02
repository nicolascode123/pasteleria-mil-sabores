// src/data/store.js
import { fetchProductos } from '../services/api.ts';

// ========================================
// PRODUCTOS LOCALES (FALLBACK)
// ========================================
const productosBase = [
  {
    id: 1,
    codigo: "TC001",
    nombre: "Torta Cuadrada de Chocolate",
    descripcion:
      "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
    precio: 45000,
    imagen: require("../imagenes/tortacuadrada.png"),
    categoria: "tortas-cuadradas",
  },
  {
    id: 2,
    codigo: "TC002",
    nombre: "Torta Cuadrada de Frutas",
    descripcion:
      "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla.",
    precio: 50000,
    imagen: require("../imagenes/tortafrutas.png"),
    categoria: "tortas-cuadradas",
  },
  {
    id: 3,
    codigo: "TT001",
    nombre: "Bizcocho de Vainilla",
    descripcion:
      "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce.",
    precio: 40000,
    imagen: require("../imagenes/1.png"),
    categoria: "tortas-circulares",
  },
  {
    id: 4,
    codigo: "TT002",
    nombre: "Torta Circular de Manjar",
    descripcion:
      "Torta tradicional chilena con manjar y nueces, un deleite clásico.",
    precio: 42000,
    imagen: require("../imagenes/tortamanjar.png"),
    categoria: "tortas-circulares",
  },
  {
    id: 5,
    codigo: "PI001",
    nombre: "Mousse de Chocolate",
    descripcion:
      "Postre individual cremoso y suave, hecho con chocolate de alta calidad.",
    precio: 5000,
    imagen: require("../imagenes/mousse.png"),
    categoria: "postres-individuales",
  },
  {
    id: 6,
    codigo: "PI002",
    nombre: "Tiramisú Clásico",
    descripcion:
      "Un postre italiano individual con capas de café, mascarpone y cacao.",
    precio: 5500,
    imagen: require("../imagenes/xd.png"),
    categoria: "postres-individuales",
  },
  {
    id: 7,
    codigo: "PSA001",
    nombre: "Torta Sin Azúcar de Naranja",
    descripcion: "Torta ligera y deliciosa, endulzada naturalmente.",
    precio: 48000,
    imagen: require("../imagenes/naranja.png"),
    categoria: "sin-azucar",
  },
  {
    id: 8,
    codigo: "PSA002",
    nombre: "Cheesecake Sin Azúcar",
    descripcion: "Suave y cremoso, perfecto para disfrutar sin culpa.",
    precio: 47000,
    imagen: require("../imagenes/cheesecake.png"),
    categoria: "sin-azucar",
  },
  {
    id: 9,
    codigo: "PG001",
    nombre: "Brownie Sin Gluten",
    descripcion:
      "Rico y denso, perfecto para quienes evitan el gluten sin sacrificar sabor.",
    precio: 4000,
    imagen: require("../imagenes/brownie.png"),
    categoria: "sin-gluten",
  },
  {
    id: 10,
    codigo: "PG002",
    nombre: "Pan Sin Gluten",
    descripcion:
      "Suave y esponjoso, ideal para acompañar tus comidas favoritas.",
    precio: 3500,
    imagen: require("../imagenes/pan.png"),
    categoria: "sin-gluten",
  },
  {
    id: 11,
    codigo: "PV001",
    nombre: "Torta Vegana de Chocolate",
    descripcion:
      "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal.",
    precio: 50000,
    imagen: require("../imagenes/tortavegana.png"),
    categoria: "vegana",
  },
  {
    id: 12,
    codigo: "PV002",
    nombre: "Galletas Veganas de Avena",
    descripcion:
      "Crujientes y sabrosas, perfectas para un snack saludable y vegano.",
    precio: 4500,
    imagen: require("../imagenes/galletasavena.png"),
    categoria: "vegana",
  },
  {
    id: 13,
    codigo: "TE001",
    nombre: "Torta Especial de Cumpleaños",
    descripcion:
      "Diseñada especialmente para celebraciones, personalizable con decoraciones únicas.",
    precio: 55000,
    imagen: require("../imagenes/tortacumple.png"),
    categoria: "especiales",
  },
  {
    id: 14,
    codigo: "TE002",
    nombre: "Torta Especial de Boda",
    descripcion:
      "Elegante y deliciosa, ideal para el día más importante de tu vida.",
    precio: 60000,
    imagen: require("../imagenes/boda.png"),
    categoria: "especiales",
  },
];

// Array que se usará en runtime (inicia con los locales)
let productos = [...productosBase];

// Imagen genérica por si la API no trae imagen
const imagenPlaceholder = productosBase[0]?.imagen;

// ========================================
// FUNCIONES PÚBLICAS - PRODUCTOS
// ========================================

export const getProductos = async () => {
  try {
    // Llamar a la API usando el servicio
    const productosAPI = await fetchProductos(imagenPlaceholder);
    
    // Si la API retorna productos, usarlos
    if (productosAPI && productosAPI.length > 0) {
      productos = productosAPI;
      return productosAPI;
    }
    
    // Si no hay productos de la API, usar locales
    console.warn("Usando productos locales de fallback");
    return productos;
  } catch (error) {
    console.error("Error al obtener productos, usando datos locales:", error);
    return productos;
  }
};

// ========================================
// CARRITO (LocalStorage)
// ========================================

export const getCarrito = () => {
  try {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
  } catch (error) {
    console.error("Error al cargar carrito:", error);
    return [];
  }
};

export const saveCarrito = (carrito) => {
  try {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } catch (error) {
    console.error("Error al guardar carrito:", error);
  }
};

export const clearCarrito = () => {
  try {
    localStorage.removeItem("carrito");
  } catch (error) {
    console.error("Error al limpiar carrito:", error);
  }
};

// ========================================
// USUARIOS (LocalStorage)
// ========================================

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error al cargar usuario:", error);
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  } catch (error) {
    console.error("Error al guardar usuario:", error);
  }
};

// ========================================
// PEDIDOS (LocalStorage)
// ========================================

export const createPedido = (pedido) => {
  try {
    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    const nuevoPedido = {
      ...pedido,
      id: Date.now(),
      fecha: new Date().toISOString(),
      estado: "pendiente",
    };
    pedidos.push(nuevoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    return nuevoPedido;
  } catch (error) {
    console.error("Error al crear pedido:", error);
    return null;
  }
};

export const getPedidosByUser = (userId) => {
  try {
    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    return pedidos.filter((p) => p.usuario === userId);
  } catch (error) {
    console.error("Error al cargar pedidos:", error);
    return [];
  }
};

export const getPedidos = () => {
  try {
    return JSON.parse(localStorage.getItem("pedidos") || "[]");
  } catch (error) {
    console.error("Error al cargar pedidos:", error);
    return [];
  }
};

// ========================================
// ADMIN - GESTIÓN DE PRODUCTOS (en memoria)
// ========================================

export const createProducto = (producto) => {
  try {
    const nuevoProducto = {
      ...producto,
      id: Date.now(),
      codigo: `PROD${Date.now()}`,
      imagen: producto.imagen || imagenPlaceholder,
    };
    productos.push(nuevoProducto);
    return nuevoProducto;
  } catch (error) {
    console.error("Error al crear producto:", error);
    return null;
  }
};

export const updateProducto = (productoActualizado) => {
  try {
    const index = productos.findIndex(
      (p) => p.id === parseInt(productoActualizado.id)
    );
    if (index !== -1) {
      productos[index] = { ...productos[index], ...productoActualizado };
      return productos[index];
    }
    return null;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return null;
  }
};

export const deleteProducto = (id) => {
  try {
    const index = productos.findIndex((p) => p.id === parseInt(id));
    if (index !== -1) {
      productos.splice(index, 1);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return false;
  }
};

// ========================================
// INICIALIZACIÓN
// ========================================

export const inicializarDatos = () => {
  // Por compatibilidad con tu código anterior
  // Los datos locales ya están en productosBase y productos
  console.log("Datos inicializados correctamente (local + API fallback)");
};
