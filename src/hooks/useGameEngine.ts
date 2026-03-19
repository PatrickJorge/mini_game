import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameState, Player, Enemy, Particle } from '../types';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  PLAYER_SIZE, 
  ENEMY_SIZE, 
  INITIAL_LIVES, 
  LEVELS 
} from '../constants';
import { updateGame } from '../utils/physics';
import { drawFrame } from '../utils/renderer';

export const useGameEngine = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  gameState: GameState,
  currentLevel: number,
  setGameState: (state: GameState) => void,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setLives: React.Dispatch<React.SetStateAction<number>>,
  setCurrentLevel: (level: number) => void
) => {
  const cameraX = useRef(0);

  const player = useRef<Player>({
    x: 50, y: 300, width: PLAYER_SIZE, height: PLAYER_SIZE,
    vx: 0, vy: 0, isGrounded: false, score: 0, animFrame: 0, facing: 'right',
    invulnerable: 0, lives: INITIAL_LIVES
  });
  const enemies = useRef<Enemy[]>([]);
  const coins = useRef<{ x: number; y: number; collected: boolean }[]>([]);
  const hearts = useRef<{ x: number; y: number; collected: boolean }[]>([]);
  const particles = useRef<Particle[]>([]);
  const keys = useRef<{ [key: string]: boolean }>({});
  const clouds = useRef<{ x: number; y: number; speed: number; size: number }[]>([]);

  const spawnParticles = useCallback((x: number, y: number, color: string, count = 8) => {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        x, y, width: 4, height: 4,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        life: 1, color
      });
    }
  }, []);

  const initLevel = useCallback((levelIdx: number, resetStats = false) => {
    const data = LEVELS[levelIdx];
    player.current.x = 50;
    player.current.y = 300;
    player.current.vx = 0;
    player.current.vy = 0;
    player.current.invulnerable = 0;
    
    if (resetStats) {
      setLives(INITIAL_LIVES);
      setScore(0);
      setCurrentLevel(0);
    }

    enemies.current = data.enemies.map(e => ({
      x: e.x, y: e.y, width: ENEMY_SIZE, height: ENEMY_SIZE,
      vx: 1.5, vy: 0, type: 'patrol', range: e.range, startX: e.x, speed: 1.5,
      isDead: false, deathTimer: 0
    }));

    coins.current = data.coins.map(c => ({ ...c, collected: false }));
    hearts.current = data.hearts.map(h => ({ ...h, collected: false }));
    particles.current = [];
    
    if (clouds.current.length === 0) {
      clouds.current = Array.from({ length: 15 }, () => ({
        x: Math.random() * 3000,
        y: Math.random() * 250,
        speed: 0.1 + Math.random() * 0.4,
        size: 50 + Math.random() * 80
      }));
    }

    cameraX.current = 0;
    setGameState('playing');
  }, [setLives, setScore, setCurrentLevel, setGameState]);

  const handleDeath = useCallback(() => {
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameState('game_over');
        return 0;
      }
      initLevel(currentLevel);
      player.current.invulnerable = 90;
      return newLives;
    });
    spawnParticles(player.current.x, player.current.y, '#ef4444', 25);
  }, [currentLevel, initLevel, setGameState, setLives, spawnParticles]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => keys.current[e.code] = true;
    const onKeyUp = (e: KeyboardEvent) => keys.current[e.code] = false;
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    let frameId: number;
    const ctx = canvasRef.current?.getContext('2d');

    const loop = () => {
      if (!ctx) return;

      updateGame({
        player: player.current,
        enemies: enemies.current,
        coins: coins.current,
        hearts: hearts.current,
        particles: particles.current,
        clouds: clouds.current,
        keys: keys.current,
        currentLevel,
        initialLives: INITIAL_LIVES,
        onScoreChange: (s) => setScore(prev => prev + s),
        onLivesChange: (l) => setLives(prev => Math.min(INITIAL_LIVES, prev + l)),
        onGameStateChange: setGameState,
        onDeath: handleDeath,
        spawnParticles
      });

      // Camera
      const targetX = Math.max(0, player.current.x - CANVAS_WIDTH / 2.5);
      cameraX.current += (targetX - cameraX.current) * 0.1;

      drawFrame({
        ctx,
        cameraX: cameraX.current,
        currentLevel,
        player: player.current,
        enemies: enemies.current,
        coins: coins.current,
        hearts: hearts.current,
        particles: particles.current,
        clouds: clouds.current
      });

      frameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(frameId);
  }, [gameState, currentLevel, canvasRef, handleDeath, setGameState, setLives, setScore, spawnParticles]);

  return { initLevel };
};
