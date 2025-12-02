import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getProductos, createProducto, updateProducto, deleteProducto, getPedidos } from "../data/store";
import { updateProductoAPI, createProductoAPI, deleteProductoAPI } from "../services/api";
import "../styles/styleadmin.css";

const emptyForm = { 
  id: null, 
  nombre: "", 
  descripcion: "", 
  precio: 0, 
  categoria: "", 
  imagen: "",
  stock: 0,
  unidad: "unidad",
  tienda_id: 1,
  categoria_id: 1
};

export default function AdminDashboard() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Proteger ruta - solo admins
  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    } else if (currentUser.role !== 'admin') {
      alert('No tienes permisos para acceder al panel de administración');
      navigate('/');
    }
  }, [currentUser, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const productosData = await getProductos();
      setProductos(Array.isArray(productosData) ? productosData : []);
      
      const pedidosData = getPedidos();
      setPedidos(Array.isArray(pedidosData) ? pedidosData : []);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Actualizar en la API
        const success = await updateProductoAPI(form.id, form);
        if (success) {
          // También actualizar en localStorage como respaldo
          updateProducto(form);
          alert('Producto actualizado exitosamente en la API');
        } else {
          alert('Error al actualizar el producto en la API');
        }
      } else {
        // Crear en la API
        const newProduct = await createProductoAPI(form);
        if (newProduct) {
          // También guardar en localStorage como respaldo
          createProducto({ ...form });
          alert('Producto creado exitosamente en la API');
        } else {
          alert('Error al crear el producto en la API');
        }
      }
      setForm(emptyForm);
      setEditMode(false);
      setShowModal(false);
      await loadData();
    } catch (error) {
      console.error("Error guardando producto:", error);
      alert("Error al guardar el producto");
    }
  };

  const onEdit = (p) => {
    setForm({
      id: p.id,
      nombre: p.nombre || "",
      descripcion: p.descripcion || "",
      precio: p.precio || 0,
      categoria: p.categoria || "",
      imagen: p.imagen || "",
      stock: p.stock || 0,
      unidad: p.unidad || "unidad",
      tienda_id: p.tienda_id || 1,
      categoria_id: p.categoria_id || 1
    });
    setEditMode(true);
    setShowModal(true);
  };

  const onDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        // Eliminar de la API
        const success = await deleteProductoAPI(id);
        if (success) {
          // También eliminar de localStorage como respaldo
          deleteProducto(id);
          alert('Producto eliminado exitosamente de la API');
          await loadData();
        } else {
          alert('Error al eliminar el producto de la API');
        }
      } catch (error) {
        console.error("Error eliminando producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = {
    totalProductos: productos.length,
    totalPedidos: pedidos.length,
    ventasTotal: pedidos.reduce((sum, p) => sum + (p.total || 0), 0),
    productosSinStock: productos.filter(p => p.stock === 0).length
  };

  return (
    <div className="admin-dashboard">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png" 
            alt="Admin Avatar" 
            className="admin-avatar"
          />
          <h3>{currentUser?.name || "Administrador"}</h3>
          <span className="admin-badge">Cuenta Premium</span>
        </div>

        <nav className="admin-nav">
          <button 
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === "productos" ? "active" : ""}
            onClick={() => setActiveTab("productos")}
          >
            Gestionar Productos
          </button>
          <button 
            className={activeTab === "pedidos" ? "active" : ""}
            onClick={() => setActiveTab("pedidos")}
          >
            Pedidos
          </button>
        </nav>

        <div className="admin-actions">
          <button onClick={() => navigate('/')} className="btn-secondary">
            Ir al Inicio
          </button>
          <button onClick={() => navigate('/productos')} className="btn-secondary">
            Ver Productos
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            <h1>Panel de Control</h1>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">Productos</div>
                <div className="stat-info">
                  <h3>{stats.totalProductos}</h3>
                  <p>Total Productos</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">Pedidos</div>
                <div className="stat-info">
                  <h3>{stats.totalPedidos}</h3>
                  <p>Total Pedidos</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">Ventas</div>
                <div className="stat-info">
                  <h3>${stats.ventasTotal.toLocaleString("es-CL")}</h3>
                  <p>Ventas Totales</p>
                </div>
              </div>
              
              <div className="stat-card alert">
                <div className="stat-icon">Alerta</div>
                <div className="stat-info">
                  <h3>{stats.productosSinStock}</h3>
                  <p>Sin Stock</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Actividad Reciente</h2>
              <p style={{ color: '#666', padding: '2rem', textAlign: 'center' }}>
                No hay actividad reciente para mostrar
              </p>
            </div>
          </div>
        )}

        {/* PRODUCTOS TAB */}
        {activeTab === "productos" && (
          <div className="productos-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h1>Gestión de Productos</h1>
              <button 
                className="btn-primary"
                onClick={() => {
                  setForm(emptyForm);
                  setEditMode(false);
                  setShowModal(true);
                }}
                style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
              >
                Agregar Producto
              </button>
            </div>

            {/* FORMULARIO REMOVIDO - AHORA EN MODAL */}
            <div className="product-form-card" style={{ display: 'none' }}>
              <h2>{editMode ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
              <form onSubmit={onSubmit} className="product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre del Producto *</label>
                    <input 
                      type="text"
                      placeholder="Ej: Torta de Chocolate"
                      value={form.nombre}
                      onChange={(e) => setForm({...form, nombre: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Categoría *</label>
                    <input 
                      type="text"
                      placeholder="Ej: Tortas, Postres, etc."
                      value={form.categoria}
                      onChange={(e) => setForm({...form, categoria: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Descripción</label>
                  <textarea 
                    placeholder="Describe el producto..."
                    value={form.descripcion}
                    onChange={(e) => setForm({...form, descripcion: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Precio (CLP) *</label>
                    <input 
                      type="number"
                      placeholder="0"
                      min="0"
                      step="1"
                      value={form.precio}
                      onChange={(e) => setForm({...form, precio: Number(e.target.value)})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Stock *</label>
                    <input 
                      type="number"
                      placeholder="0"
                      min="0"
                      value={form.stock}
                      onChange={(e) => setForm({...form, stock: Number(e.target.value)})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Unidad</label>
                    <select 
                      value={form.unidad}
                      onChange={(e) => setForm({...form, unidad: e.target.value})}
                    >
                      <option value="unidad">Unidad</option>
                      <option value="kg">Kilogramo</option>
                      <option value="manojo">Manojo</option>
                      <option value="porción">Porción</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>URL de Imagen</label>
                  <input 
                    type="text"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={form.imagen}
                    onChange={(e) => setForm({...form, imagen: e.target.value})}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editMode ? "Guardar Cambios" : "Agregar Producto"}
                  </button>
                  {editMode && (
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => {
                        setForm(emptyForm);
                        setEditMode(false);
                      }}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* TABLA DE PRODUCTOS */}
            <div className="products-table-card">
              <h2>Lista de Productos ({productos.length})</h2>
              
              {loading ? (
                <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando productos...</p>
              ) : productos.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  No hay productos registrados
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((p) => (
                        <tr key={p.id}>
                          <td>#{p.id}</td>
                          <td>
                            <strong>{p.nombre}</strong>
                            {p.descripcion && (
                              <small style={{ display: 'block', color: '#666' }}>
                                {p.descripcion.substring(0, 50)}...
                              </small>
                            )}
                          </td>
                          <td>
                            <span className="category-badge">{p.categoria}</span>
                          </td>
                          <td className="price">${p.precio?.toLocaleString("es-CL")}</td>
                          <td>
                            <span className={`stock-badge ${p.stock === 0 ? 'out-stock' : 'in-stock'}`}>
                              {p.stock} {p.unidad || 'unidad(es)'}
                            </span>
                          </td>
                          <td className="image-cell">
                            {p.imagen ? (
                              <img src={p.imagen} alt={p.nombre} className="product-thumb" />
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: '#999' }}>Sin imagen</span>
                            )}
                          </td>
                          <td className="actions-cell">
                            <button 
                              className="btn-edit" 
                              onClick={() => onEdit(p)}
                              title="Editar"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                              </svg>
                            </button>
                            <button 
                              className="btn-delete" 
                              onClick={() => onDelete(p.id)}
                              title="Eliminar"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PEDIDOS TAB */}
        {activeTab === "pedidos" && (
          <div className="pedidos-content">
            <h1>Gestión de Pedidos</h1>
            
            {pedidos.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                No hay pedidos registrados
              </p>
            ) : (
              <div className="table-responsive">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Pedido #</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Productos</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((pedido) => (
                      <tr key={pedido.id}>
                        <td>#{pedido.id}</td>
                        <td>{pedido.usuario}</td>
                        <td>{new Date(pedido.fecha).toLocaleDateString('es-CL')}</td>
                        <td>{pedido.items?.length || 0} items</td>
                        <td className="price">${pedido.total?.toLocaleString("es-CL")}</td>
                        <td>
                          <span className="status-badge">{pedido.estado || 'Pendiente'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>

      {/* MODAL DE PRODUCTO */}
      {showModal && (
        <div className="modal-overlay" onClick={() => {
          setShowModal(false);
          setForm(emptyForm);
          setEditMode(false);
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editMode ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setForm(emptyForm);
                  setEditMode(false);
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={onSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del Producto *</label>
                  <input 
                    type="text"
                    placeholder="Ej: Torta de Chocolate"
                    value={form.nombre}
                    onChange={(e) => setForm({...form, nombre: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Categoría *</label>
                  <input 
                    type="text"
                    placeholder="Ej: Tortas, Postres, etc."
                    value={form.categoria}
                    onChange={(e) => setForm({...form, categoria: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea 
                  placeholder="Describe el producto..."
                  value={form.descripcion}
                  onChange={(e) => setForm({...form, descripcion: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Precio (CLP) *</label>
                  <input 
                    type="number"
                    placeholder="0"
                    min="0"
                    step="1"
                    value={form.precio}
                    onChange={(e) => setForm({...form, precio: Number(e.target.value)})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input 
                    type="number"
                    placeholder="0"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({...form, stock: Number(e.target.value)})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Unidad</label>
                  <select 
                    value={form.unidad}
                    onChange={(e) => setForm({...form, unidad: e.target.value})}
                  >
                    <option value="unidad">Unidad</option>
                    <option value="kg">Kilogramo</option>
                    <option value="manojo">Manojo</option>
                    <option value="porción">Porción</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>URL de Imagen</label>
                <input 
                  type="text"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={form.imagen}
                  onChange={(e) => setForm({...form, imagen: e.target.value})}
                />
              </div>

              <div className="form-actions" style={{ justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                {editMode && (
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      setForm(emptyForm);
                      setEditMode(false);
                      setShowModal(false);
                    }}
                  >
                    Cancelar
                  </button>
                )}
                <button type="submit" className="btn-primary">
                  {editMode ? "Guardar Cambios" : "Agregar Producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
