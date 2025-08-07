import React from 'react';
import { Quiz } from '../types';
import { XP_TO_NEXT_KNOWLEDGE_LEVEL, getKnowledgeRank, KNOWLEDGE_BONUS_PER_LEVEL } from '../constants';
import { LightningBoltIcon, BookOpenIcon, SparklesIcon } from './Icons';
import Spinner from './Spinner';

interface RushPanelProps {
    knowledgeLevel: number;
    knowledgeXP: number;
    rushState: {
        status: 'idle' | 'active' | 'results';
        timer: number;
        score: number;
        currentQuestion: (Quiz & { factId: string }) | null;
    };
    lastRushResult: { score: number; xpGained: number; startLevel: number; endLevel: number } | null;
    onStartRush: () => void;
    onAnswerRushQuestion: (selectedIndex: number) => void;
    availableQuestionCount: number;
    knowledgeBonusMultiplier: number;
}

const RushPanel: React.FC<RushPanelProps> = ({ 
    knowledgeLevel, knowledgeXP, rushState, lastRushResult, 
    onStartRush, onAnswerRushQuestion, availableQuestionCount, knowledgeBonusMultiplier 
}) => {
    
    const xpForNextLevel = XP_TO_NEXT_KNOWLEDGE_LEVEL(knowledgeLevel);
    const xpProgress = (knowledgeXP / xpForNextLevel) * 100;

    const renderIdleOrResults = () => (
        <div className="flex flex-col items-center text-center p-2">
            <div className="w-full bg-slate-800/70 p-4 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex items-center gap-3">
                    <BookOpenIcon className="w-8 h-8 text-yellow-300 flex-shrink-0" />
                    <div>
                        <h3 className="text-lg font-bold text-yellow-300 text-left">Knowledge Rank</h3>
                        <p className="text-2xl font-bold text-slate-100 text-left">{getKnowledgeRank(knowledgeLevel)}</p>
                    </div>
                </div>
                
                <div>
                    <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-yellow-300">Level {knowledgeLevel}</span>
                        <span className="text-xs text-slate-300 font-mono">{Math.floor(knowledgeXP).toLocaleString()} / {xpForNextLevel.toLocaleString()} XP</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 mt-2">
                        <div className="bg-yellow-400 h-2.5 rounded-full" style={{width: `${xpProgress}%`}}></div>
                    </div>
                </div>

                <div className="text-sm text-emerald-300">
                    <p>Passive Generation Bonus: <span className="font-bold text-white">+{(knowledgeBonusMultiplier * 100 - 100).toFixed(0)}%</span></p>
                </div>
            </div>

            {lastRushResult && (
                <div className="mt-4 w-full bg-slate-800/70 p-4 rounded-2xl border border-purple-600 space-y-3 animate-fade-in">
                    <h4 className="font-bold text-purple-300 text-lg">Last Rush Results</h4>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Final Score:</span> <span className="font-bold text-white">{lastRushResult.score}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">XP Gained:</span> <span className="font-bold text-yellow-300">+{lastRushResult.xpGained.toLocaleString()}</span></div>
                    {lastRushResult.endLevel > lastRushResult.startLevel && (
                        <div className="text-center p-2 bg-yellow-400/20 rounded-lg">
                            <p className="font-bold text-yellow-200 flex items-center justify-center gap-2">
                                <SparklesIcon className="w-5 h-5"/>
                                LEVEL UP!
                            </p>
                            <p className="text-sm text-slate-200">{getKnowledgeRank(lastRushResult.startLevel)} &rarr; {getKnowledgeRank(lastRushResult.endLevel)}</p>
                        </div>
                    )}
                </div>
            )}
            
            <button
                onClick={onStartRush}
                disabled={availableQuestionCount === 0}
                className="mt-6 w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-sm md:text-base disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                <LightningBoltIcon className="w-5 h-5" />
                {availableQuestionCount > 0 ? (lastRushResult ? 'Rush Again' : 'Start Rush!') : 'Unlock More Questions'}
            </button>
        </div>
    );

    const renderActive = () => (
        <div className="p-1">
            <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-t-xl">
                <div className="text-lg font-bold text-rose-400 font-mono">Time: {rushState.timer}s</div>
                <div className="text-lg font-bold text-yellow-300 font-mono">Score: {rushState.score}</div>
            </div>
             {rushState.currentQuestion && (
                <div className="bg-slate-800/70 p-3 md:p-4 rounded-b-2xl border-x border-b border-slate-700 space-y-3 md:space-y-4">
                    <p className="font-semibold text-yellow-200 text-xs md:text-sm h-16 flex items-center justify-center text-center">{rushState.currentQuestion.question}</p>
                    <div className="grid grid-cols-1 gap-2">
                        {rushState.currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onAnswerRushQuestion(index)}
                            className="w-full text-left p-2 md:p-2.5 text-xs md:text-sm bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            {option}
                        </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="p-3 md:p-4 w-full h-full">
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-purple-300">Knowledge Rush</h2>
            <p className="text-xs md:text-sm text-slate-400 mb-4">
                Answer as many questions as you can in 30 seconds to earn XP and level up your knowledge.
            </p>
            {rushState.status === 'active' ? renderActive() : renderIdleOrResults()}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default RushPanel;
