import axios from 'axios';

// Base URL untuk Laravel API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor untuk menambahkan token jika ada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Teachers API
export const teachersApi = {
  getAll: () => api.get('/teachers'),
  getById: (id) => api.get(`/teachers/${id}`),
  create: (data) => api.post('/teachers', data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

// Achievements API
export const achievementsApi = {
  getAll: () => api.get('/achievements'),
  getById: (id) => api.get(`/achievements/${id}`),
  create: (data) => api.post('/achievements', data),
  update: (id, data) => api.put(`/achievements/${id}`, data),
  delete: (id) => api.delete(`/achievements/${id}`),
};

// Extracurriculars API
export const extracurricularsApi = {
  getAll: () => api.get('/extracurriculars'),
  getById: (id) => api.get(`/extracurriculars/${id}`),
  create: (data) => api.post('/extracurriculars', data),
  update: (id, data) => api.put(`/extracurriculars/${id}`, data),
  delete: (id) => api.delete(`/extracurriculars/${id}`),
};

// Gallery API
export const galleryApi = {
  getAll: () => api.get('/galleries'),
  getById: (id) => api.get(`/galleries/${id}`),
  create: (data) => api.post('/galleries', data),
  update: (id, data) => api.put(`/galleries/${id}`, data),
  delete: (id) => api.delete(`/galleries/${id}`),
};

// Contacts API
export const contactsApi = {
  getAll: () => api.get('/contacts'),
  getById: (id) => api.get(`/contacts/${id}`),
  create: (data) => api.post('/contacts', data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// About API
export const aboutApi = {
  get: () => api.get('/about'),
  update: (id, data) => api.put(`/about/${id}`, data),
};

// Principal Message API
export const principalMessageApi = {
  get: () => api.get('/principal-message'),
  update: (id, data) => api.put(`/principal-message/${id}`, data),
};

// Auth API (untuk admin authentication)
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

export default api;
