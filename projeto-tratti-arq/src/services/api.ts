import axios from 'axios';
import Cookie from 'js-cookie';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor para adicionar o Token em todas as chamadas
api.interceptors.request.use((config) => {
  const token = Cookie.get('user_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});