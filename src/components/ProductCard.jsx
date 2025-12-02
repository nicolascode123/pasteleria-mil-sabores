import React from "react";

export default function ProductCard({ producto, onAdd }) {
  const { nombre, precio, categoria, imagen, tienda, stock } = producto;
  
  // Determinar la URL de la imagen - corregir URLs de placeholder rotas
  let imageUrl;
  if (imagen && imagen.startsWith('http')) {
    // Corregir URLs de via.placeholder.com mal formadas
    imageUrl = imagen.replace(/https:\/\/via\.placeholder\.com\/(\d+x\d+)\/([^/]+)\/([^?]+)\?text=(.+)/, 
      'https://via.placeholder.com/$1/$2/$3?text=$4');
  } else if (imagen && imagen.startsWith('/')) {
    imageUrl = imagen;
  } else if (imagen) {
    imageUrl = `/imagenes/${imagen}`;
  } else {
    imageUrl = null;
  }
  
  return (
    <div className="card h-100">
      {imageUrl && (
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={nombre}
          style={{ objectFit: 'cover', height: '200px' }}
          onError={(e) => {
            e.target.onerror = null;
            // Si falla, usar un placeholder genérico
            e.target.src = 'https://via.placeholder.com/300x200/6c757d/ffffff?text=' + encodeURIComponent(nombre.substring(0, 20));
          }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text text-muted mb-2">{categoria}</p>
        {tienda && <p className="card-text text-secondary small mb-1">📍 {tienda}</p>}
        <p className="fw-bold mb-3">${precio?.toLocaleString("es-CL")}</p>
        {stock !== undefined && (
          <span className={`badge ${stock > 0 ? 'bg-success' : 'bg-danger'} mb-2`}>
            {stock > 0 ? `Stock: ${stock}` : 'Sin stock'}
          </span>
        )}
        <button 
          className="btn btn-dark mt-auto" 
          onClick={() => onAdd?.(producto)}
          disabled={stock === 0}
        >
          {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
}
