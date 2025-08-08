import React, { useState, useEffect } from 'react';
import { Resource, ProtocellState, CombatResult, ProteinLootType, ProteinLootState, ChamberUpgradeLevels, HuntStage } from '../types';
import { PROTOCELL_TRAINING_CONFIG, CHAMBER_UPGRADES, XP_TO_NEXT_LEVEL, GENE_CARDS, LEVEL_UP_STAT_BONUS, HUNT_STAGES, ENEMIES } from '../constants';
import { AttributeIcon, ResourceIcon, ProteinLootIcon, CheckCircleIcon, XMarkIcon, SparklesIcon } from './Icons';
import Spinner from './Spinner';
import { UpgradeIcon } from './UpgradeIcons';

interface ProtocellPanelProps {
  protocellState: ProtocellState;
  protocellTrainingLevels: ProtocellState['attributes'];
  protocellAttributes: ProtocellState['attributes'];
  protocellBaseBonuses: ProtocellState['attributes'];
  chamberUpgradeLevels: ChamberUpgradeLevels;
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

const QuestionMarkIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);


const ProtocellPanel: React.FC<ProtocellPanelProps> = (props) => {
  const { 
    protocellState, protocellTrainingLevels, protocellAttributes, protocellBaseBonuses, chamberUpgradeLevels, resources, onTrain, onHunt, 
    huntState, lastCombatResult, proteinLoot, onPurchaseChamberUpgrade, unlockedFeatures, collectedGeneCards, selectedHuntStageId, onSelectHuntStage
  } = props;
  
  const [activeTab, setActiveTab] = useState<'training' | 'stages' | 'hunting' | 'chamber' | 'cards'>('training');
  const [activeSelection, setActiveSelection] = useState<Record<string, string | null>>({
    training: 'speed',
    stages: selectedHuntStageId,
    chamber: CHAMBER_UPGRADES[0]?.id || null,
    cards: GENE_CARDS[0]?.id || null,
  });

  useEffect(() => {
    setActiveSelection(prev => ({ ...prev, stages: selectedHuntStageId }));
  }, [selectedHuntStageId]);

  const handleSelection = (tab: string, id: string) => {
    setActiveSelection(prev => ({ ...prev, [tab]: id }));
  };

  const xpForNextLevel = XP_TO_NEXT_LEVEL(protocellState.level);
  const xpProgress = (protocellState.xp / xpForNextLevel) * 100;
  
  const levelUpBonus = (protocellState.level - 1) * LEVEL_UP_STAT_BONUS;

  // --- RENDER FUNCTIONS FOR EACH TAB ---

  const renderTrainingTab = () => {
    const selectedAttrId = activeSelection.training as keyof ProtocellState['attributes'] | null;
    if (!selectedAttrId) return null;

    const config = PROTOCELL_TRAINING_CONFIG[selectedAttrId];
    const trainingLevel = protocellTrainingLevels[selectedAttrId];
    const cost = config.cost(trainingLevel);
    const canAfford = resources[cost.resource] >= cost.amount;

    const chamberBonus = Object.entries(chamberUpgradeLevels).reduce((acc, [key, level]) => {
      const upg = CHAMBER_UPGRADES.find(u => u.id === key);
      if (upg && upg.effect(level).type === 'ADD_BASE_ATTRIBUTE' && upg.effect(level).attribute === selectedAttrId) {
        return acc + upg.effect(level).value;
      }
      return acc;
    }, 0);

    return (
      <div className="flex flex-col h-full">
        {/* Display Screen */}
        <div className="bg-black/30 p-3 rounded-xl border-2 border-slate-700/80 flex-shrink-0 flex flex-col justify-between min-h-[250px] md:min-h-[280px]">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AttributeIcon iconId={config.icon as any} className="w-6 h-6 text-yellow-300" />
                <h4 className="font-bold text-lg text-yellow-300">{config.name}</h4>
              </div>
              <span className="text-3xl font-mono text-white">{protocellAttributes[selectedAttrId]}</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 h-10">{config.description}</p>
            <div className="mt-2 pt-2 border-t border-slate-700/50 text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between"><span>Base (Training):</span> <span className="font-mono">{protocellTrainingLevels[selectedAttrId]}</span></div>
                <div className="flex justify-between"><span>Bonus (Level {protocellState.level}):</span> <span className="font-mono">+{levelUpBonus}</span></div>
                <div className="flex justify-between"><span>Bonus (Upgrades):</span> <span className="font-mono">+{protocellBaseBonuses[selectedAttrId]}</span></div>
                <div className="flex justify-between"><span>Bonus (Chamber):</span> <span className="font-mono">+{chamberBonus}</span></div>
            </div>
          </div>
          <button
            onClick={() => onTrain(selectedAttrId)}
            disabled={!canAfford}
            className="w-full text-xs font-semibold px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-between"
          >
            <span>Train (Level {trainingLevel})</span>
            <div className={`flex items-center justify-center gap-2 ${canAfford ? 'text-slate-200' : 'text-rose-400'}`}>
              <ResourceIcon resource={cost.resource} className="w-4 h-4" />
              <span className="font-mono">{cost.amount.toLocaleString()}</span>
            </div>
          </button>
        </div>
        {/* Grid */}
        <div className="flex-grow pt-4">
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(PROTOCELL_TRAINING_CONFIG) as (keyof ProtocellState['attributes'])[]).map(attrId => (
              <button
                key={attrId}
                onClick={() => handleSelection('training', attrId)}
                className={`aspect-square p-2 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-200 border-2 ${activeSelection.training === attrId ? 'bg-purple-800/60 border-purple-400 scale-105' : 'bg-slate-900/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-500'}`}
              >
                <AttributeIcon iconId={PROTOCELL_TRAINING_CONFIG[attrId].icon as any} className="w-8 h-8 text-slate-300" />
                <span className="text-xs font-semibold mt-1">{PROTOCELL_TRAINING_CONFIG[attrId].name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderStagesTab = () => {
    const selectedStage = HUNT_STAGES.find(s => s.id === activeSelection.stages);

    return (
        <div className="flex flex-col h-full">
            {/* Display Screen */}
            <div className="bg-black/30 p-3 rounded-xl border-2 border-slate-700/80 flex-shrink-0 flex flex-col justify-between min-h-[250px] md:min-h-[280px]">
                {selectedStage ? (
                    <>
                        <div>
                            <h4 className="font-bold text-lg text-yellow-300">{selectedStage.name}</h4>
                            <p className="text-xs text-slate-400 mt-2">{selectedStage.description}</p>
                            <div className="mt-3 pt-3 border-t border-slate-700/50">
                                <p className={`text-sm font-bold ${protocellState.level >= selectedStage.levelRequirement ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    Level Requirement: {selectedStage.levelRequirement}
                                </p>
                                <p className="text-xs text-slate-300 mt-2">Potential Enemies:</p>
                                <div className="flex gap-2 mt-1">
                                    {selectedStage.enemyIds.map(id => {
                                        const enemy = ENEMIES.find(e => e.id === id);
                                        if (!enemy) return null;
                                        return (
                                            <div key={id} className="w-8 h-8 p-1 bg-slate-900 rounded-md" title={enemy.name}>
                                                <UpgradeIcon iconId={enemy.icon} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <button
                          onClick={() => onSelectHuntStage(selectedStage.id)}
                          disabled={selectedHuntStageId === selectedStage.id || protocellState.level < selectedStage.levelRequirement}
                          className="w-full text-sm font-semibold px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:bg-emerald-600 disabled:cursor-default transition-colors"
                        >
                          {selectedHuntStageId === selectedStage.id ? 'Selected' : 'Select Stage'}
                        </button>
                    </>
                ) : <p className="text-slate-500">Select a stage.</p>}
            </div>
            {/* Grid */}
            <div className="flex-grow pt-4 overflow-y-auto scroll-container pr-2">
                <div className="grid grid-cols-2 gap-3">
                    {HUNT_STAGES.map(stage => {
                        const isUnlocked = protocellState.level >= stage.levelRequirement;
                        const isSelectedForViewing = activeSelection.stages === stage.id;
                        return (
                             <button
                                key={stage.id}
                                onClick={() => handleSelection('stages', stage.id)}
                                disabled={!isUnlocked}
                                className={`p-3 rounded-lg text-left transition-all duration-200 border-2 disabled:opacity-60 disabled:cursor-not-allowed
                                ${isSelectedForViewing ? 'bg-purple-800/60 border-purple-400' : 'bg-slate-900/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-500'}`}
                            >
                                <h5 className={`font-bold text-sm ${selectedHuntStageId === stage.id ? 'text-emerald-300' : 'text-slate-200'}`}>{stage.name}</h5>
                                <p className="text-xs text-slate-400">Lvl Req: {stage.levelRequirement}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
  };

  const renderHuntingTab = () => (
    <div className="space-y-3">
        <div className="text-center p-3 bg-slate-800/70 rounded-xl border border-slate-700">
            <h4 className="font-semibold mb-2">Selected Stage: <span className="text-yellow-300">{HUNT_STAGES.find(s => s.id === selectedHuntStageId)?.name}</span></h4>
            <button
                onClick={onHunt}
                disabled={huntState.status === 'hunting'}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-bold text-sm disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors w-full flex items-center justify-center gap-2"
                aria-label="Begin hunt"
            >
            {huntState.status === 'hunting' ? <Spinner className="w-5 h-5"/> : 'Hunt!'}
            </button>
            {huntState.status === 'error' && <p className="text-rose-400 text-xs mt-2">{huntState.message}</p>}
        </div>

        {lastCombatResult && (
            <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700 animate-fade-in">
                <div className="flex justify-between items-center pb-2 border-b border-purple-800/50">
                    <h4 className="font-bold text-base text-purple-300">Combat Report</h4>
                    {lastCombatResult.outcome === 'win' ? (
                        <span className="px-2 py-0.5 text-xs font-bold bg-emerald-600 rounded-md">VICTORY</span>
                    ) : (
                        <span className="px-2 py-0.5 text-xs font-bold bg-rose-600 rounded-md">DEFEAT</span>
                    )}
                </div>

                <div className="mt-2 text-xs text-slate-300 space-y-2">
                    <p>Fought against a <span className="font-semibold text-yellow-300">{lastCombatResult.enemyName}</span>!</p>
                    <div>
                    <h5 className="font-semibold text-purple-400/80 mb-1">Rewards:</h5>
                    <div className="pl-2 space-y-1">
                        <p>+ {lastCombatResult.xpGained.toLocaleString()} XP</p>
                        {Object.entries(lastCombatResult.lootGained).map(([type, amount]) => (
                            <p key={type}>+ {amount.toLocaleString()} {type}</p>
                        ))}
                        {lastCombatResult.geneCardFound && <p className="text-amber-300 flex items-center gap-1"><SparklesIcon className="w-4 h-4" /> Found Gene: {GENE_CARDS.find(c => c.id === lastCombatResult.geneCardFound)?.name}</p>}
                    </div>
                    </div>
                </div>

                <details className="mt-3">
                    <summary className="text-xs text-slate-400 cursor-pointer hover:text-white">View Combat Log</summary>
                    <div className="mt-2 p-2 bg-black/30 rounded-lg max-h-40 overflow-y-auto scroll-container font-mono text-[11px] text-slate-400 space-y-1">
                        {lastCombatResult.combatLog.map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                </details>
            </div>
        )}
    </div>
  );

  const renderChamberTab = () => {
    const selectedUpgrade = CHAMBER_UPGRADES.find(u => u.id === activeSelection.chamber);
    
    return (
      <div className="flex flex-col h-full">
         <div className="bg-slate-800/70 p-2 rounded-xl border border-slate-700 mb-3 shrink-0">
            <h4 className="text-xs font-bold text-slate-300 mb-2 text-center">Loot Storage</h4>
            <div className="grid grid-cols-3 gap-1 text-center">
            {(Object.keys(proteinLoot) as ProteinLootType[]).map(lootType => (
                <div key={lootType} className="p-1 rounded-lg bg-black/30">
                    <ProteinLootIcon lootType={lootType} className="w-5 h-5 mx-auto" />
                    <p className="text-[10px] leading-tight mt-1" title={lootType}>{lootType.replace(' ', '\n')}</p>
                    <p className="font-mono text-xs text-yellow-300">{Math.floor(proteinLoot[lootType]).toLocaleString()}</p>
                </div>
            ))}
            </div>
        </div>
        {/* Display Screen */}
        <div className="bg-black/30 p-3 rounded-xl border-2 border-slate-700/80 flex-shrink-0 flex flex-col justify-between min-h-[200px] md:min-h-[220px]">
          {selectedUpgrade ? (() => {
            const level = chamberUpgradeLevels[selectedUpgrade.id] || 0;
            const cost = selectedUpgrade.cost(level);
            const canAfford = proteinLoot[selectedUpgrade.lootType] >= cost;
            const isMaxLevel = level >= selectedUpgrade.maxLevel;
            return (
              <>
                <div>
                    <h4 className="font-bold text-base text-yellow-300">{selectedUpgrade.name}</h4>
                    <p className="text-xs text-slate-400 mt-2 h-12">{selectedUpgrade.description}</p>
                    <p className="text-sm text-amber-300 mt-2">Level: {level} / {selectedUpgrade.maxLevel}</p>
                </div>
                <button
                    onClick={() => onPurchaseChamberUpgrade(selectedUpgrade.id)}
                    disabled={isMaxLevel || !canAfford}
                    className="w-full text-xs font-semibold px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-between"
                  >
                    <span>{isMaxLevel ? 'Max Level' : 'Upgrade'}</span>
                    {!isMaxLevel && (
                        <div className={`flex items-center justify-center gap-2 ${canAfford ? 'text-slate-200' : 'text-rose-400'}`}>
                            <ProteinLootIcon lootType={selectedUpgrade.lootType} className="w-4 h-4"/>
                            <span className="font-mono">{Math.floor(cost).toLocaleString()}</span>
                        </div>
                    )}
                </button>
              </>
            )
          })() : <p className="text-slate-500">Select an upgrade.</p>}
        </div>
        {/* Grid */}
        <div className="flex-grow pt-4 overflow-y-auto scroll-container pr-2">
            <div className="grid grid-cols-3 gap-3">
                 {CHAMBER_UPGRADES.map(upgrade => {
                    const isSelectedForViewing = activeSelection.chamber === upgrade.id;
                    const level = chamberUpgradeLevels[upgrade.id] || 0;
                    const isMaxLevel = level >= upgrade.maxLevel;
                     return (
                         <button
                            key={upgrade.id}
                            onClick={() => handleSelection('chamber', upgrade.id)}
                            className={`relative aspect-square p-2 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-200 border-2
                            ${isSelectedForViewing ? 'bg-purple-800/60 border-purple-400 scale-105' : isMaxLevel ? 'bg-amber-900/40 border-amber-700' : 'bg-slate-900/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-500'}`}
                        >
                            <ProteinLootIcon lootType={upgrade.lootType} className="w-8 h-8 text-slate-300" />
                            {isMaxLevel && <SparklesIcon className="absolute top-1 right-1 w-5 h-5 text-amber-300 bg-slate-800 rounded-full p-0.5"/>}
                        </button>
                    )
                })}
            </div>
        </div>
      </div>
    )
  };

  const renderCardsTab = () => {
    const selectedCard = GENE_CARDS.find(c => c.id === activeSelection.cards);
    return (
      <div className="flex flex-col h-full">
        {/* Display Screen */}
        <div className="bg-black/30 p-3 rounded-xl border-2 border-slate-700/80 flex-shrink-0 flex flex-col justify-between min-h-[250px] md:min-h-[280px]">
          {selectedCard ? (() => {
            const isCollected = collectedGeneCards.has(selectedCard.id);
            return (
              <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {isCollected ? <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0"/> : <QuestionMarkIcon className="w-6 h-6 text-slate-500 flex-shrink-0"/>}
                    <h4 className={`font-bold text-base ${isCollected ? 'text-yellow-300' : 'text-slate-500'}`}>{isCollected ? selectedCard.name : 'Undiscovered Gene'}</h4>
                  </div>
                  {isCollected ? (
                      <>
                          <p className="text-xs text-slate-300 pt-2 border-t border-slate-700"><span className="font-semibold text-purple-300">Description:</span> {selectedCard.description}</p>
                          <p className="text-xs text-slate-300 pt-2 border-t border-slate-700"><span className="font-semibold text-emerald-300">Application:</span> {selectedCard.application}</p>
                      </>
                  ) : (
                      <p className="text-xs text-slate-500 italic mt-2">Hunt in the primordial soup to discover this gene.</p>
                  )}
              </div>
            )
          })() : <p className="text-slate-500">Select a card.</p>}
        </div>
        {/* Grid */}
        <div className="flex-grow pt-4 overflow-y-auto scroll-container pr-2">
            <div className="grid grid-cols-4 gap-3">
                 {GENE_CARDS.map(card => {
                    const isSelectedForViewing = activeSelection.cards === card.id;
                    const isCollected = collectedGeneCards.has(card.id);
                     return (
                         <button
                            key={card.id}
                            onClick={() => handleSelection('cards', card.id)}
                            className={`relative aspect-square p-2 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-200 border-2
                            ${isSelectedForViewing ? 'bg-purple-800/60 border-purple-400 scale-105' : 'bg-slate-900/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-500'}`}
                        >
                            {isCollected ? <UpgradeIcon iconId="dna" /> : <QuestionMarkIcon className="w-10 h-10 text-slate-600"/> }
                             {isCollected && <CheckCircleIcon className="absolute top-1 right-1 w-5 h-5 text-emerald-400 bg-slate-800 rounded-full" />}
                        </button>
                    )
                })}
            </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-3 md:p-4 w-full h-full flex flex-col relative">
      <div className="shrink-0">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-yellow-300">Protocell Chamber</h2>
          <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700 mb-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-yellow-300">Level {protocellState.level}</span>
                  <span className="text-xs text-slate-300 font-mono">{Math.floor(protocellState.xp).toLocaleString()} / {xpForNextLevel.toLocaleString()} XP</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 mt-2">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{width: `${xpProgress}%`}}></div>
                </div>
            </div>
        <div className="flex border-b border-purple-800/50 mb-3 flex-wrap">
          <button onClick={() => setActiveTab('training')} className={`px-2 py-1.5 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'training' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Training</button>
          <button onClick={() => setActiveTab('stages')} className={`px-2 py-1.5 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'stages' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Stages</button>
          <button onClick={() => setActiveTab('hunting')} className={`px-2 py-1.5 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'hunting' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Hunting</button>
          {unlockedFeatures.has('chamber_upgrades') && (
            <button onClick={() => setActiveTab('chamber')} className={`px-2 py-1.5 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'chamber' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Chamber</button>
          )}
          <button onClick={() => setActiveTab('cards')} className={`px-2 py-1.5 text-[11px] md:text-xs font-medium transition-colors ${activeTab === 'cards' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-slate-400 hover:text-white'}`}>Cards</button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scroll-container pr-2">
        {activeTab === 'training' && renderTrainingTab()}
        {activeTab === 'stages' && renderStagesTab()}
        {activeTab === 'hunting' && renderHuntingTab()}
        {activeTab === 'chamber' && unlockedFeatures.has('chamber_upgrades') && renderChamberTab()}
        {activeTab === 'cards' && renderCardsTab()}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProtocellPanel;
