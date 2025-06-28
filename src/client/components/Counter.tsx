import React from 'react';

interface CounterProps {
  loveCount: number;
  irritateCount: number;
}

export const Counter: React.FC<CounterProps> = ({ loveCount, irritateCount }) => {
  const totalCount = loveCount + irritateCount;
  
  if (totalCount === 0) {
    return (
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-20 text-white px-5 py-2 rounded-full shadow-lg font-bold text-lg text-center"
           style={{
             background: 'linear-gradient(45deg, #ff9ff3, #54a0ff)',
           }}>
        Click below to start!
      </div>
    );
  }

  const lastAction = loveCount > irritateCount ? 'Loved' : 'Irritated';
  const lastCount = loveCount > irritateCount ? loveCount : irritateCount;

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-20 text-white px-5 py-2 rounded-full shadow-lg font-bold text-lg text-center"
         style={{
           background: 'linear-gradient(45deg, #ff9ff3, #54a0ff)',
         }}>
      {lastAction} Snoo {lastCount} {lastCount === 1 ? 'time' : 'times'}
    </div>
  );
};