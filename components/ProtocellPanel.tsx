import React, { useState } from 'react';
import { Resource, ProtocellState, HuntResult, ProteinLootType, ProteinLootState, ChamberUpgradeLevels, ChamberUpgrade } from '../types';
import { PROTOCELL_TRAINING_CONFIG, CHAMBER_UPGRADES } from '../constants';
import { AttributeIcon, ResourceIcon, ProteinLootIcon } from './Icons';
import Spinner from './Spinner';

interface ProtocellPanelProps {
  protocellTrainingLevels: ProtocellState['attributes'];
  protocellAttributes: ProtocellState['attributes'];
  resources: Record<Resource, number>;
  onTrain: (attributeId: keyof ProtocellState['attributes']) => void;
  onHunt: () => void;
  huntState: {status: 'idle' | 'hunting' | 'cooldown' | 'error', message: string};
  lastHuntResult: HuntResult | null;
  proteinLoot: ProteinLootState;
  chamberUpgradeLevels: ChamberUpgradeLevels;
  onPurchaseChamberUpgrade: (upgradeId: string) => void;
  unlockedFeatures: Set<string>;
}

const TrainingCard: React.FC<{
    attrId: keyof ProtocellState['attributes'],
    trainingLevel: number,
    totalValue: number,
    resources: Record<Resource, number>,
    onTrain: (attributeId: keyof ProtocellState['attributes']) => void;
}> = ({ attrId, trainingLevel, totalValue, resources, onTrain }) => {
    const config = PROTOCELL_TRAINING_CONFIG[attrId];
    const cost = config.cost(trainingLevel);
    const canAfford = resources[cost.resource] >= cost.amount;

    return (
        <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700 flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
                <AttributeIcon iconId={config.icon as any} className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
                <h4 className="text-sm md:text-base font-bold text-yellow-300">{config.name}</h4>
            </div>
            <p className="text-slate-400 text-[11px] md:text-xs mt-1 h-9 md:h-10">{config.description}</p>
            <p className="text-lg md:text-xl font-mono my-2" title={`Trained: ${trainingLevel} | Total: ${totalValue}`}>{totalValue}</p>
            <button
                onClick={() => onTrain(attrId)}
                disabled={!canAfford}
                className="w-full text-[11px] md:text-xs font-semibold px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
                Train (Lvl {trainingLevel})
                <div className={`flex items-center justify-center gap-2 mt-1 ${canAfford ? 'text-slate-200' : 'text-rose-400'}`}>
                    <ResourceIcon resource={cost.resource} className="w-4 h-4" />
                    <span>{cost.amount.toLocaleString()}</span>
                </div>
            </button>
        </div>
    )
}

const ChamberUpgradeCard: React.FC<{
  upgrade: ChamberUpgrade,
  level: number,
  lootAmount: number,
  onPurchase: (id: string) => void
}> = ({ upgrade, level, lootAmount, onPurchase }) => {
  const cost = upgrade.cost(level);
  const canAfford = lootAmount >= cost;
  const isMaxLevel = level >= upgrade.maxLevel;

  return (
    <div className={`p-3 rounded-xl border flex items-start gap-3 ${isMaxLevel ? 'bg-amber-900/50 border-amber-700' : 'bg-slate-800/70 border-slate-700'}`}>
      <div className="flex-grow">
        <h4 className={`font-bold text-xs md:text-sm ${isMaxLevel ? 'text-amber-200' : 'text-purple-300'}`}>{upgrade.name}</h4>
        <p className="text-[11px] md:text-xs text-slate-400 mt-1">{upgrade.description}</p>
        <p className="text-[11px] md:text-xs text-yellow-300 mt-1">Level: {level} / {upgrade.maxLevel}</p>
      </div>
      <div className="flex-shrink-0 w-20 md:w-24 text-center">
        <button
          onClick={() => onPurchase(upgrade.id)}
          disabled={isMaxLevel || !canAfford}
          className="w-full text-xs md:text-sm font-semibold px-2 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors disabled:opacity-50"
        >
          {isMaxLevel ? 'Max' : (
            <div className="flex flex-col items-center">
              <span className="text-[11px] md:text-xs">Upgrade</span>
              <div className={`flex items-center justify-center gap-1 text-[11px] md:text-xs mt-1 ${canAfford ? 'text-slate-200' : 'text-rose-400'}`}>
                <ProteinLootIcon lootType={upgrade.lootType} className="w-3 h-3"/>
                <span>{Math.floor(cost).toLocaleString()}</span>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};


const ProtocellPanel: React.FC<ProtocellPanelProps> = (props) => {
  const { 
    protocellTrainingLevels, protocellAttributes, resources, onTrain, onHunt, 
    huntState, lastHuntResult, proteinLoot, chamberUpgradeLevels, onPurchaseChamberUpgrade, unlockedFeatures
  } = props;
  
  const [activeTab, setActiveTab] = useState<'training' | 'hunting' | 'chamber'>('training');

  return (
    <div className="p-3 md:p-4 w-full h-full flex flex-col relative">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-yellow-300 shrink-0">Protocell Chamber</h2>
        
            <div className="flex border-b border-purple-800/50 mb-4 shrink-0">
            <button onClick={() => setActiveTab('training')} className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'training' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Training</button>
            <button onClick={() => setActiveTab('hunting')} className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'hunting' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Hunting</button>
            {unlockedFeatures.has('chamber_upgrades') && (
                <button onClick={() => setActiveTab('chamber')} className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'chamber' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Chamber</button>
            )}
        </div>

        <div className="flex-grow overflow-y-auto scroll-container pr-2 space-y-6">
            {activeTab === 'training' && (
            <div>
                <h3 className="text-base md:text-lg font-bold text-yellow-300 mb-3">Train Attributes</h3>
                <p className="text-[11px] md:text-xs text-slate-400 mb-4">Use standard biological resources to train your protocell's core attributes.</p>
                <div className="space-y-3">
                    <TrainingCard attrId="speed" trainingLevel={protocellTrainingLevels.speed} totalValue={protocellAttributes.speed} resources={resources} onTrain={onTrain} />
                    <TrainingCard attrId="efficiency" trainingLevel={protocellTrainingLevels.efficiency} totalValue={protocellAttributes.efficiency} resources={resources} onTrain={onTrain} />
                    <TrainingCard attrId="resilience" trainingLevel={protocellTrainingLevels.resilience} totalValue={protocellAttributes.resilience} resources={resources} onTrain={onTrain} />
                </div>
            </div>
            )}

            {activeTab === 'hunting' && (
            <div>
                <h3 className="text-base md:text-lg font-bold text-yellow-300 mb-3">Primordial Hunt</h3>
                    <p className="text-[11px] md:text-xs text-slate-400 mb-4">Send your protocell to hunt in the primordial soup for rare biological materials used to upgrade its chamber.</p>
                <div className="bg-slate-800/70 p-3 md:p-4 rounded-2xl border border-slate-700">
                        <button 
                        onClick={onHunt}
                        disabled={huntState.status === 'hunting'}
                        className="w-full px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-slate-900 rounded-xl font-bold text-sm md:text-base disabled:bg-slate-600 disabled:text-slate-200 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                        {huntState.status === 'hunting' && <Spinner />}
                        {huntState.status === 'hunting' ? 'Hunting...' : 'Begin Hunt'}
                        </button>
                        {huntState.status === 'error' && (
                        <p className="text-rose-400 text-sm mt-2 text-center">{huntState.message}</p>
                        )}
                        {lastHuntResult && (
                            <div className="mt-4 text-left space-y-4">
                                <blockquote className="p-3 bg-slate-900/50 rounded-xl border-l-4 border-yellow-400">
                                <p className="text-xs md:text-sm italic text-yellow-200">"{lastHuntResult.adventure}"</p>
                                </blockquote>
                                
                                <div className="space-y-2">
                                    <h5 className="font-bold text-sm text-emerald-400">Loot Gained:</h5>
                                    {Object.keys(lastHuntResult.rewards).length > 0 ? (
                                    Object.entries(lastHuntResult.rewards).map(([lootKey, amount]) => (
                                        <div key={lootKey} className="p-2 bg-slate-900/50 rounded-xl border border-slate-700/50 flex items-center gap-2">
                                            <ProteinLootIcon lootType={lootKey as ProteinLootType} className="w-5 h-5"/>
                                            <span className="font-semibold text-xs md:text-sm">{lootKey}:</span>
                                            <span className="font-mono text-yellow-300 ml-auto">+{amount.toLocaleString()}</span>
                                        </div>
                                    ))
                                    ) : (
                                    <p className="text-slate-400 text-center italic text-sm">The protocell returned empty-handed.</p>
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            </div>
            )}
            
            {activeTab === 'chamber' && unlockedFeatures.has('chamber_upgrades') && (
            <div>
                <h3 className="text-base md:text-lg font-bold text-purple-300 mb-3">Chamber Upgrades</h3>
                    <p className="text-[11px] md:text-xs text-slate-400 mb-4">Use materials from successful hunts to permanently upgrade the protocell's housing and internal systems.</p>

                <div className="bg-slate-800/70 p-3 rounded-2xl border border-slate-700 mb-4">
                    <h4 className="text-xs md:text-sm font-bold text-slate-300 mb-2">Loot Storage</h4>
                    <div className="grid grid-cols-3 gap-1 md:gap-2 text-center">
                    {(Object.keys(proteinLoot) as ProteinLootType[]).map(lootType => (
                        <div key={lootType} className="p-2 rounded-xl bg-black/30">
                            <ProteinLootIcon lootType={lootType} className="w-5 h-5 md:w-6 md:h-6 mx-auto" />
                            <p className="text-[10px] leading-tight md:text-xs mt-1" title={lootType}>{lootType.replace(' ', '\n')}</p>
                            <p className="font-mono text-xs md:text-sm text-yellow-300">{Math.floor(proteinLoot[lootType]).toLocaleString()}</p>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="space-y-3">
                    {CHAMBER_UPGRADES.map(upgrade => (
                        <ChamberUpgradeCard 
                        key={upgrade.id}
                        upgrade={upgrade}
                        level={chamberUpgradeLevels[upgrade.id] || 0}
                        lootAmount={proteinLoot[upgrade.lootType]}
                        onPurchase={onPurchaseChamberUpgrade}
                        />
                    ))}
                </div>
            </div>
            )}
        </div>
    </div>
  );
};

export default ProtocellPanel;