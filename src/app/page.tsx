'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import VideoMonitor from '@/components/dashboard/VideoMonitor';
import StudentsList from '@/components/dashboard/StudentsList';
import { FiUsers, FiEye, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';

// Mock data - En una aplicación real, esto vendría de una API
const mockStudents = [
  { id: 'S01', name: 'María López', avatar: '/avatars/1.png', classroomId: 1 },
  { id: 'S02', name: 'Juan Pérez', avatar: '/avatars/2.png', classroomId: 1 },
  { id: 'S03', name: 'Ana García', avatar: '/avatars/3.png', classroomId: 1 },
  { id: 'S04', name: 'Carlos Ruiz', avatar: '/avatars/4.png', classroomId: 1 },
  { id: 'S05', name: 'Laura Martín', avatar: '/avatars/5.png', classroomId: 1 },
];

const mockAttentionData = [
  {
    id: 1,
    timestamp: '2024-05-15T09:30:00Z',
    studentId: 'S01',
    behavior: 'focused' as const,
    emotion: 'happy' as const,
    score: 95
  },
  {
    id: 2,
    timestamp: '2024-05-15T09:30:00Z',
    studentId: 'S02',
    behavior: 'distracted' as const,
    emotion: 'neutral' as const,
    score: 65
  },
  {
    id: 3,
    timestamp: '2024-05-15T09:30:00Z',
    studentId: 'S03',
    behavior: 'focused' as const,
    emotion: 'happy' as const,
    score: 88
  },
  {
    id: 4,
    timestamp: '2024-05-15T09:30:00Z',
    studentId: 'S04',
    behavior: 'sleepy' as const,
    emotion: 'sad' as const,
    score: 35
  },
  {
    id: 5,
    timestamp: '2024-05-15T09:30:00Z',
    studentId: 'S05',
    behavior: 'focused' as const,
    emotion: 'happy' as const,
    score: 92
  }
];

export default function Dashboard() {
  const totalStudents = mockStudents.length;
  const averageAttention = Math.round(
    mockAttentionData.reduce((acc, data) => acc + data.score, 0) / mockAttentionData.length
  );
  const lowAttentionAlerts = mockAttentionData.filter(data => data.score < 60).length;

  const handleRefreshStudents = () => {
    // En una aplicación real, esto actualizaría los datos desde la API
    console.log('Refreshing student data...');
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Estudiantes"
            value={totalStudents}
            icon={<FiUsers className="w-6 h-6" />}
            color="primary"
          />
          
          <StatsCard
            title="Atención Promedio"
            value={`${averageAttention}%`}
            icon={<FiEye className="w-6 h-6" />}
            color="success"
            trend={{ value: 5.2, isPositive: true }}
          />
          
          <StatsCard
            title="Alertas Baja Atención"
            value={lowAttentionAlerts}
            icon={<FiAlertTriangle className="w-6 h-6" />}
            color="warning"
          />

          <StatsCard
            title="Mejora Semanal"
            value="+12%"
            icon={<FiTrendingUp className="w-6 h-6" />}
            color="success"
            trend={{ value: 3.1, isPositive: true }}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <VideoMonitor classroomName="Aula 101" isLive={true} />
          </div>

          {/* Students Panel */}
          <div className="lg:col-span-1">
            <StudentsList
              students={mockStudents}
              attentionData={mockAttentionData}
              onRefresh={handleRefreshStudents}
            />
          </div>
        </div>

        {/* Additional insights section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Resumen de Comportamientos
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Enfocados</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-success-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">60%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Distraídos</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-warning-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">20%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Somnolientos</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-danger-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">20%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Actividad Reciente
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Carlos Ruiz - Baja atención detectada</span>
                <span className="text-xs text-gray-400">hace 2 min</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span className="text-sm text-gray-600">María López - Excelente participación</span>
                <span className="text-xs text-gray-400">hace 5 min</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Juan Pérez - Distracción momentánea</span>
                <span className="text-xs text-gray-400">hace 8 min</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Laura Martín - Mejora en atención</span>
                <span className="text-xs text-gray-400">hace 12 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

