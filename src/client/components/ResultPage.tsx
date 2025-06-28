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
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
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
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {getResultMessage()}
        </h1>

        {/* Stats */}
        <div className="rounded-2xl p-6 mb-8 border-2" style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#ffffff' }}>
            Game Results
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2" style={{ color: '#ffffff' }}>
                <span className="text-xl">❤️</span>
                Love clicks:
              </span>
              <span className="font-bold text-xl" style={{ color: '#ffffff' }}>{loveCount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2" style={{ color: '#ffffff' }}>
                <span className="text-xl">😤</span>
                Irritate clicks:
              </span>
              <span className="font-bold text-xl" style={{ color: '#ffffff' }}>{irritateCount}</span>
            </div>
            
            <div className="border-t pt-3 mt-3" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: '#ffffff' }}>Total clicks:</span>
                <span className="font-bold text-xl" style={{ color: '#ffffff' }}>{totalClicks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onRestart}
            className="px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            style={{ 
              backgroundColor: '#ffffff', 
              color: '#1f2937',
              border: 'none'
            }}
          >
            🔄 Play Again
          </button>
          
          <button
            onClick={onClose}
            className="px-8 py-4 rounded-full font-bold text-lg border-2 hover:transform hover:-translate-y-1 transition-all duration-200"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)', 
              color: '#ffffff',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            ✖️ Close
          </button>
        </div>
      </div>
    </div>
  );
};