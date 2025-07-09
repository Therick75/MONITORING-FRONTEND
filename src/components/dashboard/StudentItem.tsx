import { Student, AttentionData } from '@/types';

interface StudentItemProps {
  student: Student;
  attentionData: AttentionData;
}

const getAttentionColor = (score: number) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'danger';
};

const getEmotionEmoji = (emotion: string) => {
  switch (emotion) {
    case 'happy': return '😊';
    case 'neutral': return '😐';
    case 'sad': return '😠';
    default: return '😐';
  }
};

const getAttentionStatusColor = (score: number) => {
  if (score >= 80) return 'bg-success-500';
  if (score >= 60) return 'bg-warning-500';
  return 'bg-danger-500';
};

const getProgressBarColor = (score: number) => {
  if (score >= 80) return 'bg-success-500';
  if (score >= 60) return 'bg-warning-500';
  return 'bg-danger-500';
};

const getAvatarColor = (index: number) => {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-red-400 to-red-600',
    'from-yellow-400 to-yellow-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
  ];
  return colors[index % colors.length];
};

export default function StudentItem({ student, attentionData, index = 0 }: StudentItemProps & { index?: number }) {
  const avatarColor = getAvatarColor(index);
  const statusColor = getAttentionStatusColor(attentionData.score);
  const progressColor = getProgressBarColor(attentionData.score);
  const emoji = getEmotionEmoji(attentionData.emotion);

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      <div className={`w-10 h-10 bg-gradient-to-br ${avatarColor} rounded-full flex items-center justify-center shadow-sm`}>
        <span className="text-white text-sm font-medium">
          {student.name.charAt(0).toUpperCase()}
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {student.name}
          </p>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 ${statusColor} rounded-full`}></div>
            <span className="text-lg">{emoji}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${progressColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${attentionData.score}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              {attentionData.score}% atención
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {attentionData.behavior}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

