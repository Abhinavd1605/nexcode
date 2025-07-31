import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'User' | 'Admin';
  is_active: boolean;
  date_joined: string;
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  constraints: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  starter_code?: string;
  created_by: number;
}

export interface TestCase {
  id: number;
  problem: number;
  input_data: string;
  expected_output: string;
  is_hidden: boolean;
}

export interface Submission {
  id: number;
  problem: number;
  user: number;
  code: string;
  language: string;
  verdict: 'Pending' | 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compilation Error';
  execution_time?: number;
  memory?: number;
  submitted_at: string;
}

export interface AIAssistantLog {
  id: number;
  user: number;
  problem?: number;
  query: string;
  response: string;
  created_at: string;
}

// API Functions
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/auth/login/', { username, password }),
  
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register/', { username, email, password }),
  
  logout: () => api.post('/auth/logout/'),
  
  getProfile: () => api.get('/auth/profile/'),
};

export const problemsAPI = {
  getProblems: (params?: { difficulty?: string; tags?: string }) =>
    api.get('/problems/', { params }),
  
  getProblem: (id: number) => api.get(`/problems/${id}/`),
  
  createProblem: (problem: Omit<Problem, 'id' | 'created_by'>) =>
    api.post('/admin/problems/', problem),
  
  updateProblem: (id: number, problem: Partial<Problem>) =>
    api.put(`/admin/problems/${id}/`, problem),
  
  deleteProblem: (id: number) => api.delete(`/admin/problems/${id}/`),
};

export const submissionsAPI = {
  submitSolution: (problemId: number, code: string, language: string) =>
    api.post('/submissions/', { problem: problemId, code, language }),
  
  getSubmissions: (params?: { problem?: number; user?: number; verdict?: string }) =>
    api.get('/submissions/', { params }),
  
  getSubmission: (id: number) => api.get(`/submissions/${id}/`),
};

export const leaderboardAPI = {
  getLeaderboard: (params?: { problem?: number }) =>
    api.get('/leaderboard/', { params }),
};

export const aiAssistantAPI = {
  sendMessage: (query: string, problemId?: number, code?: string) =>
    api.post('/ai-assistant/', { query, problem: problemId, code }),
  
  getHistory: (problemId?: number) =>
    api.get('/ai-assistant/', { params: { problem: problemId } }),
};