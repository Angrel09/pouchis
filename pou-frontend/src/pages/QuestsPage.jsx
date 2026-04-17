import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trophy, Star } from 'lucide-react';
import { usePet } from '../hooks/usePet';

const QuestsPage = () => {
  const { pet } = usePet();

  if (!pet) return null;

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header>
        <h1 className="text-3xl font-fredoka text-text">Misiones</h1>
        <p className="text-muted font-medium">Cumple tareas para ganar oro</p>
      </header>

      <div className="flex flex-col gap-4">
        {pet.quests.map((quest, index) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card flex flex-col gap-3 relative overflow-hidden border-2 transition-all ${
              quest.completed ? 'border-green/30 bg-green/5 shadow-inner' : 'border-transparent'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className={`mt-1 ${quest.completed ? 'text-green' : 'text-muted'}`}>
                  {quest.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className={`font-fredoka text-lg ${quest.completed ? 'text-green-800' : 'text-text'}`}>
                    {quest.description}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-muted uppercase mt-0.5">
                    Recompensa: <span className="text-primary">🪙 {quest.reward}</span>
                  </div>
                </div>
              </div>
              {quest.completed && (
                <div className="bg-yellow-400 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
                  COMPLETADA
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-muted">
                <span>Progreso</span>
                <span>{quest.progress} / {quest.goal}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(quest.progress / quest.goal) * 100}%` }}
                  className={`h-full transition-all duration-1000 ${
                    quest.completed ? 'bg-green' : 'bg-primary'
                  }`}
                />
              </div>
            </div>

            {quest.completed && (
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Trophy className="w-24 h-24 rotate-12" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <section className="bg-accent/20 rounded-3xl p-6 border-2 border-dashed border-accent/50 text-center mt-4">
        <Star className="w-12 h-12 text-accent mx-auto mb-2 fill-current" />
        <h3 className="font-fredoka text-text">Puntos de Temporada</h3>
        <p className="text-sm text-muted font-medium">Completa todas las misiones diarias para un cofre legendario.</p>
        <div className="mt-4 h-2 bg-white rounded-full overflow-hidden max-w-[200px] mx-auto">
          <div className="h-full bg-accent w-1/3" />
        </div>
      </section>
    </div>
  );
};

export default QuestsPage;
