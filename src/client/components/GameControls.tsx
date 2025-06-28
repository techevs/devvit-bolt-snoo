import React from 'react';

interface GameControlsProps {
  onAction: (type: 'love' | 'irritate') => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ onAction }) => {
  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-20 px-4">
      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={() => onAction('love')}
          className="px-6 py-3 text-base font-bold text-white border-none rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center min-w-[140px]"
          style={{
            background: 'linear-gradient(45deg, #ff6b81, #ff9ff3)',
          }}
        >
          ❤️ Love Snoo
        </button>
        <button
          onClick={() => onAction('irritate')}
          className="px-6 py-3 text-base font-bold text-white border-none rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center min-w-[140px]"
          style={{
            background: 'linear-gradient(45deg, #ff9f43, #ee5253)',
          }}
        >
          😤 Irritate Snoo
        </button>
      </div>
    </div>
  );
};