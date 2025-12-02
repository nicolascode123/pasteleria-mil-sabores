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
    <section className="container products" style={{ padding: "4rem 2rem" }}>
      <h1
        className="section-title"
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          fontSize: "2.5rem",
          color: "#7a4b2d",
        }}
      >
        Catálogo de Productos
      </h1>

      {/* Se puede mostrar un pequeño texto de filtro activo si quieres */}
      {(busqueda || categoria !== "todas") && (
        <p style={{ textAlign: "center", color: "#7a4b2d", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          {busqueda && <>Búsqueda: <strong>"{busqueda}"</strong>{categoria !== "todas" && " · "}</>}
          {categoria !== "todas" && <>Categoría: <strong>{categoria}</strong></>}
        </p>
      )}

      {cargando ? (
        <p>Cargando productos...</p>
      ) : !productosFiltrados.length ? (
        <p>No se encontraron productos con los filtros seleccionados.</p>
      ) : (
        <div className="cards">
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="card">
              <img src={producto.imagen} alt={producto.nombre} />
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
