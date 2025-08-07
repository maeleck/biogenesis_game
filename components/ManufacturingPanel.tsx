
import React, { useState } from 'react';
import { Resource, UniqueResource } from '../types';
import { CRAFTABLE_ITEMS, UNIQUE_RESOURCES } from '../constants';
import { ResourceIcon, UniqueResourceIcon, CraftableItemIcon, CheckCircleIcon } from './Icons';

interface ManufacturingPanelProps {
    purchasedManufacturingItems: Set<string>;
    resources: Record<Resource, number>;
    uniqueResources: Record<UniqueResource, number>;
    onPurchaseItem: (itemId: string) => void;
    onCraftResource: (resourceId: UniqueResource) => void;
}

const ManufacturingPanel: React.FC<ManufacturingPanelProps> = ({ 
    purchasedManufacturingItems, resources, uniqueResources, onPurchaseItem, onCraftResource 
}) => {
    const [activeTab, setActiveTab] = useState<'crafting' | 'construction'>('crafting');
    const [selectedItemId, setSelectedItemId] = useState<string>(CRAFTABLE_ITEMS[0]?.id);

    const canAfford = (costs: { resource: Resource | UniqueResource; amount: number }[]) => {
        return costs.every(c => {
            if (Object.values(Resource).includes(c.resource as Resource)) {
                return resources[c.resource as Resource] >= c.amount;
            } else {
                return uniqueResources[c.resource as UniqueResource] >= c.amount;
            }
        });
    };

    const selectedItem = CRAFTABLE_ITEMS.find(item => item.id === selectedItemId);

    return (
        <div className="p-3 md:p-4 w-full h-full flex flex-col">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-emerald-300 shrink-0">Manufacturing</h2>
            
            <div className="flex border-b border-purple-800/50 mb-4 shrink-0">
                <button
                    onClick={() => setActiveTab('crafting')}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-xs font-medium transition-colors ${activeTab === 'crafting' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}
                >
                    Crafting
                </button>
                <button
                    onClick={() => setActiveTab('construction')}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-xs font-medium transition-colors ${activeTab === 'construction' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}
                >
                    Construction
                </button>
            </div>

            {activeTab === 'crafting' && (
                <div className="flex-grow overflow-y-auto scroll-container pr-2 space-y-3">
                    <p className="text-xs md:text-sm text-slate-400 mb-4 shrink-0">
                        Craft unique components from base resources. These components are required for permanent constructions.
                    </p>
                    {Object.values(UNIQUE_RESOURCES).map(res => {
                         const canCraft = canAfford(res.inputs);
                         return (
                            <div key={res.name} className="bg-slate-800/70 p-3 rounded-xl border border-slate-700 flex flex-col">
                                <div className="flex items-center gap-3">
                                    <UniqueResourceIcon resource={res.name} className="w-8 h-8 flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-bold text-base text-emerald-300">{res.name}</h3>
                                        <p className="text-xs text-yellow-300">Owned: {uniqueResources[res.name].toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-300 mt-2 flex-grow">{res.description}</p>
                                <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-end justify-between gap-2">
                                    <div className="flex-grow">
                                        <span className="text-xs font-semibold uppercase text-slate-400">Cost to Craft 1:</span>
                                        {res.inputs.map(c => (
                                            <div key={c.resource} className={`flex items-center space-x-2 text-xs mt-1 ${resources[c.resource] >= c.amount ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                <ResourceIcon resource={c.resource} className="w-4 h-4" />
                                                <span>{c.amount.toLocaleString()} {c.resource}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => onCraftResource(res.name)}
                                        disabled={!canCraft}
                                        className="px-6 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Craft
                                    </button>
                                </div>
                            </div>
                         );
                    })}
                </div>
            )}

            {activeTab === 'construction' && (
                <div className="flex flex-col h-full">
                    {/* Display Screen Section */}
                    <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700 mb-4 flex-shrink-0 min-h-[240px] flex flex-col justify-between">
                        {selectedItem ? (
                            <>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <CraftableItemIcon itemId={selectedItem.id} className="w-8 h-8 flex-shrink-0"/>
                                        <h3 className="font-bold text-base md:text-lg text-emerald-300">{selectedItem.name}</h3>
                                        {purchasedManufacturingItems.has(selectedItem.id) && <CheckCircleIcon className="w-6 h-6 text-green-400" />}
                                    </div>
                                    <p className="text-xs text-slate-300 mt-2">{selectedItem.description}</p>
                                </div>
                                
                                <div>
                                    <div className="mt-3 pt-3 border-t border-slate-700/50">
                                       <span className="text-xs font-semibold uppercase text-slate-400">Cost to Construct:</span>
                                       {purchasedManufacturingItems.has(selectedItem.id) ? (
                                           <p className="text-xs text-amber-400 italic mt-1">Already constructed.</p>
                                       ) : (
                                            selectedItem.cost.map(c => {
                                                const isUnique = Object.values(UniqueResource).includes(c.resource as UniqueResource);
                                                const hasEnough = isUnique ? uniqueResources[c.resource as UniqueResource] >= c.amount : resources[c.resource as Resource] >= c.amount;
                                                return (
                                                    <div key={c.resource} className={`flex items-center space-x-2 text-xs mt-1 ${hasEnough ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                        {isUnique ? <UniqueResourceIcon resource={c.resource as UniqueResource} className="w-4 h-4"/> : <ResourceIcon resource={c.resource as Resource} className="w-4 h-4" />}
                                                        <span>{c.amount.toLocaleString()} {c.resource}</span>
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                    <button
                                        onClick={() => onPurchaseItem(selectedItem.id)}
                                        disabled={purchasedManufacturingItems.has(selectedItem.id) || !canAfford(selectedItem.cost)}
                                        className="mt-3 w-full text-sm font-semibold px-2 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors disabled:opacity-50"
                                    >
                                        {purchasedManufacturingItems.has(selectedItem.id) ? 'Constructed' : 'Construct'}
                                    </button>
                                </div>
                            </>
                        ) : (
                             <div className="flex items-center justify-center h-full text-slate-500">
                                <p>Select an item from the grid.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Grid Section */}
                    <div className="flex-grow overflow-y-auto scroll-container pr-2">
                        <div className="grid grid-cols-4 gap-3">
                            {CRAFTABLE_ITEMS.map(item => {
                                const isSelected = item.id === selectedItemId;
                                const isPurchased = purchasedManufacturingItems.has(item.id);
                                return (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSelectedItemId(item.id)}
                                        className={`relative aspect-square p-2 rounded-lg flex items-center justify-center text-center transition-all duration-200 border-2
                                                    ${isSelected ? 'bg-emerald-800/60 border-emerald-400 scale-105' : isPurchased ? 'bg-slate-700/50 border-emerald-600' : 'bg-slate-900/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-500'}`}
                                        aria-label={`Select ${item.name}`}
                                    >
                                        <CraftableItemIcon itemId={item.id} className={`w-10 h-10 ${isPurchased ? 'opacity-50' : ''}`}/>
                                        {isPurchased && <CheckCircleIcon className="absolute top-1 right-1 w-5 h-5 text-emerald-400 bg-slate-800 rounded-full" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManufacturingPanel;