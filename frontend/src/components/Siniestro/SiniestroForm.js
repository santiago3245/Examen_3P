import React, { useState, useEffect } from 'react';

function SiniestroForm({ siniestro, polizas, proveedores, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    numeroCaso: '',
    fecha: '',
    descripcion: '',
    montoEstimado: '',
    estado: 'ABIERTO',
    polizaId: '',
    proveedorId: '',
  });

  useEffect(() => {
    if (siniestro) {
      setFormData({
        numeroCaso: siniestro.numeroCaso,
        fecha: siniestro.fecha,
        descripcion: siniestro.descripcion,
        montoEstimado: siniestro.montoEstimado,
        estado: siniestro.estado,
        polizaId: siniestro.polizaId,
        proveedorId: siniestro.proveedorId,
      });
    }
  }, [siniestro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      polizaId: parseInt(formData.polizaId),
      proveedorId: parseInt(formData.proveedorId),
      montoEstimado: parseFloat(formData.montoEstimado),
    };
    onSubmit(submitData);
  };

  return (
    <div className="card">
      <h3>{siniestro ? 'Editar Siniestro' : 'Nuevo Siniestro'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numeroCaso">Número de Caso *</label>
          <input
            type="text"
            id="numeroCaso"
            name="numeroCaso"
            className="form-control"
            value={formData.numeroCaso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha *</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            className="form-control"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción *</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="montoEstimado">Monto Estimado *</label>
          <input
            type="number"
            id="montoEstimado"
            name="montoEstimado"
            className="form-control"
            value={formData.montoEstimado}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="polizaId">Póliza *</label>
          <select
            id="polizaId"
            name="polizaId"
            className="form-control"
            value={formData.polizaId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una póliza</option>
            {polizas.map(poliza => (
              <option key={poliza.id} value={poliza.id}>
                {poliza.numeroPoliza} - {poliza.tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="proveedorId">Proveedor *</label>
          <select
            id="proveedorId"
            name="proveedorId"
            className="form-control"
            value={formData.proveedorId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map(proveedor => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre} - {proveedor.tipo}
              </option>
            ))}
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
            <option value="ABIERTO">Abierto</option>
            <option value="EN_PROCESO">En Proceso</option>
            <option value="CERRADO">Cerrado</option>
          </select>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" className="btn btn-success" style={{ marginRight: '0.5rem' }}>
            {siniestro ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default SiniestroForm;
