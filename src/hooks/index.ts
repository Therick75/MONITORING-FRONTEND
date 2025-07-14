import { useEffect, useState, useCallback } from 'react';
import { useAppStore } from '@/store/appStore';
import { classroomApi, studentsApi, attentionApi, wsService } from '@/services/api';
import { Classroom, Student, AttentionData } from '@/types';

// Hook for managing classrooms
export const useClassrooms = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClassrooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await classroomApi.getAll();
      setClassrooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching classrooms');
    } finally {
      setLoading(false);
    }
  }, []);

  const createClassroom = useCallback(async (classroom: Omit<Classroom, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newClassroom = await classroomApi.create(classroom);
      setClassrooms(prev => [...prev, newClassroom]);
      return newClassroom;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating classroom');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateClassroom = useCallback(async (id: number, updates: Partial<Classroom>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedClassroom = await classroomApi.update(id, updates);
      setClassrooms(prev => prev.map(c => c.id === id ? updatedClassroom : c));
      return updatedClassroom;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating classroom');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteClassroom = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await classroomApi.delete(id);
      setClassrooms(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting classroom');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClassrooms();
  }, [fetchClassrooms]);

  return {
    classrooms,
    loading,
    error,
    refetch: fetchClassrooms,
    createClassroom,
    updateClassroom,
    deleteClassroom,
  };
};

// Hook for managing students
export const useStudents = (classroomId?: string) => {
  const { students, setStudents } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = classroomId 
        ? await studentsApi.getByClassroom(classroomId)
        : await studentsApi.getAll();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching students');
    } finally {
      setLoading(false);
    }
  }, [classroomId, setStudents]);

  const createStudent = useCallback(async (student: Omit<Student, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newStudent = await studentsApi.create(student);
      setStudents([...students, newStudent]);
      return newStudent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating student');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [students, setStudents]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    loading,
    error,
    refetch: fetchStudents,
    createStudent,
  };
};

// Hook for managing attention data
export const useAttentionData = () => {
  const { attentionData, setAttentionData, addAttentionData } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalData = useCallback(async (params: {
    startDate?: string;
    endDate?: string;
    classroomId?: string;
    studentId?: string;
    limit?: number;
  } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await attentionApi.getHistorical(params);
      setAttentionData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching attention data');
    } finally {
      setLoading(false);
    }
  }, [setAttentionData]);

  const addNewData = useCallback(async (data: Omit<AttentionData, 'id'>) => {
    try {
      const newData = await attentionApi.create(data);
      addAttentionData(newData);
      return newData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding attention data');
      throw err;
    }
  }, [addAttentionData]);

  return {
    attentionData,
    loading,
    error,
    fetchHistoricalData,
    addNewData,
  };
};

// Hook for real-time data connection
export const useRealTimeData = (classroomId: string | null) => {
  const { isLiveMode, setLiveMode, addAttentionData, updateLastUpdate } = useAppStore();
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  const startRealTime = useCallback(() => {
    if (!classroomId) return;

    setConnectionStatus('connecting');
    setLiveMode(true);

    const handleNewData = (data: AttentionData) => {
      addAttentionData(data);
      updateLastUpdate();
    };

    wsService.connect(classroomId, handleNewData);
    setConnectionStatus('connected');
  }, [classroomId, setLiveMode, addAttentionData, updateLastUpdate]);

  const stopRealTime = useCallback(() => {
    wsService.disconnect();
    setLiveMode(false);
    setConnectionStatus('disconnected');
  }, [setLiveMode]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopRealTime();
    };
  }, [stopRealTime]);

  return {
    isLiveMode,
    connectionStatus,
    startRealTime,
    stopRealTime,
  };
};


export const useAuth = () => {
  const { user, isAuthenticated, setUser, logout: storeLogout } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user: userData } = await import('@/services/api').then(api => 
        api.authApi.login(email, password)
      );
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error during login');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await import('@/services/api').then(api => api.authApi.logout());
      storeLogout();
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setLoading(false);
    }
  }, [storeLogout]);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await import('@/services/api').then(api => 
        api.authApi.getCurrentUser()
      );
      setUser(userData);
    } catch (err) {
      // User not authenticated
      storeLogout();
    } finally {
      setLoading(false);
    }
  }, [setUser, storeLogout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    checkAuth,
  };
};

// Hook for dashboard statistics
export const useDashboardStats = () => {
  const { students, attentionData } = useAppStore();
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageAttention: 0,
    lowAttentionAlerts: 0,
    weeklyImprovement: 0,
  });

  useEffect(() => {
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

    // Calculate weekly improvement (mock calculation)
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const weeklyData = attentionData.filter(data => data.timestamp > oneWeekAgo);
    const weeklyAverage = weeklyData.length > 0
      ? Math.round(weeklyData.reduce((acc, data) => acc + data.score, 0) / weeklyData.length)
      : 0;
    
    const weeklyImprovement = averageAttention - weeklyAverage;

    setStats({
      totalStudents,
      averageAttention,
      lowAttentionAlerts,
      weeklyImprovement,
    });
  }, [students, attentionData]);

  return stats;
};

// Hook for filtering and searching
export const useFilters = <T>(
  data: T[],
  searchFields: (keyof T)[],
  initialFilters: Record<string, any> = {}
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);

  const filteredData = data.filter(item => {
    // Search filter
    const matchesSearch = searchTerm === '' || searchFields.some(field => {
      const value = item[field];
      return typeof value === 'string' && 
        value.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Custom filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (value === '' || value === 'all') return true;
      return item[key as keyof T] === value;
    });

    return matchesSearch && matchesFilters;
  });

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilters(initialFilters);
  }, [initialFilters]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData,
  };
};

