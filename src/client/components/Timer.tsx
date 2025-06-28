import React from 'react';

interface TimerProps {
  timeLeft: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const getTimerColor = () => {
    if (timeLeft <= 3) return 'bg-red-500';
    if (timeLeft <= 5) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getTimerText = () => {
    if (timeLeft === 1) {
      return '1 second';
    }
    return `${timeLeft} seconds`;
  };

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-30 px-4">
      <div className={`${getTimerColor()} text-white px-6 py-3 rounded-full shadow-lg font-bold text-xl transition-colors duration-300 flex items-center gap-2`}>
        <span className="text-2xl">🕐</span>
        {getTimerText()}
      </div>
    </div>
  );
};