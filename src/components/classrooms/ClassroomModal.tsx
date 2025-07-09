'use client';

import { useState, useEffect } from 'react';
import { FiX, FiCamera, FiMonitor, FiSave } from 'react-icons/fi';

interface ClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (classroom: ClassroomFormData) => void;
  classroom?: {
    id: number;
    name: string;
    camera: string;
    isActive: boolean;
    studentCount: number;
  } | null;
}

export interface ClassroomFormData {
  name: string;
  camera: string;
  description?: string;
  capacity: number;
}

export default function ClassroomModal({ isOpen, onClose, onSave, classroom }: ClassroomModalProps) {
  const [formData, setFormData] = useState<ClassroomFormData>({
    name: '',
    camera: '',
    description: '',
    capacity: 30,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (classroom) {
      setFormData({
        name: classroom.name,
        camera: classroom.camera,
        description: '',
        capacity: classroom.studentCount,
      });
    } else {
      setFormData({
        name: '',
        camera: '',
        description: '',
        capacity: 30,
      });
    }
    setErrors({});
  }, [classroom, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del aula es requerido';
    }

    if (!formData.camera.trim()) {
      newErrors.camera = 'La URL de la cámara es requerida';
    } else if (!formData.camera.startsWith('rtsp://') && !formData.camera.startsWith('http://') && !formData.camera.startsWith('https://')) {
      newErrors.camera = 'La URL debe comenzar con rtsp://, http:// o https://';
    }

    if (formData.capacity < 1 || formData.capacity > 100) {
      newErrors.capacity = 'La capacidad debe estar entre 1 y 100 estudiantes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simular delay de API
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleInputChange = (field: keyof ClassroomFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FiMonitor className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {classroom ? 'Editar Aula' : 'Agregar Nueva Aula'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Aula *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ej: Aula 101"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Camera URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de la Cámara *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.camera}
                  onChange={(e) => handleInputChange('camera', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.camera ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="rtsp://192.168.1.100:554/stream"
                />
                <FiCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.camera && (
                <p className="mt-1 text-sm text-red-600">{errors.camera}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Formatos soportados: RTSP, HTTP, HTTPS
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción (Opcional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Descripción adicional del aula..."
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacidad de Estudiantes *
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.capacity ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="30"
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4" />
                    <span>{classroom ? 'Actualizar' : 'Crear'} Aula</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

