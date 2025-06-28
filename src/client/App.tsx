import React, { useState, useRef, useEffect } from 'react';
import { SnooAnimation } from './components/SnooAnimation';
import { GameControls } from './components/GameControls';
import { Counter } from './components/Counter';
import { EmojiEffect } from './components/EmojiEffect';
import { Timer } from './components/Timer';
import { ResultPage } from './components/ResultPage';

type GameState = 'playing' | 'finished';

export const App = () => {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [snooMood, setSnooMood] = useState<'happy' | 'sad'>('happy');
  const [loveCount, setLoveCount] = useState(0);
  const [irritateCount, setIrritateCount] = useState(0);
  const [emojis, setEmojis] = useState<Array<{ id: number; type: 'love' | 'irritate'; x: number; y: number; dx: number; dy: number }>>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [disabledButton, setDisabledButton] = useState<'love' | 'irritate' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      setGameState('finished');
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, gameStarted]);

  const handleAction = (type: 'love' | 'irritate') => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (type === 'love') {
      setLoveCount(prev => prev + 1);
      setSnooMood('happy');
      setDisabledButton('irritate');
    } else {
      setIrritateCount(prev => prev + 1);
      setSnooMood('sad');
      setDisabledButton('love');
    }

    // Create emoji effects
    createEmojiEffects(type);
  };

  const createEmojiEffects = (type: 'love' | 'irritate') => {
    const newEmojis = [];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = 80 + Math.random() * 40;
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;

      const throwDistance = 200 + Math.random() * 300;
      const throwAngle = Math.random() * 2 * Math.PI;
      const endX = Math.cos(throwAngle) * throwDistance;
      const endY = Math.sin(throwAngle) * throwDistance;

      newEmojis.push({
        id: Date.now() + i,
        type,
        x: startX,
        y: startY,
        dx: endX,
        dy: endY,
      });
    }

    setEmojis(prev => [...prev, ...newEmojis]);

    // Remove emojis after animation
    setTimeout(() => {
      setEmojis(prev => prev.filter(emoji => !newEmojis.some(newEmoji => newEmoji.id === emoji.id)));
    }, 3000);
  };

  const handleRestart = () => {
    setGameState('playing');
    setSnooMood('happy');
    setLoveCount(0);
    setIrritateCount(0);
    setEmojis([]);
    setTimeLeft(10);
    setGameStarted(false);
    setDisabledButton(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleClose = () => {
    // In a real Reddit app, this would close the webview
    // For now, we'll just restart the game
    handleRestart();
  };

  if (gameState === 'finished') {
    return (
      <ResultPage
        loveCount={loveCount}
        irritateCount={irritateCount}
        onRestart={handleRestart}
        onClose={handleClose}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Timer */}
      {gameStarted && (
        <Timer timeLeft={timeLeft} />
      )}

      {/* Main content container - moved higher up */}
      <div className="flex-1 flex items-center justify-center pt-8 pb-32" ref={containerRef}>
        <div className="text-center relative">
          <div className="relative inline-block">
            <SnooAnimation mood={snooMood} />
            {emojis.map(emoji => (
              <EmojiEffect
                key={emoji.id}
                type={emoji.type}
                x={emoji.x}
                y={emoji.y}
                dx={emoji.dx}
                dy={emoji.dy}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed positioned UI elements */}
      <Counter loveCount={loveCount} irritateCount={irritateCount} />
      <GameControls 
        onAction={handleAction} 
        disabled={timeLeft === 0}
        disabledButton={disabledButton}
      />
    </div>
  );
};