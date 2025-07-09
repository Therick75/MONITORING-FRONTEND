import { Student, AttentionData } from '@/types';
import StudentItem from './StudentItem';
import { FiUsers, FiFilter, FiRefreshCw } from 'react-icons/fi';

interface StudentsListProps {
  students: Student[];
  attentionData: AttentionData[];
  onRefresh?: () => void;
}

export default function StudentsList({ students, attentionData, onRefresh }: StudentsListProps) {
  const getStudentAttentionData = (studentId: string) => {
    return attentionData.find(data => data.studentId === studentId) || {
      id: 0,
      timestamp: new Date().toISOString(),
      studentId,
      behavior: 'neutral' as const,
      emotion: 'neutral' as const,
      score: 0
    };
  };

  const averageAttention = attentionData.length > 0 
    ? Math.round(attentionData.reduce((acc, data) => acc + data.score, 0) / attentionData.length)
    : 0;

  const lowAttentionCount = attentionData.filter(data => data.score < 60).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FiUsers className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              Estado de Estudiantes
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onRefresh}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              title="Actualizar datos"
            >
              <FiRefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <FiFilter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-500">Atención promedio</p>
            <p className={`text-xl font-semibold ${
              averageAttention >= 80 ? 'text-success-600' : 
              averageAttention >= 60 ? 'text-warning-600' : 'text-danger-600'
            }`}>
              {averageAttention}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Alertas activas</p>
            <p className={`text-xl font-semibold ${
              lowAttentionCount === 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              {lowAttentionCount}
            </p>
          </div>
        </div>

        {/* Students list */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {students.map((student, index) => (
            <StudentItem
              key={student.id}
              student={student}
              attentionData={getStudentAttentionData(student.id)}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Total: {students.length} estudiantes</span>
            <span>Última actualización: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

