
import React from 'react';
import { Resource } from '../types';
import { RESOURCES } from '../constants';
import { ResourceIcon } from './Icons';

interface ResourceDisplayProps {
  resource: Resource;
  amount: number;
  capacity?: number;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resource, amount, capacity }) => {
  const resourceData = RESOURCES[resource];
  const displayAmount = Math.floor(amount).toLocaleString();
  const displayCapacity = capacity ? ` / ${Math.floor(capacity).toLocaleString()}` : '';

  return (
    <div className="flex items-center justify-between p-2 bg-gray-800/60 rounded-lg" title={resourceData.description}>
      <div className="flex items-center space-x-2">
        <ResourceIcon resource={resource} className="w-5 h-5 flex-shrink-0" />
        <span className="font-semibold text-xs md:text-sm text-gray-200">{resourceData.name}</span>
      </div>
      <span className="text-sm md:text-base font-mono text-cyan-300">{displayAmount}{displayCapacity}</span>
    </div>
  );
};

export default ResourceDisplay;