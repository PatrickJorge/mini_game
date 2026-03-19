import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Play, Star, Skull } from 'lucide-react';
import { GameState } from '../types';

interface UIOverlayProps {
  gameState: GameState;
  score: number;
  onStart: () => void;
  onNextLevel: () => void;
  onRestart: () => void;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  gameState,
  score,
  onStart,
  onNextLevel,
  onRestart,
}) => {
  return (
    <AnimatePresence>
      {gameState === 'start' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-8 text-center space-y-8 z-10"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              PLATFORMER PRO
            </h1>
            <p className="text-slate-400 font-medium tracking-widest uppercase text-xs">6 Níveis de pura adrenalina</p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative px-12 py-4 bg-emerald-500 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
          >
            <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <span className="relative flex items-center gap-2 text-white">
              <Play className="fill-current" /> INICIAR JORNADA
            </span>
          </motion.button>
        </motion.div>
      )}

      {gameState === 'level_complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-emerald-500/90 flex flex-col items-center justify-center p-8 text-center space-y-6 backdrop-blur-md z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-20 h-20 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <h2 className="text-5xl font-black italic text-white drop-shadow-lg">LEVEL COMPLETO!</h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onNextLevel} 
            className="px-10 py-4 bg-white text-emerald-600 rounded-2xl font-black text-xl shadow-2xl hover:bg-slate-50 transition-colors"
          >
            PRÓXIMO NÍVEL
          </motion.button>
        </motion.div>
      )}

      {gameState === 'game_over' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-red-600/95 flex flex-col items-center justify-center p-8 text-center space-y-6 backdrop-blur-md z-10"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Skull className="w-24 h-24 text-white" />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-6xl font-black italic text-white">GAME OVER</h2>
            <p className="text-red-100 font-medium">Suas vidas acabaram...</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRestart} 
            className="px-10 py-4 bg-white text-red-600 rounded-2xl font-black text-xl shadow-2xl hover:bg-slate-50 transition-colors"
          >
            RECOMEÇAR TUDO
          </motion.button>
        </motion.div>
      )}

      {gameState === 'victory' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-yellow-500/95 flex flex-col items-center justify-center p-8 text-center space-y-6 backdrop-blur-md z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-32 h-32 text-white fill-white" />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-6xl font-black italic text-white">LENDA VIVA!</h2>
            <p className="text-yellow-100 font-medium text-xl">Você conquistou todos os 6 níveis!</p>
            <p className="text-white text-4xl font-mono font-black mt-4">Score: {score}</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRestart} 
            className="px-10 py-4 bg-white text-yellow-600 rounded-2xl font-black text-xl shadow-2xl hover:bg-slate-50 transition-colors"
          >
            JOGAR NOVAMENTE
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
