import { post, put } from './httpServices';

export const login = async (userData) => {
  try {
    const response = await post('/api/users/login', userData);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


export const updateUser = async (userId, userData) => {
  try {
    console.log(userData);
    const response = await put(`/api/users/${userId}`, userData);
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

