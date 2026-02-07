import axios from 'axios';

const siniestroAPI = axios.create({
  baseURL: '/api/siniestros',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllSiniestros = () => siniestroAPI.get('');
export const getSiniestroById = (id) => siniestroAPI.get(`/${id}`);
export const createSiniestro = (siniestro) => siniestroAPI.post('', siniestro);
export const updateSiniestro = (id, siniestro) => siniestroAPI.put(`/${id}`, siniestro);
export const deleteSiniestro = (id) => siniestroAPI.delete(`/${id}`);

export default siniestroAPI;
