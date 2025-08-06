import { Enemy, ProteinLootType } from '../types';

export const ENEMIES: Enemy[] = [
    // Stage 1
    {
        id: 'bacteriophage_t4',
        name: 'Bacteriophage T4',
        icon: 'bacteriophage',
        description: 'A virus that infects and replicates within bacteria. It has a complex structure that resembles a lunar lander.',
        stats: { hp: 30, attack: 15, speed: 20 },
        rewards: {
            xp: 15,
            loot: { [ProteinLootType.GeneticMaterial]: [5, 10] },
            geneCardDropChance: 0.02, // 2% chance
        }
    },
    {
        id: 'bacillus_subtilis',
        name: 'Bacillus subtilis',
        icon: 'bacterium',
        description: 'A common, harmless bacterium found in soil. It is known for its ability to form a tough, protective endospore, allowing it to tolerate extreme environmental conditions.',
        stats: { hp: 50, attack: 10, speed: 10 },
        rewards: {
            xp: 20,
            loot: { [ProteinLootType.StructuralFragments]: [10, 20], [ProteinLootType.CatalyticEnzymes]: [5, 10] },
            geneCardDropChance: 0.01,
        }
    },
    // Stage 2
    {
        id: 'streptococcus_pyogenes',
        name: 'Streptococcus pyogenes',
        icon: 'bacterium_strep',
        description: 'A species of Gram-positive bacteria. These bacteria are aerotolerant and an extracellular bacterium, made up of non-motile and non-sporing cocci.',
        stats: { hp: 80, attack: 20, speed: 15 },
        rewards: {
            xp: 35,
            loot: { [ProteinLootType.CatalyticEnzymes]: [15, 25], [ProteinLootType.GeneticMaterial]: [10, 15] },
            geneCardDropChance: 0.03,
        }
    },
     {
        id: 'influenza_virus',
        name: 'Influenza Virus',
        icon: 'virus_influenza',
        description: 'A spherical virus that causes the flu. It has an RNA genome and is known for its high rate of mutation.',
        stats: { hp: 40, attack: 25, speed: 25 },
        rewards: {
            xp: 30,
            loot: { [ProteinLootType.GeneticMaterial]: [20, 30] },
            geneCardDropChance: 0.05,
        }
    },
    // Stage 3 & 4
    {
        id: 'escherichia_coli',
        name: 'Escherichia coli',
        icon: 'bacterium_ecoli',
        description: 'A versatile bacterium commonly found in the lower intestine of warm-blooded organisms. Most E. coli strains are harmless, but some can cause serious food poisoning.',
        stats: { hp: 120, attack: 30, speed: 20 },
        rewards: {
            xp: 50,
            loot: { [ProteinLootType.StructuralFragments]: [25, 40], [ProteinLootType.CatalyticEnzymes]: [20, 30] },
            geneCardDropChance: 0.04,
        }
    },
    {
        id: 'hiv_retrovirus',
        name: 'HIV Retrovirus',
        icon: 'virus_hiv',
        description: 'A retrovirus that primarily infects vital cells in the human immune system such as helper T cells. It uses reverse transcriptase to copy its RNA genome into the host\'s DNA.',
        stats: { hp: 100, attack: 40, speed: 35 },
        rewards: {
            xp: 80,
            loot: { [ProteinLootType.GeneticMaterial]: [50, 75] },
            geneCardDropChance: 0.10, // Higher chance for a rarer enemy
        }
    }
];
