import React from 'react';
import { Heart } from 'lucide-react';
import { LEVELS, INITIAL_LIVES } from '../constants';

interface HUDProps {
  currentLevel: number;
  lives: number;
  score: number;
}

export const HUD: React.FC<HUDProps> = ({ currentLevel, lives, score }) => {
  return (
    <div className="flex justify-between items-center bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
      <div className="flex gap-6">
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Level</div>
          <div className="text-xl font-black text-emerald-400">{currentLevel + 1} / {LEVELS.length}</div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Lives</div>
          <div className="flex gap-1">
            {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
              <Heart 
                key={i} 
                className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-700'}`} 
              />
            ))}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Score</div>
        <div className="text-2xl font-mono font-black text-yellow-400">{score.toString().padStart(6, '0')}</div>
      </div>
    </div>
  );
};
