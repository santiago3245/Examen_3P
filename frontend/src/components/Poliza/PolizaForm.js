import React, { useState, useEffect } from 'react';

function PolizaForm({ poliza, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    numeroPoliza: '',
    tipo: '',
    estado: '',
  });

  useEffect(() => {
    if (poliza) {
      setFormData({
        numeroPoliza: poliza.numeroPoliza,
        tipo: poliza.tipo,
        estado: poliza.estado,
      });
    }
  }, [poliza]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
      <h3>{poliza ? 'Editar Póliza' : 'Nueva Póliza'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numeroPoliza">Número de Póliza *</label>
          <input
            type="text"
            id="numeroPoliza"
            name="numeroPoliza"
            className="form-control"
            value={formData.numeroPoliza}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo *</label>
          <select
            id="tipo"
            name="tipo"
            className="form-control"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="AUTO">Auto</option>
            <option value="HOGAR">Hogar</option>
            <option value="VIDA">Vida</option>
            <option value="SALUD">Salud</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado *</label>
          <select
            id="estado"
            name="estado"
            className="form-control"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un estado</option>
            <option value="ACTIVA">Activa</option>
            <option value="SUSPENDIDA">Suspendida</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" className="btn btn-success" style={{ marginRight: '0.5rem' }}>
            {poliza ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PolizaForm;
