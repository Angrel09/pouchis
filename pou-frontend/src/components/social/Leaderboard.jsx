import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { getPets } from '../../api/pouApi';

const Leaderboard = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await getPets();
        // Ordenar por nivel (desc) y luego exp (desc)
        const sorted = data.sort((a, b) => {
          if (b.level !== a.level) return b.level - a.level;
          return b.experience - a.experience;
        });
        setPets(sorted);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center p-8">Cargando ranking...</div>;

  return (
    <div className="flex flex-col gap-3">
      {pets.map((pet, index) => (
        <motion.div
          key={pet.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
            index === 0 ? 'bg-yellow-50 border-yellow-200 shadow-md scale-105' :
            index === 1 ? 'bg-gray-50 border-gray-200' :
            index === 2 ? 'bg-orange-50 border-orange-200' :
            'bg-white border-gray-100'
          }`}
        >
          <div className="w-8 font-fredoka text-xl text-muted text-center">
            {index === 0 ? <Trophy className="text-yellow-500 w-6 h-6 mx-auto" /> :
             index === 1 ? <Medal className="text-gray-400 w-6 h-6 mx-auto" /> :
             index === 2 ? <Medal className="text-orange-400 w-6 h-6 mx-auto" /> :
             index + 1}
          </div>

          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-inner border border-gray-100">
            {pet.level >= 10 ? '🐔' : pet.level >= 5 ? '🐥' : '🐣'}
          </div>

          <div className="flex-1">
            <h4 className="font-fredoka text-text leading-tight">{pet.name}</h4>
            <div className="flex items-center gap-1 text-[10px] font-bold text-muted uppercase">
              <Star className="w-3 h-3 fill-current text-accent" />
              Nivel {pet.level} • {pet.experience} XP
            </div>
          </div>

          <div className="bg-white px-3 py-1 rounded-full border border-gray-100 font-bold text-primary shadow-sm">
            🪙 {pet.coins}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Leaderboard;
