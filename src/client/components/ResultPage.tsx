import React, { useState, useEffect } from 'react';
import { TopNavigation } from './TopNavigation';
import { AboutGame } from './AboutGame';
import { MyScore } from './MyScore';

interface ResultPageProps {
  loveCount: number;
  irritateCount: number;
  onRestart: () => void;
  onClose: () => void;
}

// Gift options for different moods
const loveGifts = [
  { emoji: '🍫', name: 'Chocolate' },
  { emoji: '🍪', name: 'Cookie' },
  { emoji: '🍦', name: 'Ice Cream' }
];

const irritateGifts = [
  { emoji: '🗑️', name: 'Trash Pile' },
  { emoji: '👊', name: 'Punch' },
  { emoji: '🍎💀', name: 'Rotten Fruit' }
];

const quirkGifts = [
  { emoji: '🐪', name: 'Camel' },
  { emoji: '🐑', name: 'Sheep' },
  { emoji: '🦙', name: 'Llama' }
];

// Message collections
const loveMessages = [
  "Thinking of you always 💭❤️",
  "You make my heart smile 😊💓",
  "Your presence feels like home 🏡💕",
  "I adore everything about you 🥰🌸",
  "You are my sunshine ☀️💛",
  "Can't stop smiling because of you 😄💖",
  "You make life sweeter 🍯💗",
  "I'm lucky to have you 🍀❤️",
  "You're my favorite person 🫶🌟",
  "You mean the world to me 🌍💞",
  "I care about you deeply 💘🌷",
  "You make everything better ✨💗",
  "Forever thankful for you 🙏💓",
  "My heart is yours ❤️🔐",
  "You're my peace and comfort 🕊️🤗",
  "Just wanted to say I love you 💌❤️",
  "You're my little happy place 🌈🐻",
  "Cuddles soon? I miss you 🧸🤍",
  "You light up my life 💡💖",
  "You're my softest thought 💭💘",
];

const irritateMessages = [
  "Ugh, why are you so annoying? 😤",
  "You really know how to ruin my mood! 💢",
  "Thanks for nothing, you meanie! 😠",
  "You're the worst kind of person! 👿",
  "I can't stand your attitude! 🙄",
  "You make me want to hide forever! 😡",
  "Why do you have to be so mean? 💔",
  "You're absolutely terrible! 😾",
  "I wish you would just go away! 🚪",
  "You're ruining everything for me! 💥",
  "Your negativity is suffocating! 😵",
  "I hate when you do that to me! 😤",
  "You're the reason I'm grumpy! 😒",
  "Thanks for making me feel awful! 💀",
  "You're impossible to deal with! 🤬",
  "Why can't you just be nice? 😢",
  "You're giving me a headache! 🤕",
  "I'm so done with your nonsense! 🙃",
  "You're the absolute worst! 👎",
  "Stop being such a pain! ⚡",
];

const quirkMessages = [
  "Who let you be this cute? 😏",
  "Stop stealing my thoughts, thief! 🧠💥",
  "You again? Lucky me. 😜",
  "Your sarcasm needs a warning label. ⚠️😆",
  "You're weird. I like it. 🌀❤️",
  "Guess who's awesome? Yep, still you. 😎",
  "You talk too much. Don't stop. 😂",
  "Are you this cool on purpose? 🧊🔥",
  "Brains and looks? Greedy. 😏📚",
  "Flirting level: mildly dangerous. 😈",
  "You're my favorite distraction. 📵💘",
  "If annoying was cute... oh wait. 🐒💖",
  "Can you be less charming? No? Okay. 😒",
  "You're lucky you're cute. 😬❤️",
  "You had me at 'ugh'. 😆💘",
  "Did we just vibe or glitch? 🤖🎶",
  "You're chaos. Beautiful chaos. 🌪️✨",
  "Too much cute. Please reboot. 💻🐶",
  "Did it hurt? When you stole my snack? 🍪👀",
  "Stop texting. I miss you more now. 🙄💌",
];

export const ResultPage: React.FC<ResultPageProps> = ({ loveCount, irritateCount, onRestart, onClose }) => {
  const [gift, setGift] = useState<{ emoji: string; name: string } | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isQuirky, setIsQuirky] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const totalClicks = loveCount + irritateCount;
  const isLoveWinner = loveCount > irritateCount;
  const isDraw = loveCount === irritateCount;

  useEffect(() => {
    // 20% chance for quirky behavior
    const shouldBeQuirky = Math.random() < 0.2;
    setIsQuirky(shouldBeQuirky);

    if (shouldBeQuirky) {
      // Quirky behavior
      const randomGift = quirkGifts[Math.floor(Math.random() * quirkGifts.length)];
      const randomMessage = quirkMessages[Math.floor(Math.random() * quirkMessages.length)];
      setGift(randomGift);
      setMessage(randomMessage);
    } else {
      // Normal behavior based on results
      if (totalClicks === 0) {
        setGift(null);
        setMessage("I'm just waiting here... 😴");
      } else if (isDraw) {
        setGift(null);
        setMessage("I'm so confused right now! 🤔");
      } else if (isLoveWinner) {
        const randomGift = loveGifts[Math.floor(Math.random() * loveGifts.length)];
        const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        setGift(randomGift);
        setMessage(randomMessage);
      } else {
        const randomGift = irritateGifts[Math.floor(Math.random() * irritateGifts.length)];
        const randomMessage = irritateMessages[Math.floor(Math.random() * irritateMessages.length)];
        setGift(randomGift);
        setMessage(randomMessage);
      }
    }
  }, [loveCount, irritateCount, totalClicks, isLoveWinner, isDraw]);

  const getResultMessage = () => {
    if (isQuirky) {
      return "Snoo is feeling quirky! 🎭";
    } else if (isDraw && totalClicks > 0) {
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
    if (isQuirky) {
      return 'linear-gradient(135deg, #a8e6cf, #dcedc1, #ffd3a5, #fd9853)';
    } else if (isDraw) {
      return 'linear-gradient(135deg, #ff9ff3, #54a0ff)';
    } else if (isLoveWinner) {
      return 'linear-gradient(135deg, #ff6b81, #ff9ff3)';
    } else {
      return 'linear-gradient(135deg, #ff9f43, #ee5253)';
    }
  };

  const getSnooEmoji = () => {
    if (isQuirky) return '🎭';
    if (isDraw) return '🤔';
    if (isLoveWinner) return '🥰';
    if (irritateCount > 0) return '😤';
    return '😴';
  };

  // ✅ FIXED: Proper navigation handlers
  const handleAboutGame = () => {
    setShowAbout(true);
  };

  const handleMyScore = () => {
    setShowScore(true);
  };

  // ✅ FIXED: Show About Game page
  if (showAbout) {
    return <AboutGame onClose={() => setShowAbout(false)} />;
  }

  // ✅ FIXED: Show My Score page with proper data
  if (showScore) {
    return (
      <MyScore
        onClose={() => setShowScore(false)}
        totalGamesPlayed={1} // This game just finished
        totalClicks={totalClicks}
        totalTimeSpent={10}
        bestClickSpeed={Math.round((totalClicks / 10) * 10) / 10}
        favoriteAction={isLoveWinner ? 'love' : irritateCount > loveCount ? 'irritate' : 'balanced'}
      />
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: getBackgroundGradient() }}
    >
      {/* ✅ FIXED: Top Navigation with working handlers */}
      <TopNavigation
        onAboutGame={handleAboutGame}
        onMyScore={handleMyScore}
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">{getSnooEmoji()}</div>
        <div className="absolute top-20 right-16 text-4xl animate-pulse">✨</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce delay-300">🎉</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-pulse delay-500">⭐</div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 px-6 max-w-md">

        {/* Result message */}
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {getResultMessage()}
        </h1>

        {/* Gift section */}
        {gift && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3" style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Snoo gives you:
            </h3>
            <div className="inline-block p-4 rounded-2xl border-4 border-white bg-white shadow-lg">
              <div className="text-6xl mb-2">{gift.emoji}</div>
              <div className="text-lg font-semibold text-gray-800">{gift.name}</div>
            </div>
          </div>
        )}

        {/* Message from Snoo */}
        <div className="rounded-2xl p-4 mb-8 border-2" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>
            Snoo says:
          </h3>
          <p className="text-base italic" style={{ color: '#ffffff' }}>
            "{message}"
          </p>
        </div>

        {/* Action buttons - now horizontal */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
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
            className="px-6 py-3 rounded-full font-bold text-lg border-2 hover:transform hover:-translate-y-1 transition-all duration-200"
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