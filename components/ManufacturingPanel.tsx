import React from 'react';
import { Resource, CraftableItem } from '../types';
import { CRAFTABLE_ITEMS } from '../constants';
import { ResourceIcon, InfinityIcon } from './Icons';

interface ManufacturingPanelProps {
    craftedItemLevels: Record<string, number>;
    resources: Record<Resource, number>;
    onCraft: (itemId: string) => void;
}

const ManufacturingPanel: React.FC<ManufacturingPanelProps> = ({ craftedItemLevels, resources, onCraft }) => {

    const canAfford = (costs: { resource: Resource; amount: number }[]) => {
        return costs.every(c => resources[c.resource] >= c.amount);
    };

    return (
        <div className="p-3 md:p-4 w-full h-full flex flex-col relative">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-emerald-300 shrink-0">Manufacturing</h2>
            <p className="text-xs md:text-sm text-slate-400 mb-4 shrink-0">
                Construct powerful, permanent structures that provide passive bonuses and automate production.
            </p>

            <div className="flex-grow overflow-y-auto scroll-container pr-2 space-y-3">
                {CRAFTABLE_ITEMS.map(item => {
                    const currentLevel = craftedItemLevels[item.id] || 0;
                    const isMaxedOut = item.maxLevel !== undefined && currentLevel >= item.maxLevel;
                    const costs = item.cost(currentLevel);
                    const affordable = canAfford(costs);
                    const isDisabled = isMaxedOut || !affordable;

                    return (
                        <div key={item.id} className={`p-3 rounded-2xl border flex flex-col gap-3 ${isMaxedOut ? 'bg-amber-900/50 border-amber-700' : 'bg-slate-800/70 border-slate-700'}`}>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2">
                                    <h4 className={`font-bold text-sm md:text-base ${isMaxedOut ? 'text-amber-200' : 'text-emerald-300'}`}>{item.name}</h4>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">{item.description(currentLevel)}</p>
                                <p className="text-xs text-yellow-300 mt-1">Level: {currentLevel}{item.maxLevel ? ` / ${item.maxLevel}` : ''}</p>
                            </div>
                            
                            <div className="pt-2 border-t border-slate-700/50">
                               <span className="text-xs font-semibold uppercase text-slate-400">Next Level Cost:</span>
                               {!isMaxedOut ? (
                                    costs.map(c => (
                                        <div key={c.resource} className={`flex items-center space-x-2 text-xs mt-1 ${resources[c.resource] >= c.amount ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            <ResourceIcon resource={c.resource} className="w-4 h-4" />
                                            <span>{c.amount.toLocaleString()} {c.resource}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-amber-400 italic mt-1">Maximum level reached.</p>
                                )}
                            </div>

                            <div className="flex-shrink-0 text-center">
                                <button
                                    onClick={() => onCraft(item.id)}
                                    disabled={isDisabled}
                                    className="w-full text-sm font-semibold px-2 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors disabled:opacity-50"
                                >
                                    {isMaxedOut ? 'Max Level' : 'Construct'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManufacturingPanel;