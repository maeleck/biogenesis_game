import { HuntStage } from '../types';

export const HUNT_STAGES: HuntStage[] = [
    {
        id: 'primordial_shallows',
        name: 'Primordial Shallows',
        description: 'A relatively safe hunting ground teeming with basic microorganisms. Good for early training.',
        levelRequirement: 1,
        enemyIds: ['bacteriophage_t4', 'bacillus_subtilis']
    },
    {
        id: 'hydrothermal_vents',
        name: 'Hydrothermal Vents',
        description: 'A more dangerous area with aggressive microbes thriving in the chemical-rich waters.',
        levelRequirement: 5,
        enemyIds: ['bacillus_subtilis', 'streptococcus_pyogenes', 'influenza_virus']
    },
    {
        id: 'eukaryotic_bloom',
        name: 'Eukaryotic Bloom',
        description: 'A zone where more complex cells are beginning to compete, attracting tougher predators.',
        levelRequirement: 10,
        enemyIds: ['streptococcus_pyogenes', 'influenza_virus', 'escherichia_coli']
    },
    {
        id: 'viral_hotspot',
        name: 'Viral Hotspot',
        description: 'An extremely hazardous region where deadly and sophisticated viruses are rampant. High risk, high reward.',
        levelRequirement: 20,
        enemyIds: ['escherichia_coli', 'hiv_retrovirus']
    },
    {
        id: 'tidal_flats',
        name: 'Tidal Flats',
        description: 'An environment with constantly changing conditions, inhabited by versatile and opportunistic organisms.',
        levelRequirement: 25,
        enemyIds: ['escherichia_coli', 'amoeba_proteus', 'c_elegans']
    },
    {
        id: 'deep_sea_floor',
        name: 'Deep Sea Floor',
        description: 'The crushing pressure and darkness of the abyss are home to resilient and strange lifeforms.',
        levelRequirement: 30,
        enemyIds: ['c_elegans', 'tardigrade']
    },
    {
        id: 'cryo_volcanic_field',
        name: 'Cryo-Volcanic Field',
        description: 'A bizarre landscape of ice and volcanic activity, where only the most durable extremophiles can survive.',
        levelRequirement: 35,
        enemyIds: ['tardigrade', 'bacillus_subtilis', 'd_radiodurans']
    },
    {
        id: 'irradiated_zone',
        name: 'Irradiated Zone',
        description: 'A highly radioactive area where genetic integrity is a constant battle. The organisms here are masters of DNA repair.',
        levelRequirement: 40,
        enemyIds: ['hiv_retrovirus', 'd_radiodurans']
    }
];
