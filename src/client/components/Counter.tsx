import React from 'react';

interface CounterProps {
  loveCount: number;
  irritateCount: number;
  clickSpeed: 'no-clicks' | 'very-slow' | 'slow' | 'normal' | 'fast' | 'very-fast';
}

export const Counter: React.FC<CounterProps> = ({ loveCount, irritateCount, clickSpeed }) => {
  const totalCount = loveCount + irritateCount;
  
  if (totalCount === 0) {
    return (
      <div className="fixed bottom-20 left-0 right-0 flex justify-center z-20 px-4">
        <div className="text-gray-600 text-lg font-medium">
          Click below to start!
        </div>
      </div>
    );
  }

  const getSpeedMessage = () => {
    switch (clickSpeed) {
      case 'no-clicks':
        return "Come on, start clicking! 😴";
      case 'very-slow':
        return "You lazy stuff! Wake up! 😪";
      case 'slow':
        return "You're being too slow! 🐌";
      case 'normal':
        return "You could do better! 😐";
      case 'fast':
        return "You're going fast! 🚀";
      case 'very-fast':
        return "I like the speed! 🔥";
      default:
        return "Keep clicking! 👆";
    }
  };

  const getSpeedColor = () => {
    switch (clickSpeed) {
      case 'no-clicks':
      case 'very-slow':
        return 'text-red-600';
      case 'slow':
        return 'text-orange-600';
      case 'normal':
        return 'text-yellow-600';
      case 'fast':
        return 'text-blue-600';
      case 'very-fast':
        return 'text-green-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-20 px-4">
      <div className={`text-lg font-medium transition-colors duration-300 ${getSpeedColor()}`}>
        {getSpeedMessage()}
      </div>
    </div>
  );
};