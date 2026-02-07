import React, { useState, useEffect } from 'react';
import { getAllSiniestros, createSiniestro, updateSiniestro, deleteSiniestro } from '../../services/siniestroService';
import { getAllPolizas } from '../../services/polizaService';
import { getAllProveedores } from '../../services/proveedorService';
import SiniestroForm from './SiniestroForm';

function SiniestroList() {
  const [siniestros, setSiniestros] = useState([]);
  const [polizas, setPolizas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSiniestro, setEditingSiniestro] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [siniestrosRes, polizasRes, proveedoresRes] = await Promise.all([
        getAllSiniestros(),
        getAllPolizas(),
        getAllProveedores()
      ]);
      setSiniestros(siniestrosRes.data);
      setPolizas(polizasRes.data);
      setProveedores(proveedoresRes.data);
    } catch (error) {
      setMessage('Error al cargar los datos');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPolizaNumero = (polizaId) => {
    const poliza = polizas.find(p => p.id === polizaId);
    return poliza ? poliza.numeroPoliza : 'N/A';
  };

  const getProveedorNombre = (proveedorId) => {
    const proveedor = proveedores.find(p => p.id === proveedorId);
    return proveedor ? proveedor.nombre : 'N/A';
  };

  const handleCreate = () => {
    setEditingSiniestro(null);
    setShowForm(true);
  };

  const handleEdit = (siniestro) => {
    setEditingSiniestro(siniestro);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este siniestro?')) {
      try {
        await deleteSiniestro(id);
        setMessage('Siniestro eliminado correctamente');
        loadData();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error al eliminar el siniestro');
        console.error('Error:', error);
      }
    }
  };

  const handleSubmit = async (siniestro) => {
    try {
      if (editingSiniestro) {
        await updateSiniestro(editingSiniestro.id, siniestro);
        setMessage('Siniestro actualizado correctamente');
      } else {
        await createSiniestro(siniestro);
        setMessage('Siniestro creado correctamente');
      }
      setShowForm(false);
      loadData();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al guardar el siniestro');
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSiniestro(null);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div>
      <h2>Gestión de Siniestros</h2>
      
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={handleCreate}>
          Nuevo Siniestro
        </button>
      </div>

      {showForm && (
        <SiniestroForm
          siniestro={editingSiniestro}
          polizas={polizas}
          proveedores={proveedores}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="table-responsive">
        {siniestros.length === 0 ? (
          <p className="no-data">No hay siniestros registrados</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Número de Caso</th>
                <th>Fecha</th>
                <th>Póliza</th>
                <th>Proveedor</th>
                <th>Monto Estimado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {siniestros.map((siniestro) => (
                <tr key={siniestro.id}>
                  <td>{siniestro.id}</td>
                  <td>{siniestro.numeroCaso}</td>
                  <td>{new Date(siniestro.fecha).toLocaleDateString()}</td>
                  <td>{getPolizaNumero(siniestro.polizaId)}</td>
                  <td>{getProveedorNombre(siniestro.proveedorId)}</td>
                  <td>${siniestro.montoEstimado}</td>
                  <td>{siniestro.estado}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(siniestro)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(siniestro.id)}
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

export default SiniestroList;
