import React from "react";

export default function ProductCard({ producto, onAdd }) {
  const { nombre, precio, categoria, imagen } = producto;
  return (
    <div className="card h-100">
      {imagen && <img src={imagen.startsWith("/") ? imagen : `/imagenes/${imagen}`} className="card-img-top" alt={nombre} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text text-muted mb-2">{categoria}</p>
        <p className="fw-bold mb-3">${precio?.toLocaleString("es-CL")}</p>
        <button className="btn btn-dark mt-auto" onClick={() => onAdd?.(producto)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
