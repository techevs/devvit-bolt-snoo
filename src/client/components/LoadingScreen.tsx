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
              {/* Background circle for visual appeal */}
              <circle cx="100" cy="100" r="95" fill="#f6f7f8" stroke="#ff4500" strokeWidth="3" opacity="0.3" />

              {/* Snoo's body */}
              <ellipse cx="100" cy="130" rx="25" ry="35" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate"
                  values="0 100 130;5 100 130;-5 100 130;0 100 130"
                  dur="1s" repeatCount="indefinite" />
              </ellipse>

              {/* Snoo's head */}
              <circle cx="100" cy="80" r="28" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="translate"
                  values="0 0;2 -2;-2 -2;0 0"
                  dur="0.8s" repeatCount="indefinite" />
              </circle>

              {/* Bent antenna at ~75 degrees */}
              <path d="M100 51 L92 38 L100 30" fill="none" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate"
                  values="0 100 52;10 100 52;-10 100 52;0 100 52"
                  dur="1.2s" repeatCount="indefinite" />
              </path>

              {/* Circle at the tip of the antenna */}
              <circle cx="100" cy="30" r="4" fill="#ff4500">
                <animateTransform attributeName="transform" type="translate"
                  values="0 0;2 -2;-2 -2;0 0"
                  dur="1.2s" repeatCount="indefinite" />
              </circle>

              {/* Left eye */}
              <circle cx="90" cy="75" r="6" fill="#ff4500">
                <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="92" cy="73" r="2" fill="white" />

              {/* Right eye */}
              <circle cx="110" cy="75" r="6" fill="#ff4500">
                <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="112" cy="73" r="2" fill="white" />

              {/* Smile */}
              <path d="M 88 88 Q 100 98 112 88" stroke="#333" strokeWidth="2" fill="none">
                <animate attributeName="d"
                  values="M 88 88 Q 100 98 112 88;M 88 88 Q 100 102 112 88;M 88 88 Q 100 98 112 88"
                  dur="1.5s" repeatCount="indefinite" />
              </path>

              {/* Left arm */}
              <ellipse cx="70" cy="120" rx="8" ry="20" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate"
                  values="20 70 120;-30 70 120;40 70 120;20 70 120"
                  dur="0.6s" repeatCount="indefinite" />
              </ellipse>

              {/* Right arm */}
              <ellipse cx="130" cy="120" rx="8" ry="20" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate"
                  values="-20 130 120;30 130 120;-40 130 120;-20 130 120"
                  dur="0.6s" repeatCount="indefinite" />
              </ellipse>

              {/* Left leg */}
              <ellipse cx="88" cy="175" rx="8" ry="18" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="translate"
                  values="0 0;-3 -5;3 -3;0 0"
                  dur="0.7s" repeatCount="indefinite" />
              </ellipse>

              {/* Right leg */}
              <ellipse cx="112" cy="175" rx="8" ry="18" fill="white" stroke="#333" strokeWidth="2">
                <animateTransform attributeName="transform" type="translate"
                  values="0 0;3 -3;-3 -5;0 0"
                  dur="0.7s" repeatCount="indefinite" />
              </ellipse>

              {/* Dancing sparkles */}
              <circle cx="50" cy="60" r="2" fill="#ff4500" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0;0.7" dur="1s" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="scale"
                  values="1;1.5;1" dur="1s" repeatCount="indefinite" />
              </circle>

              <circle cx="150" cy="70" r="2" fill="#ff4500" opacity="0.7">
                <animate attributeName="opacity" values="0;0.7;0" dur="1.2s" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="scale"
                  values="1;1.5;1" dur="1.2s" repeatCount="indefinite" />
              </circle>

              <circle cx="60" cy="160" r="2" fill="#ff4500" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0;0.7" dur="0.8s" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="scale"
                  values="1;1.5;1" dur="0.8s" repeatCount="indefinite" />
              </circle>

              <circle cx="140" cy="150" r="2" fill="#ff4500" opacity="0.7">
                <animate attributeName="opacity" values="0;0.7;0" dur="1.1s" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="scale"
                  values="1;1.5;1" dur="1.1s" repeatCount="indefinite" />
              </circle>
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