'use client';

import { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiMaximize2, FiSettings } from 'react-icons/fi';

interface BoundingBox {
  name: string;
  attention: string;
  emotion: string;
  score: number;
  x: number;       // en píxeles
  y: number;       // en píxeles
  width: number;   // en píxeles
  height: number;  // en píxeles
}

interface VideoMonitorProps {
  classroomName: string;
  isLive?: boolean;
}

export default function VideoMonitor({ classroomName, isLive = true }: VideoMonitorProps) {
  const [isPlaying, setIsPlaying] = useState(isLive);
  const [showOverlay, setShowOverlay] = useState(true);
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBox[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const frameQueueRef = useRef<any[]>([]);
  const animationRef = useRef<number>(0);
  const [videoStats, setVideoStats] = useState({
    detectedStudents: 0,
    averageScore: 0,
    quality: 'HD'
  });

  useEffect(() => {
    // Conectar al servidor WebSocket
    wsRef.current = new WebSocket('ws://localhost:8765');
    
    wsRef.current.onopen = () => {
      console.log("Conexión WebSocket establecida");
      setIsPlaying(true);
    };
    
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Agregar a la cola de frames con marca de tiempo
        frameQueueRef.current.push({
          ...data,
          timestamp: Date.now()
        });
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    wsRef.current.onclose = () => {
      console.log("Conexión WebSocket cerrada");
    };
    
    // Función para renderizar frames
    const renderFrame = (timestamp: number) => {
      if (frameQueueRef.current.length > 0) {
        // Ordenar frames por timestamp (más antiguo primero)
        frameQueueRef.current.sort((a, b) => a.timestamp - b.timestamp);
        const frameData = frameQueueRef.current.shift();
        
        // Actualizar la imagen
        if (imageRef.current) {
          imageRef.current.src = `data:image/jpeg;base64,${frameData.image}`;
        }
        
        // Actualizar las cajas delimitadoras
        if (frameData.metadata) {
          setBoundingBoxes(frameData.metadata);
          
          // Calcular estadísticas
          const detectedStudents = frameData.metadata.length;
          const averageScore = detectedStudents > 0 
            ? Math.round(frameData.metadata.reduce((acc: number, box: BoundingBox) => acc + box.score, 0) / detectedStudents)
            : 0;
          
          setVideoStats({
            detectedStudents,
            averageScore,
            quality: 'HD'
          });
        }
      }
      
      // Continuar el bucle de renderizado
      animationRef.current = requestAnimationFrame(renderFrame);
    };
    
    // Iniciar el bucle de renderizado
    animationRef.current = requestAnimationFrame(renderFrame);
    
    return () => {
      // Limpieza al desmontar el componente
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getBoxColor = (score: number) => {
    if (score >= 80) return 'border-green-500';
    if (score >= 60) return 'border-yellow-500';
    return 'border-red-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
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
          {/* Imagen para mostrar el video en tiempo real */}
          <img
            ref={imageRef}
            className="w-full h-full object-contain"
            alt="Live video feed"
          />
          
          {/* Overlay de bounding boxes */}
          {showOverlay && (
            <div className="absolute inset-0">
              {boundingBoxes.map((box, index) => (
                <div
                  key={index}
                  className={`absolute border-2 ${getBoxColor(box.score)} rounded transition-all duration-300 hover:scale-105`}
                  style={{
                    left: `${box.x}px`,
                    top: `${box.y}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`,
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
            <p className="text-lg font-semibold text-gray-900">{videoStats.detectedStudents}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Atención promedio</p>
            <p className="text-lg font-semibold text-gray-900">
              {videoStats.averageScore}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Calidad de video</p>
            <p className="text-lg font-semibold text-green-600">HD</p>
          </div>
        </div>
      </div>
    </div>
  );
}