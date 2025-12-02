// src/pages/ProductsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getProductos } from "../data/store";
import "../styles/styleindex.css";

export default function ProductsPage() {
  const { agregarAlCarrito } = useApp();
  const location = useLocation();

  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  // Leer filtros desde la URL: ?q=...&categoria=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qParam = params.get("q") || "";
    const catParam = params.get("categoria") || "todas";

    setBusqueda(qParam);
    setCategoria(catParam);
  }, [location.search]);

  // Cargar productos
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductos();
        setProductos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar productos en ProductsPage:", error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  // Obtener categorías únicas dinámicamente desde los productos
  const categoriasDisponibles = useMemo(() => {
    if (!productos || productos.length === 0) return [];
    
    const categoriasSet = new Set();
    productos.forEach(producto => {
      if (producto.categoria) {
        categoriasSet.add(producto.categoria);
      }
    });
    
    return Array.from(categoriasSet).sort();
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    let resultado = Array.isArray(productos) ? [...productos] : [];

    if (categoria !== "todas") {
      resultado = resultado.filter(
        (p) =>
          p.categoria &&
          p.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    if (busqueda.trim() !== "") {
      const q = busqueda.toLowerCase();
      resultado = resultado.filter(
        (p) =>
          p.nombre?.toLowerCase().includes(q) ||
          p.descripcion?.toLowerCase().includes(q)
      );
    }

    return resultado;
  }, [productos, categoria, busqueda]);

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
  };

  return (
    <section className="container products" style={{ padding: "4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h1
        className="section-title"
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          fontSize: "2.5rem",
          color: "#7a4b2d",
        }}
      >
        Nuestros Productos
      </h1>

      {/* Filtros de categoría */}
      <div style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "3rem",
        padding: "1.5rem",
        background: "#fff7f0",
        borderRadius: "15px"
      }}>
        <button
          onClick={() => setCategoria("todas")}
          style={{
            padding: "0.8rem 1.5rem",
            border: categoria === "todas" ? "none" : "2px solid #d2691e",
            background: categoria === "todas" ? "linear-gradient(135deg, #d2691e 0%, #b25014 100%)" : "white",
            color: categoria === "todas" ? "white" : "#d2691e",
            borderRadius: "25px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s"
          }}
        >
          Todos ({productos.length})
        </button>
        
        {categoriasDisponibles.map((cat) => {
          const cantidad = productos.filter(p => p.categoria === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              style={{
                padding: "0.8rem 1.5rem",
                border: categoria === cat ? "none" : "2px solid #d2691e",
                background: categoria === cat ? "linear-gradient(135deg, #d2691e 0%, #b25014 100%)" : "white",
                color: categoria === cat ? "white" : "#d2691e",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s"
              }}
            >
              {cat} ({cantidad})
            </button>
          );
        })}
      </div>

      {/* Se puede mostrar un pequeño texto de filtro activo si quieres */}
      {(busqueda || categoria !== "todas") && (
        <p style={{ textAlign: "center", color: "#7a4b2d", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          {busqueda && <>Búsqueda: <strong>"{busqueda}"</strong>{categoria !== "todas" && " · "}</>}
          {categoria !== "todas" && <>Categoría: <strong>{categoria}</strong></>}
        </p>
      )}

      {cargando ? (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <p style={{ fontSize: "1.2rem", color: "#7a4b2d" }}>Cargando productos...</p>
        </div>
      ) : !productosFiltrados.length ? (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <p style={{ fontSize: "1.1rem", color: "#666" }}>No se encontraron productos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="cards">
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="card">
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200/6c757d/ffffff?text=' + encodeURIComponent(producto.nombre.substring(0, 20));
                }}
              />
              <div className="card-body">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <div className="product-price">
                  ${producto.precio.toLocaleString("es-CL")}
                </div>
                <button
                  className="add-to-cart"
                  onClick={() => handleAgregar(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
