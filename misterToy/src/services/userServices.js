import { post } from './httpServices';

export const login = async (userData) => {
  try {
    const response = await post('/api/users/login', userData);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

