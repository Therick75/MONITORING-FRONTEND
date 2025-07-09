'use client';

import { FiMenu, FiChevronDown, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '@/hooks';
import { useAppStore } from '@/store/appStore';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
}

export default function Header({ onMenuToggle, title }: HeaderProps) {
  const { user, logout } = useAuth();
  const { currentClassroom, setCurrentClassroom } = useAppStore();
  const [isClassroomDropdownOpen, setIsClassroomDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Mock classrooms - in real app, this would come from API
  const classrooms = [
    { id: 1, name: 'Aula 101' },
    { id: 2, name: 'Aula 102' },
    { id: 3, name: 'Aula 103' },
    { id: 4, name: 'Laboratorio A' },
  ];

  const selectedClassroom = currentClassroom || classrooms[0];

  const handleClassroomChange = (classroom: any) => {
    setCurrentClassroom(classroom);
    setIsClassroomDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsUserDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* Center - Classroom Selector */}
        <div className="hidden md:block">
          <div className="relative">
            <button
              onClick={() => setIsClassroomDropdownOpen(!isClassroomDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <span className="font-medium">{selectedClassroom.name}</span>
              <FiChevronDown className={`h-4 w-4 transition-transform ${isClassroomDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isClassroomDropdownOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  {classrooms.map((classroom) => (
                    <button
                      key={classroom.id}
                      onClick={() => handleClassroomChange(classroom)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        selectedClassroom.id === classroom.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                      }`}
                    >
                      {classroom.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                <FiUser className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Administrador'}</p>
              </div>
              <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <FiUser className="h-4 w-4" />
                    <span>Mi Perfil</span>
                  </button>
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <FiSettings className="h-4 w-4" />
                    <span>Configuración</span>
                  </button>
                  
                  <div className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <FiLogOut className="h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Classroom Selector */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <button
            onClick={() => setIsClassroomDropdownOpen(!isClassroomDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <span className="font-medium">{selectedClassroom.name}</span>
            <FiChevronDown className={`h-4 w-4 transition-transform ${isClassroomDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isClassroomDropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                {classrooms.map((classroom) => (
                  <button
                    key={classroom.id}
                    onClick={() => handleClassroomChange(classroom)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      selectedClassroom.id === classroom.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                    }`}
                  >
                    {classroom.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

