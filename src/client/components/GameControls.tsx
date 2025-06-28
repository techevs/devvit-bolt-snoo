import React from 'react';

interface GameControlsProps {
  onAction: (type: 'love' | 'irritate') => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ onAction }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
      <button
        onClick={() => onAction('love')}
        className="px-6 py-3 text-lg font-bold text-white border-none rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        style={{
          background: 'linear-gradient(45deg, #ff6b81, #ff9ff3)',
        }}
      >
        ❤️ Love Snoo
      </button>
      <button
        onClick={() => onAction('irritate')}
        className="px-6 py-3 text-lg font-bold text-white border-none rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        style={{
          background: 'linear-gradient(45deg, #ff9f43, #ee5253)',
        }}
      >
        😤 Irritate Snoo
      </button>
    </div>
  );
};