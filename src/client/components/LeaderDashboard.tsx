import React from 'react';
import { TopNavigation } from './TopNavigation';
import { AboutGame } from './AboutGame';
import { MyScore } from './MyScore';

interface LeaderDashboardProps {
  onClose: () => void;
}

// Dummy data for the leaderboard
const topPlayers = [
  { username: 'SnooLover2024', totalGames: 47, totalClicks: 1250, avgSpeed: 4.2 },
  { username: 'RedditMaster', totalGames: 38, totalClicks: 980, avgSpeed: 3.8 },
  { username: 'ClickChampion', totalGames: 35, totalClicks: 1100, avgSpeed: 4.5 },
  { username: 'GameAddict99', totalGames: 29, totalClicks: 750, avgSpeed: 3.2 },
  { username: 'SnooFriend', totalGames: 25, totalClicks: 680, avgSpeed: 3.9 },
];

const snooBehavior = [
  { category: 'Max Love Gifts', username: 'SnooLover2024', count: 89 },
  { category: 'Max Irritating Gifts', username: 'TroubleMaker42', count: 67 },
  { category: 'Maximum Quirky/Witty Gifts', username: 'WeirdoKing', count: 34 },
];

const topComebacks = {
  love: [
    "Thinking of you always 💭❤️",
    "You make my heart smile 😊💓",
    "Your presence feels like home 🏡💕"
  ],
  irritate: [
    "Ugh, why are you so annoying? 😤",
    "You really know how to ruin my mood! 💢",
    "Thanks for nothing, you meanie! 😠"
  ],
  quirky: [
    "Who let you be this cute? 😏",
    "Stop stealing my thoughts, thief! 🧠💥",
    "You again? Lucky me. 😜"
  ]
};

export const LeaderDashboard: React.FC<LeaderDashboardProps> = ({ onClose }) => {
  const [showAbout, setShowAbout] = React.useState(false);
  const [showScore, setShowScore] = React.useState(false);

  const handleAboutGame = () => {
    setShowAbout(true);
  };

  const handleMyScore = () => {
    setShowScore(true);
  };

  const handleLeaderboard = () => {
    // Already on leaderboard page, do nothing
  };

  // Show About Game page
  if (showAbout) {
    return <AboutGame onClose={() => setShowAbout(false)} />;
  }

  // Show My Score page
  if (showScore) {
    return (
      <MyScore
        onClose={() => setShowScore(false)}
        totalGamesPlayed={0}
        totalClicks={0}
        totalTimeSpent={0}
        bestClickSpeed={0}
        favoriteAction={'balanced'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex flex-col items-center justify-start relative overflow-hidden">
      {/* Top Navigation */}
      <TopNavigation
        onAboutGame={handleAboutGame}
        onMyScore={handleMyScore}
        onLeaderboard={handleLeaderboard}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center text-xl transition-all duration-200 text-white"
      >
        ✖️
      </button>

      {/* Scrollable Content */}
      <div className="w-full max-w-4xl px-6 py-20 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            🏆 Leader Dashboard
          </h1>
          <p className="text-white text-lg opacity-90">
            See who's dominating the Snoo universe!
          </p>
        </div>

        {/* Top Players Score Table */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-30">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🎮 Top Players
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-2 text-white font-semibold">Rank</th>
                  <th className="text-left py-3 px-2 text-white font-semibold">Username</th>
                  <th className="text-center py-3 px-2 text-white font-semibold">Games</th>
                  <th className="text-center py-3 px-2 text-white font-semibold">Clicks</th>
                  <th className="text-center py-3 px-2 text-white font-semibold">Avg Speed</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((player, index) => (
                  <tr key={player.username} className="border-b border-gray-700 hover:bg-purple-500 hover:bg-opacity-20 transition-colors">
                    <td className="py-3 px-2">
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-white font-medium">u/{player.username}</td>
                    <td className="py-3 px-2 text-center text-white">{player.totalGames}</td>
                    <td className="py-3 px-2 text-center text-white">{player.totalClicks}</td>
                    <td className="py-3 px-2 text-center text-white">{player.avgSpeed} c/s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Snoo's Behavior Table */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-30">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🎭 Snoo's Behavior Champions
          </h2>
          <div className="space-y-4">
            {snooBehavior.map((behavior, index) => (
              <div key={behavior.category} className="flex items-center justify-between p-4 bg-gray-800 bg-opacity-60 rounded-xl border border-gray-600 border-opacity-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {behavior.category.includes('Love') ? '❤️' : 
                     behavior.category.includes('Irritating') ? '😤' : '🎪'}
                  </span>
                  <div>
                    <div className="text-white font-semibold">{behavior.category}</div>
                    <div className="text-gray-300 text-sm">u/{behavior.username}</div>
                  </div>
                </div>
                <div className="text-white text-xl font-bold">
                  {behavior.count} gifts
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Snoo's Comebacks Table */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-30">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            💬 Snoo's Top Comebacks
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Love Comebacks */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-pink-300 flex items-center gap-2">
                ❤️ Love Category
              </h3>
              {topComebacks.love.map((comeback, index) => (
                <div key={index} className="p-3 bg-pink-500 bg-opacity-20 rounded-lg border border-pink-400 border-opacity-30">
                  <div className="flex items-start gap-2">
                    <span className="text-pink-300 font-bold text-sm">#{index + 1}</span>
                    <p className="text-white text-sm italic">"{comeback}"</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Irritate Comebacks */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-300 flex items-center gap-2">
                😤 Irritate Category
              </h3>
              {topComebacks.irritate.map((comeback, index) => (
                <div key={index} className="p-3 bg-red-500 bg-opacity-20 rounded-lg border border-red-400 border-opacity-30">
                  <div className="flex items-start gap-2">
                    <span className="text-red-300 font-bold text-sm">#{index + 1}</span>
                    <p className="text-white text-sm italic">"{comeback}"</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quirky Comebacks */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-yellow-300 flex items-center gap-2">
                🎪 Quirky Category
              </h3>
              {topComebacks.quirky.map((comeback, index) => (
                <div key={index} className="p-3 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-400 border-opacity-30">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-300 font-bold text-sm">#{index + 1}</span>
                    <p className="text-white text-sm italic">"{comeback}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center pt-4">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Back to Game 🎮
          </button>
        </div>
      </div>
    </div>
  );
};