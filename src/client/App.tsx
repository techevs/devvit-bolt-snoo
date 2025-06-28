import React, { useState, useRef } from 'react';
import { SnooAnimation } from './components/SnooAnimation';
import { GameControls } from './components/GameControls';
import { Counter } from './components/Counter';
import { EmojiEffect } from './components/EmojiEffect';

export const App = () => {
  const [snooMood, setSnooMood] = useState<'happy' | 'sad'>('happy');
  const [loveCount, setLoveCount] = useState(0);
  const [irritateCount, setIrritateCount] = useState(0);
  const [emojis, setEmojis] = useState<Array<{ id: number; type: 'love' | 'irritate'; x: number; y: number; dx: number; dy: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAction = (type: 'love' | 'irritate') => {
    if (type === 'love') {
      setLoveCount(prev => prev + 1);
      setSnooMood('happy');
    } else {
      setIrritateCount(prev => prev + 1);
      setSnooMood('sad');
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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <div className="text-center relative z-10" ref={containerRef}>
        <div className="relative inline-block m-12">
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

      <Counter loveCount={loveCount} irritateCount={irritateCount} />
      <GameControls onAction={handleAction} />
    </div>
  );
};