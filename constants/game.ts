

import { Resource, ProteinLootState, ProtocellState, TestState } from '../types';
import { INITIAL_RESOURCES, INITIAL_PROTEIN_LOOT, INITIAL_PROTOCELL_TRAINING_LEVELS } from './protocell';
import { INITIAL_WORKERS, INITIAL_MAX_FORCE, INITIAL_MAX_HANDS } from './resources';

export const TICK_RATE_MS = 1000; // Game loop runs every second
export const INITIAL_STARDUST_CAPACITY = 300;
export const TEST_REWARD_STARDUST_CAP_PERCENTAGE = 0.03; // 3% of stardust capacity
export const TEST_REWARD_GENERATION_SECONDS = 3;
export const BASE_STARDUST_GENERATION = 0;

export const BASE_RESOURCE_CAPACITIES: Partial<Record<Resource, number>> = {
    [Resource.Hydrogen]: 1000,
    [Resource.Carbon]: 1000,
    [Resource.Iron]: 1000,
    [Resource.Rock]: 1000,
    [Resource.Water]: 1000,
    [Resource.PrimordialSoup]: 1000,
    [Resource.AminoAcids]: 1000,
    [Resource.Nucleotides]: 1000,
    [Resource.ATP]: 1000,
};

export const INITIAL_SAVE_DATA = {
    resources: INITIAL_RESOURCES,
    proteinLoot: INITIAL_PROTEIN_LOOT,
    universalStorageLevel: 1,
    stardustGenerationMultiplier: 1,
    assignedWorkers: INITIAL_WORKERS,
    maxForce: INITIAL_MAX_FORCE,
    maxHands: INITIAL_MAX_HANDS,
    purchasedUpgrades: ['cosmic_origins'],
    purchasedSubUpgrades: new Set<string>(),
    subUpgradeLevels: {},
    unlockedFeatures: new Set<string>(['test']),
    unlockedKnobs: new Set<string>(),
    protocellTrainingLevels: INITIAL_PROTOCELL_TRAINING_LEVELS,
    protocellBaseBonuses: { speed: 0, efficiency: 0, resilience: 0 },
    chamberUpgradeLevels: {},
    testState: { currentQuestion: null, lastAnswerStatus: 'unanswered' } as TestState,
};