import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ productos, onAdd }) {
  if (!productos?.length) return <p>No hay productos para mostrar.</p>;
  return (
    <div className="row g-3">
      {productos.map((p) => (
        <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <ProductCard producto={p} onAdd={onAdd} />
        </div>
      ))}
    </div>
  );
}
