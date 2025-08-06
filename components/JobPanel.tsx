
import React from 'react';
import { type Knob } from '../types';
import { ResourceIcon } from './Icons';

interface ProcessPanelProps {
  knob: Knob;
  workers: number;
  onAddWorker: () => void;
  onRemoveWorker: () => void;
  canAddWorker: boolean;
  canRemoveWorker: boolean;
}

const ProcessPanel: React.FC<ProcessPanelProps> = ({ knob, workers, onAddWorker, onRemoveWorker, canAddWorker, canRemoveWorker }) => {
  const workerName = knob.workerType === 'Force' ? 'Force' : 'Hands';

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg border border-purple-800/50 flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-sm font-bold text-yellow-300">{knob.name}</h3>
        <p className="text-slate-400 mt-1 mb-3 text-[11px] md:text-xs">{knob.description}</p>
        
        {knob.workerType === 'Hands' && (
           <p className="text-[11px] md:text-xs text-amber-300/80 mb-3 italic">Note: Assigning more Hands increases production but reduces efficiency.</p>
        )}

        <div className="space-y-2 text-[11px] md:text-xs">
          <div>
            <span className="text-[11px] md:text-xs font-semibold text-rose-400 uppercase">Consumes /s</span>
            {knob.inputs.map(({ resource, amount }) => (
              <div key={resource} className="flex items-center space-x-2 mt-1">
                <ResourceIcon resource={resource} className="w-4 h-4" />
                <span>{amount} {resource}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="text-[11px] md:text-xs font-semibold text-emerald-400 uppercase">Produces /s</span>
            {knob.outputs.map(({ resource, amount }) => (
              <div key={resource} className="flex items-center space-x-2 mt-1">
                <ResourceIcon resource={resource} className="w-4 h-4" />
                <span>{amount} {resource}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-xs md:text-sm">{workerName}: {workers}</span>
        <div className="flex items-center space-x-1 md:space-x-2">
          <button
            onClick={onRemoveWorker}
            disabled={!canRemoveWorker}
            className="px-2 py-0.5 md:px-3 md:py-1 bg-rose-600 hover:bg-rose-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors font-bold"
            aria-label={`Remove ${workerName} from ${knob.name}`}
          >
            -
          </button>
          <button
            onClick={onAddWorker}
            disabled={!canAddWorker}
            className="px-2 py-0.5 md:px-3 md:py-1 bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors font-bold"
            aria-label={`Add ${workerName} to ${knob.name}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessPanel;