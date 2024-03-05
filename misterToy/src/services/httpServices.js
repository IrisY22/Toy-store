import axios from 'axios';

const baseURL = 'http://localhost:3001';
const httpService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async () => {
  try {
    const response = await httpService.get('/api/toys');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const create = async (toyData) => {
  try {
    const response = await httpService.post('/api/toys', toyData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const update = async (toyId, toyData) => {
  try {
    const response = await httpService.put(`/api/toys/${toyId}`, toyData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const remove = async (toyId) => {
  try {
    const response = await httpService.delete(`/api/toys/${toyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default httpService;
