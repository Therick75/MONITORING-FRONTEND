// sidebar
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiBarChart, 
  FiMonitor, 
  FiSettings,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: FiHome },
  { name: 'Reportes', href: '/reports', icon: FiBarChart },
  { name: 'Aulas', href: '/classrooms', icon: FiMonitor },
  { name: 'Configuración', href: '/settings', icon: FiSettings },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      id="sidebar"
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}
    >
      {/* Header Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <FiMonitor className="w-5 h-5 text-white" />
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-900">EduMonitor</span>
        </div>
        <button
          onClick={onToggle}
          className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>

      {/* Content with nav and user info at bottom */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        {/* Navigation */}
        <nav className="mt-6 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${isActive ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info at bottom */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Admin</p>
              <p className="text-xs text-gray-500">admin@edu.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
