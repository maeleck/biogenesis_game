
import { Resource, ProtocellState, HuntResult, ProteinLootType, ChamberUpgrade, ProteinLootState } from '../types';

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

export const INITIAL_PROTOCELL_TRAINING_LEVELS: ProtocellState['attributes'] = {
  speed: 1,
  efficiency: 1,
  resilience: 1
};

export const PROTOCELL_TRAINING_CONFIG = {
  speed: {
    name: 'Speed',
    description: 'How fast the protocell moves. Increases hunt speed.',
    cost: (level: number) => ({ resource: Resource.ATP, amount: Math.floor(25 * Math.pow(1.25, level)) }),
    icon: 'speed'
  },
  efficiency: {
    name: 'Efficiency',
    description: 'How effectively the protocell uses energy. Reduces hunt cost in the future.',
    cost: (level: number) => ({ resource: Resource.AminoAcids, amount: Math.floor(25 * Math.pow(1.25, level)) }),
    icon: 'efficiency'
  },
  resilience: {
    name: 'Resilience',
    description: 'The protocell\'s ability to withstand harsh conditions. Increases hunt success chance.',
    cost: (level: number) => ({ resource: Resource.Nucleotides, amount: Math.floor(25 * Math.pow(1.25, level)) }),
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
        cost: (level) => Math.floor(100 * Math.pow(1.4, level)),
        effect: (level) => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'resilience', value: level * 2 })
    },
    {
        id: 'catalytic_injection',
        name: 'Catalytic Injection System',
        description: 'Uses enzymes to pre-process nutrients, improving base efficiency.',
        lootType: ProteinLootType.CatalyticEnzymes,
        maxLevel: 20,
        cost: (level) => Math.floor(100 * Math.pow(1.4, level)),
        effect: (level) => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'efficiency', value: level * 2 })
    },
    {
        id: 'genetic_targeting',
        name: 'Genetic Targeting Matrix',
        description: 'Improves the protocell\'s ability to find targets using genetic markers, improving base speed.',
        lootType: ProteinLootType.GeneticMaterial,
        maxLevel: 20,
        cost: (level) => Math.floor(100 * Math.pow(1.4, level)),
        effect: (level) => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'speed', value: level * 2 })
    },
    {
        id: 'structural_multiplier',
        name: 'Loot Multiplier: Structural',
        description: 'Refines hunting techniques to acquire more Structural Fragments.',
        lootType: ProteinLootType.StructuralFragments,
        maxLevel: 10,
        cost: (level) => Math.floor(1000 * Math.pow(1.8, level)),
        effect: (level) => ({ type: 'INCREASE_LOOT_MULTIPLIER', value: 1 + (level * 0.1) })
    },
    {
        id: 'catalytic_multiplier',
        name: 'Loot Multiplier: Catalytic',
        description: 'Refines hunting techniques to acquire more Catalytic Enzymes.',
        lootType: ProteinLootType.CatalyticEnzymes,
        maxLevel: 10,
        cost: (level) => Math.floor(1000 * Math.pow(1.8, level)),
        effect: (level) => ({ type: 'INCREASE_LOOT_MULTIPLIER', value: 1 + (level * 0.1) })
    },
     {
        id: 'genetic_multiplier',
        name: 'Loot Multiplier: Genetic',
        description: 'Refines hunting techniques to acquire more Genetic Material.',
        lootType: ProteinLootType.GeneticMaterial,
        maxLevel: 10,
        cost: (level) => Math.floor(1000 * Math.pow(1.8, level)),
        effect: (level) => ({ type: 'INCREASE_LOOT_MULTIPLIER', value: 1 + (level * 0.1) })
    }
];


export const HUNT_RESULTS: HuntResult[] = [
  { adventure: "The protocell pursued a fleeing nutrient packet, cornering it in a microscopic crevice.", rewards: { [ProteinLootType.StructuralFragments]: 50, [ProteinLootType.CatalyticEnzymes]: 20 } },
  { adventure: "A rival protocell was spotted! Yours asserted dominance and stole its precious genetic sequences.", rewards: { [ProteinLootType.GeneticMaterial]: 30 } },
  { adventure: "The protocell stumbled upon a decaying prokaryote, scavenging its parts for raw materials.", rewards: { [ProteinLootType.StructuralFragments]: 100, [ProteinLootType.GeneticMaterial]: 10 } },
  { adventure: "It cleverly used a thermal current to drift towards a cloud of free-floating enzymes.", rewards: { [ProteinLootType.CatalyticEnzymes]: 75 } },
  { adventure: "The protocell wandered aimlessly, finding nothing of value in the vast, soupy expanse.", rewards: {} },
  { adventure: "A burst of UV radiation damaged the protocell's membrane. It returned with only what it could hold.", rewards: { [ProteinLootType.StructuralFragments]: 10 } },
];
