import React, { useState, useEffect } from 'react';
import { getAllProveedores, createProveedor, updateProveedor, deleteProveedor } from '../../services/proveedorService';
import ProveedorForm from './ProveedorForm';

function ProveedorList() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProveedores();
  }, []);

  const loadProveedores = async () => {
    try {
      setLoading(true);
      const response = await getAllProveedores();
      setProveedores(response.data);
    } catch (error) {
      setMessage('Error al cargar los proveedores');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProveedor(null);
    setShowForm(true);
  };

  const handleEdit = (proveedor) => {
    setEditingProveedor(proveedor);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este proveedor?')) {
      try {
        await deleteProveedor(id);
        setMessage('Proveedor eliminado correctamente');
        loadProveedores();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error al eliminar el proveedor');
        console.error('Error:', error);
      }
    }
  };

  const handleSubmit = async (proveedor) => {
    try {
      if (editingProveedor) {
        await updateProveedor(editingProveedor.id, proveedor);
        setMessage('Proveedor actualizado correctamente');
      } else {
        await createProveedor(proveedor);
        setMessage('Proveedor creado correctamente');
      }
      setShowForm(false);
      loadProveedores();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al guardar el proveedor');
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProveedor(null);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div>
      <h2>Gestión de Proveedores</h2>
      
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={handleCreate}>
          Nuevo Proveedor
        </button>
      </div>

      {showForm && (
        <ProveedorForm
          proveedor={editingProveedor}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="table-responsive">
        {proveedores.length === 0 ? (
          <p className="no-data">No hay proveedores registrados</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.id}</td>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.tipo}</td>
                  <td>{proveedor.ciudad}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(proveedor)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(proveedor.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProveedorList;
