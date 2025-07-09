'use client';

import { useState } from 'react';
import { FiCalendar, FiFilter, FiDownload, FiRefreshCw } from 'react-icons/fi';

interface ReportFiltersProps {
  onFiltersChange: (filters: ReportFilters) => void;
  onExport?: () => void;
  onRefresh?: () => void;
}

export interface ReportFilters {
  dateRange: {
    start: string;
    end: string;
  };
  classroom: string;
  student: string;
}

const classrooms = [
  { id: 'all', name: 'Todas las aulas' },
  { id: '1', name: 'Aula 101' },
  { id: '2', name: 'Aula 102' },
  { id: '3', name: 'Aula 103' },
];

const students = [
  { id: 'all', name: 'Todos los estudiantes' },
  { id: 'S01', name: 'María López' },
  { id: 'S02', name: 'Juan Pérez' },
  { id: 'S03', name: 'Ana García' },
  { id: 'S04', name: 'Carlos Ruiz' },
  { id: 'S05', name: 'Laura Martín' },
];

export default function ReportFilters({ onFiltersChange, onExport, onRefresh }: ReportFiltersProps) {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    classroom: 'all',
    student: 'all',
  });

  const handleFilterChange = (key: keyof ReportFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    const newDateRange = { ...filters.dateRange, [type]: value };
    handleFilterChange('dateRange', newDateRange);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FiFilter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">Filtros de Reporte</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            title="Actualizar datos"
          >
            <FiRefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fecha de inicio
          </label>
          <div className="relative">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fecha de fin
          </label>
          <div className="relative">
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Classroom Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Aula
          </label>
          <select
            value={filters.classroom}
            onChange={(e) => handleFilterChange('classroom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.name}
              </option>
            ))}
          </select>
        </div>

        {/* Student Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Estudiante
          </label>
          <select
            value={filters.student}
            onChange={(e) => handleFilterChange('student', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick filters */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Filtros rápidos:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('dateRange', {
              start: new Date().toISOString().split('T')[0],
              end: new Date().toISOString().split('T')[0],
            })}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            Hoy
          </button>
          <button
            onClick={() => handleFilterChange('dateRange', {
              start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              end: new Date().toISOString().split('T')[0],
            })}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            Última semana
          </button>
          <button
            onClick={() => handleFilterChange('dateRange', {
              start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              end: new Date().toISOString().split('T')[0],
            })}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            Último mes
          </button>
        </div>
      </div>
    </div>
  );
}

