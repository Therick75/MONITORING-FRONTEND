export interface Student {
  id: string;
  name: string;
  avatar: string;
  classroomId: number;
}

export interface Classroom {
  id: number;
  name: string;
  camera: string;
  active: boolean;
  students: number;
}

export interface AttentionData {
  id: number;
  timestamp: string;
  studentId: string;
  behavior: 'focused' | 'distracted' | 'sleepy';
  emotion: 'happy' | 'neutral' | 'sad';
  score: number;
}

export interface HistoricalData {
  date: string;
  classroomId: number;
  averageAttention: number;
  behaviors: {
    focused: number;
    distracted: number;
    sleepy: number;
  };
  emotions: {
    happy: number;
    neutral: number;
    sad: number;
  };
}

export interface StudentAttentionState {
  student: Student;
  currentAttention: AttentionData;
}

export interface DashboardStats {
  totalStudents: number;
  averageAttention: number;
  lowAttentionAlerts: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher';
}

