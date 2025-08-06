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
    }
];
