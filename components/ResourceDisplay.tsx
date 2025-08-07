import React, { useMemo } from 'react';
import { Resource } from '../types';
import { RESOURCES } from '../constants';
import { ResourceIcon } from './Icons';

interface ResourceDisplayProps {
  resource: Resource;
  amount: number;
  capacity?: number;
  generationRate?: number;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resource, amount, capacity, generationRate }) => {
  const resourceData = RESOURCES[resource];
  const displayAmount = Math.floor(amount).toLocaleString();
  const displayCapacity = capacity ? ` / ${Math.floor(capacity).toLocaleString()}` : '';

  const generationString = useMemo(() => {
    if (generationRate === undefined || Math.abs(generationRate) < 0.01) {
      return null;
    }
    const sign = generationRate > 0 ? '+' : '';
    const rate = generationRate.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `${sign}${rate}/s`;
  }, [generationRate]);

  const generationColorClass = generationRate && generationRate > 0 ? 'text-emerald-400' : 'text-rose-400';

  const fullTitle = useMemo(() => {
      let title = resourceData.description;
      if (generationString) {
          title += `\nRate: ${generationString}`;
      }
      return title;
  }, [resourceData.description, generationString]);

  return (
    <div className="flex items-center justify-between p-2 bg-slate-800/60 rounded-xl" title={fullTitle}>
      <div className="flex items-center space-x-2 overflow-hidden">
        <ResourceIcon resource={resource} className="w-5 h-5 flex-shrink-0" />
        <span className="font-semibold text-xs md:text-sm text-slate-200 truncate">{resourceData.name}</span>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        {generationString && (
          <span className={`text-[11px] md:text-xs font-mono ${generationColorClass}`}>{generationString}</span>
        )}
        <span className="text-sm md:text-base font-mono text-yellow-300">{displayAmount}{displayCapacity}</span>
      </div>
    </div>
  );
};

export default ResourceDisplay;