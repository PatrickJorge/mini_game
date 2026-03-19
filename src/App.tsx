/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { HUD } from './components/HUD';
import { UIOverlay } from './components/UIOverlay';
import { GameState } from './types';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  INITIAL_LIVES, 
  LEVELS 
} from './constants';
import { useGameEngine } from './hooks/useGameEngine';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);

  const { initLevel } = useGameEngine(
    canvasRef,
    gameState,
    currentLevel,
    setGameState,
    setScore,
    setLives,
    setCurrentLevel
  );

  const nextLevel = () => {
    const next = currentLevel + 1;
    setCurrentLevel(next);
    initLevel(next);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-slate-100">
      <div className="max-w-4xl w-full space-y-4">
        <HUD currentLevel={currentLevel} lives={lives} score={score} />

        <div className="relative aspect-[16/9] w-full bg-slate-900 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl">
          <canvas 
            ref={canvasRef} 
            width={CANVAS_WIDTH} 
            height={CANVAS_HEIGHT} 
            className="w-full h-full object-contain" 
          />

          <UIOverlay 
            gameState={gameState}
            score={score}
            onStart={() => initLevel(0)}
            onNextLevel={nextLevel}
            onRestart={() => initLevel(0, true)}
          />
        </div>

        <div className="flex justify-center gap-8 text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">
          <span>Arrows / WASD: Move</span>
          <span>Space / Up: Jump</span>
          <span>Stomp enemies to defeat them</span>
        </div>
      </div>
    </div>
  );
}
