import React from 'react';
import { TopNavigation } from './TopNavigation';
import { AboutGame } from './AboutGame';

interface MyScoreProps {
  onClose: () => void;
  totalGamesPlayed: number;
  totalClicks: number;
  totalTimeSpent: number;
  bestClickSpeed: number;
  favoriteAction: 'love' | 'irritate' | 'balanced';
}

export const MyScore: React.FC<MyScoreProps> = ({ 
  onClose, 
  totalGamesPlayed, 
  totalClicks, 
  totalTimeSpent, 
  bestClickSpeed,
  favoriteAction 
}) => {
  const [showAbout, setShowAbout] = React.useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const getActionEmoji = () => {
    switch (favoriteAction) {
      case 'love': return '❤️';
      case 'irritate': return '😤';
      default: return '⚖️';
    }
  };

  const getActionText = () => {
    switch (favoriteAction) {
      case 'love': return 'Lover';
      case 'irritate': return 'Troublemaker';
      default: return 'Balanced';
    }
  };

  const handleAboutGame = () => {
    setShowAbout(true);
  };

  const handleMyScore = () => {
    // Already on score page, do nothing
  };

  // Show About Game page
  if (showAbout) {
    return <AboutGame onClose={() => setShowAbout(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Top Navigation */}
      <TopNavigation
        onAboutGame={handleAboutGame}
        onMyScore={handleMyScore}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center text-xl transition-all duration-200 text-white"
      >
        ✖️
      </button>

      {/* Content */}
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          My Score Card
        </h1>
        
        <div className="text-4xl mb-6">📊</div>

        {/* Stats Cards */}
        <div className="space-y-4">
          {/* Games Played */}
          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎮</span>
                <span className="text-white font-semibold">Games Played</span>
              </div>
              <span className="text-white text-xl font-bold">{totalGamesPlayed}</span>
            </div>
          </div>

          {/* Total Clicks */}
          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👆</span>
                <span className="text-white font-semibold">Total Clicks</span>
              </div>
              <span className="text-white text-xl font-bold">{totalClicks}</span>
            </div>
          </div>

          {/* Time Spent */}
          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <span className="text-white font-semibold">Time Spent</span>
              </div>
              <span className="text-white text-xl font-bold">{formatTime(totalTimeSpent)}</span>
            </div>
          </div>

          {/* Best Click Speed */}
          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span className="text-white font-semibold">Best Speed</span>
              </div>
              <span className="text-white text-xl font-bold">{bestClickSpeed} clicks/sec</span>
            </div>
          </div>

          {/* Player Type */}
          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getActionEmoji()}</span>
                <span className="text-white font-semibold">Player Type</span>
              </div>
              <span className="text-white text-xl font-bold">{getActionText()}</span>
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 border-2 border-yellow-300">
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-white font-bold text-lg">
                {totalGamesPlayed >= 10 ? 'Snoo Master' : 
                 totalGamesPlayed >= 5 ? 'Snoo Friend' : 
                 totalGamesPlayed >= 1 ? 'Snoo Rookie' : 'New Player'}
              </div>
              <div className="text-white text-sm opacity-90">
                {totalGamesPlayed >= 10 ? 'You\'ve mastered the art of Snoo!' : 
                 totalGamesPlayed >= 5 ? 'Snoo really likes you!' : 
                 totalGamesPlayed >= 1 ? 'Welcome to the Snoo family!' : 'Play your first game!'}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-8 py-3 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Back to Game 🎮
        </button>
      </div>
    </div>
  );
};