import React from 'react';

interface TopNavigationProps {
  onAboutGame: () => void;
  onMyScore: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onAboutGame, onMyScore }) => {
  return (
    <div className="fixed top-6 right-6 flex flex-col gap-2 z-30">
      <button
        onClick={onAboutGame}
        className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 shadow-lg flex items-center gap-2"
      >
        <span className="text-base">ℹ️</span>
        About Game
      </button>
      
      <button
        onClick={onMyScore}
        className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold text-sm hover:bg-green-600 transition-colors duration-200 shadow-lg flex items-center gap-2"
      >
        <span className="text-base">📊</span>
        My Score
      </button>
    </div>
  );
};