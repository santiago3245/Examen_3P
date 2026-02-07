import axios from 'axios';

const proveedorAPI = axios.create({
  baseURL: '/api/proveedores',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllProveedores = () => proveedorAPI.get('');
export const getProveedorById = (id) => proveedorAPI.get(`/${id}`);
export const createProveedor = (proveedor) => proveedorAPI.post('', proveedor);
export const updateProveedor = (id, proveedor) => proveedorAPI.put(`/${id}`, proveedor);
export const deleteProveedor = (id) => proveedorAPI.delete(`/${id}`);

export default proveedorAPI;
