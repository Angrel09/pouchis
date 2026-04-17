import React from 'react';
import { usePet } from '../../hooks/usePet';
import StatBar from './StatBar';
import { STAT_COLORS, STAT_LABELS } from '../../utils/constants';

const PetStats = () => {
  const { pet } = usePet();

  if (!pet) return null;

  return (
    <div className="card w-full max-w-sm grid grid-cols-2 gap-4 mt-4">
      <StatBar 
        label={STAT_LABELS.health} 
        value={pet.health} 
        color={STAT_COLORS.health} 
        icon="❤️" 
      />
      <StatBar 
        label={STAT_LABELS.hunger} 
        value={pet.hunger} 
        color={STAT_COLORS.hunger} 
        icon="🍔" 
      />
      <StatBar 
        label={STAT_LABELS.energy} 
        value={pet.energy} 
        color={STAT_COLORS.energy} 
        icon="⚡" 
      />
      <StatBar 
        label={STAT_LABELS.happiness} 
        value={pet.happiness} 
        color={STAT_COLORS.happiness} 
        icon="😄" 
      />
    </div>
  );
};

export default PetStats;
