
import { Resource, CraftableItem, UniqueResource, UniqueResourceData, ProteinLootType } from '../types';

export const UNIQUE_RESOURCES: Record<UniqueResource, UniqueResourceData> = {
    [UniqueResource.SyntheticAlloy]: {
        name: UniqueResource.SyntheticAlloy,
        description: 'An advanced metallic composite, incredibly strong and light. Required for heavy-duty hardware.',
        inputs: [
            { resource: Resource.Iron, amount: 25 },
            { resource: Resource.Carbon, amount: 15 },
        ]
    },
    [UniqueResource.LogicCircuit]: {
        name: UniqueResource.LogicCircuit,
        description: 'A micro-etched silicon wafer capable of complex calculations and logical operations.',
        inputs: [
            { resource: Resource.Iron, amount: 10 },
            { resource: Resource.Water, amount: 20 },
        ]
    },
    [UniqueResource.BiopolymerGel]: {
        name: UniqueResource.BiopolymerGel,
        description: 'A versatile, self-assembling gel that serves as a scaffold for biological machinery.',
        inputs: [
            { resource: Resource.AminoAcids, amount: 50 },
            { resource: Resource.PrimordialSoup, amount: 25 },
        ]
    },
    [UniqueResource.ResonantCrystal]: {
        name: UniqueResource.ResonantCrystal,
        description: 'A perfectly formed crystal lattice capable of storing and focusing immense energy.',
        inputs: [
            { resource: Resource.Rock, amount: 30 },
            { resource: Resource.ATP, amount: 100 },
        ]
    },
};

export const CRAFTABLE_ITEMS: CraftableItem[] = [
    {
        id: 'auto_synth',
        name: 'Auto-Synthesizer',
        description: `A complex molecular machine that passively constructs Amino Acids. Generates 0.5 per second.`,
        cost: [
            { resource: UniqueResource.LogicCircuit, amount: 1 },
            { resource: UniqueResource.BiopolymerGel, amount: 1 },
        ],
        effects: [
            { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 0.5 }
        ]
    },
    {
        id: 'nutrient_recycler',
        name: 'Nutrient Recycler',
        description: `An efficient bioreactor that breaks down waste products into a usable chemical broth. Generates 1 Primordial Soup per second.`,
        cost: [
            { resource: UniqueResource.BiopolymerGel, amount: 2 },
        ],
        effects: [
            { type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }
        ]
    },
    {
        id: 'geo_catalyst',
        name: 'Geothermal Catalyst',
        description: `A device that harnesses deep-earth geothermal energy to synthesize ATP. Generates 2 ATP per second.`,
        cost: [
            { resource: UniqueResource.SyntheticAlloy, amount: 1 },
            { resource: UniqueResource.ResonantCrystal, amount: 1 },
        ],
        effects: [
            { type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 2 }
        ]
    },
    {
        id: 'protein_filter',
        name: 'Enhanced Protein Filter',
        description: `A sophisticated filter for the Protocell chamber that helps identify and capture more valuable materials during hunts. Increases all loot gained by 10%.`,
        cost: [
            { resource: UniqueResource.BiopolymerGel, amount: 1 },
            { resource: UniqueResource.LogicCircuit, amount: 1 },
        ],
        effects: [
            { type: 'INCREASE_PROTOCELL_LOOT_MULTIPLIER', value: 0.10 }
        ]
    },
    {
        id: 'cosmic_forge',
        name: 'Cosmic Forge',
        description: 'An automated forge that harnesses stellar energies to produce heavy elements. Passively generates +1 Iron/s and +2 Carbon/s.',
        cost: [
            { resource: UniqueResource.SyntheticAlloy, amount: 3 },
        ],
        effects: [
            { type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 1 },
            { type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }
        ]
    },
    {
        id: 'hydroponics_bay',
        name: 'Hydroponics Bay',
        description: 'A self-contained system for cultivating simple organisms, generating a constant supply of Water. Passively generates +5 Water/s.',
        cost: [
            { resource: UniqueResource.BiopolymerGel, amount: 2 },
            { resource: UniqueResource.ResonantCrystal, amount: 1 },
        ],
        effects: [
            { type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 5 }
        ]
    },
    {
        id: 'quantum_computer',
        name: 'Quantum Computer',
        description: 'A powerful computational device that optimizes biological processes and coordination, granting a permanent bonus to Max Hands.',
        cost: [
            { resource: UniqueResource.LogicCircuit, amount: 3 },
        ],
        effects: [
            { type: 'INCREASE_MAX_HANDS', value: 20 }
        ]
    },
    {
        id: 'graviton_stabilizer',
        name: 'Graviton Stabilizer',
        description: 'A device that manipulates localized gravity, allowing for the application of greater cosmic forces. Grants a permanent bonus to Max Force.',
        cost: [
            { resource: UniqueResource.SyntheticAlloy, amount: 3 },
            { resource: UniqueResource.ResonantCrystal, amount: 2 },
        ],
        effects: [
            { type: 'INCREASE_MAX_FORCE', value: 20 }
        ]
    },
    {
        id: 'protocell_incubator',
        name: 'Protocell Incubator',
        description: 'An advanced chamber that simulates diverse hunting environments, dramatically improving the XP gained from all hunts.',
        cost: [
            { resource: UniqueResource.BiopolymerGel, amount: 4 },
            { resource: UniqueResource.LogicCircuit, amount: 1 },
        ],
        effects: [
            { type: 'INCREASE_PROTOCELL_XP_MULTIPLIER', value: 0.25 }
        ]
    },
    {
        id: 'dna_sequencer',
        name: 'DNA Sequencer',
        description: 'An automated device that analyzes genetic material from hunts, improving the yield of Genetic Material loot.',
        cost: [
            { resource: UniqueResource.LogicCircuit, amount: 2 },
            { resource: UniqueResource.ResonantCrystal, amount: 2 },
        ],
        effects: [
            { type: 'INCREASE_LOOT_MULTIPLIER_SINGLE', lootType: ProteinLootType.GeneticMaterial, value: 0.15 }
        ]
    },
    {
        id: 'enzyme_reactor',
        name: 'Enzyme Reactor',
        description: 'A bioreactor that optimizes the harvesting of enzymes, improving the yield of Catalytic Enzymes loot.',
        cost: [
            { resource: UniqueResource.BiopolymerGel, amount: 2 },
            { resource: UniqueResource.ResonantCrystal, amount: 2 },
        ],
        effects: [
            { type: 'INCREASE_LOOT_MULTIPLIER_SINGLE', lootType: ProteinLootType.CatalyticEnzymes, value: 0.15 }
        ]
    },
    {
        id: 'structural_assembler',
        name: 'Structural Assembler',
        description: 'A nano-assembler that perfects the extraction of structural components, improving the yield of Structural Fragments loot.',
        cost: [
            { resource: UniqueResource.BiopolymerGel, amount: 2 },
            { resource: UniqueResource.SyntheticAlloy, amount: 2 },
        ],
        effects: [
            { type: 'INCREASE_LOOT_MULTIPLIER_SINGLE', lootType: ProteinLootType.StructuralFragments, value: 0.15 }
        ]
    }
];