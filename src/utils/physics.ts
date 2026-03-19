import { 
  CANVAS_HEIGHT, 
  GRAVITY, 
  JUMP_FORCE, 
  MOVE_SPEED, 
  LEVELS 
} from '../constants';
import { Player, Enemy, Particle, GameState } from '../types';

interface UpdateParams {
  player: Player;
  enemies: Enemy[];
  coins: { x: number; y: number; collected: boolean }[];
  hearts: { x: number; y: number; collected: boolean }[];
  particles: Particle[];
  clouds: { x: number; y: number; speed: number; size: number }[];
  keys: { [key: string]: boolean };
  currentLevel: number;
  initialLives: number;
  onScoreChange: (score: number) => void;
  onLivesChange: (lives: number) => void;
  onGameStateChange: (state: GameState) => void;
  onDeath: () => void;
  spawnParticles: (x: number, y: number, color: string, count?: number) => void;
}

export const updateGame = ({
  player: p,
  enemies,
  coins,
  hearts,
  particles,
  clouds,
  keys,
  currentLevel,
  initialLives,
  onScoreChange,
  onLivesChange,
  onGameStateChange,
  onDeath,
  spawnParticles
}: UpdateParams) => {
  const level = LEVELS[currentLevel];

  // Player Movement
  const ACCEL = 0.8;
  const FRICTION = 0.85;

  if (keys['ArrowLeft'] || keys['KeyA']) {
    p.vx -= ACCEL;
    if (p.vx < -MOVE_SPEED) p.vx = -MOVE_SPEED;
    p.facing = 'left';
    p.animFrame += 0.2;
  } else if (keys['ArrowRight'] || keys['KeyD']) {
    p.vx += ACCEL;
    if (p.vx > MOVE_SPEED) p.vx = MOVE_SPEED;
    p.facing = 'right';
    p.animFrame += 0.2;
  } else {
    p.vx *= FRICTION;
    if (Math.abs(p.vx) < 0.1) p.vx = 0;
    p.animFrame = 0;
  }

  if ((keys['ArrowUp'] || keys['Space'] || keys['KeyW']) && p.isGrounded) {
    p.vy = JUMP_FORCE;
    p.isGrounded = false;
  }

  p.vy += GRAVITY;
  p.x += p.vx;
  p.y += p.vy;
  if (p.invulnerable > 0) p.invulnerable--;

  // Platform Collisions
  p.isGrounded = false;
  for (const plat of level.platforms) {
    if (p.x < plat.x + plat.width && p.x + p.width > plat.x && p.y < plat.y + plat.height && p.y + p.height > plat.y) {
      if (p.vy > 0 && p.y + p.height - p.vy <= plat.y) {
        p.y = plat.y - p.height;
        p.vy = 0;
        p.isGrounded = true;
      } else if (p.vy < 0 && p.y - p.vy >= plat.y + plat.height) {
        p.y = plat.y + plat.height;
        p.vy = 0;
      } else if (p.vx > 0 && p.x + p.width - p.vx <= plat.x) {
        p.x = plat.x - p.width;
      } else if (p.vx < 0 && p.x - p.vx >= plat.x + plat.width) {
        p.x = plat.x + plat.width;
      }
    }
  }

  // Enemy Logic
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (e.isDead) {
      e.deathTimer++;
      if (e.deathTimer > 30) enemies.splice(i, 1);
      continue;
    }

    e.x += e.vx;
    
    let onPlatform = false;
    for (const plat of level.platforms) {
      if (e.x + e.width / 2 > plat.x && e.x + e.width / 2 < plat.x + plat.width && e.y + e.height + 1 > plat.y && e.y + e.height + 1 < plat.y + plat.height) {
        onPlatform = true;
        const nextX = e.x + (e.vx > 0 ? e.width : 0);
        if (nextX < plat.x || nextX > plat.x + plat.width) {
          e.vx *= -1;
        }
        break;
      }
    }
    if (!onPlatform) e.vx *= -1;
    if (Math.abs(e.x - e.startX) > e.range) e.vx *= -1;

    // Collision with player
    if (p.invulnerable === 0 && p.x < e.x + e.width && p.x + p.width > e.x && p.y < e.y + e.height && p.y + p.height > e.y) {
      if (p.vy > 0 && p.y + p.height - p.vy <= e.y) {
        e.isDead = true;
        e.deathTimer = 0;
        p.vy = JUMP_FORCE * 0.8;
        onScoreChange(50);
        spawnParticles(e.x + e.width / 2, e.y + e.height / 2, '#94a3b8', 15);
        p.animFrame = 0;
      } else {
        onDeath();
      }
    }
  }

  // Coin Logic
  for (const c of coins) {
    if (!c.collected && p.x < c.x + 20 && p.x + p.width > c.x && p.y < c.y + 20 && p.y + p.height > c.y) {
      c.collected = true;
      onScoreChange(10);
      spawnParticles(c.x, c.y, '#facc15');
    }
  }

  // Heart Logic
  for (const h of hearts) {
    if (!h.collected && p.x < h.x + 20 && p.x + p.width > h.x && p.y < h.y + 20 && p.y + p.height > h.y) {
      h.collected = true;
      onLivesChange(1);
      spawnParticles(h.x, h.y, '#ef4444');
    }
  }

  // Flag Logic
  const flag = level.flag;
  if (p.x < flag.x + 40 && p.x + p.width > flag.x && p.y < flag.y + 100 && p.y + p.height > flag.y) {
    if (currentLevel === LEVELS.length - 1) {
      onGameStateChange('victory');
    } else {
      onGameStateChange('level_complete');
    }
  }

  // Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const part = particles[i];
    part.x += part.vx;
    part.y += part.vy;
    part.life -= 0.02;
    if (part.life <= 0) particles.splice(i, 1);
  }

  // Clouds
  clouds.forEach(c => {
    c.x -= c.speed;
    if (c.x + c.size < 0) c.x = 2500;
  });

  // Death by fall
  if (p.y > CANVAS_HEIGHT) onDeath();
};
