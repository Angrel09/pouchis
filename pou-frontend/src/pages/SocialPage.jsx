import React from 'react';
import { Users, Trophy, UserPlus } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import Leaderboard from '../components/social/Leaderboard';

const SocialPage = () => {
  const { onlineUsers } = useSocket();

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-fredoka text-text">Social</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-online rounded-full animate-pulse" />
            <p className="text-sm font-bold text-muted uppercase tracking-wider">
              {onlineUsers} Usuarios en línea
            </p>
          </div>
        </div>
        <button className="p-3 bg-secondary text-white rounded-2xl shadow-sm hover:scale-105 transition-transform">
          <UserPlus className="w-6 h-6" />
        </button>
      </header>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-accent w-6 h-6" />
          <h2 className="text-xl font-fredoka text-text">Ranking Global</h2>
        </div>
        <Leaderboard />
      </section>

      <section className="bg-white/50 rounded-3xl p-6 border-2 border-dashed border-gray-200 text-center">
        <Users className="w-12 h-12 text-muted/30 mx-auto mb-2" />
        <h3 className="font-fredoka text-muted">Lista de Amigos</h3>
        <p className="text-sm text-muted/60">¡Próximamente podrás visitar las habitaciones de tus amigos!</p>
      </section>
    </div>
  );
};

export default SocialPage;
