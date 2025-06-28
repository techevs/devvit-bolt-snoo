import React from 'react';

interface SnooAnimationProps {
  mood: 'happy' | 'sad';
}

export const SnooAnimation: React.FC<SnooAnimationProps> = ({ mood }) => {
  return (
    <div className="w-80 h-80 transition-transform duration-300 ease-in-out">
      {mood === 'happy' ? <HappySnoo /> : <SadSnoo />}
    </div>
  );
};

const HappySnoo: React.FC = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background circle for visual appeal */}
    <circle cx="100" cy="100" r="95" fill="#f6f7f8" stroke="#ff4500" strokeWidth="3" opacity="0.3"/>
    
    {/* Snoo's body */}
    <ellipse cx="100" cy="130" rx="25" ry="35" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" 
                        values="0 100 130;5 100 130;-5 100 130;0 100 130" 
                        dur="1s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Snoo's head */}
    <circle cx="100" cy="80" r="28" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;2 -2;-2 -2;0 0" 
                        dur="0.8s" repeatCount="indefinite"/>
    </circle>

    {/* Bent antenna at ~75 degrees */}
    <path d="M100 51 L92 38 L100 30" fill="none" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate"
                        values="0 100 52;10 100 52;-10 100 52;0 100 52"
                        dur="1.2s" repeatCount="indefinite"/>
    </path>

    {/* Circle at the tip of the antenna */}
    <circle cx="100" cy="30" r="4" fill="#ff4500">
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;2 -2;-2 -2;0 0" 
                        dur="1.2s" repeatCount="indefinite"/>
    </circle>
    
    {/* Left eye */}
    <circle cx="90" cy="75" r="6" fill="#ff4500">
      <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="92" cy="73" r="2" fill="white"/>
    
    {/* Right eye */}
    <circle cx="110" cy="75" r="6" fill="#ff4500">
      <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="112" cy="73" r="2" fill="white"/>
    
    {/* Smile */}
    <path d="M 88 88 Q 100 98 112 88" stroke="#333" strokeWidth="2" fill="none">
      <animate attributeName="d" 
               values="M 88 88 Q 100 98 112 88;M 88 88 Q 100 102 112 88;M 88 88 Q 100 98 112 88" 
               dur="1.5s" repeatCount="indefinite"/>
    </path>
    
    {/* Left arm */}
    <ellipse cx="70" cy="120" rx="8" ry="20" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" 
                        values="20 70 120;-30 70 120;40 70 120;20 70 120" 
                        dur="0.6s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Right arm */}
    <ellipse cx="130" cy="120" rx="8" ry="20" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" 
                        values="-20 130 120;30 130 120;-40 130 120;-20 130 120" 
                        dur="0.6s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Left leg */}
    <ellipse cx="88" cy="175" rx="8" ry="18" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;-3 -5;3 -3;0 0" 
                        dur="0.7s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Right leg */}
    <ellipse cx="112" cy="175" rx="8" ry="18" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;3 -3;-3 -5;0 0" 
                        dur="0.7s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Dancing sparkles */}
    <circle cx="50" cy="60" r="2" fill="#ff4500" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0;0.7" dur="1s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" 
                        values="1;1.5;1" dur="1s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="150" cy="70" r="2" fill="#ff4500" opacity="0.7">
      <animate attributeName="opacity" values="0;0.7;0" dur="1.2s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" 
                        values="1;1.5;1" dur="1.2s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="60" cy="160" r="2" fill="#ff4500" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0;0.7" dur="0.8s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" 
                        values="1;1.5;1" dur="0.8s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="140" cy="150" r="2" fill="#ff4500" opacity="0.7">
      <animate attributeName="opacity" values="0;0.7;0" dur="1.1s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="scale" 
                        values="1;1.5;1" dur="1.1s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

const SadSnoo: React.FC = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Background circle for visual appeal */}
    <circle cx="100" cy="100" r="95" fill="#f6f7f8" stroke="#ff4500" strokeWidth="3" opacity="0.3"/>
    
    {/* Snoo's body */}
    <ellipse cx="100" cy="130" rx="25" ry="35" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" 
                        values="0 100 130;-2 100 130;2 100 130;0 100 130" 
                        dur="1.5s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Snoo's head */}
    <circle cx="100" cy="80" r="28" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;-1 1;1 -1;0 0" 
                        dur="1.3s" repeatCount="indefinite"/>
    </circle>

    {/* Bent antenna at ~75 degrees */}
    <path d="M100 51 L92 38 L100 30" fill="none" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate"
                        values="0 100 52;-5 100 52;5 100 52;0 100 52"
                        dur="2s" repeatCount="indefinite"/>
    </path>

    {/* Circle at the tip of the antenna */}
    <circle cx="100" cy="30" r="4" fill="#ff4500">
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;-1 1;1 -1;0 0" 
                        dur="2s" repeatCount="indefinite"/>
    </circle>
    
    {/* Left eye */}
    <circle cx="90" cy="75" r="4" fill="#ff4500">
      <animate attributeName="r" values="4;3;4" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="91" cy="74" r="1" fill="white"/>
    
    {/* Right eye */}
    <circle cx="110" cy="75" r="4" fill="#ff4500">
      <animate attributeName="r" values="4;3;4" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="111" cy="74" r="1" fill="white"/>
    
    {/* Frown */}
    <path d="M 88 95 Q 100 85 112 95" stroke="#333" strokeWidth="2" fill="none">
      <animate attributeName="d" 
               values="M 88 95 Q 100 85 112 95;M 88 95 Q 100 82 112 95;M 88 95 Q 100 85 112 95" 
               dur="2.5s" repeatCount="indefinite"/>
    </path>
    
    {/* Left arm */}
    <ellipse cx="70" cy="120" rx="8" ry="20" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" 
                        values="-10 70 120;-15 70 120;-5 70 120;-10 70 120" 
                        dur="2s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Right arm */}
    <ellipse cx="130" cy="120" rx="8" ry="20" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="rotate" 
                        values="10 130 120;15 130 120;5 130 120;10 130 120" 
                        dur="2s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Left leg */}
    <ellipse cx="88" cy="175" rx="8" ry="18" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;-1 -2;1 -1;0 0" 
                        dur="1.8s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Right leg */}
    <ellipse cx="112" cy="175" rx="8" ry="18" fill="white" stroke="#333" strokeWidth="2">
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;1 -1;-1 -2;0 0" 
                        dur="1.8s" repeatCount="indefinite"/>
    </ellipse>
    
    {/* Agitated/irritated particles */}
    <circle cx="50" cy="60" r="1.5" fill="#ff4500" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;-2 -3;2 1;0 0" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="150" cy="70" r="1.5" fill="#ff4500" opacity="0.8">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.8s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;3 -2;-1 2;0 0" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="60" cy="160" r="1.5" fill="#ff4500" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.3s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;-3 1;1 -2;0 0" dur="1.3s" repeatCount="indefinite"/>
    </circle>
    
    <circle cx="140" cy="150" r="1.5" fill="#ff4500" opacity="0.8">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.7s" repeatCount="indefinite"/>
      <animateTransform attributeName="transform" type="translate" 
                        values="0 0;2 2;-3 -1;0 0" dur="1.7s" repeatCount="indefinite"/>
    </circle>
  </svg>
);