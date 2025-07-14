'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ReportFilters, { ReportFilters as FilterType } from '@/components/reports/ReportFilters';
import AttentionTrendChart from '@/components/reports/AttentionTrendChart';
import BehaviorChart from '@/components/reports/BehaviorChart';
import EmotionChart from '@/components/reports/EmotionChart';
import DataTable from '@/components/reports/DataTable';

// Mock data - En una aplicación real, esto vendría de una API
const generateMockData = () => {
  const students = [
    { id: 'S01', name: 'María López' },
    { id: 'S02', name: 'Juan Pérez' },
    { id: 'S03', name: 'Ana García' },
    { id: 'S04', name: 'Carlos Ruiz' },
    { id: 'S05', name: 'Laura Martín' },
  ];

  const behaviors = ['focused', 'raising-hand', 'reading-book', 'bored', 'laughing', 'using-phone', 'thinking', 'writing','food'];
  const emotions = ['happy', 'neutral', 'sad', 'angry', 'surprised'];

  const data = [];
  const now = new Date();

  // Generate data for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Generate 10-20 records per day
    const recordsPerDay = Math.floor(Math.random() * 11) + 10;
    
    for (let j = 0; j < recordsPerDay; j++) {
      const student = students[Math.floor(Math.random() * students.length)];
      const behavior = behaviors[Math.floor(Math.random() * behaviors.length)];
      const emotion = emotions[Math.floor(Math.random() * emotions.length)];
      
      // Generate score based on behavior
      let baseScore = 75;
      if (behavior === 'focused' || behavior === 'engaged') baseScore = 85;
      if (behavior === 'distracted') baseScore = 65;
      if (behavior === 'sleepy') baseScore = 45;
      
      const score = Math.max(0, Math.min(100, baseScore + Math.floor(Math.random() * 21) - 10));
      
      data.push({
        id: data.length + 1,
        timestamp: new Date(date.getTime() + j * 60000).toISOString(),
        studentId: student.id,
        studentName: student.name,
        behavior,
        emotion,
        score,
        classroom: 'Aula 101',
      });
    }
  }

  return data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const mockData = generateMockData();

export default function Reports() {
  const [filters, setFilters] = useState<FilterType>({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    classroom: 'all',
    student: 'all',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    // En una aplicación real, aquí se haría una llamada a la API
  };

  const handleExport = () => {
    console.log('Exporting report with filters:', filters);
    // En una aplicación real, aquí se generaría y descargaría el reporte
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Filter data based on current filters
  const filteredData = mockData.filter(item => {
    const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
    const isInDateRange = itemDate >= filters.dateRange.start && itemDate <= filters.dateRange.end;
    const matchesClassroom = filters.classroom === 'all' || item.classroom === `Aula ${filters.classroom}`;
    const matchesStudent = filters.student === 'all' || item.studentId === filters.student;
    
    return isInDateRange && matchesClassroom && matchesStudent;
  });

  // Process data for charts
  const trendData = (() => {
    const dailyData: { [key: string]: { total: number; count: number } } = {};
    
    filteredData.forEach(item => {
      const date = new Date(item.timestamp).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { total: 0, count: 0 };
      }
      dailyData[date].total += item.score;
      dailyData[date].count += 1;
    });

    return Object.entries(dailyData)
      .map(([date, data]) => ({
        date,
        averageAttention: Math.round(data.total / data.count),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  })();

  const behaviorData = (() => {
    const behaviorCounts: { [key: string]: number } = {};
    filteredData.forEach(item => {
      behaviorCounts[item.behavior] = (behaviorCounts[item.behavior] || 0) + 1;
    });

    const total = filteredData.length;
    return Object.entries(behaviorCounts).map(([behavior, count]) => ({
      behavior,
      count,
      percentage: Math.round((count / total) * 100),
    })).sort((a, b) => b.percentage - a.percentage);
  })();

  const emotionData = (() => {
    const emotionCounts: { [key: string]: number } = {};
    filteredData.forEach(item => {
      emotionCounts[item.emotion] = (emotionCounts[item.emotion] || 0) + 1;
    });

    const total = filteredData.length;
    return Object.entries(emotionCounts).map(([emotion, count]) => ({
      emotion,
      count,
      percentage: Math.round((count / total) * 100),
    })).sort((a, b) => b.percentage - a.percentage);
  })();

  return (
      <div className="space-y-6">
        {/* Filters */}
        <ReportFilters
          onFiltersChange={handleFiltersChange}
          onExport={handleExport}
          onRefresh={handleRefresh}
        />

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Registros</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredData.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Atención Promedio</p>
              <p className="text-2xl font-semibold text-blue-600">
                {filteredData.length > 0 
                  ? Math.round(filteredData.reduce((acc, item) => acc + item.score, 0) / filteredData.length)
                  : 0}%
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Días Analizados</p>
              <p className="text-2xl font-semibold text-gray-900">{trendData.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Estudiantes Únicos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(filteredData.map(item => item.studentId)).size}
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttentionTrendChart data={trendData} />
          <BehaviorChart data={behaviorData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmotionChart data={emotionData} />
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen del Período</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mejor día:</span>
                <span className="text-sm font-medium text-gray-900">
                  {trendData.length > 0 
                    ? new Date(trendData.reduce((prev, current) => 
                        prev.averageAttention > current.averageAttention ? prev : current
                      ).date).toLocaleDateString('es-ES')
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Peor día:</span>
                <span className="text-sm font-medium text-gray-900">
                  {trendData.length > 0 
                    ? new Date(trendData.reduce((prev, current) => 
                        prev.averageAttention < current.averageAttention ? prev : current
                      ).date).toLocaleDateString('es-ES')
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tendencia:</span>
                <span className={`text-sm font-medium ${
                  trendData.length > 1 && trendData[trendData.length - 1].averageAttention > trendData[0].averageAttention
                    ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {trendData.length > 1 
                    ? (trendData[trendData.length - 1].averageAttention > trendData[0].averageAttention ? '↗ Mejorando' : '↘ Declinando')
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable data={filteredData} />
      </div>
  );
}

