import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, Zap } from 'lucide-react';
import { usePet } from '../hooks/usePet';
import { useToast } from '../hooks/useToast';
import { playActivity } from '../api/pouApi';
import MemoryPou from '../components/minigames/MemoryPou';
import FlappyPou from '../components/minigames/FlappyPou';
import Toast from '../components/ui/Toast';

const GAMES = [
  {
    id: 'memory',
    activityId: 'act_004',
    name: 'Memory Pou',
    description: 'Encuentra las parejas y entrena tu memoria.',
    icon: <Brain className="w-8 h-8" />,
    color: 'bg-purple',
    difficulty: 'Fácil',
    energy: 5
  },
  {
    id: 'flappy',
    activityId: 'act_001',
    name: 'Flappy Pou',
    description: 'Esquiva los obstáculos y llega lo más lejos posible.',
    icon: <Zap className="w-8 h-8" />,
    color: 'bg-orange',
    difficulty: 'Medio',
    energy: 20
  }
];

const MinigamesPage = () => {
  const { pet, avatar, updatePetData } = usePet();
  const { toast, showToast } = useToast();
  const [activeGame, setActiveGame] = useState(null);

  const handleGameComplete = async (activityId) => {
    if (!pet) return;
    try {
      const { data } = await playActivity(activityId, pet.id);
      updatePetData(data.pet);
      showToast(data.message);
    } catch (error) {
      showToast(error.response?.data?.error || 'Error al procesar recompensa', 'error');
    } finally {
      setActiveGame(null);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-fredoka text-text">Juegos</h1>
          <p className="text-muted font-medium">¡Gana monedas y experiencia!</p>
        </div>
        <div className="bg-accent px-4 py-1 rounded-full border-2 border-text font-fredoka shadow-sm">
          🪙 {pet?.coins || 0}
        </div>
      </header>

      <div className="grid gap-4">
        {GAMES.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-0 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20"
            onClick={() => {
              if (pet.energy < game.energy) {
                showToast('No tienes suficiente energía', 'error');
                return;
              }
              setActiveGame(game.id);
            }}
          >
            <div className="flex p-4 gap-4">
              <div className={`${game.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner`}>
                {game.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-fredoka text-text">{game.name}</h3>
                  <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-0.5 rounded text-muted">
                    {game.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted leading-tight mt-1">
                  {game.description}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-orange">
                    <Zap className="w-3 h-3 fill-current" />
                    {game.energy} Energía
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-green">
                    <Trophy className="w-3 h-3" />
                    Premios
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-50 py-3 font-fredoka text-primary text-center border-t border-gray-100 uppercase tracking-wider text-sm">
              Jugar Ahora
            </div>
          </motion.div>
        ))}
      </div>

      {/* Renderizado de Juegos */}
      {activeGame === 'memory' && (
        <MemoryPou 
          onComplete={() => handleGameComplete('act_004')} 
          onClose={() => setActiveGame(null)} 
        />
      )}

      {activeGame === 'flappy' && (
        <FlappyPou 
          petAvatar={avatar}
          onComplete={() => handleGameComplete('act_001')} 
          onClose={() => setActiveGame(null)} 
        />
      )}

      <Toast message={toast?.message} type={toast?.type} />
    </div>
  );
};

export default MinigamesPage;
