import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: 'primary' | 'success' | 'warning' | 'danger';
  //color: 'primary' | 'success' | 'warning' | 'danger';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  primary: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200'
  },
  success: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200'
  },
  warning: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
    border: 'border-yellow-200'
  },
  danger: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    border: 'border-red-200'
  }
};

export default function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
            <div className={`${colors.text}`}>
              {icon}
            </div>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <span className={`ml-2 text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

