import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 text-4xl animate-bounce">🎮</div>
        <div className="absolute top-32 right-24 text-3xl animate-pulse delay-300">✨</div>
        <div className="absolute bottom-40 left-16 text-5xl animate-bounce delay-500">🎯</div>
        <div className="absolute bottom-24 right-20 text-4xl animate-pulse delay-700">⭐</div>
        <div className="absolute top-1/2 left-10 text-3xl animate-bounce delay-1000">🎪</div>
        <div className="absolute top-1/3 right-12 text-4xl animate-pulse delay-1200">🎨</div>
      </div>

      {/* Main loading content */}
      <div className="text-center z-10 px-6">
        {/* Animated Snoo */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto animate-bounce">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Simple animated Snoo for loading */}
              <circle cx="100" cy="100" r="95" fill="#f6f7f8" stroke="#ff4500" strokeWidth="3" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              
              <ellipse cx="100" cy="130" rx="25" ry="35" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate" 
                                  values="0 100 130;10 100 130;-10 100 130;0 100 130" 
                                  dur="2s" repeatCount="indefinite"/>
              </ellipse>
              
              <circle cx="100" cy="80" r="28" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="scale" 
                                  values="1;1.1;1" 
                                  dur="1.5s" repeatCount="indefinite"/>
              </circle>

              <path d="M100 51 L92 38 L100 30" fill="none" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate"
                                  values="0 100 52;20 100 52;-20 100 52;0 100 52"
                                  dur="2s" repeatCount="indefinite"/>
              </path>

              <circle cx="100" cy="30" r="4" fill="#ff4500">
                <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite"/>
              </circle>
              
              <circle cx="90" cy="75" r="6" fill="#ff4500"/>
              <circle cx="92" cy="73" r="2" fill="white"/>
              
              <circle cx="110" cy="75" r="6" fill="#ff4500"/>
              <circle cx="112" cy="73" r="2" fill="white"/>
              
              <path d="M 88 88 Q 100 98 112 88" stroke="#333" strokeWidth="2" fill="none">
                <animate attributeName="d" 
                         values="M 88 88 Q 100 98 112 88;M 88 88 Q 100 105 112 88;M 88 88 Q 100 98 112 88" 
                         dur="2s" repeatCount="indefinite"/>
              </path>
              
              <ellipse cx="70" cy="120" rx="8" ry="20" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate" 
                                  values="0 70 120;30 70 120;-30 70 120;0 70 120" 
                                  dur="1.5s" repeatCount="indefinite"/>
              </ellipse>
              
              <ellipse cx="130" cy="120" rx="8" ry="20" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate" 
                                  values="0 130 120;-30 130 120;30 130 120;0 130 120" 
                                  dur="1.5s" repeatCount="indefinite"/>
              </ellipse>
              
              <ellipse cx="88" cy="175" rx="8" ry="18" fill="white" stroke="#333" strokeWidth="2"/>
              <ellipse cx="112" cy="175" rx="8" ry="18" fill="white" stroke="#333" strokeWidth="2"/>
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Surprise Snoo
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 flex items-center justify-center gap-2">
          <span className="animate-spin">🎪</span>
          Loading a silly game...
        </p>

        {/* Loading dots animation */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
};