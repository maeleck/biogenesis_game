import { Resource, CraftableItem } from '../types';

export const CRAFTABLE_ITEMS: CraftableItem[] = [
    {
        id: 'auto_synth',
        name: 'Auto-Synthesizer',
        description: (level) => `A complex molecular machine that passively constructs Amino Acids from raw materials. Currently generates ${((level * 0.5).toFixed(1))} per second.`,
        cost: (level) => ([
            { resource: Resource.ATP, amount: Math.floor(10000 * Math.pow(1.5, level)) },
            { resource: Resource.Carbon, amount: Math.floor(15000 * Math.pow(1.5, level)) },
        ]),
        effects: (level) => ([
            { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: level * 0.5 }
        ]),
    },
    {
        id: 'nutrient_recycler',
        name: 'Nutrient Recycler',
        description: (level) => `An efficient bioreactor that breaks down waste products into a usable chemical broth. Currently generates ${((level * 1).toFixed(1))} Primordial Soup per second.`,
        cost: (level) => ([
            { resource: Resource.AminoAcids, amount: Math.floor(12000 * Math.pow(1.5, level)) },
            { resource: Resource.Water, amount: Math.floor(12000 * Math.pow(1.5, level)) },
        ]),
        effects: (level) => ([
            { type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: level * 1 }
        ]),
    },
    {
        id: 'geo_catalyst',
        name: 'Geothermal Catalyst',
        description: (level) => `A device that harnesses deep-earth geothermal energy to synthesize ATP. Currently generates ${((level * 2).toFixed(1))} ATP per second.`,
        cost: (level) => ([
            { resource: Resource.Rock, amount: Math.floor(20000 * Math.pow(1.6, level)) },
            { resource: Resource.Iron, amount: Math.floor(10000 * Math.pow(1.6, level)) },
        ]),
        effects: (level) => ([
            { type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: level * 2 }
        ]),
    },
    {
        id: 'protein_filter',
        name: 'Enhanced Protein Filter',
        description: (level) => `A sophisticated filter for the Protocell chamber that helps identify and capture more valuable materials during hunts. Currently increases loot gained by ${Math.floor(level * 5)}%.`,
        cost: (level) => ([
            { resource: Resource.Nucleotides, amount: Math.floor(15000 * Math.pow(1.8, level)) },
            { resource: Resource.AminoAcids, amount: Math.floor(15000 * Math.pow(1.8, level)) },
        ]),
        effects: (level) => ([
            { type: 'INCREASE_PROTOCELL_LOOT_MULTIPLIER', value: level * 0.05 }
        ]),
    },
];
