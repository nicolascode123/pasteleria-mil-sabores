// src/services/api.ts

const API_BASE = "https://api-dfs2-dm-production.up.railway.app/api";

// Tipos de datos de la API
export interface ProductoAPI {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  categoria_id: number;
  categoria_nombre: string;
  imagen: string;
  stock: number;
  unidad: string;
  destacado: boolean;
  tienda_id: number;
  tienda_nombre: string;
  tienda_slug?: string;
  created_at?: string;
  updated_at?: string;
}

// Tipo de producto normalizado para la app
export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  stock: number;
  unidad: string;
  destacado: boolean;
  tienda: string;
  tienda_id?: number;
  categoria_id?: number;
}

// Adaptador: convierte formato API → formato App
const mapProductoApi = (item: ProductoAPI, imagenPlaceholder?: any): Producto => ({
  id: item.id,
  codigo: `PROD-${item.id}`,
  nombre: item.nombre || "Producto sin nombre",
  descripcion: item.descripcion || "",
  precio: parseFloat(item.precio) || 0,
  categoria: item.categoria_nombre || "general",
  imagen: item.imagen || imagenPlaceholder || "",
  stock: item.stock || 0,
  unidad: item.unidad || "unidad",
  destacado: item.destacado || false,
  tienda: item.tienda_nombre || "",
  tienda_id: item.tienda_id,
  categoria_id: item.categoria_id,
});

/**
 * Obtiene todos los productos desde la API
 * @param imagenPlaceholder - Imagen por defecto si la API no tiene imagen
 * @returns Array de productos normalizados
 */
export const fetchProductos = async (imagenPlaceholder?: any): Promise<Producto[]> => {
  console.log("Obteniendo productos de la API...");

  try {
    const resp = await fetch(`${API_BASE}/productos`);
    console.log("Status de respuesta:", resp.status);

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data: ProductoAPI[] = await resp.json();
    console.log("Datos obtenidos de la API:", data);

    if (!Array.isArray(data)) {
      console.warn("La API no devolvió un array");
      return [];
    }

    if (data.length === 0) {
      console.warn("La API devolvió un array vacío");
      return [];
    }

    const normalizados = data.map(item => mapProductoApi(item, imagenPlaceholder));
    console.log("Productos normalizados desde API:", normalizados);

    return normalizados;
  } catch (error) {
    console.error("Error al obtener productos desde la API:", error);
    return [];
  }
};

/**
 * Obtiene un producto por ID
 */
export const fetchProductoById = async (id: number): Promise<Producto | null> => {
  try {
    const resp = await fetch(`${API_BASE}/productos/${id}`);
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
    
    const data: ProductoAPI = await resp.json();
    return mapProductoApi(data);
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    return null;
  }
};

/**
 * Obtiene productos por categoría
 */
export const fetchProductosByCategoria = async (categoriaId: number): Promise<Producto[]> => {
  try {
    const resp = await fetch(`${API_BASE}/productos?categoria_id=${categoriaId}`);
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
    
    const data: ProductoAPI[] = await resp.json();
    return Array.isArray(data) ? data.map(item => mapProductoApi(item)) : [];
  } catch (error) {
    console.error(`Error al obtener productos de categoría ${categoriaId}:`, error);
    return [];
  }
};

/**
 * Actualiza un producto en la API
 */
export const updateProductoAPI = async (id: number, producto: Partial<Producto>): Promise<boolean> => {
  try {
    // Formatear precio: asegurarse de que sea un número con dos decimales
    const precioFormateado = Number(producto.precio || 0).toFixed(2);
    
    const payload = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: precioFormateado,
      stock: producto.stock,
      unidad: producto.unidad,
      imagen: producto.imagen,
      tienda_id: producto.tienda_id || 1,
      categoria_id: producto.categoria_id || 1,
    };

    console.log('Actualizando producto ID:', id);
    console.log('Payload completo:', JSON.stringify(payload, null, 2));
    
    const resp = await fetch(`${API_BASE}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => null);
      console.error(`Error al actualizar producto: ${resp.status}`);
      console.error('Detalle del error:', JSON.stringify(errorData, null, 2));
      
      // Si hay un mensaje de error de la API, mostrarlo
      if (errorData?.error || errorData?.message) {
        alert(`Error de la API: ${errorData.error || errorData.message}`);
      } else {
        alert(`Error al actualizar producto: ${resp.status}`);
      }
      return false;
    }

    console.log(`Producto ${id} actualizado exitosamente en la API`);
    return true;
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error);
    alert(`Error de conexión: ${error}`);
    return false;
  }
};

/**
 * Crea un nuevo producto en la API
 */
export const createProductoAPI = async (producto: Partial<Producto>): Promise<Producto | null> => {
  try {
    // Formatear precio: asegurarse de que sea un número con dos decimales
    const precioFormateado = Number(producto.precio || 0).toFixed(2);
    
    const payload = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: precioFormateado,
      stock: producto.stock,
      unidad: producto.unidad,
      imagen: producto.imagen,
      categoria_id: 1, // Valor por defecto, ajustar según necesidad
      tienda_id: 1, // Valor por defecto, ajustar según necesidad
    };

    console.log('Creando producto con payload:', payload);
    
    const resp = await fetch(`${API_BASE}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => null);
      console.error(`Error al crear producto: ${resp.status}`, errorData);
      
      // Si hay un mensaje de error de la API, mostrarlo
      if (errorData?.error || errorData?.message) {
        alert(`Error de la API: ${errorData.error || errorData.message}`);
      } else {
        alert(`Error al crear producto: ${resp.status}`);
      }
      return null;
    }

    const data: ProductoAPI = await resp.json();
    console.log('Producto creado exitosamente en la API');
    return mapProductoApi(data);
  } catch (error) {
    console.error('Error al crear producto:', error);
    alert(`Error de conexión: ${error}`);
    return null;
  }
};

/**
 * Elimina un producto de la API
 */
export const deleteProductoAPI = async (id: number): Promise<boolean> => {
  try {
    const resp = await fetch(`${API_BASE}/productos/${id}`, {
      method: 'DELETE',
    });

    if (!resp.ok) {
      console.error(`Error al eliminar producto: ${resp.status}`);
      return false;
    }

    console.log(`Producto ${id} eliminado exitosamente de la API`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}:`, error);
    return false;
  }
};

export default {
  fetchProductos,
  fetchProductoById,
  fetchProductosByCategoria,
  updateProductoAPI,
  createProductoAPI,
  deleteProductoAPI,
};
