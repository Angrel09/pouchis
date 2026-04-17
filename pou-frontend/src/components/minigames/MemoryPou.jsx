import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Trophy } from 'lucide-react';

const EMOJIS = ['🍔', '🍕', '🍎', '🍣', '🍦', '🧪', '⚡', '🌟'];
const CARDS = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);

const MemoryPou = ({ onComplete, onClose }) => {
  const [cards, setCards] = useState(CARDS.map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false })));
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setCards(prev => prev.map(card => 
          (card.id === first || card.id === second) ? { ...card, matched: true } : card
        ));
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            (card.id === first || card.id === second) ? { ...card, flipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(m => m + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setWon(true);
      setTimeout(() => onComplete(), 2000);
    }
  }, [cards, onComplete]);

  const handleCardClick = (id) => {
    if (flippedCards.length < 2 && !cards[id].flipped && !cards[id].matched) {
      setCards(prev => prev.map(card => card.id === id ? { ...card, flipped: true } : card));
      setFlippedCards(prev => [...prev, id]);
    }
  };

  const restart = () => {
    const shuffled = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffled.map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false })));
    setFlippedCards([]);
    setMoves(0);
    setWon(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col p-4 overflow-y-auto">
      <header className="flex justify-between items-center mb-6">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-fredoka text-text">Memory Pou</h2>
          <p className="text-sm font-bold text-muted">Movimientos: {moves}</p>
        </div>
        <button onClick={restart} className="p-2 hover:bg-gray-100 rounded-full">
          <RefreshCw className="w-6 h-6" />
        </button>
      </header>

      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto w-full">
        {cards.map(card => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-2xl cursor-pointer flex items-center justify-center text-3xl shadow-sm border-2 transition-colors ${
              card.flipped || card.matched ? 'bg-white border-primary' : 'bg-primary border-primary text-transparent'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {(card.flipped || card.matched) ? card.emoji : '?'}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
          >
            <Trophy className="w-20 h-20 text-accent mb-4" />
            <h2 className="text-4xl font-fredoka text-text mb-2">¡Victoria!</h2>
            <p className="text-xl font-bold text-muted">Has completado el puzzle en {moves} movimientos.</p>
            <div className="mt-6 animate-bounce text-lg font-bold text-green">
              Obteniendo recompensas...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryPou;
