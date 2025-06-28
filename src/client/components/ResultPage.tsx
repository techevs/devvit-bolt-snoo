import React from 'react';

interface ResultPageProps {
  loveCount: number;
  irritateCount: number;
  onRestart: () => void;
  onClose: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ loveCount, irritateCount, onRestart, onClose }) => {
  const totalClicks = loveCount + irritateCount;
  const isLoveWinner = loveCount > irritateCount;
  const isDraw = loveCount === irritateCount;

  const getResultMessage = () => {
    if (isDraw && totalClicks > 0) {
      return "It's a tie! Snoo is confused! 🤔";
    } else if (isLoveWinner) {
      return "Snoo feels loved! ❤️";
    } else if (irritateCount > 0) {
      return "Snoo is irritated! 😤";
    } else {
      return "No clicks? Snoo is waiting! 😴";
    }
  };

  const getBackgroundGradient = () => {
    if (isDraw) {
      return 'linear-gradient(135deg, #ff9ff3, #54a0ff)';
    } else if (isLoveWinner) {
      return 'linear-gradient(135deg, #ff6b81, #ff9ff3)';
    } else {
      return 'linear-gradient(135deg, #ff9f43, #ee5253)';
    }
  };

  const getSnooEmoji = () => {
    if (isDraw) return '🤔';
    if (isLoveWinner) return '🥰';
    if (irritateCount > 0) return '😤';
    return '😴';
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden"
      style={{ background: getBackgroundGradient() }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">{getSnooEmoji()}</div>
        <div className="absolute top-20 right-16 text-4xl animate-pulse">✨</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce delay-300">🎉</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-pulse delay-500">⭐</div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 px-6 max-w-md">
        {/* Large Snoo emoji */}
        <div className="text-8xl mb-6 animate-bounce">
          {getSnooEmoji()}
        </div>

        {/* Result message */}
        <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">
          {getResultMessage()}
        </h1>

        {/* Stats */}
        <div className="bg-black bg-opacity-30 rounded-2xl p-6 mb-8 backdrop-blur-sm border border-white border-opacity-20">
          <h2 className="text-xl font-semibold mb-4 text-white">Game Results</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-white">
                <span className="text-xl">❤️</span>
                Love clicks:
              </span>
              <span className="font-bold text-xl text-white">{loveCount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-white">
                <span className="text-xl">😤</span>
                Irritate clicks:
              </span>
              <span className="font-bold text-xl text-white">{irritateCount}</span>
            </div>
            
            <div className="border-t border-white border-opacity-30 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">Total clicks:</span>
                <span className="font-bold text-xl text-white">{totalClicks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onRestart}
            className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            🔄 Play Again
          </button>
          
          <button
            onClick={onClose}
            className="bg-black bg-opacity-20 text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white border-opacity-50 hover:bg-opacity-30 transform hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm"
          >
            ✖️ Close
          </button>
        </div>
      </div>
    </div>
  );
};