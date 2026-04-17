import React, { useEffect, useRef, useState } from 'react';
import { X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FlappyPou = ({ onComplete, onClose, petAvatar = '🐣' }) => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  // Game constants
  const GRAVITY = 0.4;
  const JUMP = -7;
  const PIPE_WIDTH = 50;
  const PIPE_GAP = 150;
  const PIPE_SPEED = 3;

  const gameState = useRef({
    bird: { y: 250, velocity: 0 },
    pipes: [],
    frame: 0
  });

  const jump = () => {
    if (!started) setStarted(true);
    if (!gameOver) gameState.current.bird.velocity = JUMP;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const render = () => {
      if (!started || gameOver) return;

      // Update Physics
      gameState.current.bird.velocity += GRAVITY;
      gameState.current.bird.y += gameState.current.bird.velocity;

      // Update Pipes
      if (gameState.current.frame % 100 === 0) {
        const height = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
        gameState.current.pipes.push({ x: canvas.width, height });
      }

      gameState.current.pipes = gameState.current.pipes.map(pipe => ({
        ...pipe,
        x: pipe.x - PIPE_SPEED
      })).filter(pipe => pipe.x > -PIPE_WIDTH);

      // Collision Detection
      const birdBox = { x: 50, y: gameState.current.bird.y, size: 30 };
      
      if (birdBox.y + birdBox.size > canvas.height || birdBox.y < 0) {
        setGameOver(true);
      }

      gameState.current.pipes.forEach(pipe => {
        if (
          birdBox.x + birdBox.size > pipe.x &&
          birdBox.x < pipe.x + PIPE_WIDTH &&
          (birdBox.y < pipe.height || birdBox.y + birdBox.size > pipe.height + PIPE_GAP)
        ) {
          setGameOver(true);
        }

        if (pipe.x + PIPE_SPEED > birdBox.x && pipe.x <= birdBox.x) {
          setScore(s => s + 1);
        }
      });

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Pipes
      ctx.fillStyle = '#4ECDC4';
      gameState.current.pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.height);
        ctx.fillRect(pipe.x, pipe.height + PIPE_GAP, PIPE_WIDTH, canvas.height);
      });

      // Draw Bird
      ctx.font = '40px Arial';
      ctx.fillText(petAvatar, 50, gameState.current.bird.y + 30);

      gameState.current.frame++;
      animationId = requestAnimationFrame(render);
    };

    if (started && !gameOver) {
      animationId = requestAnimationFrame(render);
    } else if (!started) {
      // Initial Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '40px Arial';
      ctx.fillText(petAvatar, 50, 250);
      ctx.fillStyle = '#2D3436';
      ctx.font = '20px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('Pulsa para saltar', canvas.width / 2, canvas.height / 2);
    }

    return () => cancelAnimationFrame(animationId);
  }, [started, gameOver, petAvatar]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-sm aspect-[2/3] bg-[#FFF8F0] rounded-3xl overflow-hidden border-4 border-text shadow-2xl touch-none" onClick={jump}>
        <canvas ref={canvasRef} width={350} height={525} className="w-full h-full" />
        
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-4xl font-fredoka text-text">
          {score}
        </div>

        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-4 right-4 p-2 bg-white/50 rounded-full">
          <X className="w-6 h-6" />
        </button>

        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center text-white"
            >
              <Trophy className="w-16 h-16 text-accent mb-4" />
              <h2 className="text-4xl font-fredoka mb-2">Game Over</h2>
              <p className="text-xl mb-6">Puntuación: {score}</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete();
                }}
                className="btn-primary w-full bg-primary"
              >
                Cobrar Premios
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlappyPou;
