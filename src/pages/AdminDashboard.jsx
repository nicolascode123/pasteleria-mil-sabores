import React, { useEffect, useState } from "react";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../data/store";

const emptyForm = { id: null, nombre: "", precio: 0, categoria: "", imagen: "" };

export default function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editMode, setEditMode] = useState(false);

  const refresh = () => setProductos(getProductos());

  useEffect(() => { refresh(); }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateProducto(form);
    } else {
      createProducto({ ...form });
    }
    setForm(emptyForm); setEditMode(false); refresh();
  };

  const onEdit = (p) => { setForm(p); setEditMode(true); };
  const onDelete = (id) => { deleteProducto(id); refresh(); };

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-7">
        <h2 className="mb-3">Productos</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Imagen</th><th></th></tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>${p.precio?.toLocaleString("es-CL")}</td>
                  <td className="text-truncate" style={{maxWidth:180}}>{p.imagen}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(p)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {!productos.length && <tr><td colSpan="5">No hay productos</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <h2 className="mb-3">{editMode ? "Editar" : "Agregar"} producto</h2>
        <form onSubmit={onSubmit} className="vstack gap-3">
          <input className="form-control" placeholder="Nombre" value={form.nombre}
                 onChange={(e)=>setForm({...form, nombre:e.target.value})} required />
          <input className="form-control" placeholder="Categoría" value={form.categoria}
                 onChange={(e)=>setForm({...form, categoria:e.target.value})} required />
          <input className="form-control" type="number" min="0" step="100" placeholder="Precio (CLP)" value={form.precio}
                 onChange={(e)=>setForm({...form, precio:Number(e.target.value)})} required />
          <input className="form-control" placeholder="Nombre de imagen (opcional)" value={form.imagen}
                 onChange={(e)=>setForm({...form, imagen:e.target.value})} />
          <div className="d-flex gap-2">
            <button className="btn btn-dark" type="submit">{editMode ? "Guardar cambios" : "Agregar"}</button>
            {editMode && <button className="btn btn-outline-secondary" type="button" onClick={()=>{setForm(emptyForm); setEditMode(false);}}>Cancelar</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
