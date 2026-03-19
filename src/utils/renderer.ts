import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  LEVELS 
} from '../constants';
import { Player, Enemy, Particle } from '../types';

interface DrawParams {
  ctx: CanvasRenderingContext2D;
  cameraX: number;
  currentLevel: number;
  player: Player;
  enemies: Enemy[];
  coins: { x: number; y: number; collected: boolean }[];
  hearts: { x: number; y: number; collected: boolean }[];
  particles: Particle[];
  clouds: { x: number; y: number; size: number }[];
}

export const drawFrame = ({
  ctx,
  cameraX,
  currentLevel,
  player,
  enemies,
  coins,
  hearts,
  particles,
  clouds
}: DrawParams) => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Sky Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  grad.addColorStop(0, '#0ea5e9');
  grad.addColorStop(1, '#38bdf8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.save();
  ctx.translate(-cameraX, 0);

  // Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  clouds.forEach(c => {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.size, c.size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Platforms
  const level = LEVELS[currentLevel];
  level.platforms.forEach(plat => {
    ctx.fillStyle = plat.color;
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    // Grass top
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(plat.x, plat.y, plat.width, 4);
  });

  // Coins
  coins.forEach(c => {
    if (!c.collected) {
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(c.x + 10, c.y + 10, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#eab308';
      ctx.stroke();
    }
  });

  // Hearts
  hearts.forEach(h => {
    if (!h.collected) {
      ctx.save();
      ctx.translate(h.x + 10, h.y + 10);
      ctx.beginPath();
      const size = 10;
      ctx.moveTo(0, size / 2);
      ctx.bezierCurveTo(size, -size, size * 2, size / 2, 0, size * 1.5);
      ctx.bezierCurveTo(-size * 2, size / 2, -size, -size, 0, size / 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
  });

  // Enemies
  enemies.forEach(e => {
    if (e.isDead) {
      const squashFactor = 1 - (e.deathTimer / 30);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(e.x, e.y + e.height * (1 - squashFactor), e.width, e.height * squashFactor);
      ctx.globalAlpha = squashFactor;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(e.x + 5, e.y + e.height * (1 - squashFactor) + 4, 6, 2);
      ctx.fillRect(e.x + 19, e.y + e.height * (1 - squashFactor) + 4, 6, 2);
      ctx.globalAlpha = 1.0;
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(e.x, e.y, e.width, e.height);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(e.x + 5, e.y + 8, 6, 6);
      ctx.fillRect(e.x + 19, e.y + 8, 6, 6);
    }
  });

  // Flag
  ctx.fillStyle = '#475569';
  ctx.fillRect(level.flag.x, level.flag.y, 6, 100);
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(level.flag.x + 6, level.flag.y);
  ctx.lineTo(level.flag.x + 40, level.flag.y + 20);
  ctx.lineTo(level.flag.x + 6, level.flag.y + 40);
  ctx.fill();

  // Particles
  particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });
  ctx.globalAlpha = 1;

  // Player
  if (player.invulnerable % 10 < 5) {
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    if (player.facing === 'left') ctx.scale(-1, 1);
    
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
    
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(-player.width / 2 - 2, -player.height / 2, player.width + 4, 10);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(player.width / 4, -player.height / 4, 4, 4);

    const legOffset = Math.sin(player.animFrame) * 8;
    ctx.fillStyle = '#450a0a';
    ctx.fillRect(-player.width / 2 + 4, player.height / 2 - 4, 8, 8 + (player.vx !== 0 ? legOffset : 0));
    ctx.fillRect(player.width / 2 - 12, player.height / 2 - 4, 8, 8 + (player.vx !== 0 ? -legOffset : 0));

    ctx.restore();
  }

  ctx.restore();
};
