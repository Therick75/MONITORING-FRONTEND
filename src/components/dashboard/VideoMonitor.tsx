'use client';

import { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiMaximize2, FiSettings } from 'react-icons/fi';

interface BoundingBox {
  id: string;
  name: string;
  score: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface VideoMonitorProps {
  classroomName: string;
  isLive?: boolean;
}

const mockBoundingBoxes: BoundingBox[] = [
  { id: 'S01', name: 'María', score: 95, x: 10, y: 10, width: 15, height: 20 },
  { id: 'S02', name: 'Juan', score: 65, x: 75, y: 10, width: 15, height: 20 },
  { id: 'S03', name: 'Ana', score: 88, x: 40, y: 15, width: 15, height: 20 },
  { id: 'S04', name: 'Carlos', score: 35, x: 42, y: 70, width: 15, height: 20 },
  { id: 'S05', name: 'Laura', score: 92, x: 15, y: 60, width: 15, height: 20 },
];

export default function VideoMonitor({ classroomName, isLive = true }: VideoMonitorProps) {
  const [isPlaying, setIsPlaying] = useState(isLive);
  const [showOverlay, setShowOverlay] = useState(true);

  const getBoxColor = (score: number) => {
    if (score >= 80) return 'border-success-400';
    if (score >= 60) return 'border-warning-400';
    return 'border-danger-400';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-400';
    if (score >= 60) return 'text-warning-400';
    return 'text-danger-400';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Monitoreo en Tiempo Real - {classroomName}
          </h3>
          <div className="flex items-center space-x-2">
            {isLive && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-600 font-medium">EN VIVO</span>
              </div>
            )}
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              title="Toggle overlay"
            >
              <FiSettings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative bg-gray-900 rounded-lg overflow-hidden group" style={{ aspectRatio: '16/9' }}>
          {/* Video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {isPlaying ? (
                  <FiPause className="w-8 h-8" />
                ) : (
                  <FiPlay className="w-8 h-8 ml-1" />
                )}
              </div>
              <p className="text-sm">Video en tiempo real</p>
              <p className="text-xs text-gray-300 mt-1">
                {isPlaying ? 'Transmisión activa' : 'Pausado'}
              </p>
            </div>
          </div>

          {/* Bounding boxes overlay */}
          {showOverlay && (
            <div className="absolute inset-0">
              {mockBoundingBoxes.map((box) => (
                <div
                  key={box.id}
                  className={`absolute border-2 ${getBoxColor(box.score)} rounded transition-all duration-300 hover:scale-105`}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                  }}
                >
                  <span className={`absolute -top-6 left-0 text-xs ${getScoreColor(box.score)} bg-black/70 px-2 py-1 rounded text-white font-medium`}>
                    {box.name} - {box.score}%
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Video controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
            >
              {isPlaying ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
                <FiMaximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Recording indicator */}
          {isLive && (
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/70 px-3 py-1 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">REC</span>
            </div>
          )}
        </div>

        {/* Video stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Estudiantes detectados</p>
            <p className="text-lg font-semibold text-gray-900">{mockBoundingBoxes.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Atención promedio</p>
            <p className="text-lg font-semibold text-gray-900">
              {Math.round(mockBoundingBoxes.reduce((acc, box) => acc + box.score, 0) / mockBoundingBoxes.length)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Calidad de video</p>
            <p className="text-lg font-semibold text-success-600">HD</p>
          </div>
        </div>
      </div>
    </div>
  );
}

