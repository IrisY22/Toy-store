import { post, get, put, remove } from "./httpServices";

export const getToys = async () => {
  try {
    const response = await get('/api/toys');
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const create = async (toyData) => {
  try {
    const response = await post('/api/toys', toyData);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const update = async (toyId, toyData) => {
  try {
    const response = await put(`/api/toys/${toyId}`, toyData);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const removeToy = async (toyId) => {
  try {
    const response = await remove(`/api/toys/${toyId}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};