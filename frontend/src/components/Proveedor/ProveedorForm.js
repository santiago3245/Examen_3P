import React, { useState, useEffect } from 'react';

function ProveedorForm({ proveedor, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    ciudad: '',
  });

  useEffect(() => {
    if (proveedor) {
      setFormData({
        nombre: proveedor.nombre,
        tipo: proveedor.tipo,
        ciudad: proveedor.ciudad,
      });
    }
  }, [proveedor]);

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
      <h3>{proveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={formData.nombre}
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
            <option value="TALLER">Taller</option>
            <option value="CLINICA">Clínica</option>
            <option value="GRUA">Grúa</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">Ciudad *</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            className="form-control"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" className="btn btn-success" style={{ marginRight: '0.5rem' }}>
            {proveedor ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProveedorForm;
