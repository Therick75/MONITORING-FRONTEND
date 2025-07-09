'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClassroomCard from '@/components/classrooms/ClassroomCard';
import ClassroomModal, { ClassroomFormData } from '@/components/classrooms/ClassroomModal';
import { FiPlus, FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi';

interface Classroom {
  id: number;
  name: string;
  camera: string;
  isActive: boolean;
  studentCount: number;
  lastActivity?: string;
  attentionAverage?: number;
}

// Mock data
const initialClassrooms: Classroom[] = [
  {
    id: 1,
    name: 'Aula 101',
    camera: 'rtsp://192.168.1.101:554/stream',
    isActive: true,
    studentCount: 25,
    lastActivity: new Date().toISOString(),
    attentionAverage: 78,
  },
  {
    id: 2,
    name: 'Aula 102',
    camera: 'rtsp://192.168.1.102:554/stream',
    isActive: false,
    studentCount: 22,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    attentionAverage: 65,
  },
  {
    id: 3,
    name: 'Aula 103',
    camera: 'rtsp://192.168.1.103:554/stream',
    isActive: true,
    studentCount: 28,
    lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    attentionAverage: 82,
  },
  {
    id: 4,
    name: 'Laboratorio A',
    camera: 'rtsp://192.168.1.104:554/stream',
    isActive: false,
    studentCount: 15,
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    attentionAverage: 71,
  },
];

export default function Classrooms() {
  const [classrooms, setClassrooms] = useState<Classroom[]>(initialClassrooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClassroom = () => {
    setEditingClassroom(null);
    setIsModalOpen(true);
  };

  const handleEditClassroom = (id: number) => {
    const classroom = classrooms.find(c => c.id === id);
    if (classroom) {
      setEditingClassroom(classroom);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClassroom = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta aula?')) {
      setClassrooms(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setClassrooms(prev => prev.map(classroom => 
      classroom.id === id 
        ? { 
            ...classroom, 
            isActive: !classroom.isActive,
            lastActivity: new Date().toISOString()
          }
        : classroom
    ));
  };

  const handleSaveClassroom = (formData: ClassroomFormData) => {
    if (editingClassroom) {
      // Update existing classroom
      setClassrooms(prev => prev.map(classroom =>
        classroom.id === editingClassroom.id
          ? {
              ...classroom,
              name: formData.name,
              camera: formData.camera,
              studentCount: formData.capacity,
            }
          : classroom
      ));
    } else {
      // Add new classroom
      const newClassroom: Classroom = {
        id: Math.max(...classrooms.map(c => c.id)) + 1,
        name: formData.name,
        camera: formData.camera,
        isActive: false,
        studentCount: formData.capacity,
        attentionAverage: 0,
      };
      setClassrooms(prev => [...prev, newClassroom]);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Filter classrooms
  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && classroom.isActive) ||
      (statusFilter === 'inactive' && !classroom.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const activeCount = classrooms.filter(c => c.isActive).length;
  const totalStudents = classrooms.reduce((acc, c) => acc + c.studentCount, 0);
  const averageAttention = classrooms.length > 0 
    ? Math.round(classrooms.reduce((acc, c) => acc + (c.attentionAverage || 0), 0) / classrooms.length)
    : 0;

  return (
    <DashboardLayout title="Gestión de Aulas">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Aulas</h1>
            <p className="text-gray-600">Administra las aulas y su configuración de monitoreo</p>
          </div>
          <button
            onClick={handleAddClassroom}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            <span>Agregar Aula</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Aulas</p>
              <p className="text-2xl font-semibold text-gray-900">{classrooms.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Aulas Activas</p>
              <p className="text-2xl font-semibold text-success-600">{activeCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Estudiantes</p>
              <p className="text-2xl font-semibold text-gray-900">{totalStudents}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Atención Promedio</p>
              <p className="text-2xl font-semibold text-primary-600">{averageAttention}%</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar aulas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todas las aulas</option>
                <option value="active">Solo activas</option>
                <option value="inactive">Solo inactivas</option>
              </select>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
          </div>
        </div>

        {/* Classrooms Grid */}
        {filteredClassrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClassrooms.map((classroom) => (
              <ClassroomCard
                key={classroom.id}
                classroom={classroom}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEditClassroom}
                onDelete={handleDeleteClassroom}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron aulas</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza agregando tu primera aula'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={handleAddClassroom}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mx-auto"
              >
                <FiPlus className="w-4 h-4" />
                <span>Agregar Primera Aula</span>
              </button>
            )}
          </div>
        )}

        {/* Modal */}
        <ClassroomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveClassroom}
          classroom={editingClassroom}
        />
      </div>
    </DashboardLayout>
  );
}

