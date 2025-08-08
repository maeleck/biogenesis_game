

import { Resource, ProtocellState, ProteinLootType, ChamberUpgrade, ProteinLootState } from '../types';

export const INITIAL_RESOURCES: Record<Resource, number> = {
  [Resource.Stardust]: 100,
  [Resource.Hydrogen]: 0,
  [Resource.Carbon]: 0,
  [Resource.Iron]: 0,
  [Resource.Rock]: 0,
  [Resource.Water]: 0,
  [Resource.PrimordialSoup]: 0,
  [Resource.AminoAcids]: 0,
  [Resource.Nucleotides]: 0,
  [Resource.ATP]: 0,
};

export const INITIAL_PROTEIN_LOOT: ProteinLootState = {
  [ProteinLootType.StructuralFragments]: 0,
  [ProteinLootType.CatalyticEnzymes]: 0,
  [ProteinLootType.GeneticMaterial]: 0,
};

export const INITIAL_PROTOCELL_STATE: ProtocellState = {
  attributes: {
    speed: 1,
    efficiency: 1,
    resilience: 1
  },
  level: 1,
  xp: 0,
};

export const XP_TO_NEXT_LEVEL = (level: number) => Math.floor(100 * Math.pow(1.5, level - 1));
export const LEVEL_UP_STAT_BONUS = 5;

export const INITIAL_PROTOCELL_TRAINING_LEVELS: ProtocellState['attributes'] = {
  speed: 1,
  efficiency: 1,
  resilience: 1
};

export const PROTOCELL_TRAINING_CONFIG = {
  speed: {
    name: 'Speed',
    description: 'Increases speed attribute for combat.',
    cost: (level: number) => ({ resource: Resource.ATP, amount: Math.floor(5 * Math.pow(1.15, level)) }),
    icon: 'speed'
  },
  efficiency: {
    name: 'Efficiency',
    description: 'Increases efficiency attribute for combat.',
    cost: (level: number) => ({ resource: Resource.AminoAcids, amount: Math.floor(5 * Math.pow(1.15, level)) }),
    icon: 'efficiency'
  },
  resilience: {
    name: 'Resilience',
    description: 'Increases resilience attribute for combat.',
    cost: (level: number) => ({ resource: Resource.Nucleotides, amount: Math.floor(5 * Math.pow(1.15, level)) }),
    icon: 'resilience'
  }
};

export const CHAMBER_UPGRADES: ChamberUpgrade[] = [
    {
        id: 'membrane_housing',
        name: 'Reinforced Membrane Housing',
        description: 'Strengthens the chamber walls with structural proteins, improving base resilience.',
        lootType: ProteinLootType.StructuralFragments,
        maxLevel: 20,
        cost: (level) => Math.floor(20 * Math.pow(1.3, level)),
        effect: (level) => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'resilience', value: level * 2 })
    },
    {
        id: 'catalytic_injection',
        name: 'Catalytic Injection System',
        description: 'Uses enzymes to pre-process nutrients, improving base efficiency.',
        lootType: ProteinLootType.CatalyticEnzymes,
        maxLevel: 20,
        cost: (level) => Math.floor(20 * Math.pow(1.3, level)),
        effect: (level) => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'efficiency', value: level * 2 })
    },
    {
        id: 'genetic_targeting',
        name: 'Genetic Targeting Matrix',
        description: 'Improves the protocell\'s ability to find targets using genetic markers, improving base speed.',
        lootType: ProteinLootType.GeneticMaterial,
        maxLevel: 20,
        cost: (level) => Math.floor(20 * Math.pow(1.3, level)),
        effect: (level) => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'speed', value: level * 2 })
    },
    {
        id: 'structural_multiplier',
        name: 'Global Loot Multiplier (Structural)',
        description: 'Uses Structural Fragments to refine hunting techniques, increasing all loot gained.',
        lootType: ProteinLootType.StructuralFragments,
        maxLevel: 10,
        cost: (level) => Math.floor(100 * Math.pow(1.5, level)),
        effect: (level) => ({ type: 'INCREASE_LOOT_MULTIPLIER', value: 1 + (level * 0.1) })
    },
    {
        id: 'catalytic_multiplier',
        name: 'Global Loot Multiplier (Catalytic)',
        description: 'Uses Catalytic Enzymes to refine hunting techniques, increasing all loot gained.',
        lootType: ProteinLootType.CatalyticEnzymes,
        maxLevel: 10,
        cost: (level) => Math.floor(100 * Math.pow(1.5, level)),
        effect: (level) => ({ type: 'INCREASE_LOOT_MULTIPLIER', value: 1 + (level * 0.1) })
    },
     {
        id: 'genetic_multiplier',
        name: 'Global Loot Multiplier (Genetic)',
        description: 'Uses Genetic Material to refine hunting techniques, increasing all loot gained.',
        lootType: ProteinLootType.GeneticMaterial,
        maxLevel: 10,
        cost: (level) => Math.floor(100 * Math.pow(1.5, level)),
        effect: (level) => ({ type: 'INCREASE_LOOT_MULTIPLIER', value: 1 + (level * 0.1) })
    },
    {
        id: 'xp_analyzer',
        name: 'XP Analyzer',
        description: 'Integrate a genetic analyzer to better study defeated foes, significantly increasing XP gain from all hunts.',
        lootType: ProteinLootType.GeneticMaterial,
        maxLevel: 10,
        cost: (level) => Math.floor(50 * Math.pow(1.4, level)),
        effect: (level) => ({ type: 'INCREASE_XP_MULTIPLIER', value: level * 0.05 }) // +5% per level, additive
    },
    {
        id: 'gene_splicer_nexus',
        name: 'Gene Splicer Nexus',
        description: 'A delicate apparatus that improves the recovery of intact gene cards from genetic material.',
        lootType: ProteinLootType.GeneticMaterial,
        maxLevel: 10,
        cost: (level) => Math.floor(250 * Math.pow(1.6, level)),
        effect: (level) => ({ type: 'INCREASE_GENE_CARD_DROP_CHANCE', value: level * 0.1 }) // +10% per level, additive
    },
    {
        id: 'targeted_extraction',
        name: 'Targeted Extraction',
        description: 'Use enzymes to specifically target and break down structural proteins, increasing the yield of Structural Fragments.',
        lootType: ProteinLootType.CatalyticEnzymes,
        maxLevel: 15,
        cost: (level) => Math.floor(75 * Math.pow(1.3, level)),
        effect: (level) => ({ type: 'INCREASE_LOOT_MULTIPLIER_SINGLE', lootType: ProteinLootType.StructuralFragments, value: level * 0.05 }) // +5% per level, additive
    }
];