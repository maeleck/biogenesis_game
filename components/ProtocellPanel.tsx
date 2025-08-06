
import React, { useState } from 'react';
import { Resource, ProtocellState, CombatResult, ProteinLootType, ProteinLootState, ChamberUpgradeLevels, ChamberUpgrade, ChamberUpgradeLevels as ChamberUpgradeLevelsType, HuntStage } from '../types';
import { PROTOCELL_TRAINING_CONFIG, CHAMBER_UPGRADES, XP_TO_NEXT_LEVEL, GENE_CARDS, LEVEL_UP_STAT_BONUS, HUNT_STAGES } from '../constants';
import { AttributeIcon, ResourceIcon, ProteinLootIcon, CheckCircleIcon } from './Icons';
import Spinner from './Spinner';
import { UpgradeIcon } from './UpgradeIcons';

interface ProtocellPanelProps {
  protocellState: ProtocellState;
  protocellTrainingLevels: ProtocellState['attributes'];
  protocellAttributes: ProtocellState['attributes'];
  protocellBaseBonuses: ProtocellState['attributes'];
  chamberUpgradeLevels: ChamberUpgradeLevelsType;
  resources: Record<Resource, number>;
  onTrain: (attributeId: keyof ProtocellState['attributes']) => void;
  onHunt: () => void;
  huntState: {status: 'idle' | 'hunting' | 'cooldown' | 'error', message: string};
  lastCombatResult: CombatResult | null;
  proteinLoot: ProteinLootState;
  onPurchaseChamberUpgrade: (upgradeId: string) => void;
  unlockedFeatures: Set<string>;
  collectedGeneCards: Set<string>;
  selectedHuntStageId: string;
  onSelectHuntStage: (stageId: string) => void;
}

const TrainingCard: React.FC<{
    attrId: keyof ProtocellState['attributes'],
    trainingLevel: number,
    resources: Record<Resource, number>,
    onTrain: (attributeId: keyof ProtocellState['attributes']) => void;
}> = ({ attrId, trainingLevel, resources, onTrain }) => {
    const config = PROTOCELL_TRAINING_CONFIG[attrId];
    const cost = config.cost(trainingLevel);
    const canAfford = resources[cost.resource] >= cost.amount;

    return (
        <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700 flex flex-col text-center">
            <div className="flex items-center gap-2 self-center">
                <AttributeIcon iconId={config.icon as any} className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
                <h4 className="text-sm md:text-base font-bold text-yellow-300">{config.name}</h4>
            </div>
            <p className="text-slate-400 text-[11px] md:text-xs mt-1 h-9 md:h-10">{config.description}</p>
            <p className="text-lg md:text-xl font-mono my-2" title={`Trained: ${trainingLevel}`}>Training Level: {trainingLevel}</p>
            <button
                onClick={() => onTrain(attrId)}
                disabled={!canAfford}
                className="w-full text-[11px] md:text-xs font-semibold px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
                Train
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
    protocellState, protocellTrainingLevels, protocellAttributes, protocellBaseBonuses, chamberUpgradeLevels, resources, onTrain, onHunt, 
    huntState, lastCombatResult, proteinLoot, onPurchaseChamberUpgrade, unlockedFeatures, collectedGeneCards, selectedHuntStageId, onSelectHuntStage
  } = props;
  
  const [activeTab, setActiveTab] = useState<'training' | 'hunting' | 'chamber' | 'stats' | 'cards' | 'stages'>('training');

  const xpForNextLevel = XP_TO_NEXT_LEVEL(protocellState.level);
  const xpProgress = (protocellState.xp / xpForNextLevel) * 100;
  
  const levelUpBonus = (protocellState.level - 1) * LEVEL_UP_STAT_BONUS;

  return (
    <div className="p-3 md:p-4 w-full h-full flex flex-col relative">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-yellow-300 shrink-0">Protocell Chamber</h2>
        
            <div className="flex border-b border-purple-800/50 mb-4 shrink-0 flex-wrap">
            <button onClick={() => setActiveTab('training')} className={`px-2 py-1.5 md:px-3 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'training' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Training</button>
            <button onClick={() => setActiveTab('stats')} className={`px-2 py-1.5 md:px-3 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'stats' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Stats</button>
            <button onClick={() => setActiveTab('stages')} className={`px-2 py-1.5 md:px-3 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'stages' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Stages</button>
            <button onClick={() => setActiveTab('hunting')} className={`px-2 py-1.5 md:px-3 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'hunting' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Hunting</button>
            {unlockedFeatures.has('chamber_upgrades') && (
                <button onClick={() => setActiveTab('chamber')} className={`px-2 py-1.5 md:px-3 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'chamber' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Chamber</button>
            )}
             <button onClick={() => setActiveTab('cards')} className={`px-2 py-1.5 md:px-3 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'cards' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Cards</button>
        </div>

        <div className="flex-grow overflow-y-auto scroll-container pr-2 space-y-6">
            {activeTab === 'training' && (
            <div>
                <h3 className="text-base md:text-lg font-bold text-yellow-300 mb-3">Protocell Training & Level</h3>
                <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700 mb-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-yellow-300">Level {protocellState.level}</span>
                    <span className="text-xs text-slate-300 font-mono">{Math.floor(protocellState.xp).toLocaleString()} / {xpForNextLevel.toLocaleString()} XP</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 mt-2">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{width: `${xpProgress}%`}}></div>
                  </div>
                </div>
                <p className="text-[11px] md:text-xs text-slate-400 mb-4">Train attributes for small boosts, but gain the most power by leveling up through hunting.</p>
                <div className="space-y-3">
                    <TrainingCard attrId="speed" trainingLevel={protocellTrainingLevels.speed} resources={resources} onTrain={onTrain} />
                    <TrainingCard attrId="efficiency" trainingLevel={protocellTrainingLevels.efficiency} resources={resources} onTrain={onTrain} />
                    <TrainingCard attrId="resilience" trainingLevel={protocellTrainingLevels.resilience} resources={resources} onTrain={onTrain} />
                </div>
            </div>
            )}
            
             {activeTab === 'stats' && (
              <div>
                 <h3 className="text-base md:text-lg font-bold text-yellow-300 mb-3">Protocell Attributes</h3>
                 <div className="space-y-4">
                  {(Object.keys(protocellAttributes) as (keyof ProtocellState['attributes'])[]).map(attrId => {
                    const config = PROTOCELL_TRAINING_CONFIG[attrId];
                    const chamberBonus = Object.entries(chamberUpgradeLevels).reduce((acc, [key, level]) => {
                        const upg = CHAMBER_UPGRADES.find(u => u.id === key);
                        if (upg && upg.effect(level).attribute === attrId) {
                            return acc + upg.effect(level).value;
                        }
                        return acc;
                    }, 0);

                    return (
                      <div key={attrId} className="bg-slate-800/70 p-3 rounded-xl border border-slate-700">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center gap-2">
                             <AttributeIcon iconId={config.icon as any} className="w-6 h-6 text-yellow-300"/>
                             <h4 className="font-bold text-yellow-300">{config.name}</h4>
                           </div>
                           <span className="text-2xl font-mono">{protocellAttributes[attrId]}</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-700/50 text-xs space-y-1 text-slate-300">
                            <div className="flex justify-between"><span>Base (Training):</span> <span>{protocellTrainingLevels[attrId]}</span></div>
                            <div className="flex justify-between"><span>Bonus (Level):</span> <span>+{levelUpBonus}</span></div>
                            <div className="flex justify-between"><span>Bonus (Upgrades):</span> <span>+{protocellBaseBonuses[attrId]}</span></div>
                             <div className="flex justify-between"><span>Bonus (Chamber):</span> <span>+{chamberBonus}</span></div>
                        </div>
                      </div>
                    )
                  })}
                 </div>
              </div>
             )}
             
            {activeTab === 'stages' && (
              <div>
                <h3 className="text-base md:text-lg font-bold text-yellow-300 mb-3">Hunting Stages</h3>
                <p className="text-[11px] md:text-xs text-slate-400 mb-4">Select a hunting ground. Higher stages have tougher enemies but offer greater rewards.</p>
                <div className="space-y-3">
                    {HUNT_STAGES.map(stage => {
                        const isUnlocked = protocellState.level >= stage.levelRequirement;
                        const isSelected = selectedHuntStageId === stage.id;
                        return (
                            <div key={stage.id} className={`p-3 rounded-xl border transition-all ${isSelected ? 'bg-purple-800/50 border-purple-400' : isUnlocked ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-800/40 border-slate-700 opacity-60'}`}>
                                <h4 className={`font-bold text-sm ${isUnlocked ? 'text-purple-300' : 'text-slate-500'}`}>{stage.name}</h4>
                                <p className="text-xs text-slate-400 mt-1">{stage.description}</p>
                                {!isUnlocked && <p className="text-xs text-rose-400 mt-2 font-semibold">Requires Level {stage.levelRequirement}</p>}
                                {isUnlocked && (
                                    <button onClick={() => onSelectHuntStage(stage.id)} disabled={isSelected} className="mt-3 w-full text-xs font-semibold px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:bg-emerald-600 disabled:cursor-default transition-colors">
                                        {isSelected ? 'Selected' : 'Select Stage'}
                                    </button>
                                )}
                            </div>
                        )
                    })}
                </div>
              </div>
            )}


            {activeTab === 'hunting' && (
            <div>
                <h3 className="text-base md:text-lg font-bold text-yellow-300 mb-3">Primordial Hunt</h3>
                    <p className="text-[11px] md:text-xs text-slate-400 mb-4">Send your protocell to battle other microorganisms for XP and rare biological materials.</p>
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
                        {lastCombatResult && (
                            <div className="mt-4 text-left space-y-4">
                               <div className={`p-3 rounded-xl border-l-4 flex items-center gap-3 ${lastCombatResult.outcome === 'win' ? 'bg-emerald-900/30 border-emerald-400' : 'bg-rose-900/30 border-rose-400'}`}>
                                    <div className="w-8 h-8 flex-shrink-0"><UpgradeIcon iconId={lastCombatResult.enemyIcon} /></div>
                                    <div>
                                        <p className="text-xs text-slate-300">Encountered: {lastCombatResult.enemyName}</p>
                                        <h4 className="font-bold text-base">Combat Report: {lastCombatResult.outcome === 'win' ? 'Victory!' : 'Defeat'}</h4>
                                    </div>
                               </div>
                                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 max-h-40 overflow-y-auto scroll-container">
                                    <p className="font-mono text-xs text-slate-300 whitespace-pre-wrap">{lastCombatResult.combatLog.join('\n')}</p>
                                </div>
                                <div className="space-y-2">
                                    <h5 className="font-bold text-sm text-emerald-400">Rewards Gained:</h5>
                                    <div className="p-2 bg-slate-900/50 rounded-xl border border-slate-700/50 flex items-center gap-2">
                                       <span className="font-semibold text-xs md:text-sm">Experience:</span>
                                       <span className="font-mono text-yellow-300 ml-auto">+{lastCombatResult.xpGained.toLocaleString()} XP</span>
                                    </div>
                                    {Object.keys(lastCombatResult.lootGained).length > 0 ? (
                                    Object.entries(lastCombatResult.lootGained).map(([lootKey, amount]) => (
                                        <div key={lootKey} className="p-2 bg-slate-900/50 rounded-xl border border-slate-700/50 flex items-center gap-2">
                                            <ProteinLootIcon lootType={lootKey as ProteinLootType} className="w-5 h-5"/>
                                            <span className="font-semibold text-xs md:text-sm">{lootKey}:</span>
                                            <span className="font-mono text-yellow-300 ml-auto">+{amount.toLocaleString()}</span>
                                        </div>
                                    ))
                                    ) : lastCombatResult.outcome === 'win' ? (
                                    <p className="text-slate-400 text-center italic text-sm">No loot was found.</p>
                                    ) : null}
                                     {lastCombatResult.geneCardFound && (
                                         <div className="p-3 bg-yellow-900/30 rounded-xl border-2 border-dashed border-yellow-400 text-center">
                                            <p className="font-bold text-yellow-200">New GENE Card Discovered!</p>
                                            <p className="font-semibold text-yellow-300">{GENE_CARDS.find(c => c.id === lastCombatResult.geneCardFound)?.name}</p>
                                         </div>
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
            
            {activeTab === 'cards' && (
                <div>
                    <h3 className="text-base md:text-lg font-bold text-yellow-300 mb-3">Gene Card Collection</h3>
                    <p className="text-[11px] md:text-xs text-slate-400 mb-4">Rare genes discovered during hunts. These provide valuable scientific insights.</p>
                    <div className="space-y-3">
                        {GENE_CARDS.map(card => {
                            const isCollected = collectedGeneCards.has(card.id);
                            return (
                                <div key={card.id} className={`p-3 rounded-xl border ${isCollected ? 'border-yellow-400/80 bg-slate-800/70' : 'border-slate-700 bg-slate-800/40'}`}>
                                    <div className="flex items-center gap-2">
                                        {isCollected && <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                                        <h4 className={`font-bold text-sm ${isCollected ? 'text-yellow-300' : 'text-slate-500'}`}>{isCollected ? card.name : 'Undiscovered Gene'}</h4>
                                    </div>
                                    {isCollected ? (
                                        <>
                                            <p className="text-xs text-slate-300 mt-2"><span className="font-semibold text-purple-300">Description:</span> {card.description}</p>
                                            <p className="text-xs text-slate-300 mt-2"><span className="font-semibold text-emerald-300">Application:</span> {card.application}</p>
                                        </>
                                    ) : (
                                        <p className="text-xs text-slate-500 italic mt-2">Hunt in the primordial soup to discover this gene.</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default ProtocellPanel;