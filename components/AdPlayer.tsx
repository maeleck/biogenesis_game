
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './Icons';

interface AdPlayerProps {
    onComplete: () => void;
    onSkip: () => void;
}

const AdPlayer: React.FC<AdPlayerProps> = ({ onComplete, onSkip }) => {
    const adDuration = 15;
    const skipTime = 5;
    const [timeLeft, setTimeLeft] = useState(adDuration);
    const [canSkip, setCanSkip] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (adDuration - timeLeft >= skipTime) {
            setCanSkip(true);
        }
    }, [timeLeft]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]" role="dialog" aria-modal="true" aria-labelledby="ad-title">
            <div className="relative w-full max-w-2xl h-auto aspect-video bg-slate-900 border-4 border-yellow-500 rounded-2xl shadow-2xl p-4 text-white flex flex-col items-center justify-center">
                <h3 id="ad-title" className="text-2xl font-bold text-yellow-300">Sponsored Content</h3>
                <p className="text-slate-400 mt-2">Your game will resume shortly.</p>

                <div className="my-8 text-6xl font-mono animate-pulse">{timeLeft}</div>

                <div className="absolute top-2 right-2">
                    {timeLeft === 0 && (
                         <button onClick={onComplete} className="bg-slate-700 hover:bg-slate-600 p-2 rounded-full" aria-label="Close Ad">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    )}
                </div>

                <div className="absolute bottom-4 right-4">
                    {canSkip && timeLeft > 0 && (
                        <button onClick={onSkip} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs">
                            Skip Ad
                        </button>
                    )}
                </div>
                 <div className="absolute bottom-4 left-4 text-xs text-slate-500">
                    Reward granted upon completion.
                </div>
            </div>
        </div>
    );
};

export default AdPlayer;
