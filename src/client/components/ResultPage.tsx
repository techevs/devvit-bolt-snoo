import React, { useState, useEffect } from 'react';

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
  "You're absolutely wonderful! 💕",
  "Your kindness makes my day brighter! ✨",
  "Thanks for being so sweet to me! 🥰",
  "You have the most beautiful heart! 💖",
  "Your love fills me with joy! 🌟",
  "You're my favorite human ever! 💝",
  "Your hugs are the best medicine! 🤗",
  "You make everything better just by being you! 🌈",
  "I'm so lucky to have your love! 🍀",
  "You're sweeter than all the cookies! 🍪",
  "Your smile could light up the universe! ⭐",
  "You're pure magic and sunshine! ☀️",
  "Thanks for choosing love over everything! 💞",
  "You're the reason I believe in goodness! 🌸",
  "Your heart is made of pure gold! 🏆",
  "You're my sunshine on cloudy days! 🌤️",
  "Love like yours is rare and precious! 💎",
  "You make the world a better place! 🌍",
  "Your kindness is contagious! 😊",
  "You're absolutely perfect just as you are! 🌺"
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
  "Stop being such a pain! ⚡"
];

const quirkMessages = [
  "Plot twist! Here's a random camel! 🐪",
  "Surprise! I'm feeling unexpectedly generous! 🎭",
  "Wait... did I just give you a sheep? Weird! 🐑",
  "My mood swings are legendary! 🎪",
  "Gotcha! Didn't see that coming, did you? 😏",
  "I'm full of surprises today! 🎲",
  "Sometimes I just do random things! 🤷",
  "Life's too short to be predictable! 🎨",
  "I march to the beat of my own drum! 🥁",
  "Expect the unexpected with me! 🎯",
  "I'm feeling mysteriously generous! 🔮",
  "My brain works in mysterious ways! 🧠",
  "Random acts of weirdness are my specialty! 🎪",
  "I like to keep things interesting! ⚡",
  "Why be normal when you can be quirky? 🦄",
  "I'm unpredictably awesome like that! 🌟",
  "Sometimes I surprise even myself! 😲",
  "I'm a walking contradiction! 🎭",
  "My logic is beautifully chaotic! 🌀",
  "I do what I want, when I want! 👑"
];

export const ResultPage: React.FC<ResultPageProps> = ({ loveCount, irritateCount, onRestart, onClose }) => {
  const [gift, setGift] = useState<{ emoji: string; name: string } | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isQuirky, setIsQuirky] = useState<boolean>(false);

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

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: getBackgroundGradient() }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">{getSnooEmoji()}</div>
        <div className="absolute top-20 right-16 text-4xl animate-pulse">✨</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce delay-300">🎉</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-pulse delay-500">⭐</div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 px-6 max-w-md">
        {/* Large Snoo emoji */}
        <div className="text-8xl mb-6 animate-bounce">
          {getSnooEmoji()}
        </div>

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