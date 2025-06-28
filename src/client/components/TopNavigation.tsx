import React from 'react';

interface TopNavigationProps {
  onAboutGame: () => void;
  onMyScore: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onAboutGame, onMyScore }) => {
  return (
    <div className="fixed top-6 right-6 flex gap-3 z-30">
      <button
        onClick={onAboutGame}
        className="w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg flex items-center justify-center text-xl"
        title="About Game"
      >
        ℹ️
      </button>
      
      <button
        onClick={onMyScore}
        className="w-12 h-12 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 shadow-lg flex items-center justify-center text-xl"
        title="My Score"
      >
        📊
      </button>
    </div>
  );
};