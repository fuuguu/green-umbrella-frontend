// src/api.ts
import axios from 'axios';

const api = axios.create({
  // Это адрес твоего запущенного Laravel сервера
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Автоматически прикрепляем токен ко всем будущим запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;