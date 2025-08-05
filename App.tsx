


import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Resource, ProtocellState, HuntResult, PanelContent, SubUpgrade, Upgrade, TestState, Quiz, Fact, ProteinLootType, ProteinLootState, ChamberUpgradeLevels } from './types';
import { KNOBS, INITIAL_RESOURCES, INITIAL_WORKERS, TICK_RATE_MS, INITIAL_MAX_FORCE, INITIAL_MAX_HANDS, BASE_STARDUST_GENERATION, UPGRADES, MAP_SCENERY, INITIAL_PROTOCELL_TRAINING_LEVELS, PROTOCELL_TRAINING_CONFIG, INITIAL_STARDUST_CAPACITY, HUNT_RESULTS, TEST_REWARD_STARDUST_CAP_PERCENTAGE, TEST_REWARD_GENERATION_SECONDS, BASE_RESOURCE_CAPACITIES, CHAMBER_UPGRADES, INITIAL_PROTEIN_LOOT } from './constants';
import ResourceDisplay from './components/ResourceDisplay';
import ProcessPanel from './components/JobPanel';
import MapNode from './components/MapNode';
import TitleScreen from './components/TitleScreen';
import MapScenery from './components/MapScenery';
import MapLines from './components/MapLines';
import MapSection from './components/MapSection';
import ProtocellPanel from './components/ProtocellPanel';
import CosmicDetailPanel from './components/CosmicDetailPanel';
import TestPanel from './components/TestPanel';
import SettingsMenu from './components/CosmicPanel'; // Repurposed for SettingsMenu
import DebugMenu from './components/DebugMenu';
import { CogIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from './components/Icons';
import { UpgradeIcon } from './components/UpgradeIcons';


const ALL_SUB_UPGRADES = UPGRADES.flatMap(u => u.panelContent?.subUpgrades || []);

const SAVE_KEY = 'bioGenesisSave';

const loadInitialState = () => {
  const savedDataJSON = localStorage.getItem(SAVE_KEY);
  if (savedDataJSON) {
    try {
      return JSON.parse(savedDataJSON);
    } catch (e) {
      console.error("Failed to parse save data, starting fresh.", e);
      localStorage.removeItem(SAVE_KEY);
      return null;
    }
  }
  return null;
};

const initialSaveData = loadInitialState();

function App() {
  const [gameState, setGameState] = useState<'title' | 'playing'>(initialSaveData ? 'playing' : 'title');
  
  // State initialization from saved data or defaults
  const [resources, setResources] = useState<Record<Resource, number>>(initialSaveData?.resources || INITIAL_RESOURCES);
  const [universalStorageLevel, setUniversalStorageLevel] = useState<number>(initialSaveData?.universalStorageLevel || 1);
  const [stardustGenerationMultiplier, setStardustGenerationMultiplier] = useState<number>(initialSaveData?.stardustGenerationMultiplier || 1);
  const [assignedWorkers, setAssignedWorkers] = useState<Record<string, number>>(initialSaveData?.assignedWorkers || INITIAL_WORKERS);
  const [maxForce, setMaxForce] = useState<number>(initialSaveData?.maxForce || INITIAL_MAX_FORCE);
  const [maxHands, setMaxHands] = useState<number>(initialSaveData?.maxHands || INITIAL_MAX_HANDS);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<Set<string>>(new Set(initialSaveData?.purchasedUpgrades || []));
  const [purchasedSubUpgrades, setPurchasedSubUpgrades] = useState<Set<string>>(new Set(initialSaveData?.purchasedSubUpgrades || []));
  const [subUpgradeLevels, setSubUpgradeLevels] = useState<Record<string, number>>(initialSaveData?.subUpgradeLevels || {});
  const [unlockedFeatures, setUnlockedFeatures] = useState<Set<string>>(new Set(initialSaveData?.unlockedFeatures || ['test']));
  const [unlockedKnobs, setUnlockedKnobs] = useState<Set<string>>(new Set(initialSaveData?.unlockedKnobs || []));
  
  const [activeCosmicPanel, setActiveCosmicPanel] = useState<{upgrade: Upgrade, content: PanelContent} | null>(null);

  const [activeTab, setActiveTab] = useState('resources');
  
  // Protocell related state
  const [protocellTrainingLevels, setProtocellTrainingLevels] = useState<ProtocellState['attributes']>(initialSaveData?.protocellTrainingLevels || INITIAL_PROTOCELL_TRAINING_LEVELS);
  const [protocellBaseBonuses, setProtocellBaseBonuses] = useState<ProtocellState['attributes']>(initialSaveData?.protocellBaseBonuses || { speed: 0, efficiency: 0, resilience: 0 });
  const [chamberUpgradeLevels, setChamberUpgradeLevels] = useState<ChamberUpgradeLevels>(initialSaveData?.chamberUpgradeLevels || {});
  const [proteinLoot, setProteinLoot] = useState<ProteinLootState>(initialSaveData?.proteinLoot || INITIAL_PROTEIN_LOOT);
  
  const [huntState, setHuntState] = useState<{status: 'idle' | 'hunting' | 'cooldown' | 'error', message: string}>({status: 'idle', message: ''});
  const [lastHuntResult, setLastHuntResult] = useState<HuntResult | null>(null);
  
  const [testState, setTestState] = useState<TestState>({ currentQuestion: null, lastAnswerStatus: 'unanswered' });

  // Settings and Save/Load state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDebugMenuOpen, setIsDebugMenuOpen] = useState(false);
  const [lastSaveTimestamp, setLastSaveTimestamp] = useState<number | null>(initialSaveData?.lastSaveTimestamp || null);
  const [isTopPanelOpen, setIsTopPanelOpen] = useState(() => window.innerWidth > 1024);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);


  const mapRef = useRef<HTMLDivElement>(null);
  const panState = useRef({ isPanning: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    if (gameState === 'playing' && mapRef.current) {
      const { clientWidth } = mapRef.current;
      mapRef.current.scrollLeft = 0;
      mapRef.current.scrollTop = 0;
    }
  }, [gameState]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || gameState !== 'playing') return;

    const handlePanStart = (e: MouseEvent | TouchEvent) => {
        panState.current.isPanning = true;
        const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
        const pageY = 'touches' in e ? e.touches[0].pageY : e.pageY;
        panState.current.startX = pageX - map.offsetLeft;
        panState.current.startY = pageY - map.offsetTop;
        panState.current.scrollLeft = map.scrollLeft;
        panState.current.scrollTop = map.scrollTop;
        map.style.cursor = 'grabbing';
        map.style.userSelect = 'none';
    };

    const handlePanMove = (e: MouseEvent | TouchEvent) => {
        if (!panState.current.isPanning) return;
        const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
        const pageY = 'touches' in e ? e.touches[0].pageY : e.pageY;
        const x = pageX - map.offsetLeft;
        const y = pageY - map.offsetTop;
        const walkX = (x - panState.current.startX);
        const walkY = (y - panState.current.startY);
        map.scrollLeft = panState.current.scrollLeft - walkX;
        map.scrollTop = panState.current.scrollTop - walkY;
    };

    const handlePanEnd = () => {
        panState.current.isPanning = false;
        map.style.cursor = 'grab';
        map.style.removeProperty('user-select');
    };

    map.addEventListener('mousedown', handlePanStart);
    map.addEventListener('touchstart', handlePanStart, { passive: true });
    window.addEventListener('mouseup', handlePanEnd);
    window.addEventListener('touchend', handlePanEnd);
    window.addEventListener('mousemove', handlePanMove);
    window.addEventListener('touchmove', handlePanMove, { passive: true });

    return () => {
        map.removeEventListener('mousedown', handlePanStart);
        map.removeEventListener('touchstart', handlePanStart);
        window.removeEventListener('mouseup', handlePanEnd);
        window.removeEventListener('touchend', handlePanEnd);
        window.removeEventListener('mousemove', handlePanMove);
        window.removeEventListener('touchmove', handlePanMove);
    };
}, [gameState]);

  useEffect(() => {
    if (activeTab === 'synthesis' && !unlockedFeatures.has('synthesis')) {
      setActiveTab('resources');
    }
    if (activeTab === 'fusion' && !unlockedFeatures.has('fusion')) {
      setActiveTab('resources');
    }
    if (activeTab === 'knowledge' && !unlockedFeatures.has('test')) {
      setActiveTab('resources');
    }
  }, [unlockedFeatures, activeTab]);

  const { stardustCapacity, baseGeneration } = useMemo(() => {
    let finalStardustCapacity = INITIAL_STARDUST_CAPACITY;
    const finalBaseGeneration: Partial<Record<Resource, number>> = { [Resource.Stardust]: BASE_STARDUST_GENERATION };

    const allUpgradesAndSub = [...UPGRADES, ...ALL_SUB_UPGRADES];

    // Non-repeatable upgrades
    const allPurchased = new Set([...purchasedUpgrades, ...purchasedSubUpgrades]);
    allPurchased.forEach(upgradeId => {
        const upgrade = allUpgradesAndSub.find(u => u.id === upgradeId);
        if (upgrade) {
            const effects = 'effects' in upgrade ? upgrade.effects : [];
            effects.forEach(effect => {
                if (effect.type === 'ADD_BASE_GENERATION') {
                    finalBaseGeneration[effect.resource] = (finalBaseGeneration[effect.resource] || 0) + effect.value;
                } else if (effect.type === 'INCREASE_CAPACITY' && effect.resource === Resource.Stardust) {
                    finalStardustCapacity += effect.value;
                }
            });
        }
    });

    // Repeatable upgrades
    for (const subUpgradeId in subUpgradeLevels) {
        const level = subUpgradeLevels[subUpgradeId];
        if (level > 0) {
            const subUpgrade = ALL_SUB_UPGRADES.find(su => su.id === subUpgradeId);
            if (subUpgrade && subUpgrade.repeatable) {
                // Special-cased logic for Cosmic Fabric Expansion
                if (subUpgrade.id === 'co_inf_cap') {
                    // Generation: total generation added is `level * 10`
                    finalBaseGeneration[Resource.Stardust] = (finalBaseGeneration[Resource.Stardust] || 0) + (level * 10);
                    // Capacity: total capacity added is `100 * level^2`
                    finalStardustCapacity += 100 * (level * level);
                } else {
                    // Fallback for other potential repeatable upgrades
                    subUpgrade.effects.forEach(effect => {
                        if (effect.type === 'ADD_BASE_GENERATION') {
                            finalBaseGeneration[effect.resource] = (finalBaseGeneration[effect.resource] || 0) + (effect.value * level);
                        } else if (effect.type === 'INCREASE_CAPACITY' && effect.resource === Resource.Stardust) {
                            finalStardustCapacity += effect.value * level;
                        }
                    });
                }
            }
        }
    }

    if (finalBaseGeneration[Resource.Stardust]) {
        finalBaseGeneration[Resource.Stardust] *= stardustGenerationMultiplier;
    }

    return { stardustCapacity: finalStardustCapacity, baseGeneration: finalBaseGeneration };
  }, [purchasedUpgrades, purchasedSubUpgrades, subUpgradeLevels, stardustGenerationMultiplier]);

  const protocellAttributes = useMemo(() => {
    const finalAttrs: ProtocellState['attributes'] = { ...protocellTrainingLevels };
    
    // Add bonuses from map upgrades
    for (const key in protocellBaseBonuses) {
        const attr = key as keyof ProtocellState['attributes'];
        finalAttrs[attr] += protocellBaseBonuses[attr];
    }

    // Add bonuses from chamber upgrades
    for (const upgradeId in chamberUpgradeLevels) {
        const level = chamberUpgradeLevels[upgradeId];
        const upgrade = CHAMBER_UPGRADES.find(u => u.id === upgradeId);
        if (level > 0 && upgrade) {
            const effect = upgrade.effect(level);
            if(effect.type === 'ADD_BASE_ATTRIBUTE' && effect.attribute) {
                finalAttrs[effect.attribute] += effect.value;
            }
        }
    }
    return finalAttrs;
  }, [protocellTrainingLevels, protocellBaseBonuses, chamberUpgradeLevels]);
  
  const lootMultiplier = useMemo(() => {
    let multiplier = 1;
     for (const upgradeId in chamberUpgradeLevels) {
        const level = chamberUpgradeLevels[upgradeId];
        const upgrade = CHAMBER_UPGRADES.find(u => u.id === upgradeId);
        if (level > 0 && upgrade) {
            const effect = upgrade.effect(level);
            if(effect.type === 'INCREASE_LOOT_MULTIPLIER') {
                multiplier *= effect.value;
            }
        }
    }
    return multiplier;
  }, [chamberUpgradeLevels]);

  const resourceCapacities = useMemo(() => {
    const capacities: Partial<Record<Resource, number>> = {
        [Resource.Stardust]: stardustCapacity,
    };
    for (const res in BASE_RESOURCE_CAPACITIES) {
        const resourceKey = res as keyof typeof BASE_RESOURCE_CAPACITIES;
        capacities[resourceKey] = BASE_RESOURCE_CAPACITIES[resourceKey] * universalStorageLevel;
    }
    return capacities;
  }, [stardustCapacity, universalStorageLevel]);

  const { assignedForceCount, assignedHandsCount, idleForce, idleHands } = useMemo(() => {
    let forceCount = 0;
    let handsCount = 0;
    KNOBS.forEach(knob => {
        const count = assignedWorkers[knob.id] || 0;
        if (knob.workerType === 'Force') {
            forceCount += count;
        } else {
            handsCount += count;
        }
    });
    return {
        assignedForceCount: forceCount,
        assignedHandsCount: handsCount,
        idleForce: maxForce - forceCount,
        idleHands: maxHands - handsCount,
    }
  }, [assignedWorkers, maxForce, maxHands]);


  const areDependenciesMet = useCallback((upgradeId: string) => {
      const upgrade = UPGRADES.find(u => u.id === upgradeId);
      if(!upgrade || !upgrade.dependencies) return true;
      return upgrade.dependencies.every(depId => purchasedUpgrades.has(depId));
  }, [purchasedUpgrades])

  const arePreviewDependenciesMet = useCallback((upgrade: Upgrade) => {
    if (!upgrade.previewDependencies) return false;
    return upgrade.previewDependencies.every(depId => purchasedUpgrades.has(depId));
  }, [purchasedUpgrades]);

  const gameTick = useCallback(() => {
    setResources(prevResources => {
      const newResources = { ...prevResources };
      const netChanges: Partial<Record<Resource, number>> = {};
      
      for (const res in baseGeneration) {
          const resourceKey = res as Resource;
          netChanges[resourceKey] = (netChanges[resourceKey] || 0) + baseGeneration[resourceKey]!;
      }

      if (unlockedFeatures.has('synthesis') || unlockedFeatures.has('fusion')) {
        for (const knob of KNOBS) {
          if (!unlockedKnobs.has(knob.id)) continue;

          const numWorkers = assignedWorkers[knob.id] || 0;
          if (numWorkers === 0) continue;

          let maxPossibleRuns = numWorkers;
          for (const input of knob.inputs) {
            let cost = input.amount * numWorkers;
            if (knob.workerType === 'Hands' && knob.costIncreasePerHand && numWorkers > 0) {
                 cost = input.amount * numWorkers * (1 + (numWorkers - 1) * knob.costIncreasePerHand);
            }
            const resourceAvailable = newResources[input.resource] + (netChanges[input.resource] || 0);
            
            if (cost > 0) {
                if (resourceAvailable < cost) {
                    maxPossibleRuns = 0; 
                    break;
                }
            } else {
                maxPossibleRuns = numWorkers;
            }
          }

          const effectiveRuns = maxPossibleRuns > 0 ? numWorkers : 0;
          
          if (effectiveRuns > 0) {
            for (const input of knob.inputs) {
                let cost = input.amount * effectiveRuns;
                 if (knob.workerType === 'Hands' && knob.costIncreasePerHand && effectiveRuns > 0) {
                    cost = input.amount * effectiveRuns * (1 + (effectiveRuns - 1) * knob.costIncreasePerHand);
                 }
              netChanges[input.resource] = (netChanges[input.resource] || 0) - cost;
            }
            for (const output of knob.outputs) {
              netChanges[output.resource] = (netChanges[output.resource] || 0) + (output.amount * effectiveRuns);
            }
          }
        }
      }

      for (const key in newResources) {
        const resourceKey = key as Resource;
        let newAmount = newResources[resourceKey] + (netChanges[resourceKey] || 0);

        const capacity = resourceCapacities[resourceKey];
        if (capacity !== undefined) {
            newAmount = Math.min(newAmount, capacity);
        }
        
        newResources[resourceKey] = Math.max(0, newAmount);
      }

      return newResources;
    });
  }, [assignedWorkers, baseGeneration, unlockedFeatures, unlockedKnobs, resourceCapacities]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const intervalId = setInterval(gameTick, TICK_RATE_MS);
    return () => clearInterval(intervalId);
  }, [gameTick, gameState]);

  // Save/Load Logic
  const saveGame = useCallback(() => {
    try {
      const saveData = {
        resources,
        universalStorageLevel,
        stardustGenerationMultiplier,
        assignedWorkers,
        maxForce,
        maxHands,
        purchasedUpgrades: Array.from(purchasedUpgrades),
        purchasedSubUpgrades: Array.from(purchasedSubUpgrades),
        subUpgradeLevels,
        unlockedFeatures: Array.from(unlockedFeatures),
        unlockedKnobs: Array.from(unlockedKnobs),
        protocellTrainingLevels,
        protocellBaseBonuses,
        chamberUpgradeLevels,
        proteinLoot,
        lastSaveTimestamp: Date.now(),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      setLastSaveTimestamp(saveData.lastSaveTimestamp);
    } catch (error) {
      console.error("Failed to save game:", error);
    }
  }, [
    resources, universalStorageLevel, stardustGenerationMultiplier, assignedWorkers,
    maxForce, maxHands, purchasedUpgrades, purchasedSubUpgrades, subUpgradeLevels,
    unlockedFeatures, unlockedKnobs, protocellTrainingLevels, protocellBaseBonuses,
    chamberUpgradeLevels, proteinLoot
  ]);
  
  const deleteSave = useCallback(() => {
    if (window.confirm("Are you sure you want to delete all saved data? This cannot be undone.")) {
      localStorage.removeItem(SAVE_KEY);
      window.location.reload();
    }
  }, []);
  
  // Autosave effect
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      saveGame();
    }, 60000); // Autosave every 1 minute
    return () => clearInterval(interval);
  }, [gameState, saveGame]);

  // --- DEBUG HANDLERS ---
  const handleDebugGiveResources = useCallback(() => {
    setResources(prev => {
      const newRes = { ...prev };
      for (const resKey of Object.values(Resource)) {
        newRes[resKey] = (newRes[resKey] || 0) + 1_000_000;
      }
      return newRes;
    });
    alert('DEBUG: Added 1,000,000 to all resources!');
  }, []);

  const handleDebugGiveLoot = useCallback(() => {
    setProteinLoot(prev => {
      const newLoot = { ...prev };
      for (const lootType of Object.values(ProteinLootType)) {
        newLoot[lootType] = (newLoot[lootType] || 0) + 100_000;
      }
      return newLoot;
    });
    alert('DEBUG: Added 100,000 to all protein loot!');
  }, []);
  
  const handleDebugGainWorkers = useCallback(() => {
    setMaxForce(prev => prev + 100);
    setMaxHands(prev => prev + 100);
    alert('DEBUG: Added 100 to Max Force and Max Hands!');
  }, []);

  const handleDebugUnlockAll = useCallback(() => {
    const allUpgradeIds = new Set(UPGRADES.map(u => u.id));
    setPurchasedUpgrades(allUpgradeIds);
    
    const allKnobIds = new Set(KNOBS.map(k => k.id));
    setUnlockedKnobs(allKnobIds);

    const allFeatures = new Set(['synthesis', 'protocell', 'test', 'chamber_upgrades', 'fusion']);
    setUnlockedFeatures(allFeatures);

    alert('DEBUG: Unlocked all major upgrades, knobs, and features!');
  }, []);
  // --- END DEBUG HANDLERS ---

  const visibleUpgrades = useMemo(() => 
    UPGRADES.filter(u => areDependenciesMet(u.id) || arePreviewDependenciesMet(u)),
    [areDependenciesMet, arePreviewDependenciesMet]
  );
  
  const discoveredResources = useMemo(() => {
    const discovered = new Set<Resource>([Resource.Stardust]);

    for (const res in resources) {
        if (resources[res as Resource] > 0) {
            discovered.add(res as Resource);
        }
    }

    KNOBS.forEach(knob => {
        if (unlockedKnobs.has(knob.id)) {
            knob.inputs.forEach(input => discovered.add(input.resource));
            knob.outputs.forEach(output => discovered.add(output.resource));
        }
    });

    visibleUpgrades.forEach(upgrade => {
        if (!purchasedUpgrades.has(upgrade.id)) {
            upgrade.cost.forEach(c => discovered.add(c.resource));
        }
    });

    return (Object.values(Resource)).filter(res => discovered.has(res));
  }, [resources, unlockedKnobs, visibleUpgrades, purchasedUpgrades]);


  const handleAddWorker = (knobId: string) => {
    const knob = KNOBS.find(k => k.id === knobId);
    if (!knob) return;
    
    const canAdd = knob.workerType === 'Force' ? idleForce > 0 : idleHands > 0;
    if (canAdd) {
      setAssignedWorkers(prev => ({ ...prev, [knobId]: prev[knobId] + 1 }));
    }
  };

  const handleRemoveWorker = (knobId: string) => {
    if (assignedWorkers[knobId] > 0) {
      setAssignedWorkers(prev => ({ ...prev, [knobId]: prev[knobId] - 1 }));
    }
  };

  const canAfford = useCallback((upgradeId: string) => {
      const upgrade = UPGRADES.find(u => u.id === upgradeId);
      if(!upgrade) return false;
      // This is the check for purchasability - must meet REAL dependencies
      if (!areDependenciesMet(upgrade.id)) {
          return false;
      }
      return upgrade.cost.every(c => resources[c.resource] >= c.amount);
  }, [resources, areDependenciesMet]);

  const handlePurchaseUpgrade = (upgradeId: string) => {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade || purchasedUpgrades.has(upgradeId)) return;

    if (!canAfford(upgradeId)) return;

    setResources(prev => {
        const newRes = {...prev};
        for (const cost of upgrade.cost) {
            newRes[cost.resource] -= cost.amount;
        }
        return newRes;
    });

    setPurchasedUpgrades(prev => new Set(prev).add(upgradeId));
    
    upgrade.effects.forEach(effect => {
      switch (effect.type) {
        case 'UNLOCK_FEATURE':
          setUnlockedFeatures(prev => new Set(prev).add(effect.value));
          break;
        case 'UNLOCK_KNOBS':
          setUnlockedKnobs(prev => new Set([...prev, ...effect.value]));
          break;
        case 'INCREASE_MAX_HANDS':
          setMaxHands(prev => prev + effect.value);
          break;
        case 'INCREASE_MAX_FORCE':
            setMaxForce(prev => prev + effect.value);
            break;
        case 'IMPROVE_PROTOCELL_ATTRIBUTE':
          setProtocellBaseBonuses(p => ({
            ...p,
            [effect.attribute]: p[effect.attribute] + effect.value
          }));
          break;
      }
    });
  };
  
  const handleNodeClick = (upgradeId: string) => {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade) return;
    
    if (window.innerWidth < 1024) {
      setIsTopPanelOpen(false);
    }
    setIsLeftPanelOpen(true);

    const isPurchased = purchasedUpgrades.has(upgrade.id);

    if (isPurchased) {
        if (upgrade.panelContent) {
            setActiveCosmicPanel(prev => prev?.upgrade.id === upgrade.id ? null : { upgrade, content: upgrade.panelContent! });
        } else {
            setActiveCosmicPanel(null);
        }
    } else {
        handlePurchaseUpgrade(upgradeId);
    }
  };
  
  const handlePurchaseSubUpgrade = (subUpgrade: SubUpgrade) => {
    if (subUpgrade.repeatable) {
        const currentLevel = subUpgradeLevels[subUpgrade.id] || 0;
        const cost = subUpgrade.cost(currentLevel);

        if (resources[cost.resource] >= cost.amount) {
            setResources(prev => ({ ...prev, [cost.resource]: prev[cost.resource] - cost.amount }));
            setSubUpgradeLevels(prev => ({ ...prev, [subUpgrade.id]: currentLevel + 1 }));
            
            subUpgrade.effects.forEach(effect => {
                 switch (effect.type) {
                    case 'INCREASE_MAX_FORCE': setMaxForce(prev => prev + effect.value); break;
                    case 'INCREASE_MAX_HANDS': setMaxHands(prev => prev + effect.value); break;
                    case 'INCREASE_UNIVERSAL_STORAGE': setUniversalStorageLevel(prev => prev + effect.value); break;
                }
            });
        }
    } else {
        if (purchasedSubUpgrades.has(subUpgrade.id)) return;
        const cost = subUpgrade.cost(0);

        if (resources[cost.resource] >= cost.amount) {
            setResources(prev => ({ ...prev, [cost.resource]: prev[cost.resource] - cost.amount }));
            setPurchasedSubUpgrades(prev => new Set(prev).add(subUpgrade.id));

            subUpgrade.effects.forEach(effect => {
                 switch (effect.type) {
                    case 'INCREASE_GENERATION_MULTIPLIER':
                        if (effect.resource === Resource.Stardust) setStardustGenerationMultiplier(prev => prev + effect.value);
                        break;
                    case 'IMPROVE_PROTOCELL_ATTRIBUTE':
                        setProtocellBaseBonuses(p => ({ ...p, [effect.attribute]: p[effect.attribute] + effect.value }));
                        break;
                    case 'INCREASE_MAX_FORCE': setMaxForce(prev => prev + effect.value); break;
                    case 'INCREASE_MAX_HANDS': setMaxHands(prev => prev + effect.value); break;
                    case 'INCREASE_UNIVERSAL_STORAGE': setUniversalStorageLevel(prev => prev + effect.value); break;
                 }
            });
        }
    }
  };


  const handleTrainProtocell = (attributeId: keyof ProtocellState['attributes']) => {
    const config = PROTOCELL_TRAINING_CONFIG[attributeId];
    const currentLevel = protocellTrainingLevels[attributeId];
    const cost = config.cost(currentLevel);

    if (resources[cost.resource] >= cost.amount) {
      setResources(prev => ({...prev, [cost.resource]: prev[cost.resource] - cost.amount}));
      setProtocellTrainingLevels(prev => ({
        ...prev,
        [attributeId]: prev[attributeId] + 1
      }));
    }
  };
  
  const handleStartHunt = () => {
    setHuntState({ status: 'hunting', message: 'The protocell is on the hunt...' });
    setLastHuntResult(null);

    const huntDuration = Math.max(1000, 4000 - protocellAttributes.speed * 100);

    setTimeout(() => {
        const result = HUNT_RESULTS[Math.floor(Math.random() * HUNT_RESULTS.length)];
        
        setProteinLoot(prevLoot => {
            const newLoot = {...prevLoot};
            for (const key in result.rewards) {
                const lootType = key as ProteinLootType;
                const amount = result.rewards[lootType] || 0;
                newLoot[lootType] += Math.floor(amount * lootMultiplier);
            }
            return newLoot;
        });

        setLastHuntResult(result);
        setHuntState({ status: 'idle', message: 'Hunt successful!' });
    }, huntDuration);
  };
  
  const handlePurchaseChamberUpgrade = (upgradeId: string) => {
    const upgrade = CHAMBER_UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade) return;

    const currentLevel = chamberUpgradeLevels[upgradeId] || 0;
    if (currentLevel >= upgrade.maxLevel) return;

    const cost = upgrade.cost(currentLevel);
    if (proteinLoot[upgrade.lootType] >= cost) {
      setProteinLoot(prev => ({ ...prev, [upgrade.lootType]: prev[upgrade.lootType] - cost }));
      setChamberUpgradeLevels(prev => ({ ...prev, [upgradeId]: currentLevel + 1 }));
    }
  };

  const availableQuestions = useMemo(() => {
    const questions: (Quiz & { factId: string })[] = [];
    const allUpgrades = [...UPGRADES, ...ALL_SUB_UPGRADES];
    
    allUpgrades.forEach(upgrade => {
      const isUpgradePurchased = purchasedUpgrades.has(upgrade.id) || purchasedSubUpgrades.has(upgrade.id);
      if (isUpgradePurchased && 'panelContent' in upgrade && upgrade.panelContent) {
          upgrade.panelContent.facts.forEach((fact, fIndex) => {
              if (fact.quiz) {
                  const isFactUnlocked = !fact.unlockedBySubUpgradeId || purchasedSubUpgrades.has(fact.unlockedBySubUpgradeId);
                  if (isFactUnlocked) {
                      questions.push({ ...fact.quiz, factId: `${upgrade.id}-fact-${fIndex}` });
                  }
              }
          });
      }
    });

    // Also check upgrades without panel content
     purchasedUpgrades.forEach(upgradeId => {
        const upgrade = UPGRADES.find(u => u.id === upgradeId);
        if (upgrade && !upgrade.panelContent && upgrade.id === 'cosmic_origins') { // Example for adding questions to upgrades without panels
           // This logic can be expanded
        }
     });


    return questions;
  }, [purchasedUpgrades, purchasedSubUpgrades]);

  const handleGenerateQuestion = () => {
    if (availableQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const newQuestion = availableQuestions[randomIndex];
      setTestState({ currentQuestion: newQuestion, lastAnswerStatus: 'unanswered' });
    }
  };

  const handleAnswerQuestion = (selectedIndex: number) => {
    if (!testState.currentQuestion) return;

    if (selectedIndex === testState.currentQuestion.answerIndex) {
      setTestState(prev => ({ ...prev, lastAnswerStatus: 'correct' }));
      // Grant rewards
      setResources(prevResources => {
        const newResources = { ...prevResources };
        newResources[Resource.Stardust] += stardustCapacity * TEST_REWARD_STARDUST_CAP_PERCENTAGE;
        
        const generationPerSecond = baseGeneration;
        for (const res in generationPerSecond) {
            const resourceKey = res as Resource;
            newResources[resourceKey] += generationPerSecond[resourceKey]! * TEST_REWARD_GENERATION_SECONDS;
        }

        // Clamp resources to capacity after rewards
        for (const res in newResources) {
          const resourceKey = res as Resource;
          const capacity = resourceCapacities[resourceKey];
          if (capacity !== undefined) {
            newResources[resourceKey] = Math.min(newResources[resourceKey], capacity);
          }
        }
        return newResources;
      });
    } else {
      setTestState(prev => ({ ...prev, lastAnswerStatus: 'incorrect' }));
    }
  };

  if (gameState === 'title') {
    return <TitleScreen onStartGame={() => setGameState('playing')} />;
  }
  
  const fusionKnobs = KNOBS.filter(knob => unlockedKnobs.has(knob.id) && knob.workerType === 'Force');
  const synthesisKnobs = KNOBS.filter(knob => unlockedKnobs.has(knob.id) && knob.workerType === 'Hands');
  const showLeftPanel = unlockedFeatures.has('protocell') || !!activeCosmicPanel;


  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="relative text-center py-2 bg-black/20 backdrop-blur-sm z-40 border-b border-teal-500/20 flex items-center justify-center shrink-0">
        <h1 className="text-2xl font-bold text-teal-300">BioGenesis</h1>
        <div className="absolute top-0 right-0 h-full flex items-center pr-4">
            <button onClick={() => setIsSettingsOpen(p => !p)} className="text-gray-400 hover:text-white transition-colors" aria-label="Open Settings">
                <CogIcon className="w-6 h-6"/>
            </button>
        </div>
      </header>

      <main className="flex-grow flex relative overflow-hidden">
         <SettingsMenu 
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            onSave={saveGame}
            onDelete={deleteSave}
            lastSaveTimestamp={lastSaveTimestamp}
            onOpenDebugMenu={() => setIsDebugMenuOpen(true)}
         />
        
        <DebugMenu
          isOpen={isDebugMenuOpen}
          onClose={() => setIsDebugMenuOpen(false)}
          onGiveResources={handleDebugGiveResources}
          onGiveLoot={handleDebugGiveLoot}
          onGainWorkers={handleDebugGainWorkers}
          onUnlockAll={handleDebugUnlockAll}
        />
        
        {/* Left Panel */}
        {showLeftPanel && (
            <div className={`absolute top-0 left-0 h-full z-40 w-80 md:w-96 bg-black/40 backdrop-blur-lg border-r border-teal-500/20 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isLeftPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {activeCosmicPanel ? (
                  <CosmicDetailPanel onClose={() => {setActiveCosmicPanel(null); setIsLeftPanelOpen(false);}} panelData={activeCosmicPanel} resources={resources} purchasedSubUpgrades={purchasedSubUpgrades} subUpgradeLevels={subUpgradeLevels} onPurchaseSubUpgrade={handlePurchaseSubUpgrade} />
                ) : (
                  unlockedFeatures.has('protocell') && <ProtocellPanel protocellTrainingLevels={protocellTrainingLevels} protocellAttributes={protocellAttributes} resources={resources} onTrain={handleTrainProtocell} onHunt={handleStartHunt} huntState={huntState} lastHuntResult={lastHuntResult} proteinLoot={proteinLoot} chamberUpgradeLevels={chamberUpgradeLevels} onPurchaseChamberUpgrade={handlePurchaseChamberUpgrade} unlockedFeatures={unlockedFeatures} />
                )}
            </div>
        )}
        
        {/* Left Panel Toggles */}
        {showLeftPanel && (
            isLeftPanelOpen ? (
                <button onClick={() => setIsLeftPanelOpen(false)} className="absolute top-1/2 -translate-y-1/2 left-80 md:left-96 z-50 bg-gray-800 hover:bg-gray-700 text-white rounded-r-full p-1 transition-all" aria-label="Close Panel">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            ) : (
                unlockedFeatures.has('protocell') ? (
                    <button onClick={() => { setIsLeftPanelOpen(true); setActiveCosmicPanel(null); }} className="absolute top-1/2 -translate-y-1/2 left-0 z-30 bg-purple-600/90 backdrop-blur-sm border-y-2 border-r-2 border-purple-400/80 hover:bg-purple-500 text-white rounded-r-lg px-1 py-3 shadow-lg transition-all animate-pulse" aria-label="Open Protocell Chamber">
                        <div className="flex flex-col items-center gap-2">
                            <UpgradeIcon iconId="protocell" />
                        </div>
                    </button>
                ) : (
                    <button onClick={() => setIsLeftPanelOpen(true)} className="absolute top-1/2 -translate-y-1/2 left-0 z-30 bg-gray-800 hover:bg-gray-700 text-white rounded-r-full p-1 transition-all" aria-label="Open Panel">
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                )
            )
        )}
        
        <div className="flex-grow flex flex-col overflow-hidden">
            {/* Top Panel */}
            <div className="relative shrink-0 z-20">
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isTopPanelOpen ? 'h-72 md:h-60' : 'h-0'}`}>
                <div className="w-full h-full bg-black/30 backdrop-blur-lg border-b border-teal-500/20 shadow-2xl overflow-hidden p-3 flex flex-col">
                  <div className="flex border-b border-gray-700 shrink-0">
                    <button onClick={() => setActiveTab('resources')} className={`px-2 py-1.5 text-[11px] md:px-3 md:text-xs font-medium transition-colors shrink-0 ${activeTab === 'resources' ? 'text-teal-300 border-b-2 border-teal-300' : 'text-gray-400 hover:text-white'}`}>
                      Resources
                    </button>
                    {unlockedFeatures.has('fusion') && (
                      <button onClick={() => setActiveTab('fusion')} className={`px-2 py-1.5 text-[11px] md:px-3 md:text-xs font-medium transition-colors shrink-0 ${activeTab === 'fusion' ? 'text-teal-300 border-b-2 border-teal-300' : 'text-gray-400 hover:text-white'}`}>
                        Fusion
                      </button>
                    )}
                    {unlockedFeatures.has('synthesis') && (
                      <button onClick={() => setActiveTab('synthesis')} className={`px-2 py-1.5 text-[11px] md:px-3 md:text-xs font-medium transition-colors shrink-0 ${activeTab === 'synthesis' ? 'text-teal-300 border-b-2 border-teal-300' : 'text-gray-400 hover:text-white'}`}>
                        Synthesis
                      </button>
                    )}
                    {unlockedFeatures.has('test') && (
                      <button onClick={() => setActiveTab('knowledge')} className={`px-2 py-1.5 text-[11px] md:px-3 md:text-xs font-medium transition-colors shrink-0 ${activeTab === 'knowledge' ? 'text-teal-300 border-b-2 border-teal-300' : 'text-gray-400 hover:text-white'}`}>
                        Knowledge
                      </button>
                    )}
                  </div>
                  <div className="flex-grow overflow-y-auto scroll-container pt-3 pr-1">
                    {activeTab === 'resources' && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {discoveredResources.map(resKey => (
                          <ResourceDisplay key={resKey} resource={resKey} amount={resources[resKey]} capacity={resourceCapacities[resKey]}/>
                        ))}
                      </div>
                    )}
                    {activeTab === 'fusion' && (
                      <div className="flex flex-col items-center">
                        <p className="mb-2 text-sm md:text-base font-bold text-gray-300">Idle Force: <span className="text-green-400">{idleForce}</span> / {maxForce}</p>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {fusionKnobs.length > 0 ? fusionKnobs.map(knob => (
                              <ProcessPanel key={knob.id} knob={knob} workers={assignedWorkers[knob.id]} onAddWorker={() => handleAddWorker(knob.id)} onRemoveWorker={() => handleRemoveWorker(knob.id)} canAddWorker={idleForce > 0} canRemoveWorker={assignedWorkers[knob.id] > 0} />
                          )) : <p className="text-center text-gray-500 italic md:col-span-2 lg:col-span-3">Unlock fusion upgrades on the map.</p>}
                        </div>
                      </div>
                    )}
                    {activeTab === 'synthesis' && (
                      <div className="flex flex-col items-center">
                        <p className="mb-2 text-sm md:text-base font-bold text-gray-300">Idle Hands: <span className="text-green-400">{idleHands}</span> / {maxHands}</p>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {synthesisKnobs.length > 0 ? synthesisKnobs.map(knob => (
                            <ProcessPanel key={knob.id} knob={knob} workers={assignedWorkers[knob.id]} onAddWorker={() => handleAddWorker(knob.id)} onRemoveWorker={() => handleRemoveWorker(knob.id)} canAddWorker={idleHands > 0} canRemoveWorker={assignedWorkers[knob.id] > 0} />
                          )) : <p className="text-center text-gray-500 italic md:col-span-2 lg:col-span-3">Unlock synthesis upgrades on the map.</p>}
                        </div>
                      </div>
                    )}
                    {activeTab === 'knowledge' && <TestPanel testState={testState} onGenerateQuestion={handleGenerateQuestion} onAnswerQuestion={handleAnswerQuestion} availableQuestionCount={availableQuestions.length} baseGeneration={baseGeneration} stardustCapacity={stardustCapacity} />}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsTopPanelOpen(p => !p)} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1 transition-all" aria-label={isTopPanelOpen ? 'Close Control Panel' : 'Open Control Panel'}>
                {isTopPanelOpen ? <ChevronUpIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
              </button>
            </div>
    
            {/* Map Area */}
            <div ref={mapRef} id="map-container" className="flex-grow relative overflow-hidden cursor-grab">
              <div className="relative w-[2000px] h-[2500px]">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-gray-800 to-gray-900 transform origin-top-left scale-[0.6] md:scale-100">
                  <MapSection title="Cosmic Era" y="0%" height="20%" colorClass="bg-indigo-900/10" />
                  <MapSection title="Planetary Era" y="20%" height="20%" colorClass="bg-yellow-900/10" />
                  <MapSection title="Biological Era" y="40%" height="60%" colorClass="bg-teal-900/10" />
                  {MAP_SCENERY.map((scenery, index) => <MapScenery key={`scenery-${index}`} {...scenery} />)}
                  <MapLines upgrades={UPGRADES} purchasedUpgrades={purchasedUpgrades} visibleUpgrades={visibleUpgrades} />
                  {visibleUpgrades.map(upgrade => {
                      const isPurchased = purchasedUpgrades.has(upgrade.id);
                      const isInteractive = isPurchased && (!!upgrade.panelContent || unlockedFeatures.has('protocell'));
                      const hasUnlimited = !!upgrade.panelContent?.subUpgrades.some(su => su.repeatable);
                      return (
                          <MapNode key={upgrade.id} upgrade={upgrade} isPurchased={isPurchased} isInteractive={isInteractive} canAfford={canAfford(upgrade.id)} onClick={() => handleNodeClick(upgrade.id)} resources={resources} hasUnlimited={hasUnlimited} />
                      );
                  })}
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;