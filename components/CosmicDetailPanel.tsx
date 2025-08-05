

import React, { useState, useMemo } from 'react';
import { Resource, SubUpgrade, PanelContent, Upgrade, Fact } from '../types';
import { ResourceIcon, XMarkIcon, InfinityIcon } from './Icons';

interface CosmicDetailPanelProps {
  onClose: () => void;
  panelData: { upgrade: Upgrade, content: PanelContent } | null;
  resources: Record<Resource, number>;
  purchasedSubUpgrades: Set<string>;
  subUpgradeLevels: Record<string, number>;
  onPurchaseSubUpgrade: (subUpgrade: SubUpgrade) => void;
}

const CosmicDetailPanel: React.FC<CosmicDetailPanelProps> = ({ onClose, panelData, resources, purchasedSubUpgrades, subUpgradeLevels, onPurchaseSubUpgrade }) => {
  const [activeTab, setActiveTab] = useState<'enhancements' | 'facts'>('enhancements');
  
  const visibleFacts = useMemo(() => {
    if (!panelData) return [];
    return panelData.content.facts.filter(fact => 
      !fact.unlockedBySubUpgradeId || purchasedSubUpgrades.has(fact.unlockedBySubUpgradeId)
    );
  }, [panelData, purchasedSubUpgrades]);

  // Reset tab to enhancements when panel changes
  React.useEffect(() => {
      if(panelData) {
        setActiveTab('enhancements');
      }
  }, [panelData?.upgrade.id]);

  if (!panelData) {
    return null;
  }

  const { upgrade, content } = panelData;

  return (
    <div className="p-4 w-full h-full flex flex-col relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
            <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="shrink-0 mb-4">
            <h2 className="text-xl font-semibold text-indigo-300">{upgrade.name}</h2>
            <p className="text-xs text-gray-400 mt-2 italic border-l-2 border-indigo-400/50 pl-3">{upgrade.description}</p>
        </div>
        
            <div className="flex border-b border-gray-700 mb-4 shrink-0">
            <button
                onClick={() => setActiveTab('enhancements')}
                className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === 'enhancements' ? 'text-indigo-300 border-b-2 border-indigo-300' : 'text-gray-400 hover:text-white'}`}
            >
                Enhancements
            </button>
                <button
                onClick={() => setActiveTab('facts')}
                className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === 'facts' ? 'text-indigo-300 border-b-2 border-indigo-300' : 'text-gray-400 hover:text-white'}`}
            >
                Facts ({visibleFacts.length}/{content.facts.length})
            </button>
        </div>

        <div className="flex-grow overflow-y-auto scroll-container pr-2">
            {activeTab === 'enhancements' && (
                <div className="space-y-3">
                {content.subUpgrades.map(sub => {
                    const isRepeatable = !!sub.repeatable;
                    const currentLevel = subUpgradeLevels[sub.id] || 0;
                    
                    const isPurchased = !isRepeatable && purchasedSubUpgrades.has(sub.id);
                    const maxLevel = sub.repeatable?.maxLevel;
                    const isMaxedOut = isRepeatable && maxLevel !== undefined && currentLevel >= maxLevel;

                    const cost = sub.cost(currentLevel);
                    const canAfford = resources[cost.resource] >= cost.amount;
                    const isDisabled = isPurchased || isMaxedOut || !canAfford;

                    const effectTexts = sub.effects.map(effect => {
                        switch (effect.type) {
                            case 'ADD_BASE_GENERATION': return `+${effect.value}/s ${effect.resource}`;
                            case 'INCREASE_CAPACITY': return `+${effect.value.toLocaleString()} ${effect.resource} Capacity`;
                            case 'INCREASE_GENERATION_MULTIPLIER': return `+${effect.value * 100}% ${effect.resource} Efficiency`;
                            case 'INCREASE_MAX_FORCE': return `+${effect.value} Max Force`;
                            case 'INCREASE_MAX_HANDS': return `+${effect.value} Max Hands`;
                            case 'INCREASE_UNIVERSAL_STORAGE': return `+${effect.value} Universal Storage Level`;
                            default: return '';
                        }
                    }).filter(text => text);


                    return (
                        <div key={sub.id} className={`p-3 rounded-lg border flex items-start gap-4 ${isPurchased || isMaxedOut ? 'bg-indigo-900/50 border-indigo-700' : 'bg-gray-800/70 border-gray-700'}`}>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2">
                                    {isRepeatable && <InfinityIcon className="w-4 h-4 text-amber-300" />}
                                    <h4 className={`font-bold text-sm ${isPurchased || isMaxedOut ? 'text-indigo-200' : 'text-indigo-300'}`}>{sub.name}</h4>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{sub.description}</p>
                                {sub.id === 'co_inf_cap' ? (
                                    <p className="text-xs text-yellow-300 mt-1">Improves Stardust generation and capacity based on level.</p>
                                ) : (
                                    effectTexts.map((text, i) => (
                                    <p key={i} className="text-xs text-yellow-300 mt-1">{text}</p>
                                    ))
                                )}
                                {isRepeatable && (
                                    <p className="text-xs text-amber-300/80 mt-1">Level: {currentLevel}</p>
                                )}
                            </div>
                            <div className="flex-shrink-0 w-24 text-center">
                                <button
                                    onClick={() => onPurchaseSubUpgrade(sub)}
                                    disabled={isDisabled}
                                    className="w-full text-xs font-semibold px-2 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors disabled:opacity-50"
                                >
                                    {isPurchased ? 'Done' : isMaxedOut ? 'Maxed' : (
                                        <div className="flex flex-col items-center">
                                            <span>{isRepeatable ? `Upgrade` : 'Purchase'}</span>
                                            <div className={`flex items-center justify-center gap-1 text-xs mt-1 ${canAfford ? 'text-gray-200' : 'text-red-400'}`}>
                                                <ResourceIcon resource={cost.resource} className="w-3 h-3"/>
                                                <span>{Math.floor(cost.amount).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
                </div>
            )}
            {activeTab === 'facts' && (
                <div className="space-y-4">
                    {visibleFacts.map((fact, index) => (
                        <blockquote key={index} className="p-3 bg-gray-900/50 rounded-md border-l-4 border-cyan-400/70">
                            <p className="text-sm italic text-cyan-200">{fact.text}</p>
                        </blockquote>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default CosmicDetailPanel;