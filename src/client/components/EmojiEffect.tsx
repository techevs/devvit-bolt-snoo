import React, { useEffect, useState } from 'react';

interface EmojiEffectProps {
  type: 'love' | 'irritate';
  x: number;
  y: number;
  dx: number;
  dy: number;
}

const loveEmojis = ['💖', '🥰', '😘', '💕', '🌹', '💞', '💘'];
const irritateEmojis = ['💩', '😤', '🗯️', '😠', '👿'];

export const EmojiEffect: React.FC<EmojiEffectProps> = ({ type, x, y, dx, dy }) => {
  const [emoji] = useState(() => {
    const emojiList = type === 'love' ? loveEmojis : irritateEmojis;
    return emojiList[Math.floor(Math.random() * emojiList.length)];
  });

  const [animationDuration] = useState(() => 1.5 + Math.random());

  return (
    <div
      className="absolute text-3xl pointer-events-none z-50 opacity-100"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        animation: `throwEmoji ${animationDuration}s ease-out forwards`,
        '--dx': `${dx}px`,
        '--dy': `${dy}px`,
      } as React.CSSProperties & { '--dx': string; '--dy': string }}
    >
      {emoji}
      <style jsx>{`
        @keyframes throwEmoji {
          0% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translate(var(--dx), var(--dy)) rotate(180deg) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--dx) * 1.5), calc(var(--dy) * 1.5)) rotate(360deg) scale(0.3);
          }
        }
      `}</style>
    </div>
  );
};