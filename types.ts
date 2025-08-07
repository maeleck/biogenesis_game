



export enum Resource {
  Stardust = 'Stardust',
  Hydrogen = 'Hydrogen',
  Carbon = 'Carbon',
  Iron = 'Iron',
  Rock = 'Rock',
  Water = 'Water',
  PrimordialSoup = 'Primordial Soup',
  AminoAcids = 'Amino Acids',
  Nucleotides = 'Nucleotides',
  ATP = 'ATP',
}

export enum ProteinLootType {
  StructuralFragments = 'Structural Fragments',
  CatalyticEnzymes = 'Catalytic Enzymes',
  GeneticMaterial = 'Genetic Material',
}

export type ProteinLootState = Record<ProteinLootType, number>;

export interface ResourceData {
  name: Resource;
  description: string;
}

export interface Knob {
  id: string;
  name:string;
  description: string;
  inputs: { resource: Resource; amount: number }[];
  outputs: { resource: Resource; amount: number }[];
  workerType: 'Force' | 'Hands';
  costIncreasePerHand?: number; // e.g., 0.1 for 10% cost increase per extra hand
}

export type UpgradeEffect =
  | { type: 'ADD_BASE_GENERATION'; resource: Resource, value: number }
  | { type: 'UNLOCK_FEATURE'; value: 'synthesis' | 'protocell' | 'test' | 'chamber_upgrades' | 'fusion' | 'manufacturing' }
  | { type: 'UNLOCK_KNOBS', value: string[] }
  | { type: 'INCREASE_MAX_HANDS', value: number }
  | { type: 'INCREASE_MAX_FORCE', value: number }
  | { type: 'INCREASE_CAPACITY', resource: Resource, value: number }
  | { type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource, value: number }
  | { type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed' | 'efficiency' | 'resilience', value: number }
  | { type: 'INCREASE_UNIVERSAL_STORAGE', value: number }
  | { type: 'INCREASE_PROTOCELL_LOOT_MULTIPLIER', value: number };

export interface SubUpgrade {
  id: string;
  name: string;
  description: string;
  cost: (level: number) => { resource: Resource; amount: number };
  effects: UpgradeEffect[];
  repeatable?: {
    maxLevel?: number;
  };
}

export interface Quiz {
  question: string;
  options: [string, string, string, string];
  answerIndex: number;
}

export interface Fact {
  text: string;
  unlockedBySubUpgradeId?: string; // The ID of the sub-upgrade that unlocks this fact. If undefined, it's visible by default.
  quiz?: Quiz;
}

export interface PanelContent {
  facts: Fact[];
  subUpgrades: SubUpgrade[];
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: { resource: Resource; amount: number }[];
  position: { x: number; y: number }; // percentages
  effects: UpgradeEffect[];
  icon: string;
  dependencies?: string[];
  previewDependencies?: string[];
  panelContent?: PanelContent;
}

export interface ProtocellState {
  attributes: {
    speed: number;
    efficiency: number;
    resilience: number;
  };
  level: number;
  xp: number;
}

export type ChamberUpgradeLevels = Record<string, number>;

export interface ChamberUpgrade {
  id: string;
  name: string;
  description: string;
  lootType: ProteinLootType;
  maxLevel: number;
  cost: (level: number) => number;
  effect: (level: number) => {
    type: 'ADD_BASE_ATTRIBUTE' | 'INCREASE_LOOT_MULTIPLIER';
    attribute?: keyof ProtocellState['attributes'];
    value: number;
  };
}

export interface TestState {
    currentQuestion: (Quiz & { factId: string }) | null;
    lastAnswerStatus: 'correct' | 'incorrect' | 'unanswered';
}

export interface CraftableItem {
  id: string;
  name: string;
  description: (level: number) => string;
  cost: (level: number) => { resource: Resource; amount: number }[];
  effects: (level: number) => UpgradeEffect[];
  maxLevel?: number;
}

export interface GeneCard {
  id: string;
  name: string;
  description: string;
  application: string;
}

export interface Enemy {
  id: string;
  name: string;
  icon: string;
  description: string;
  stats: {
    hp: number;
    attack: number;
    speed: number;
  };
  rewards: {
    xp: number;
    loot: Partial<Record<ProteinLootType, [number, number]>>; // [min, max]
    geneCardDropChance: number; // 0 to 1
  };
}

export interface CombatResult {
  outcome: 'win' | 'loss';
  combatLog: string[];
  xpGained: number;
  lootGained: Partial<Record<ProteinLootType, number>>;
  geneCardFound: string | null;
  enemyName: string;
  enemyIcon: string;
}

export interface HuntStage {
  id:string;
  name: string;
  description: string;
  levelRequirement: number;
  enemyIds: string[];
}

export interface RewardedAd {
    show: () => void;
}

export interface AdService {
    loadRewardedAd: (callbacks: {
        onAdLoaded: (ad: RewardedAd) => void;
        onAdFailedToLoad: (error: string) => void;
    }) => void;
}