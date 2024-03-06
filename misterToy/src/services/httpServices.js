import axios from 'axios';

const baseURL = 'http://localhost:3001';
const httpService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async (url) => {
  try {
    const response = await httpService.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const post = async (url, data) => {
  try {
    const response = await httpService.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const put = async (url, data) => {
  try {
    const response = await httpService.put(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const remove = async (url) => {
  try {
    const response = await httpService.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default httpService;