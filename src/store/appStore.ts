import { create } from 'zustand';
import { Student, AttentionData, Classroom } from '@/types';

interface AppState {
  // Authentication
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  isAuthenticated: boolean;

  // Current classroom
  currentClassroom: Classroom | null;

  // Students and attention data
  students: Student[];
  attentionData: AttentionData[];
  
  // Real-time data
  isLiveMode: boolean;
  lastUpdate: string | null;

  // UI state
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: AppState['user']) => void;
  logout: () => void;
  setCurrentClassroom: (classroom: Classroom | null) => void;
  setStudents: (students: Student[]) => void;
  setAttentionData: (data: AttentionData[]) => void;
  addAttentionData: (data: AttentionData) => void;
  updateStudentAttention: (studentId: string, score: number, behavior: string, emotion: string) => void;
  setLiveMode: (enabled: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateLastUpdate: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  currentClassroom: null,
  students: [],
  attentionData: [],
  isLiveMode: false,
  lastUpdate: null,
  sidebarOpen: false,
  loading: false,
  error: null,

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false,
    currentClassroom: null,
    students: [],
    attentionData: [],
    isLiveMode: false
  }),

  setCurrentClassroom: (classroom) => set({ currentClassroom: classroom }),

  setStudents: (students) => set({ students }),

  setAttentionData: (data) => set({ attentionData: data }),

  addAttentionData: (data) => set((state) => ({
    attentionData: [...state.attentionData, data]
  })),

  updateStudentAttention: (studentId, score, behavior, emotion) => set((state) => {
    const newData: AttentionData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      studentId,
      behavior,
      emotion,
      score,
    };

    return {
      attentionData: [...state.attentionData, newData]
    };
  }),

  setLiveMode: (enabled) => set({ isLiveMode: enabled }),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  updateLastUpdate: () => set({ lastUpdate: new Date().toISOString() }),
}));

// Selectors for computed values
export const useCurrentStudentsWithAttention = () => {
  const students = useAppStore((state) => state.students);
  const attentionData = useAppStore((state) => state.attentionData);

  return students.map(student => {
    // Get latest attention data for this student
    const studentAttentionData = attentionData
      .filter(data => data.studentId === student.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const latestData = studentAttentionData[0];

    return {
      ...student,
      currentAttention: latestData ? {
        score: latestData.score,
        behavior: latestData.behavior,
        emotion: latestData.emotion,
        timestamp: latestData.timestamp,
      } : null,
      averageAttention: studentAttentionData.length > 0
        ? Math.round(studentAttentionData.reduce((acc, data) => acc + data.score, 0) / studentAttentionData.length)
        : 0,
    };
  });
};

export const useClassroomStats = () => {
  const students = useAppStore((state) => state.students);
  const attentionData = useAppStore((state) => state.attentionData);

  const totalStudents = students.length;
  
  // Calculate average attention from recent data (last hour)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recentData = attentionData.filter(data => data.timestamp > oneHourAgo);
  
  const averageAttention = recentData.length > 0
    ? Math.round(recentData.reduce((acc, data) => acc + data.score, 0) / recentData.length)
    : 0;

  // Count low attention alerts (score < 60 in last 10 minutes)
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const recentLowAttention = attentionData.filter(
    data => data.timestamp > tenMinutesAgo && data.score < 60
  );
  const lowAttentionAlerts = new Set(recentLowAttention.map(data => data.studentId)).size;

  return {
    totalStudents,
    averageAttention,
    lowAttentionAlerts,
    totalDataPoints: attentionData.length,
  };
};

