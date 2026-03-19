import { LevelData } from './types';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 450;
export const GRAVITY = 0.6;
export const JUMP_FORCE = -13;
export const MOVE_SPEED = 4.5;
export const PLAYER_SIZE = 32;
export const ENEMY_SIZE = 30;
export const INITIAL_LIVES = 3;

export const LEVELS: LevelData[] = [
  {
    platforms: [
      { x: 0, y: 400, width: 800, height: 50, color: '#3f6212' },
      { x: 900, y: 400, width: 1000, height: 50, color: '#3f6212' },
      { x: 200, y: 300, width: 150, height: 20, color: '#166534' },
      { x: 500, y: 220, width: 150, height: 20, color: '#166534' },
      { x: 1000, y: 300, width: 200, height: 20, color: '#166534' },
      { x: 1300, y: 200, width: 150, height: 20, color: '#166534' },
    ],
    coins: [{ x: 250, y: 260 }, { x: 550, y: 180 }, { x: 1100, y: 260 }, { x: 1400, y: 160 }],
    enemies: [{ x: 1000, y: 370, range: 400 }],
    hearts: [{ x: 1350, y: 160 }],
    flag: { x: 1800, y: 300 },
  },
  {
    platforms: [
      { x: 0, y: 400, width: 500, height: 50, color: '#3f6212' },
      { x: 600, y: 350, width: 400, height: 50, color: '#3f6212' },
      { x: 1100, y: 300, width: 500, height: 50, color: '#3f6212' },
      { x: 1700, y: 400, width: 800, height: 50, color: '#3f6212' },
      { x: 300, y: 250, width: 100, height: 20, color: '#166534' },
      { x: 750, y: 200, width: 100, height: 20, color: '#166534' },
      { x: 1200, y: 150, width: 100, height: 20, color: '#166534' },
      { x: 1500, y: 220, width: 100, height: 20, color: '#166534' },
    ],
    coins: [{ x: 320, y: 210 }, { x: 780, y: 160 }, { x: 1230, y: 110 }],
    enemies: [{ x: 1200, y: 270, range: 300 }, { x: 1800, y: 370, range: 400 }],
    hearts: [{ x: 1520, y: 180 }],
    flag: { x: 2400, y: 300 },
  },
  {
    platforms: [
      { x: 0, y: 400, width: 400, height: 50, color: '#3f6212' },
      { x: 500, y: 300, width: 300, height: 20, color: '#166534' },
      { x: 900, y: 200, width: 300, height: 20, color: '#166534' },
      { x: 1300, y: 300, width: 300, height: 20, color: '#166534' },
      { x: 1700, y: 400, width: 800, height: 50, color: '#3f6212' },
      { x: 2100, y: 250, width: 150, height: 20, color: '#166534' },
    ],
    coins: [{ x: 600, y: 260 }, { x: 1000, y: 160 }, { x: 1400, y: 260 }],
    enemies: [{ x: 1800, y: 370, range: 300 }, { x: 2000, y: 370, range: 300 }],
    hearts: [{ x: 2150, y: 210 }],
    flag: { x: 2400, y: 300 },
  },
  {
    platforms: [
      { x: 0, y: 400, width: 3000, height: 50, color: '#4a3728' },
      { x: 300, y: 300, width: 150, height: 20, color: '#166534' },
      { x: 600, y: 200, width: 150, height: 20, color: '#166534' },
      { x: 900, y: 300, width: 150, height: 20, color: '#166534' },
      { x: 1200, y: 200, width: 150, height: 20, color: '#166534' },
      { x: 1500, y: 300, width: 150, height: 20, color: '#166534' },
      { x: 1800, y: 200, width: 150, height: 20, color: '#166534' },
    ],
    coins: [{ x: 350, y: 260 }, { x: 650, y: 160 }, { x: 950, y: 260 }, { x: 1250, y: 160 }],
    enemies: [{ x: 500, y: 370, range: 600 }, { x: 1200, y: 370, range: 600 }, { x: 2000, y: 370, range: 600 }],
    hearts: [{ x: 1850, y: 160 }],
    flag: { x: 2900, y: 300 },
  },
  {
    platforms: [
      { x: 0, y: 400, width: 700, height: 50, color: '#3f6212' },
      { x: 850, y: 400, width: 700, height: 50, color: '#3f6212' },
      { x: 1700, y: 400, width: 1000, height: 50, color: '#3f6212' },
      { x: 400, y: 250, width: 150, height: 20, color: '#166534' },
      { x: 1100, y: 250, width: 150, height: 20, color: '#166534' },
      { x: 1900, y: 250, width: 150, height: 20, color: '#166534' },
    ],
    coins: [{ x: 450, y: 210 }, { x: 1150, y: 210 }, { x: 1950, y: 210 }],
    enemies: [{ x: 200, y: 370, range: 400 }, { x: 1000, y: 370, range: 400 }, { x: 1800, y: 370, range: 500 }],
    hearts: [{ x: 1950, y: 210 }],
    flag: { x: 2600, y: 300 },
  },
  {
    platforms: [
      { x: 0, y: 400, width: 3500, height: 50, color: '#1e293b' },
      { x: 300, y: 320, width: 100, height: 20, color: '#334155' },
      { x: 600, y: 240, width: 100, height: 20, color: '#334155' },
      { x: 900, y: 160, width: 100, height: 20, color: '#334155' },
      { x: 1200, y: 240, width: 100, height: 20, color: '#334155' },
      { x: 1500, y: 320, width: 100, height: 20, color: '#334155' },
      { x: 1800, y: 240, width: 100, height: 20, color: '#334155' },
      { x: 2100, y: 160, width: 100, height: 20, color: '#334155' },
    ],
    coins: [{ x: 330, y: 280 }, { x: 630, y: 200 }, { x: 930, y: 120 }, { x: 1830, y: 200 }],
    enemies: [{ x: 500, y: 370, range: 1200 }, { x: 1800, y: 370, range: 800 }, { x: 2500, y: 370, range: 600 }],
    hearts: [{ x: 2130, y: 120 }],
    flag: { x: 3400, y: 300 },
  },
];
