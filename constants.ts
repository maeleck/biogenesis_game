
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

export const UPGRADES: Upgrade[] = [
    ...cosmicUpgrades,
    ...planetaryUpgrades,
    ...biologicalUpgrades,
];