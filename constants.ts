
import { cosmicUpgrades } from './constants/upgrades/cosmic';
import { planetaryUpgrades } from './constants/upgrades/planetary';
import { biologicalUpgrades } from './constants/upgrades/biological';
import { type Upgrade } from './types';

// Export everything from game.ts
export * from './constants/game';
// Export everything from resources.ts
export * from './constants/resources';
// Export everything from protocell.ts
export * from './constants/protocell';
// Export everything from scenery.ts
export * from './constants/scenery';
// Export everything from manufacturing.ts
export * from './constants/manufacturing';
// Export everything from genes.ts
export * from './constants/genes';
// Export everything from enemies.ts
export * from './constants/enemies';
// Export everything from stages.ts
export * from './constants/stages';
// Export everything from knowledge.ts
export * from './constants/knowledge';

export const UPGRADES: Upgrade[] = [
    ...cosmicUpgrades,
    ...planetaryUpgrades,
    ...biologicalUpgrades,
];