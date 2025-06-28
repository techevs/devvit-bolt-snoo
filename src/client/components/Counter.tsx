import React from 'react';

interface CounterProps {
  loveCount: number;
  irritateCount: number;
  clickSpeed: 'slow' | 'normal' | 'fast' | 'very-fast' | null;
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

  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center z-20 px-4">
      <div className="text-gray-700 text-lg font-medium">
        {getSpeedMessage()}
      </div>
    </div>
  );
};