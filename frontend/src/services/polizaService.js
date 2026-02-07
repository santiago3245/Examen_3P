import axios from 'axios';

const polizaAPI = axios.create({
  baseURL: '/api/polizas',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllPolizas = () => polizaAPI.get('');
export const getPolizaById = (id) => polizaAPI.get(`/${id}`);
export const createPoliza = (poliza) => polizaAPI.post('', poliza);
export const updatePoliza = (id, poliza) => polizaAPI.put(`/${id}`, poliza);
export const deletePoliza = (id) => polizaAPI.delete(`/${id}`);

export default polizaAPI;
