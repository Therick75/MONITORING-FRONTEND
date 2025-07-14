'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BehaviorChartProps {
  data: {
    behavior: string;
    count: number;
    percentage: number;
  }[];
  title?: string;
}

export default function BehaviorChart({ data, title = "Comportamientos Más Frecuentes" }: BehaviorChartProps) {
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
  const behaviorColors: { [key: string]: { bg: string; border: string } } = {
    focused: { bg: 'rgba(34, 197, 94, 0.8)', border: 'rgb(34, 197, 94)' },           // Green
    raising_hand: { bg: 'rgba(59, 130, 246, 0.8)', border: 'rgb(59, 130, 246)' },    // Blue
    reading_book: { bg: 'rgba(13, 148, 136, 0.8)', border: 'rgb(13, 148, 136)' },    // Teal
    bored: { bg: 'rgba(249, 115, 22, 0.8)', border: 'rgb(249, 115, 22)' },           // Orange
    laughing: { bg: 'rgba(132, 204, 22, 0.8)', border: 'rgb(132, 204, 22)' },        // Lime
    using_phone: { bg: 'rgba(239, 68, 68, 0.8)', border: 'rgb(239, 68, 68)' },       // Red
    thinking: { bg: 'rgba(234, 179, 8, 0.8)', border: 'rgb(234, 179, 8)' },          // Yellow
    writing: { bg: 'rgba(168, 85, 247, 0.8)', border: 'rgb(168, 85, 247)' },         // Purple
    food: { bg: 'rgba(236, 72, 153, 0.8)', border: 'rgb(236, 72, 153)' },            // Pink
  };


  const chartData = {
    labels: data.map(item => behaviorLabels[item.behavior] || item.behavior),
    datasets: [
      {
        label: 'Frecuencia (%)',
        data: data.map(item => item.percentage),
        backgroundColor: data.map(item => behaviorColors[item.behavior]?.bg || 'rgba(156, 163, 175, 0.8)'),
        borderColor: data.map(item => behaviorColors[item.behavior]?.border || 'rgb(156, 163, 175)'),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
          family: 'Inter, sans-serif',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const dataPoint = data[context.dataIndex];
            return [
              `Frecuencia: ${context.parsed.y}%`,
              `Ocurrencias: ${dataPoint.count}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          color: '#6b7280',
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          color: '#6b7280',
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const totalOccurrences = data.reduce((acc, item) => acc + item.count, 0);
  const mostFrequent = data.length > 0 ? data.reduce((prev, current) => 
    prev.percentage > current.percentage ? prev : current
  ) : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            Total de observaciones: {totalOccurrences}
          </p>
        </div>
      </div>
      
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={options} />
      </div>

      {/* Behavior breakdown */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Desglose detallado:</h4>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={item.behavior} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: behaviorColors[item.behavior]?.border || 'rgb(156, 163, 175)' }}
                ></div>
                <span className="text-sm text-gray-700">
                  {behaviorLabels[item.behavior] || item.behavior}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">
                  {item.percentage}%
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  ({item.count})
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {mostFrequent && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Comportamiento más frecuente:</span>{' '}
              {behaviorLabels[mostFrequent.behavior] || mostFrequent.behavior} ({mostFrequent.percentage}%)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

