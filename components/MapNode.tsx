import React from 'react';
import { Resource, type Upgrade } from '../types';
import { ResourceIcon, InfinityIcon } from './Icons';
import { UpgradeIcon } from './UpgradeIcons';

interface MapNodeProps {
  upgrade: Upgrade;
  isPurchased: boolean;
  isInteractive: boolean;
  canAfford: boolean;
  onClick: () => void;
  resources: Record<Resource, number>;
  hasUnlimited: boolean;
}

const MapNode: React.FC<MapNodeProps> = ({ upgrade, isPurchased, isInteractive, canAfford, onClick, resources, hasUnlimited }) => {
  const nodeColorClass = isPurchased
    ? 'bg-purple-600/80 border-purple-400'
    : canAfford
    ? 'bg-emerald-600/80 border-emerald-400 animate-pulse'
    : 'bg-slate-700/80 border-slate-500';

  const isClickable = !isPurchased || isInteractive;
  
  const isCapstone = upgrade.id === 'extinction_event' || upgrade.id === 'cambrian_explosion';

  const buttonClasses = `absolute w-16 h-16 rounded-full flex items-center justify-center
    transform -translate-x-1/2 -translate-y-1/2 border-4 shadow-lg group
    transition-all duration-300 hover:scale-110
    ${nodeColorClass}
    ${isClickable ? 'cursor-pointer' : 'cursor-default'}`;

  return (
    <div
      className={buttonClasses}
      style={{ left: `${upgrade.position.x}%`, top: `${upgrade.position.y}%` }}
      onClick={isClickable ? onClick : undefined}
      role="button"
      aria-label={`Upgrade: ${upgrade.name}`}
    >
      {isCapstone && isPurchased && (
        <div className="absolute w-full h-full top-0 left-0 pointer-events-none" aria-hidden="true">
            <div className="absolute w-[125%] h-[125%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-yellow-400/80 animate-pulse-slowest" />
            <div className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-yellow-400/60 animate-pulse-slower" />
            <div className="absolute w-[175%] h-[175%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-yellow-400/40 animate-pulse-slow" />
        </div>
      )}
      {hasUnlimited && isPurchased && (
        <div className="absolute w-full h-full top-0 left-0 pointer-events-none" aria-hidden="true">
            <div className="absolute w-[125%] h-[125%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-rose-500/80 animate-pulse-slowest" />
            <div className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-rose-500/60 animate-pulse-slower" />
            <div className="absolute w-[175%] h-[175%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-rose-500/40 animate-pulse-slow" />
        </div>
      )}
      <div className="w-10 h-10 text-white">
        <UpgradeIcon iconId={upgrade.icon} />
      </div>

      <div className="absolute top-full mt-2 w-max text-center pointer-events-none animate-float">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md flex items-center gap-1 ${isPurchased ? 'bg-purple-600/80 text-purple-50' : 'bg-slate-800/80 text-slate-200'}`}>
          {upgrade.name}
          {hasUnlimited && <InfinityIcon className="w-4 h-4 text-amber-300" />}
        </span>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-3 w-64 p-3 bg-slate-800 border border-purple-700 rounded-2xl shadow-xl 
        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
        transform -translate-x-1/2 left-1/2 z-10">
          <h4 className="font-bold text-yellow-300 text-sm">{upgrade.name}</h4>
          <p className="text-xs text-slate-300 my-1">{upgrade.description}</p>
          {!isPurchased && (
            <div className="mt-2 pt-2 border-t border-purple-800/50">
                <span className="text-xs font-semibold uppercase text-slate-400">Cost:</span>
                 {upgrade.cost.map(c => (
                     <div key={c.resource} className={`flex items-center space-x-2 text-xs ${resources[c.resource] >= c.amount ? 'text-emerald-400' : 'text-rose-400'}`}>
                        <ResourceIcon resource={c.resource} className="w-4 h-4" />
                        <span>{c.amount.toLocaleString()} {c.resource}</span>
                     </div>
                 ))}
            </div>
          )}
          {isPurchased && <p className="text-xs text-emerald-400 font-bold mt-2">Researched</p>}

          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-b border-r border-purple-700 transform rotate-45"></div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translatey(0px); }
          50% { transform: translatey(-4px); }
          100% { transform: translatey(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes pulse-slowest { 50% { opacity: .4; } }
        @keyframes pulse-slower { 50% { opacity: .4; } }
        @keyframes pulse-slow { 50% { opacity: .4; } }
        .animate-pulse-slowest { animation: pulse-slowest 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slower { animation: pulse-slower 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
};

export default MapNode;