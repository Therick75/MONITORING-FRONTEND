'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EmotionChartProps {
  data: {
    emotion: string;
    count: number;
    percentage: number;
  }[];
  title?: string;
}

export default function EmotionChart({ data, title = "Distribución de Emociones" }: EmotionChartProps) {
  const emotionLabels: { [key: string]: string } = {
    happy: 'Feliz',
    neutral: 'Neutral',
    sad: 'Triste',
    angry: 'Enojado',
    surprised: 'Sorprendido',
    confused: 'Confundido',
  };

  const emotionEmojis: { [key: string]: string } = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
    confused: '😕',
  };

  const emotionColors = [
    '#22c55e', // Green for happy
    '#6b7280', // Gray for neutral
    '#ef4444', // Red for sad
    '#dc2626', // Dark red for angry
    '#f59e0b', // Orange for surprised
    '#8b5cf6', // Purple for confused
  ];

  const chartData = {
    labels: data.map(item => emotionLabels[item.emotion] || item.emotion),
    datasets: [
      {
        data: data.map(item => item.percentage),
        backgroundColor: emotionColors.slice(0, data.length),
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          generateLabels: function(chart: any) {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
            const labels = original.call(this, chart);
            
            labels.forEach((label: any, index: number) => {
              const emotion = data[index]?.emotion;
              if (emotion && emotionEmojis[emotion]) {
                label.text = `${emotionEmojis[emotion]} ${label.text}`;
              }
            });
            
            return labels;
          },
        },
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
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const dataPoint = data[context.dataIndex];
            const emoji = emotionEmojis[dataPoint.emotion] || '';
            return [
              `${emoji} ${context.label}`,
              `Porcentaje: ${context.parsed}%`,
              `Ocurrencias: ${dataPoint.count}`,
            ];
          },
        },
      },
    },
    cutout: '60%',
    interaction: {
      intersect: false,
    },
  };

  const totalOccurrences = data.reduce((acc, item) => acc + item.count, 0);
  const dominantEmotion = data.length > 0 ? data.reduce((prev, current) => 
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
      
      <div className="relative" style={{ height: '300px' }}>
        <Doughnut data={chartData} options={options} />
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            {dominantEmotion && (
              <>
                <div className="text-3xl mb-1">
                  {emotionEmojis[dominantEmotion.emotion] || '😐'}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {emotionLabels[dominantEmotion.emotion] || dominantEmotion.emotion}
                </div>
                <div className="text-xs text-gray-500">
                  {dominantEmotion.percentage}%
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Emotion breakdown */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Desglose detallado:</h4>
        <div className="grid grid-cols-2 gap-3">
          {data.map((item, index) => (
            <div key={item.emotion} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2">
                <span className="text-lg">
                  {emotionEmojis[item.emotion] || '😐'}
                </span>
                <span className="text-sm text-gray-700">
                  {emotionLabels[item.emotion] || item.emotion}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {item.percentage}%
                </div>
                <div className="text-xs text-gray-500">
                  ({item.count})
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {dominantEmotion && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Emoción predominante:</span>{' '}
              {emotionEmojis[dominantEmotion.emotion]} {emotionLabels[dominantEmotion.emotion] || dominantEmotion.emotion} ({dominantEmotion.percentage}%)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

