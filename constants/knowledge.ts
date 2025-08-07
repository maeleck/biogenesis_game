export const RUSH_DURATION_SECONDS = 30;
export const XP_TO_NEXT_KNOWLEDGE_LEVEL = (level: number): number => Math.floor(50 * Math.pow(1.3, level - 1));
export const KNOWLEDGE_XP_PER_CORRECT_ANSWER = 15;
export const KNOWLEDGE_BONUS_PER_LEVEL = 0.01; // 1% universal passive generation bonus

export const KNOWLEDGE_RANK_TITLES: string[] = [
    'Novice', // Lvl 1
    'Apprentice', // 2
    'Initiate', // 3
    'Journeyman', // 4
    'Adept', // 5
    'Scholar', // 6
    'Scribe', // 7
    'Theorist', // 8
    'Philosopher', // 9
    'Sage', // 10
    'Loremaster', // 11-15
    'Progenitor', // 16-20
    'Architect', // 21-25
    'Demiurge', // 26-30
    'Cosmic Mind' // 31+
];

export const getKnowledgeRank = (level: number): string => {
    if (level <= 10) return KNOWLEDGE_RANK_TITLES[level - 1] || 'Novice';
    if (level <= 15) return KNOWLEDGE_RANK_TITLES[10];
    if (level <= 20) return KNOWLEDGE_RANK_TITLES[11];
    if (level <= 25) return KNOWLEDGE_RANK_TITLES[12];
    if (level <= 30) return KNOWLEDGE_RANK_TITLES[13];
    return KNOWLEDGE_RANK_TITLES[14];
};
