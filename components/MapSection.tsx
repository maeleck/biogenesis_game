


import React from 'react';

interface MapSectionProps {
  title: string;
  y: string;
  height: string;
  colorClass: string;
}

const MapSection: React.FC<MapSectionProps> = ({ title, y, height, colorClass }) => {
  return (
    <div
      className={`absolute w-full ${colorClass} border-y border-gray-500/30 pointer-events-none`}
      style={{
        top: y,
        height: height,
      }}
      aria-hidden="true"
    >
      <div className="absolute top-4 left-4 text-gray-500/80 font-bold text-4xl tracking-widest uppercase" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
        {title}
      </div>
    </div>
  );
};

export default MapSection;