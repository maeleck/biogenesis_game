import React from 'react';

interface MapSceneryProps {
  x: number; // percentage
  y: number; // percentage
  size: number; // pixels
  rotation: number; // degrees
  color: string; // tailwind color class
}

const MapScenery: React.FC<MapSceneryProps> = ({ x, y, size, rotation, color }) => {
  const getOpacityClass = () => {
    if (size > 150) {
      return 'opacity-40';
    }
    if (size > 80) {
      return 'opacity-30';
    }
    return 'opacity-20';
  };

  const opacityClass = getOpacityClass();

  return (
    <div
      className={`absolute ${color} rounded-md ${opacityClass} pointer-events-none`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      aria-hidden="true" // Decorative element
    />
  );
};

export default MapScenery;