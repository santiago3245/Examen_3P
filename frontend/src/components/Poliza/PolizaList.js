import React, { useState, useEffect } from 'react';
import { getAllPolizas, createPoliza, updatePoliza, deletePoliza } from '../../services/polizaService';
import PolizaForm from './PolizaForm';

function PolizaList() {
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPoliza, setEditingPoliza] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPolizas();
  }, []);

  const loadPolizas = async () => {
    try {
      setLoading(true);
      const response = await getAllPolizas();
      setPolizas(response.data);
    } catch (error) {
      setMessage('Error al cargar las pólizas');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPoliza(null);
    setShowForm(true);
  };

  const handleEdit = (poliza) => {
    setEditingPoliza(poliza);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta póliza?')) {
      try {
        await deletePoliza(id);
        setMessage('Póliza eliminada correctamente');
        loadPolizas();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error al eliminar la póliza');
        console.error('Error:', error);
      }
    }
  };

  const handleSubmit = async (poliza) => {
    try {
      if (editingPoliza) {
        await updatePoliza(editingPoliza.id, poliza);
        setMessage('Póliza actualizada correctamente');
      } else {
        await createPoliza(poliza);
        setMessage('Póliza creada correctamente');
      }
      setShowForm(false);
      loadPolizas();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al guardar la póliza');
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPoliza(null);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div>
      <h2>Gestión de Pólizas</h2>
      
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={handleCreate}>
          Nueva Póliza
        </button>
      </div>

      {showForm && (
        <PolizaForm
          poliza={editingPoliza}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="table-responsive">
        {polizas.length === 0 ? (
          <p className="no-data">No hay pólizas registradas</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Número de Póliza</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {polizas.map((poliza) => (
                <tr key={poliza.id}>
                  <td>{poliza.id}</td>
                  <td>{poliza.numeroPoliza}</td>
                  <td>{poliza.tipo}</td>
                  <td>{poliza.estado}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(poliza)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(poliza.id)}
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

export default PolizaList;
