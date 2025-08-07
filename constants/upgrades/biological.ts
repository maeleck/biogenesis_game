import { Upgrade } from '../../types';
import { biologicalUpgrades1 } from './biological1';
import { biologicalUpgrades2 } from './biological2';

export const biologicalUpgrades: Upgrade[] = [
  ...biologicalUpgrades1,
  ...biologicalUpgrades2,
];
