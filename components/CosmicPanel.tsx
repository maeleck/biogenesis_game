import React from 'react';
import { XMarkIcon } from './Icons';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  lastSaveTimestamp: number | null;
  onOpenDebugMenu: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ isOpen, onClose, onSave, onDelete, lastSaveTimestamp, onOpenDebugMenu }) => {
  if (!isOpen) {
    return null;
  }

  const lastSaveString = lastSaveTimestamp 
    ? `Last save: ${new Date(lastSaveTimestamp).toLocaleString()}`
    : 'Not saved yet.';

  const handleOpenDebug = () => {
    onOpenDebugMenu();
    onClose();
  };

  return (
    <div className="absolute top-1 right-1 p-4 z-50" role="dialog" aria-modal="true" aria-labelledby="settings-title">
      <div className="relative w-64 bg-slate-800/95 backdrop-blur-sm border border-purple-700 rounded-2xl shadow-2xl p-4 text-sm">
        <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-white" aria-label="Close Settings">
          <XMarkIcon className="w-5 h-5" />
        </button>
        <h3 id="settings-title" className="text-base font-bold text-yellow-300 mb-4">Settings</h3>
        <div className="space-y-3">
            <p className="text-xs text-slate-400 text-center">{lastSaveString}</p>
            <p className="text-xs text-slate-400 text-center italic">Game autosaves every minute.</p>
            <button
                onClick={onSave}
                className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold transition-colors"
            >
                Save Now
            </button>
             <button
                onClick={onDelete}
                className="w-full px-4 py-2 bg-rose-700 hover:bg-rose-800 rounded-lg font-semibold transition-colors"
            >
                Delete Save Data
            </button>
             <button
                onClick={handleOpenDebug}
                className="w-full mt-4 px-4 py-2 bg-yellow-700/50 border border-yellow-600 hover:bg-yellow-600/50 rounded-lg font-semibold transition-colors text-yellow-300 text-xs"
            >
                Debug Menu
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;