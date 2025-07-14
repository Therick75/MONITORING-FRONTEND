'use client';

import { useState } from 'react';
import { FiChevronUp, FiChevronDown, FiDownload, FiEye } from 'react-icons/fi';

interface DataTableProps {
  data: {
    id: number;
    timestamp: string;
    studentId: string;
    studentName: string;
    behavior: string;
    emotion: string;
    score: number;
    classroom: string;
  }[];
  title?: string;
}

type SortField = 'timestamp' | 'studentName' | 'behavior' | 'emotion' | 'score';
type SortDirection = 'asc' | 'desc';

export default function DataTable({ data, title = "Datos Históricos Detallados" }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const behaviorLabels: { [key: string]: string } = {
    focused: 'Enfocado',
    raising_hand: 'levanta la mano',
    reading_book: 'Leyendo',
    bored: 'Aburrido',
    laughing: 'Riendo',
    using_phone: 'Usando el teléfono',
    thinking: 'Pensando',
    writing: 'Escribiendo',
    food: 'Comiendo',
  };

  const emotionLabels: { [key: string]: string } = {
    happy: 'Feliz',
    neutral: 'Neutral',
    sad: 'Triste',
    angry: 'Enojado',
    surprised: 'Sorprendido',
  };

  const emotionEmojis: { [key: string]: string } = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getBehaviorColor = (behavior: string) => {
    switch (behavior) {
      case 'focused':
      case 'engaged':
        return 'text-green-700 bg-green-100';
      case 'distracted':
        return 'text-yellow-700 bg-yellow-100';
      case 'sleepy':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const sortedData = [...data].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === 'timestamp') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <div className="w-4 h-4" />;
    return sortDirection === 'asc' ? 
      <FiChevronUp className="w-4 h-4" /> : 
      <FiChevronDown className="w-4 h-4" />;
  };

  const exportData = () => {
    const csv = [
      ['Fecha', 'Hora', 'Estudiante', 'Aula', 'Comportamiento', 'Emoción', 'Puntuación'],
      ...sortedData.map(row => [
        new Date(row.timestamp).toLocaleDateString('es-ES'),
        new Date(row.timestamp).toLocaleTimeString('es-ES'),
        row.studentName,
        row.classroom,
        behaviorLabels[row.behavior] || row.behavior,
        emotionLabels[row.emotion] || row.emotion,
        row.score.toString(),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `datos_atencion_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">
              Mostrando {paginatedData.length} de {data.length} registros
            </p>
          </div>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Fecha/Hora</span>
                  <SortIcon field="timestamp" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('studentName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Estudiante</span>
                  <SortIcon field="studentName" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aula
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('behavior')}
              >
                <div className="flex items-center space-x-1">
                  <span>Comportamiento</span>
                  <SortIcon field="behavior" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('emotion')}
              >
                <div className="flex items-center space-x-1">
                  <span>Emoción</span>
                  <SortIcon field="emotion" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center space-x-1">
                  <span>Puntuación</span>
                  <SortIcon field="score" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div className="font-medium">
                      {new Date(row.timestamp).toLocaleDateString('es-ES')}
                    </div>
                    <div className="text-gray-500">
                      {new Date(row.timestamp).toLocaleTimeString('es-ES')}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.classroom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getBehaviorColor(row.behavior)}`}>
                    {behaviorLabels[row.behavior] || row.behavior}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {emotionEmojis[row.emotion] || '😐'}
                    </span>
                    <span>
                      {emotionLabels[row.emotion] || row.emotion}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${getScoreColor(row.score)}`}>
                    {row.score}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

