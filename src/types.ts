export type GameState = 'start' | 'playing' | 'level_complete' | 'game_over' | 'victory';

export interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MovingEntity extends Entity {
  vx: number;
  vy: number;
}

export interface Player extends MovingEntity {
  isGrounded: boolean;
  lives: number;
  score: number;
  animFrame: number;
  facing: 'left' | 'right';
  invulnerable: number;
}

export interface Enemy extends MovingEntity {
  type: 'patrol';
  range: number;
  startX: number;
  speed: number;
  isDead: boolean;
  deathTimer: number;
}

export interface Particle extends MovingEntity {
  life: number;
  color: string;
}

export interface LevelData {
  platforms: { x: number; y: number; width: number; height: number; color: string }[];
  coins: { x: number; y: number }[];
  enemies: { x: number; y: number; range: number }[];
  hearts: { x: number; y: number }[];
  flag: { x: number; y: number };
}
