import axios from 'axios';
import { Student, AttentionData, Classroom } from '@/types';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:8000';

// Create axios instances
const jsonServerApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const pythonApi = axios.create({
  baseURL: PYTHON_API_URL,
  timeout: 10000,
});

// Request interceptors for error handling
jsonServerApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('JSON Server API Error:', error);
    return Promise.reject(error);
  }
);

pythonApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Python API Error:', error);
    return Promise.reject(error);
  }
);

// Types for API responses
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface HistoricalDataParams {
  startDate?: string;
  endDate?: string;
  classroomId?: string;
  studentId?: string;
  limit?: number;
  offset?: number;
}

// Classroom API
export const classroomApi = {
  // Get all classrooms
  getAll: async (): Promise<Classroom[]> => {
    const response = await jsonServerApi.get('/classrooms');
    return response.data;
  },

  // Get classroom by ID
  getById: async (id: number): Promise<Classroom> => {
    const response = await jsonServerApi.get(`/classrooms/${id}`);
    return response.data;
  },

  // Create new classroom
  create: async (classroom: Omit<Classroom, 'id'>): Promise<Classroom> => {
    const response = await jsonServerApi.post('/classrooms', classroom);
    return response.data;
  },

  // Update classroom
  update: async (id: number, classroom: Partial<Classroom>): Promise<Classroom> => {
    const response = await jsonServerApi.put(`/classrooms/${id}`, classroom);
    return response.data;
  },

  // Delete classroom
  delete: async (id: number): Promise<void> => {
    await jsonServerApi.delete(`/classrooms/${id}`);
  },
};

// Students API
export const studentsApi = {
  // Get all students
  getAll: async (): Promise<Student[]> => {
    const response = await jsonServerApi.get('/students');
    return response.data;
  },

  // Get students by classroom
  getByClassroom: async (classroomId: string): Promise<Student[]> => {
    const response = await jsonServerApi.get(`/students?classroomId=${classroomId}`);
    return response.data;
  },

  // Create new student
  create: async (student: Omit<Student, 'id'>): Promise<Student> => {
    const response = await jsonServerApi.post('/students', student);
    return response.data;
  },

  // Update student
  update: async (id: string, student: Partial<Student>): Promise<Student> => {
    const response = await jsonServerApi.put(`/students/${id}`, student);
    return response.data;
  },

  // Delete student
  delete: async (id: string): Promise<void> => {
    await jsonServerApi.delete(`/students/${id}`);
  },
};

// Attention Data API
export const attentionApi = {
  // Get historical data
  getHistorical: async (params: HistoricalDataParams = {}): Promise<AttentionData[]> => {
    const queryParams = new URLSearchParams();
    
    if (params.startDate) queryParams.append('timestamp_gte', params.startDate);
    if (params.endDate) queryParams.append('timestamp_lte', params.endDate);
    if (params.studentId) queryParams.append('studentId', params.studentId);
    if (params.limit) queryParams.append('_limit', params.limit.toString());
    if (params.offset) queryParams.append('_start', params.offset.toString());
    
    // Sort by timestamp descending
    queryParams.append('_sort', 'timestamp');
    queryParams.append('_order', 'desc');

    const response = await jsonServerApi.get(`/attention_data?${queryParams.toString()}`);
    return response.data;
  },

  // Add new attention data
  create: async (data: Omit<AttentionData, 'id'>): Promise<AttentionData> => {
    const response = await jsonServerApi.post('/attention_data', data);
    return response.data;
  },

  // Get real-time data from Python API
  getRealTime: async (classroomId: string): Promise<AttentionData[]> => {
    try {
      const response = await pythonApi.get(`/api/realtime/${classroomId}`);
      return response.data;
    } catch (error) {
      // Fallback to mock data if Python API is not available
      console.warn('Python API not available, using mock data');
      return generateMockRealTimeData();
    }
  },

  // Get analytics from Python API
  getAnalytics: async (params: HistoricalDataParams): Promise<any> => {
    try {
      const response = await pythonApi.get('/api/analytics', { params });
      return response.data;
    } catch (error) {
      console.warn('Python API not available for analytics');
      throw error;
    }
  },
};

// Authentication API
export const authApi = {
  // Login
  login: async (email: string, password: string): Promise<{ user: any; token: string }> => {
    // Mock authentication for demo
    if (email === 'admin@edu.com' && password === 'demo123') {
      const user = {
        id: '1',
        name: 'Administrador',
        email: 'admin@edu.com',
        role: 'admin',
      };
      const token = 'mock-jwt-token';
      
      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } else {
      throw new Error('Credenciales inválidas');
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: async (): Promise<any> => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      return JSON.parse(user);
    }
    
    throw new Error('No authenticated user');
  },
};

// WebSocket connection for real-time data
export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;

  connect(classroomId: string, onMessage: (data: AttentionData) => void): void {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';
    
    try {
      this.ws = new WebSocket(`${wsUrl}/${classroomId}`);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect(classroomId, onMessage);
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      // Fallback to polling
      this.startPolling(classroomId, onMessage);
    }
  }

  private attemptReconnect(classroomId: string, onMessage: (data: AttentionData) => void): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect(classroomId, onMessage);
      }, this.reconnectInterval);
    } else {
      console.log('Max reconnection attempts reached, falling back to polling');
      this.startPolling(classroomId, onMessage);
    }
  }

  private startPolling(classroomId: string, onMessage: (data: AttentionData) => void): void {
    // Fallback polling every 5 seconds
    setInterval(async () => {
      try {
        const data = await attentionApi.getRealTime(classroomId);
        data.forEach(onMessage);
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000);
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(data: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

// Mock data generator for development
function generateMockRealTimeData(): AttentionData[] {
  const students = ['S01', 'S02', 'S03', 'S04', 'S05'];
  const behaviors = ['focused', 'distracted', 'sleepy', 'engaged'];
  const emotions = ['happy', 'neutral', 'sad', 'confused'];
  
  return students.map(studentId => ({
    id: Date.now() + Math.random(),
    timestamp: new Date().toISOString(),
    studentId,
    behavior: behaviors[Math.floor(Math.random() * behaviors.length)],
    emotion: emotions[Math.floor(Math.random() * emotions.length)],
    score: Math.floor(Math.random() * 40) + 60, // 60-100
  }));
}

// Export singleton WebSocket service
export const wsService = new WebSocketService();

