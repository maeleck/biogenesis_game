
import React, { useMemo, useState, useEffect, useRef } from 'react';

// A simple, stylized 2D DNA spiral component.
const DNASpiralIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0C4 10 20 10 20 20S4 30 4 40s16 10 16 20-16 10-16 20 16 10 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 0C20 10 4 10 4 20s16 10 16 20-16 10-16 20 16 10 16 20-16 10-16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="6" y1="30" x2="18" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="40" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="6" y1="50" x2="18" y2="50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="60" x2="20" y2="60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="6" y1="70" x2="18" y2="70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="80" x2="20" y2="80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="6" y1="90" x2="18" y2="90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const QUOTES = [
  "Nothing in biology makes sense except in the light of evolution.",
  "It is not the strongest of the species that survives, but the most adaptable to change.",
  "Somewhere, something incredible is waiting to be known.",
  "The good thing about science is that it's true whether or not you believe in it.",
  "We are a way for the cosmos to know itself.",
  "Life will not be contained. Life breaks free.",
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';


interface TitleScreenProps {
  onStartGame: () => void;
}

const TitleScreen: React.FC<TitleScreenProps> = ({ onStartGame }) => {
  const [dynamicQuote, setDynamicQuote] = useState('');
  const quoteIndexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;
    let revealProgress = 0;
    let state: 'scrambling' | 'revealing' | 'pausing' = 'scrambling';
    
    const animate = () => {
      const currentQuote = QUOTES[quoteIndexRef.current];
      
      frame++;

      if (state === 'scrambling') {
        if (frame % 3 === 0) { // Update text less frequently than every frame
          const scrambled = Array.from({ length: currentQuote.length }, () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]).join('');
          setDynamicQuote(scrambled);
        }
        if (frame >= 120) { // Approx 2 seconds at 60fps
          frame = 0;
          state = 'revealing';
        }
      } else if (state === 'revealing') {
        // Reveal one character every 2 frames
        if (frame % 2 === 0 && revealProgress < currentQuote.length) {
            revealProgress++;
        }
        const revealedPart = currentQuote.substring(0, revealProgress);
        const scramblePart = Array.from({ length: currentQuote.length - revealProgress }, () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]).join('');
        setDynamicQuote(revealedPart + scramblePart);

        if (revealProgress >= currentQuote.length) {
            frame = 0;
            state = 'pausing';
            setDynamicQuote(currentQuote); // Set the final, clean quote
        }
      } else if (state === 'pausing') {
        if (frame >= 240) { // Approx 4 seconds pause
            frame = 0;
            revealProgress = 0;
            state = 'scrambling';
            quoteIndexRef.current = (quoteIndexRef.current + 1) % QUOTES.length;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize with the length of the first quote
    setDynamicQuote(Array.from({ length: QUOTES[0].length }, () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]).join(''));
    animate();

    return () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };
  }, []);

  const dnaParticles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 0.6 + 0.2, // scale from 0.2 to 0.8
      duration: Math.random() * 20 + 20, // duration from 20s to 40s
      delay: `-${Math.random() * 20}s`, // random start point in animation
      direction: Math.random() > 0.5 ? 'normal' : 'reverse',
    }));
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-800 to-slate-900"></div>
      
      {/* Animated DNA background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {dnaParticles.map(p => (
          <div
            key={p.id}
            className="absolute"
            style={{
              animation: `dna-rotate ${p.duration}s linear infinite ${p.direction}`,
              animationDelay: p.delay,
              left: p.left,
              top: p.top,
            }}
          >
            <div style={{ transform: `scale(${p.scale})` }}>
              <DNASpiralIcon className="w-12 h-48 text-purple-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold text-yellow-300 tracking-wider" style={{ textShadow: '0 0 15px rgba(252, 211, 77, 0.4)' }}>
          Boop-Genesis
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-200/80">An Incremental Game of Cosmic Creation</p>
        
        <p className="mt-8 text-sm md:text-base text-slate-300/70 font-mono h-12 flex items-center justify-center px-4 w-full max-w-4xl mx-auto text-center">
          {dynamicQuote}
        </p>

        <button
          onClick={onStartGame}
          className="mt-8 px-10 py-4 bg-yellow-500/80 text-slate-900 font-bold text-lg rounded-2xl border-2 border-yellow-400
                     hover:bg-yellow-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30
                     transition-all duration-300 ease-in-out
                     animate-pulse-slow"
          aria-label="Start Game"
        >
          Begin Genesis
        </button>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        @keyframes pulse-slow {
          50% {
            box-shadow: 0 0 20px rgba(252, 211, 77, 0.5);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        @keyframes dna-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TitleScreen;