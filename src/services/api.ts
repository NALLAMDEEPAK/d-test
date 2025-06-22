import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
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

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  access_token?: string;
}

export interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  interviewDetails?: {
    date?: string;
    time?: string;
    duration?: number;
    topics?: string;
    description?: string;
  };
}

// Auth API calls
export const authAPI = {
  getProfile: () => api.get<AuthResponse>('/auth/profile'),
  verifyToken: () => api.get<AuthResponse>('/auth/verify'),
  logout: () => api.post('/auth/logout'),
};

// Email API calls
export const emailAPI = {
  sendInvite: (data: EmailRequest) => api.post('/email/send-invite', data),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get<AuthResponse>('/user/profile'),
};

export default api;