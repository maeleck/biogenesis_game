
import React from 'react';
import { TestState, Resource } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';
import { TEST_REWARD_STARDUST_CAP_PERCENTAGE, TEST_REWARD_GENERATION_SECONDS } from '../constants';
import ResourceDisplay from './ResourceDisplay';
import Spinner from './Spinner';

interface TestPanelProps {
  testState: TestState;
  onGenerateQuestion: () => void;
  onAnswerQuestion: (selectedIndex: number) => void;
  availableQuestionCount: number;
  baseGeneration: Partial<Record<Resource, number>>;
  stardustCapacity: number;
}

const TestPanel: React.FC<TestPanelProps> = ({ testState, onGenerateQuestion, onAnswerQuestion, availableQuestionCount, baseGeneration, stardustCapacity }) => {
  const { currentQuestion, lastAnswerStatus } = testState;

  const stardustReward = Math.floor(stardustCapacity * TEST_REWARD_STARDUST_CAP_PERCENTAGE);
  const hasRewards = Object.values(baseGeneration).some(val => val > 0);

  return (
    <div className="p-1">
      <h3 className="text-base md:text-lg font-bold text-teal-300 mb-2">Knowledge</h3>
      <p className="text-[11px] md:text-xs text-gray-400 mb-4">
        Answer questions based on your unlocked scientific facts to earn rewards. You have unlocked {availableQuestionCount} questions.
      </p>

      {!currentQuestion && lastAnswerStatus === 'unanswered' && (
        <button
          onClick={onGenerateQuestion}
          disabled={availableQuestionCount === 0}
          className="w-full px-4 py-2 md:px-6 md:py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-sm md:text-base disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {availableQuestionCount > 0 ? 'Test Your Knowledge' : 'Unlock More Facts'}
        </button>
      )}

      {currentQuestion && (
        <div className="bg-gray-800/70 p-3 md:p-4 rounded-lg border border-gray-700 space-y-3 md:space-y-4">
          <p className="font-semibold text-cyan-200 text-xs md:text-sm">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 gap-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerQuestion(index)}
                disabled={lastAnswerStatus !== 'unanswered'}
                className="w-full text-left p-2 md:p-2.5 text-xs md:text-sm bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {lastAnswerStatus !== 'unanswered' && (
        <div className="mt-4 p-3 md:p-4 rounded-lg bg-gray-800/70 border border-gray-700 text-center">
          {lastAnswerStatus === 'correct' && (
            <div className="flex flex-col items-center text-green-400">
              <CheckCircleIcon className="w-8 h-8 md:w-10 md:h-10" />
              <p className="text-base md:text-lg font-bold mt-2">Correct!</p>
              <div className="mt-4 text-left w-full space-y-2 text-[11px] md:text-xs">
                 <p className="font-semibold text-gray-300">Rewards Earned:</p>
                 <div className="p-2 bg-gray-900/50 rounded-md">
                     <span className="font-mono text-cyan-300">+ {stardustReward.toLocaleString()}</span> Stardust
                 </div>
                 {hasRewards && (
                    <div className="p-2 bg-gray-900/50 rounded-md">
                        <span className="font-mono text-cyan-300">+ {TEST_REWARD_GENERATION_SECONDS} seconds</span> of all passive resource generation.
                    </div>
                 )}
              </div>
            </div>
          )}
          {lastAnswerStatus === 'incorrect' && (
            <div className="flex flex-col items-center text-red-400">
              <XCircleIcon className="w-8 h-8 md:w-10 md:h-10" />
              <p className="text-base md:text-lg font-bold mt-2">Incorrect</p>
              <p className="text-[11px] md:text-xs text-gray-400 mt-1">Better luck next time. Study the facts to improve!</p>
            </div>
          )}
           <button
                onClick={onGenerateQuestion}
                disabled={availableQuestionCount === 0}
                className="mt-6 w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-xs md:text-sm disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
                {availableQuestionCount > 0 ? 'Next Question' : 'No More Questions'}
            </button>
        </div>
      )}
    </div>
  );
};

export default TestPanel;