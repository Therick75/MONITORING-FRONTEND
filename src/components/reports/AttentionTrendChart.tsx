'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AttentionTrendChartProps {
  data: {
    date: string;
    averageAttention: number;
    classroom?: string;
  }[];
  title?: string;
}

export default function AttentionTrendChart({ data, title = "Evolución de Atención Diaria" }: AttentionTrendChartProps) {
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      });
    }),
    datasets: [
      {
        label: 'Atención Promedio (%)',
        data: data.map(item => item.averageAttention),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(37, 99, 235)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
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
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Atención: ${context.parsed.y}%`;
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
    elements: {
      point: {
        hoverBackgroundColor: 'rgb(37, 99, 235)',
      },
    },
  };

  const averageAttention = data.length > 0 
    ? Math.round(data.reduce((acc, item) => acc + item.averageAttention, 0) / data.length)
    : 0;

  const trend = data.length > 1 
    ? data[data.length - 1].averageAttention - data[0].averageAttention
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            Promedio del período: {averageAttention}%
            {trend !== 0 && (
              <span className={`ml-2 ${trend > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                ({trend > 0 ? '+' : ''}{trend.toFixed(1)}%)
              </span>
            )}
          </p>
        </div>
      </div>
      
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Máximo</p>
          <p className="text-lg font-semibold text-gray-900">
            {data.length > 0 ? Math.max(...data.map(d => d.averageAttention)) : 0}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Mínimo</p>
          <p className="text-lg font-semibold text-gray-900">
            {data.length > 0 ? Math.min(...data.map(d => d.averageAttention)) : 0}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Días analizados</p>
          <p className="text-lg font-semibold text-gray-900">{data.length}</p>
        </div>
      </div>
    </div>
  );
}

