import React from 'react';
import { usePet } from '../../hooks/usePet';

const PetDisplay = () => {
  const { pet, status, avatar } = usePet();

  const getGradient = () => {
    switch (status) {
      case 'happy': return 'pet-gradient-happy';
      case 'tired': return 'pet-gradient-tired';
      case 'hungry': return 'pet-gradient-hungry';
      case 'critical': return 'pet-gradient-critical';
      default: return 'pet-gradient-happy';
    }
  };

  const getAnimation = () => {
    switch (status) {
      case 'critical': return 'animate-pulse-fast';
      case 'tired': return 'animate-pulse';
      case 'hungry': return 'animate-bounce';
      default: return 'animate-bounce-slow';
    }
  };

  if (!pet) return null;

  return (
    <div className="flex flex-col items-center justify-center p-8 relative">
      <div className={`w-48 h-48 rounded-full ${getGradient()} flex items-center justify-center transition-all duration-500`}>
        <span className={`text-8xl ${getAnimation()} select-none`}>
          {avatar}
        </span>
      </div>
      
      <div className="absolute top-4 right-4 bg-accent text-text font-fredoka px-4 py-1 rounded-full border-2 border-text shadow-sm">
        Nivel {pet.level}
      </div>

      <h1 className="text-3xl font-fredoka mt-6 text-text">
        {pet.name}
      </h1>
    </div>
  );
};

export default PetDisplay;
