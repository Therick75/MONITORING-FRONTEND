'use client';

import { useState } from 'react';
import { FiMonitor, FiUsers, FiWifi, FiWifiOff, FiSettings, FiEdit3, FiTrash2 } from 'react-icons/fi';

interface ClassroomCardProps {
  classroom: {
    id: number;
    name: string;
    camera: string;
    isActive: boolean;
    studentCount: number;
    lastActivity?: string;
    attentionAverage?: number;
  };
  onToggleStatus: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ClassroomCard({ classroom, onToggleStatus, onEdit, onDelete }: ClassroomCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleStatus = async () => {
    setIsLoading(true);
    // Simular delay de API
    setTimeout(() => {
      onToggleStatus(classroom.id);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = () => {
    if (classroom.isActive) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAttentionColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              classroom.isActive ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <FiMonitor className={`w-6 h-6 ${
                classroom.isActive ? 'text-blue-600' : 'text-gray-400'
              }`} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{classroom.name}</h3>
              <p className="text-sm text-gray-500">{classroom.camera}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()}`}>
              {classroom.isActive ? (
                <>
                  <FiWifi className="w-3 h-3 mr-1" />
                  Activo
                </>
              ) : (
                <>
                  <FiWifiOff className="w-3 h-3 mr-1" />
                  Inactivo
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-gray-500 mb-1">
              <FiUsers className="w-4 h-4" />
              <span className="text-sm">Estudiantes</span>
            </div>
            <p className="text-xl font-semibold text-gray-900">{classroom.studentCount}</p>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Atención promedio</div>
            <p className={`text-xl font-semibold ${getAttentionColor(classroom.attentionAverage)}`}>
              {classroom.attentionAverage ? `${classroom.attentionAverage}%` : 'N/A'}
            </p>
          </div>
        </div>

        {classroom.lastActivity && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Última actividad:</span>{' '}
              {new Date(classroom.lastActivity).toLocaleString('es-ES')}
            </p>
          </div>
        )}

        {/* Status indicator */}
        <div className="mb-4">
          {classroom.isActive ? (
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Monitoreo en tiempo real</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm">Monitoreo pausado</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(classroom.id)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              title="Editar aula"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(classroom.id)}
              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Eliminar aula"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={handleToggleStatus}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              classroom.isActive
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              classroom.isActive ? 'Pausar' : 'Activar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

