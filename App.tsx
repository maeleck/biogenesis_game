
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Resource, ProtocellState, PanelContent, SubUpgrade, Upgrade, TestState, Quiz, Fact, ProteinLootType, ProteinLootState, ChamberUpgradeLevels, CraftableItem, CombatResult, Enemy, HuntStage, RewardedAd } from './types';
import { KNOBS, INITIAL_RESOURCES, INITIAL_WORKERS, TICK_RATE_MS, INITIAL_MAX_FORCE, INITIAL_MAX_HANDS, BASE_STARDUST_GENERATION, UPGRADES, MAP_SCENERY, INITIAL_PROTOCELL_TRAINING_LEVELS, PROTOCELL_TRAINING_CONFIG, INITIAL_STARDUST_CAPACITY, TEST_REWARD_STARDUST_CAP_PERCENTAGE, TEST_REWARD_GENERATION_SECONDS, BASE_RESOURCE_CAPACITIES, CHAMBER_UPGRADES, INITIAL_PROTEIN_LOOT, CRAFTABLE_ITEMS, ENEMIES, GENE_CARDS, XP_TO_NEXT_LEVEL, LEVEL_UP_STAT_BONUS, INITIAL_PROTOCELL_STATE, HUNT_STAGES } from './constants';
import ResourceDisplay from './components/ResourceDisplay';
import ProcessPanel from './components/JobPanel';
import MapNode from './components/MapNode';
import TitleScreen from './components/TitleScreen';
import MapScenery from './components/MapScenery';
import MapLines from './components/MapLines';
import MapSection from './components/MapSection';
import ProtocellPanel from './components/ProtocellPanel';
import UpgradeDetailPanel from './components/CosmicDetailPanel';
import TestPanel from './components/TestPanel';
import SettingsMenu from './components/CosmicPanel';
import DebugMenu from './components/DebugMenu';
import ManufacturingPanel from './components/ManufacturingPanel';
import AdPlayer from './components/AdPlayer';
import { CogIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from './components/Icons';
import { UpgradeIcon } from './components/UpgradeIcons';
import Spinner from './components/Spinner';
import { adService } from './services/adService';


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
  
  const [selectedUpgradeId, setSelectedUpgradeId] = useState<string | null>(null);
  const [activeMainTab, setActiveMainTab] = useState('knowledge');
  
  // Protocell related state
  const [protocellState, setProtocellState] = useState<ProtocellState>(initialSaveData?.protocellState || INITIAL_PROTOCELL_STATE);
  const [protocellTrainingLevels, setProtocellTrainingLevels] = useState<ProtocellState['attributes']>(initialSaveData?.protocellTrainingLevels || INITIAL_PROTOCELL_TRAINING_LEVELS);
  const [protocellBaseBonuses, setProtocellBaseBonuses] = useState<ProtocellState['attributes']>(initialSaveData?.protocellBaseBonuses || { speed: 0, efficiency: 0, resilience: 0 });
  const [chamberUpgradeLevels, setChamberUpgradeLevels] = useState<ChamberUpgradeLevels>(initialSaveData?.chamberUpgradeLevels || {});
  const [proteinLoot, setProteinLoot] = useState<ProteinLootState>(initialSaveData?.proteinLoot || INITIAL_PROTEIN_LOOT);
  const [collectedGeneCards, setCollectedGeneCards] = useState<Set<string>>(new Set(initialSaveData?.collectedGeneCards || []));
  
  const [huntState, setHuntState] = useState<{status: 'idle' | 'hunting' | 'cooldown' | 'error', message: string}>({status: 'idle', message: ''});
  const [lastCombatResult, setLastCombatResult] = useState<CombatResult | null>(null);
  const [selectedHuntStageId, setSelectedHuntStageId] = useState<string>(initialSaveData?.selectedHuntStageId || HUNT_STAGES[0].id);

  
  const [testState, setTestState] = useState<TestState>({ currentQuestion: null, lastAnswerStatus: 'unanswered' });

  // Manufacturing State
  const [craftedItemLevels, setCraftedItemLevels] = useState<Record<string, number>>(initialSaveData?.craftedItemLevels || {});

  // Ad State
  const [isAdLoading, setIsAdLoading] = useState<boolean>(false);
  const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);
  const [adError, setAdError] = useState<string | null>(null);
  const [isAdPlaying, setIsAdPlaying] = useState<boolean>(false);
  const [adCooldownEndTime, setAdCooldownEndTime] = useState<number | null>(initialSaveData?.adCooldownEndTime || null);
  const [adCooldownString, setAdCooldownString] = useState<string>('');


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
        if (e.cancelable) e.preventDefault();

        const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
        const pageY = 'touches' in e ? e.touches[0].pageY : e.pageY;
        const x = pageX - map.offsetLeft;
        const y = pageY - map.offsetTop;
        const walkX = (x - panState.current.startX);
        const walkY = (y - panState.current.startY);

        const newScrollLeft = panState.current.scrollLeft - walkX;
        const newScrollTop = panState.current.scrollTop - walkY;
        
        const maxScrollLeft = map.scrollWidth - map.clientWidth;
        const maxScrollTop = map.scrollHeight - map.clientHeight;

        map.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
        map.scrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop));
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
    window.addEventListener('touchmove', handlePanMove, { passive: false });

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
    // If the active tab is no longer available, switch to a sensible default.
    const availableTabs = new Set(['upgrades', 'knowledge']);
    if (unlockedFeatures.has('fusion')) availableTabs.add('force');
    if (unlockedFeatures.has('synthesis')) availableTabs.add('hands');
    if (unlockedFeatures.has('protocell')) availableTabs.add('protocell');
    if (unlockedFeatures.has('manufacturing')) availableTabs.add('manufacturing');
    
    if (!availableTabs.has(activeMainTab)) {
        if (availableTabs.has('force')) setActiveMainTab('force');
        else if (availableTabs.has('hands')) setActiveMainTab('hands');
        else setActiveMainTab('knowledge');
    }
  }, [unlockedFeatures, activeMainTab]);

  const manufacturingBonuses = useMemo(() => {
    const bonuses = {
      baseGeneration: {} as Partial<Record<Resource, number>>,
      protocellLootMultiplier: 1,
    };

    for (const itemId in craftedItemLevels) {
      const level = craftedItemLevels[itemId];
      if (level > 0) {
        const item = CRAFTABLE_ITEMS.find(i => i.id === itemId);
        if (item) {
          const itemEffects = item.effects(level);
          itemEffects.forEach(effect => {
            if (effect.type === 'ADD_BASE_GENERATION') {
              bonuses.baseGeneration[effect.resource] = (bonuses.baseGeneration[effect.resource] || 0) + effect.value;
            } else if (effect.type === 'INCREASE_PROTOCELL_LOOT_MULTIPLIER') {
              bonuses.protocellLootMultiplier += effect.value;
            }
          });
        }
      }
    }
    return bonuses;
  }, [craftedItemLevels]);


  const { stardustCapacity, baseGeneration } = useMemo(() => {
    let finalStardustCapacity = INITIAL_STARDUST_CAPACITY;
    const finalBaseGeneration: Partial<Record<Resource, number>> = { [Resource.Stardust]: BASE_STARDUST_GENERATION };
    
    // Apply bonuses from manufacturing
    for(const res in manufacturingBonuses.baseGeneration) {
        const resource = res as Resource;
        finalBaseGeneration[resource] = (finalBaseGeneration[resource] || 0) + manufacturingBonuses.baseGeneration[resource]!;
    }

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
  }, [purchasedUpgrades, purchasedSubUpgrades, subUpgradeLevels, stardustGenerationMultiplier, manufacturingBonuses]);

  const protocellAttributes = useMemo(() => {
    const finalAttrs: ProtocellState['attributes'] = { ...protocellTrainingLevels };
    
    const levelBonus = (protocellState.level - 1) * LEVEL_UP_STAT_BONUS;
    finalAttrs.speed += levelBonus;
    finalAttrs.efficiency += levelBonus;
    finalAttrs.resilience += levelBonus;
    
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
  }, [protocellState.level, protocellTrainingLevels, protocellBaseBonuses, chamberUpgradeLevels]);
  
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
    return multiplier * manufacturingBonuses.protocellLootMultiplier;
  }, [chamberUpgradeLevels, manufacturingBonuses]);

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
    const resourceMultiplier = 1;

    setResources(prevResources => {
      const newResources = { ...prevResources };
      const netChanges: Partial<Record<Resource, number>> = {};
      
      for (const res in baseGeneration) {
          const resourceKey = res as Resource;
          netChanges[resourceKey] = (netChanges[resourceKey] || 0) + baseGeneration[resourceKey]! * resourceMultiplier;
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
              netChanges[output.resource] = (netChanges[output.resource] || 0) + (output.amount * effectiveRuns * resourceMultiplier);
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

  const handleLevelUp = useCallback(() => {
    setProtocellState(prev => {
        let newLevel = prev.level;
        let newXp = prev.xp;
        let nextLevelXp = XP_TO_NEXT_LEVEL(newLevel);
        
        while(newXp >= nextLevelXp) {
            newLevel++;
            newXp -= nextLevelXp;
            nextLevelXp = XP_TO_NEXT_LEVEL(newLevel);
        }

        return { level: newLevel, xp: newXp, attributes: prev.attributes };
    });
  }, []);

  useEffect(() => {
    handleLevelUp();
  }, [protocellState.xp, handleLevelUp]);

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
        protocellState,
        protocellTrainingLevels,
        protocellBaseBonuses,
        chamberUpgradeLevels,
        proteinLoot,
        collectedGeneCards: Array.from(collectedGeneCards),
        selectedHuntStageId,
        testState,
        craftedItemLevels,
        adCooldownEndTime,
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
    unlockedFeatures, unlockedKnobs, protocellState, protocellTrainingLevels, protocellBaseBonuses,
    chamberUpgradeLevels, proteinLoot, collectedGeneCards, selectedHuntStageId, testState, craftedItemLevels, adCooldownEndTime
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
  
  // Ad Cooldown Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (adCooldownEndTime && adCooldownEndTime > Date.now()) {
        const remaining = adCooldownEndTime - Date.now();
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000).toString().padStart(2, '0');
        setAdCooldownString(`${minutes}:${seconds}`);
      } else {
        setAdCooldownString('');
        if(adCooldownEndTime) {
            setAdCooldownEndTime(null);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [adCooldownEndTime]);

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
    setProtocellState(p => ({...p, xp: p.xp + 10000}));
    alert('DEBUG: Added 100,000 to all protein loot and 10,000 XP!');
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

    const allFeatures = new Set(['synthesis', 'protocell', 'test', 'chamber_upgrades', 'fusion', 'manufacturing']);
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
      setAssignedWorkers(prev => ({ ...prev, [knobId]: (prev[knobId] || 0) + 1 }));
    }
  };

  const handleRemoveWorker = (knobId: string) => {
    if ((assignedWorkers[knobId] || 0) > 0) {
      setAssignedWorkers(prev => ({ ...prev, [knobId]: prev[knobId] - 1 }));
    }
  };

  const canAfford = useCallback((costs: {resource: Resource; amount: number}[]) => {
      return costs.every(c => resources[c.resource] >= c.amount);
  }, [resources]);

  const handlePurchaseUpgrade = (upgradeId: string) => {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade || purchasedUpgrades.has(upgradeId)) return;

    if (!canAfford(upgrade.cost) || !areDependenciesMet(upgradeId)) return;

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
    
    const isPurchased = purchasedUpgrades.has(upgradeId);

    if (isPurchased) {
        if (upgrade.panelContent) {
            setIsLeftPanelOpen(true);
            setActiveMainTab('upgrades');
            setSelectedUpgradeId(prevId => prevId === upgradeId ? null : upgradeId);
        } else {
            setSelectedUpgradeId(null);
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
    const stage = HUNT_STAGES.find(s => s.id === selectedHuntStageId);
    if (!stage) {
      setHuntState({ status: 'error', message: 'Selected stage not found.' });
      return;
    }

    if (protocellState.level < stage.levelRequirement) {
        setHuntState({ status: 'error', message: 'Protocell level is too low for this stage.' });
        return;
    }
    
    setHuntState({ status: 'hunting', message: 'The protocell is on the hunt...' });
    setLastCombatResult(null);

    const huntDuration = 1000;

    setTimeout(() => {
        const availableEnemies = ENEMIES.filter(e => stage.enemyIds.includes(e.id));
        if (availableEnemies.length === 0) {
            setHuntState({ status: 'error', message: 'No enemies found for this stage.' });
            return;
        }
        
        const enemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        
        // Combat simulation
        let protocellHP = protocellAttributes.resilience * 10;
        let enemyHP = enemy.stats.hp;
        
        const protocellAttack = protocellAttributes.efficiency * 2;
        const protocellSpeed = protocellAttributes.speed;
        
        const combatLog: string[] = [`A wild ${enemy.name} appears!`];
        let turn = 0;

        const protocellGoesFirst = protocellSpeed >= enemy.stats.speed;

        while(protocellHP > 0 && enemyHP > 0 && turn < 20) {
            turn++;
            combatLog.push(`--- Turn ${turn} ---`);
            if (protocellGoesFirst) {
                // Protocell attacks
                const damageDealt = Math.max(1, Math.floor(protocellAttack * (0.8 + Math.random() * 0.4)));
                enemyHP -= damageDealt;
                combatLog.push(`Protocell attacks for ${damageDealt} damage. ${enemy.name} has ${Math.max(0, enemyHP)} HP left.`);
                if (enemyHP <= 0) break;

                // Enemy attacks
                const damageTaken = Math.max(1, Math.floor(enemy.stats.attack * (0.8 + Math.random() * 0.4)));
                protocellHP -= damageTaken;
                combatLog.push(`${enemy.name} attacks for ${damageTaken} damage. Protocell has ${Math.max(0, protocellHP)} HP left.`);

            } else {
                 // Enemy attacks
                const damageTaken = Math.max(1, Math.floor(enemy.stats.attack * (0.8 + Math.random() * 0.4)));
                protocellHP -= damageTaken;
                combatLog.push(`${enemy.name} attacks for ${damageTaken} damage. Protocell has ${Math.max(0, protocellHP)} HP left.`);
                if (protocellHP <= 0) break;

                // Protocell attacks
                const damageDealt = Math.max(1, Math.floor(protocellAttack * (0.8 + Math.random() * 0.4)));
                enemyHP -= damageDealt;
                combatLog.push(`Protocell attacks for ${damageDealt} damage. ${enemy.name} has ${Math.max(0, enemyHP)} HP left.`);
            }
        }
        
        const result: CombatResult = {
            outcome: 'loss',
            combatLog,
            xpGained: 0,
            lootGained: {},
            geneCardFound: null,
            enemyName: enemy.name,
            enemyIcon: enemy.icon,
        };

        if (protocellHP > 0) {
            result.outcome = 'win';
            combatLog.push(`Protocell is victorious!`);
            
            const xpMultiplier = 1;
            result.xpGained = Math.floor(enemy.rewards.xp * xpMultiplier);
            
            setProtocellState(prev => ({ ...prev, xp: prev.xp + result.xpGained }));

            for (const key in enemy.rewards.loot) {
                const lootType = key as ProteinLootType;
                const [min, max] = enemy.rewards.loot[lootType]!;
                const amount = Math.floor((min + Math.random() * (max - min)) * lootMultiplier);
                if (amount > 0) {
                    result.lootGained[lootType] = amount;
                }
            }
            
            setProteinLoot(prevLoot => {
                const newLoot = {...prevLoot};
                for (const key in result.lootGained) {
                    const lootType = key as ProteinLootType;
                    newLoot[lootType] += result.lootGained[lootType]!;
                }
                return newLoot;
            });
            
            if (Math.random() < enemy.rewards.geneCardDropChance) {
                const availableCards = GENE_CARDS.filter(card => !collectedGeneCards.has(card.id));
                if (availableCards.length > 0) {
                    const foundCard = availableCards[Math.floor(Math.random() * availableCards.length)];
                    result.geneCardFound = foundCard.id;
                    setCollectedGeneCards(prev => new Set(prev).add(foundCard.id));
                }
            }

        } else {
             combatLog.push(`Protocell has been defeated.`);
        }

        setLastCombatResult(result);
        setHuntState({ status: 'idle', message: 'Hunt complete!' });
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

  const handleCraftItem = (itemId: string) => {
    const item = CRAFTABLE_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const currentLevel = craftedItemLevels[itemId] || 0;
    if (item.maxLevel && currentLevel >= item.maxLevel) return;

    const costs = item.cost(currentLevel);
    if (canAfford(costs)) {
        setResources(prev => {
            const newRes = {...prev};
            costs.forEach(c => {
                newRes[c.resource] -= c.amount;
            });
            return newRes;
        });
        setCraftedItemLevels(prev => ({...prev, [itemId]: currentLevel + 1 }));
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

  const handleGenerateQuestion = useCallback(() => {
    if (availableQuestions.length > 0) {
      // Avoid asking the same question twice in a row
      let newQuestion = testState.currentQuestion;
      if (availableQuestions.length > 1) {
          while(newQuestion?.factId === testState.currentQuestion?.factId) {
              const randomIndex = Math.floor(Math.random() * availableQuestions.length);
              newQuestion = availableQuestions[randomIndex];
          }
      } else {
           newQuestion = availableQuestions[0];
      }
      setTestState({ currentQuestion: newQuestion, lastAnswerStatus: 'unanswered' });
    } else {
      setTestState({ currentQuestion: null, lastAnswerStatus: 'unanswered' });
    }
  }, [availableQuestions, testState.currentQuestion]);

  const onAnswerQuestion = useCallback((selectedIndex: number) => {
    if (!testState.currentQuestion || testState.lastAnswerStatus !== 'unanswered') return;

    if (selectedIndex === testState.currentQuestion.answerIndex) {
      setTestState(prev => ({ ...prev, lastAnswerStatus: 'correct' }));
      
      const stardustReward = Math.floor(stardustCapacity * TEST_REWARD_STARDUST_CAP_PERCENTAGE);
      
      setResources(prevResources => {
        const newResources = { ...prevResources };
        
        // Add stardust reward
        newResources[Resource.Stardust] = Math.min(
          (newResources[Resource.Stardust] || 0) + stardustReward,
          resourceCapacities[Resource.Stardust] || Infinity
        );

        // Add passive generation reward
        for (const res in baseGeneration) {
          const resourceKey = res as Resource;
          let generationPerSecond = baseGeneration[resourceKey]!;

          const rewardAmount = generationPerSecond * TEST_REWARD_GENERATION_SECONDS;
          
          if (rewardAmount > 0) {
             newResources[resourceKey] = Math.min(
                (newResources[resourceKey] || 0) + rewardAmount,
                resourceCapacities[resourceKey] || Infinity
             );
          }
        }
        
        return newResources;
      });

    } else {
      setTestState(prev => ({ ...prev, lastAnswerStatus: 'incorrect' }));
    }
  }, [testState, stardustCapacity, resourceCapacities, baseGeneration]);
  
    const handleWatchAd = () => {
        if (isAdLoading || adCooldownString) {
            return;
        }

        setIsAdLoading(true);
        setAdError(null);

        adService.loadRewardedAd({
            onAdLoaded: (ad) => {
                setIsAdLoading(false);
                setRewardedAd(ad);
                setIsAdPlaying(true); 
                ad.show();
            },
            onAdFailedToLoad: (error) => {
                setIsAdLoading(false);
                setAdError(error);
                console.error("Ad failed to load:", error);
                alert(`Could not load ad: ${error}`);
            }
        });
    };


  const handleAdComplete = () => {
    setIsAdPlaying(false);
    setRewardedAd(null);
    
    // Grant reward
    const stardustReward = Math.floor(stardustCapacity * 0.05); // 5%
    const generationSeconds = 15;

    setResources(prevResources => {
      const newResources = { ...prevResources };
      
      newResources[Resource.Stardust] = Math.min(
        (newResources[Resource.Stardust] || 0) + stardustReward,
        resourceCapacities[Resource.Stardust] || Infinity
      );

      for (const res in baseGeneration) {
        const resourceKey = res as Resource;
        const rewardAmount = (baseGeneration[resourceKey] || 0) * generationSeconds;
        
        if (rewardAmount > 0) {
           newResources[resourceKey] = Math.min(
              (newResources[resourceKey] || 0) + rewardAmount,
              resourceCapacities[resourceKey] || Infinity
           );
        }
      }
      return newResources;
    });

    // Set cooldown
    setAdCooldownEndTime(Date.now() + 5 * 60 * 1000); // 5 minutes
  };

  const handleAdSkip = () => {
    setIsAdPlaying(false);
    setRewardedAd(null);
  };

  if (gameState === 'title') {
    return <TitleScreen onStartGame={() => setGameState('playing')} />;
  }

  return (
    <div className="bg-slate-900 text-slate-200 font-sans h-screen w-screen flex flex-col overflow-hidden">
        {/* Top Panel - Resources */}
        <div className={`fixed top-0 left-0 right-0 z-20 bg-slate-900/80 backdrop-blur-sm border-b border-purple-800 transition-transform duration-300 ${isTopPanelOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="p-2 md:p-3 container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {discoveredResources.map(res => (
                  <ResourceDisplay
                    key={res}
                    resource={res}
                    amount={resources[res]}
                    capacity={resourceCapacities[res]}
                  />
                ))}
              </div>
          </div>
        </div>
        
        {/* Toggle for Top Panel */}
        <button
          onClick={() => setIsTopPanelOpen(!isTopPanelOpen)}
          className="fixed top-0 right-12 z-30 p-2 bg-slate-800/80 rounded-b-xl border-x border-b border-purple-800"
          aria-label={isTopPanelOpen ? "Close resource panel" : "Open resource panel"}
        >
          {isTopPanelOpen ? <ChevronUpIcon className="w-5 h-5"/> : <ChevronDownIcon className="w-5 h-5"/>}
        </button>


        {/* Left Panel - Controls */}
        <div className={`fixed top-0 left-0 bottom-0 z-20 w-80 md:w-96 bg-slate-900/90 backdrop-blur-sm border-r border-purple-800 transition-transform duration-300 transform ${isLeftPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="w-full h-full flex flex-col">
                <div className="p-3 text-center border-b border-purple-800 flex-shrink-0">
                    <h2 className="text-xl font-bold text-slate-100">Control Panel</h2>
                </div>

                <div className="flex-shrink-0 border-b border-purple-800 flex flex-wrap">
                    <button onClick={() => setActiveMainTab('upgrades')} className={`flex-1 p-2 text-xs font-bold uppercase transition-colors ${activeMainTab === 'upgrades' ? 'bg-slate-800 text-yellow-300' : 'text-slate-400 hover:text-white'}`}>Upgrades</button>
                    {unlockedFeatures.has('fusion') && (
                        <button onClick={() => setActiveMainTab('force')} className={`flex-1 p-2 text-xs font-bold uppercase transition-colors ${activeMainTab === 'force' ? 'bg-slate-800 text-yellow-300' : 'text-slate-400 hover:text-white'}`}>Force</button>
                    )}
                    {unlockedFeatures.has('synthesis') && (
                        <button onClick={() => setActiveMainTab('hands')} className={`flex-1 p-2 text-xs font-bold uppercase transition-colors ${activeMainTab === 'hands' ? 'bg-slate-800 text-yellow-300' : 'text-slate-400 hover:text-white'}`}>Hands</button>
                    )}
                     {unlockedFeatures.has('manufacturing') && (
                        <button onClick={() => setActiveMainTab('manufacturing')} className={`flex-1 p-2 text-xs font-bold uppercase transition-colors ${activeMainTab === 'manufacturing' ? 'bg-slate-800 text-yellow-300' : 'text-slate-400 hover:text-white'}`}>Manufacturing</button>
                    )}
                    {unlockedFeatures.has('protocell') && (
                        <button onClick={() => setActiveMainTab('protocell')} className={`flex-1 p-2 text-xs font-bold uppercase transition-colors ${activeMainTab === 'protocell' ? 'bg-slate-800 text-yellow-300' : 'text-slate-400 hover:text-white'}`}>Protocell</button>
                    )}
                    {unlockedFeatures.has('test') && (
                        <button onClick={() => setActiveMainTab('knowledge')} className={`flex-1 p-2 text-xs font-bold uppercase transition-colors ${activeMainTab === 'knowledge' ? 'bg-slate-800 text-yellow-300' : 'text-slate-400 hover:text-white'}`}>Knowledge</button>
                    )}
                </div>

                <div className="flex-grow overflow-y-auto scroll-container">
                    {activeMainTab === 'upgrades' && (
                        <div className="p-2">
                             {selectedUpgradeId ? (
                                <UpgradeDetailPanel
                                    upgradeId={selectedUpgradeId}
                                    resources={resources}
                                    purchasedSubUpgrades={purchasedSubUpgrades}
                                    subUpgradeLevels={subUpgradeLevels}
                                    onPurchaseSubUpgrade={handlePurchaseSubUpgrade}
                                />
                            ) : (
                                <div className="text-center text-slate-400 p-8 flex flex-col items-center justify-center h-full">
                                    <UpgradeIcon iconId="spark" />
                                    <p className="mt-4 text-sm">Select a researched upgrade from the map to view its details, enhancements, and unlockable facts.</p>
                                </div>
                            )}
                        </div>
                    )}
                    {activeMainTab === 'force' && unlockedFeatures.has('fusion') && (
                        <div className="p-3">
                             <h3 className="text-base font-bold text-yellow-300 mb-2">Cosmic Force</h3>
                             <p className="text-sm font-mono text-yellow-200 mb-4">Idle Force: {idleForce} / {maxForce}</p>
                             <div className="grid grid-cols-1 gap-3">
                                {KNOBS.filter(k => k.workerType === 'Force' && unlockedKnobs.has(k.id)).map(knob => (
                                    <ProcessPanel key={knob.id} knob={knob} workers={assignedWorkers[knob.id] || 0} onAddWorker={() => handleAddWorker(knob.id)} onRemoveWorker={() => handleRemoveWorker(knob.id)} canAddWorker={idleForce > 0} canRemoveWorker={(assignedWorkers[knob.id] || 0) > 0} />
                                ))}
                             </div>
                        </div>
                    )}
                    {activeMainTab === 'hands' && unlockedFeatures.has('synthesis') && (
                        <div className="p-3">
                            <h3 className="text-base font-bold text-yellow-300 mb-2">Biological Manipulation</h3>
                            <p className="text-sm font-mono text-yellow-200 mb-4">Idle Hands: {idleHands} / {maxHands}</p>
                            <div className="grid grid-cols-1 gap-3">
                                {KNOBS.filter(k => k.workerType === 'Hands' && unlockedKnobs.has(k.id)).map(knob => (
                                    <ProcessPanel key={knob.id} knob={knob} workers={assignedWorkers[knob.id] || 0} onAddWorker={() => handleAddWorker(knob.id)} onRemoveWorker={() => handleRemoveWorker(knob.id)} canAddWorker={idleHands > 0} canRemoveWorker={(assignedWorkers[knob.id] || 0) > 0} />
                                ))}
                            </div>
                        </div>
                    )}
                    {activeMainTab === 'manufacturing' && unlockedFeatures.has('manufacturing') && (
                        <ManufacturingPanel
                            craftedItemLevels={craftedItemLevels}
                            resources={resources}
                            onCraft={handleCraftItem}
                        />
                    )}
                    {activeMainTab === 'protocell' && unlockedFeatures.has('protocell') && (
                        <ProtocellPanel 
                            protocellState={protocellState}
                            protocellTrainingLevels={protocellTrainingLevels}
                            protocellAttributes={protocellAttributes}
                            protocellBaseBonuses={protocellBaseBonuses}
                            chamberUpgradeLevels={chamberUpgradeLevels}
                            resources={resources}
                            onTrain={handleTrainProtocell}
                            onHunt={handleStartHunt}
                            huntState={huntState}
                            lastCombatResult={lastCombatResult}
                            proteinLoot={proteinLoot}
                            onPurchaseChamberUpgrade={handlePurchaseChamberUpgrade}
                            unlockedFeatures={unlockedFeatures}
                            collectedGeneCards={collectedGeneCards}
                            selectedHuntStageId={selectedHuntStageId}
                            onSelectHuntStage={setSelectedHuntStageId}
                        />
                    )}
                    {activeMainTab === 'knowledge' && unlockedFeatures.has('test') && (
                        <TestPanel 
                            testState={testState}
                            onGenerateQuestion={handleGenerateQuestion}
                            onAnswerQuestion={onAnswerQuestion}
                            availableQuestionCount={availableQuestions.length}
                            baseGeneration={baseGeneration}
                            stardustCapacity={stardustCapacity}
                        />
                    )}
                </div>
            </div>
        </div>

        {/* Toggle for Left Panel */}
        <button
            onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
            className={`fixed top-12 z-30 p-2 bg-slate-800/80 rounded-r-xl border-r border-t border-b border-purple-800 transition-all duration-300 ${isLeftPanelOpen ? 'left-80 md:left-96' : 'left-0'}`}
            aria-label={isLeftPanelOpen ? "Close controls panel" : "Open controls panel"}
        >
            {isLeftPanelOpen ? <ChevronLeftIcon className="w-5 h-5"/> : <ChevronRightIcon className="w-5 h-5"/>}
        </button>


        {/* Main Map Content */}
        <div ref={mapRef} className="flex-grow w-full h-full overflow-auto cursor-grab relative map-bg bg-slate-900">
            <div className="relative" style={{ width: 2000, height: 2500 }}>
                {MAP_SCENERY.map((s, i) => <MapScenery key={i} {...s} />)}
                <MapSection title="Cosmic Era" y="0%" height="25%" colorClass="bg-gradient-to-b from-blue-900/20 to-transparent" />
                <MapSection title="Planetary Era" y="25%" height="20%" colorClass="bg-gradient-to-b from-yellow-900/10 to-transparent" />
                <MapSection title="Biological Era" y="45%" height="55%" colorClass="bg-gradient-to-b from-green-900/10 to-transparent" />
                <MapLines upgrades={UPGRADES} purchasedUpgrades={purchasedUpgrades} visibleUpgrades={visibleUpgrades} />
                {visibleUpgrades.map(upgrade => (
                    <MapNode
                        key={upgrade.id}
                        upgrade={upgrade}
                        isPurchased={purchasedUpgrades.has(upgrade.id)}
                        isInteractive={!!upgrade.panelContent || !purchasedUpgrades.has(upgrade.id)}
                        canAfford={canAfford(upgrade.cost)}
                        onClick={() => handleNodeClick(upgrade.id)}
                        resources={resources}
                        hasUnlimited={!!upgrade.panelContent?.subUpgrades.some(su => su.repeatable && purchasedUpgrades.has(upgrade.id))}
                    />
                ))}
            </div>
        </div>
        
        {/* Settings Button & Panel */}
        <button onClick={() => setIsSettingsOpen(true)} className="fixed top-1 right-1 z-30 p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-b-xl border-x border-b border-purple-800">
            <CogIcon className="w-6 h-6" />
        </button>

        <SettingsMenu 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)}
            onSave={saveGame}
            onDelete={deleteSave}
            lastSaveTimestamp={lastSaveTimestamp}
            onOpenDebugMenu={() => setIsDebugMenuOpen(true)}
            onWatchAd={handleWatchAd}
            adCooldownString={adCooldownString}
            isAdLoading={isAdLoading}
        />
        
        <DebugMenu
            isOpen={isDebugMenuOpen}
            onClose={() => setIsDebugMenuOpen(false)}
            onGiveResources={handleDebugGiveResources}
            onGiveLoot={handleDebugGiveLoot}
            onUnlockAll={handleDebugUnlockAll}
            onGainWorkers={handleDebugGainWorkers}
        />
        
        {isAdPlaying && <AdPlayer onComplete={handleAdComplete} onSkip={handleAdSkip} />}
    </div>
  );
}

export default App;