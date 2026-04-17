import { usePetContext } from '../context/PetContext';

export const usePet = () => {
  const { pet, loading, error, fetchPet, updatePetData } = usePetContext();

  const getStatus = () => {
    if (!pet) return 'normal';
    if (pet.health < 20) return 'critical';
    if (pet.energy < 30) return 'tired';
    if (pet.hunger < 30) return 'hungry';
    if (pet.happiness > 70) return 'happy';
    return 'normal';
  };

  const getAvatar = () => {
    if (!pet) return '🐣';
    if (pet.level >= 10) return '🐔';
    if (pet.level >= 5) return '🐥';
    return '🐣';
  };

  return {
    pet,
    loading,
    error,
    fetchPet,
    updatePetData,
    status: getStatus(),
    avatar: getAvatar(),
  };
};
