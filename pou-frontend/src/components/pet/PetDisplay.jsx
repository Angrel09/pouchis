import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePet } from '../../hooks/usePet';
import { ITEM_EMOJIS } from '../../utils/constants';

const PetDisplay = ({ isOverTarget }) => {
  const { pet, status, avatar, updatePetData } = usePet();
  const [isPetting, setIsPetting] = useState(false);
  const petRef = useRef(null);

  const getGradient = () => {
    switch (status) {
      case 'happy': return 'pet-gradient-happy';
      case 'tired': return 'pet-gradient-tired';
      case 'hungry': return 'pet-gradient-hungry';
      case 'critical': return 'pet-gradient-critical';
      default: return 'pet-gradient-happy';
    }
  };

  const handleTap = () => {
    if (isPetting) return;
    setIsPetting(true);
    if (pet && pet.happiness < 100) {
      const newHappiness = Math.min(100, pet.happiness + 2);
      updatePetData({ ...pet, happiness: newHappiness });
    }
    setTimeout(() => setIsPetting(false), 1000);
  };

  if (!pet) return null;

  const equippedItems = pet.equipped || {};

  return (
    <div className="flex flex-col items-center justify-center p-8 relative w-full">
      <motion.div 
        ref={petRef}
        id="pet-target"
        className={`w-48 h-48 rounded-full ${getGradient()} flex items-center justify-center transition-colors duration-500 relative cursor-pointer shadow-lg`}
        animate={{ 
          scale: isOverTarget ? 1.15 : 1,
          boxShadow: isOverTarget ? '0 0 30px rgba(255, 107, 107, 0.6)' : '0 8px 24px rgba(0,0,0,0.08)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTap}
      >
        {/* Capa de Ropa - Fondo */}
        {equippedItems.clothes && (
          <motion.span 
            className="absolute text-5xl z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {ITEM_EMOJIS[equippedItems.clothes.id]}
          </motion.span>
        )}

        <motion.span 
          className="text-8xl select-none z-0"
          animate={isPetting ? {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          } : status === 'critical' ? {
            scale: [1, 1.1, 1],
          } : status === 'tired' ? {
            opacity: [1, 0.6, 1],
            scale: [1, 0.98, 1],
          } : {
            y: [0, -20, 0],
          }}
          transition={isPetting ? {
            duration: 0.5,
          } : {
            duration: status === 'critical' ? 0.5 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {avatar}
        </motion.span>

        {/* Capa de Lentes */}
        {equippedItems.glasses && (
          <motion.span 
            className="absolute text-5xl z-20 top-[35%] left-1/2 -translate-x-1/2"
            animate={status === 'normal' || status === 'happy' ? { y: [0, -20, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {ITEM_EMOJIS[equippedItems.glasses.id]}
          </motion.span>
        )}

        {/* Capa de Sombrero */}
        {equippedItems.hat && (
          <motion.span 
            className="absolute text-6xl z-30 -top-4 left-1/2 -translate-x-1/2"
            animate={status === 'normal' || status === 'happy' ? { y: [0, -20, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {ITEM_EMOJIS[equippedItems.hat.id]}
          </motion.span>
        )}

        <AnimatePresence>
          {isPetting && (
            <motion.span
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -80, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute text-4xl z-50"
            >
              ❤️
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-4 right-4 bg-accent text-text font-fredoka px-4 py-1 rounded-full border-2 border-text shadow-sm z-10"
      >
        Nivel {pet.level}
      </motion.div>

      <motion.h1 
        layout
        className="text-3xl font-fredoka mt-6 text-text"
      >
        {pet.name}
      </motion.h1>
    </div>
  );
};

export default PetDisplay;
