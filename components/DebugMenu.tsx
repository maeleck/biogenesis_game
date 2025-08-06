
import React from 'react';
import { XMarkIcon } from './Icons';

interface DebugMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onGiveResources: () => void;
  onGiveLoot: () => void;
  onUnlockAll: () => void;
  onGainWorkers: () => void;
}

const DebugMenu: React.FC<DebugMenuProps> = ({ isOpen, onClose, onGiveResources, onGiveLoot, onUnlockAll, onGainWorkers }) => {
  if (!isOpen) return null;

  const createClickHandler = (action: () => void) => () => {
    action();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="debug-title">
      <div className="relative w-80 bg-slate-800/95 backdrop-blur-sm border border-rose-500 rounded-2xl shadow-2xl p-4 text-sm">
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-white" aria-label="Close Debug Menu">
          <XMarkIcon className="w-5 h-5" />
        </button>
        <h3 id="debug-title" className="text-lg font-bold text-rose-400 mb-4 text-center">Debug Menu</h3>
        <div className="space-y-3">
          <p className="text-xs text-slate-400 text-center italic">Warning: These actions can unbalance your game.</p>
          <button
            onClick={createClickHandler(onGiveResources)}
            className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold transition-colors"
          >
            Add 1M of All Resources
          </button>
          <button
            onClick={createClickHandler(onGiveLoot)}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            Add 100k of All Loot
          </button>
           <button
            onClick={createClickHandler(onGainWorkers)}
            className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold transition-colors"
          >
            Gain 100 Max Force/Hands
          </button>
          <button
            onClick={createClickHandler(onUnlockAll)}
            className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold transition-colors"
          >
            Unlock All Upgrades
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugMenu;