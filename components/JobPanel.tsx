
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
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700 flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-base font-bold text-teal-300">{knob.name}</h3>
        <p className="text-gray-400 mt-1 mb-3 text-xs">{knob.description}</p>
        
        {knob.workerType === 'Hands' && (
           <p className="text-xs text-amber-300/80 mb-3 italic">Note: Assigning more Hands increases production but reduces efficiency.</p>
        )}

        <div className="space-y-2 text-xs">
          <div>
            <span className="text-xs font-semibold text-red-400 uppercase">Consumes /s</span>
            {knob.inputs.map(({ resource, amount }) => (
              <div key={resource} className="flex items-center space-x-2 mt-1">
                <ResourceIcon resource={resource} className="w-4 h-4" />
                <span>{amount} {resource}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="text-xs font-semibold text-green-400 uppercase">Produces /s</span>
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
        <span className="font-semibold text-sm">{workerName}: {workers}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRemoveWorker}
            disabled={!canRemoveWorker}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-bold"
            aria-label={`Remove ${workerName} from ${knob.name}`}
          >
            -
          </button>
          <button
            onClick={onAddWorker}
            disabled={!canAddWorker}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-bold"
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
