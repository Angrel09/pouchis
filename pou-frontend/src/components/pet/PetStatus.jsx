import React from 'react';
import { usePet } from '../../hooks/usePet';

const PetStatus = () => {
  const { status } = usePet();

  const getStatusConfig = () => {
    switch (status) {
      case 'happy': return { label: 'Feliz', color: 'bg-accent text-text', icon: '😄' };
      case 'tired': return { label: 'Cansado', color: 'bg-purple text-white', icon: '😴' };
      case 'hungry': return { label: 'Hambriento', color: 'bg-orange text-white', icon: '🍽️' };
      case 'critical': return { label: 'Crítico', color: 'bg-primary text-white animate-pulse', icon: '💔' };
      default: return { label: 'Bien', color: 'bg-secondary text-white', icon: '👍' };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold shadow-sm ${config.color} transition-all duration-300`}>
      <span>{config.icon}</span>
      <span className="text-sm uppercase tracking-wider">{config.label}</span>
    </div>
  );
};

export default PetStatus;
