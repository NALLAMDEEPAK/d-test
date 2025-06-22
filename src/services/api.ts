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

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  description: string;
  youtubeUrl?: string;
  externalUrl?: string;
  starterCode?: string;
  solutionCode?: string;
  solutionExplanation?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints?: string[];
}

export interface Interview {
  id: string;
  title: string;
  interviewerId: string;
  participantId?: string;
  participantEmail?: string;
  participantName?: string;
  scheduledAt: string;
  durationMinutes: number;
  description?: string;
  topics?: string[];
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  isIncoming: boolean;
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

export interface CreateInterviewRequest {
  title: string;
  participantEmail: string;
  participantName?: string;
  scheduledAt: string;
  durationMinutes: number;
  description?: string;
  topics?: string[];
}

// Auth API calls
export const authAPI = {
  getProfile: () => api.get<AuthResponse>('/auth/profile'),
  verifyToken: () => api.get<AuthResponse>('/auth/verify'),
  logout: () => api.post('/auth/logout'),
};

// Problems API calls
export const problemsAPI = {
  getAll: (filters?: { difficulty?: string; topic?: string; search?: string }) => 
    api.get<{ success: boolean; problems: Problem[] }>('/problems', { params: filters }),
  getById: (id: string) => 
    api.get<{ success: boolean; problem: Problem }>(`/problems/${id}`),
  getTopics: () => 
    api.get<{ success: boolean; topics: string[] }>('/problems/topics'),
  getByTopic: (topic: string) => 
    api.get<{ success: boolean; problems: Problem[] }>(`/problems/topic/${encodeURIComponent(topic)}`),
};

// Interviews API calls
export const interviewsAPI = {
  getAll: () => 
    api.get<{ success: boolean; interviews: Interview[] }>('/interviews'),
  getById: (id: string) => 
    api.get<{ success: boolean; interview: Interview }>(`/interviews/${id}`),
  create: (data: CreateInterviewRequest) => 
    api.post<{ success: boolean; interview: Interview }>('/interviews', data),
  updateStatus: (id: string, status: string) => 
    api.put<{ success: boolean; interview: Interview }>(`/interviews/${id}/status`, { status }),
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