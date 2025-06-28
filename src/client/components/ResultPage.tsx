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
  "I choose you. Always. 💍💞",
  "You're my daily dose of joy 😍☀️",
  "Love you more every day 📈❤️",
  "You make my heart feel safe 🛡️💗",
  "Just here to remind you: you're loved ❤️✨",
  "I'm so proud of you 👏💖",
  "Your smile is my favorite thing 😊🌹",
  "I'm hugging you in my mind 🤗💞",
  "Miss you more than words 🥺💌",
  "You're my everything 💕🌎",
  "I want to hold your hand 🤝💘",
  "You're magic to me ✨❤️",
  "You're my sweetest hello 🥰🌼",
  "You have my whole heart ❤️🫀",
  "Your voice is my comfort 🎶💗",
  "I'm always rooting for you 🌱💪",
  "I love how you love 🫶💖",
  "Let's stay this close forever 🤍🔗",
  "Just thinking about your smile 😁❤️",
  "You're my little miracle 🌟💛",
  "You're the cutest human 🐻💓",
  "Can I keep you forever? 💞🧸",
  "You're my favorite feeling 💘🌤️",
  "Your laugh is my favorite sound 🎧😂",
  "I'm so lucky you exist 🌍💝",
  "You make my heart full 💓🍃",
  "You're my reason to smile 😊💖",
  "You're wrapped in my love 🎁💞",
  "You're my safe haven 🏡💗",
  "Forever isn't long enough with you 💖🕰️"
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
  "You're like a bad Wi-Fi signal — always ruining everything! 📶❌",
  "Talking to you lowers my IQ. 📉",
  "You're the human version of a pop-up ad. 🚫",
  "My life was better five minutes ago. ⏳",
  "If I had a dollar for every time you annoyed me, I'd be rich and far away. 💸✈️",
  "You're what happens when autocorrect gives up. 🔡",
  "Why are you like this? Seriously. 🤨",
  "I didn't think it was possible to disappoint me this much. 😩",
  "You're a walking disaster with wi-fi access. 📱💥",
  "You should come with a warning label. 🚷",
  "Just when I thought you couldn't get worse… surprise! 🎉😒",
  "You ruin everything like pineapple on pizza. 🍍🚫🍕",
  "You're like a fart in a space suit — inescapably awful. 👨‍🚀💨",
  "My brain short-circuits when you talk. 🔌⚠️",
  "You're the emotional equivalent of stepping on a LEGO. 🧱😫",
  "I trusted you. That was my first mistake. 😤",
  "Your existence is like buffering — constant and infuriating. 🔄",
  "You're so annoying, you should be illegal. 🚔",
  "Your face makes me want to uninstall life. 🖥️🗑️",
  "You're the glitch in my otherwise perfect day. 🐛",
  "You're about as helpful as a screen door on a submarine. 🚪🌊",
  "Stop talking before I lose all hope in humanity. 🌍😖",
  "You're emotionally allergic to being decent. 🤧",
  "Every interaction with you is a personal attack. 🧨",
  "You're like a sneeze that never comes — annoying and unsatisfying. 😤",
  "You were born to test my patience. 🧪",
  "You're the villain in the story of my day. 📖💀",
  "You drain my energy like a vampire with a coffee addiction. 🧛☕",
  "You're like a mosquito — loud, annoying, and impossible to ignore. 🦟",
  "You're not just a bad vibe — you're the whole toxic atmosphere. ☠️",
  "You're like an expired coupon — worthless and disappointing. 🧾",
  "I can't tell if you're trolling or just naturally unbearable. 🤡",
  "You're like a virus in my perfectly functioning system. 🦠💻",
  "I want to mute you in real life. 🔇",
  "You're the worst kind of plot twist. 📉",
  "You're not even original in being awful. 🥱",
  "You're the r/unpopularopinion of my day 👎📉",
  "Every time you speak, I lose brain cells 🧠🔻",
  "You're like r/woosh but IRL 😮💨",
  "Your takes are so bad they should be auto-modded 🚫🤖",
  "You're basically a downvote in human form 👤🔽",
  "You give main character energy... in a horror film 👻",
  "Talking to you is like reading Facebook comments 🧓🔥",
  "You're a hot mess without the hot 🔥🙃",
  "You're like the YouTube ad before the good part 😑⏳",
  "Your vibe = ragebait thumbnail 😡🖼️",
  "You're the reason I mute subreddits 🔇🔍",
  "You're a Reddit thread with 0 context and 4000 comments 🤯",
  "You're emotionally built like r/iamverysmart 🤓🚪",
  "You're the 'TL;DR' to my patience 🧾😤",
  "You're the reason I draft replies and never send them 📝💀",
  "You’re a drama thread with no OP replies 😒📉",
  "You make r/mildlyinfuriating look peaceful 😩🧘",
  "You post cringe. Constantly. 🚫🧀",
  "You're like a r/relationship_advice post gone wrong 😬💔",
  "If I wanted chaos, I’d just go to the comments 🔥🗯️",
  "You're basically my favorite notification 🥺📱",
  "You + me = top comment ❤️✨",
  "Wholesome overload detected 😳💓",
  "You're the serotonin to my doomscrolling 🌈📱",
  "10/10 would simp again 💘😅",
  "You're the reason I still have hope in humanity 🙏💕",
  "Certified wholesome content 🏅💖",
  "You're my daily karma boost 🔼💞",
  "Plot twist: I adore you 🌀❤️",
  "You complete my weird little algorithm 🧠💓",
  "I upvote your existence 📈❤️",
  "This just in: you're amazing 📰💘",
  "You're the cozy part of my internet 🧣🌐",
  "Emotional support human status: confirmed 💼💗",
  "Your vibes are mod-approved ☀️🛡️",
  "You're why I don’t log off 💻❤️",
  "Wholesome.exe successfully loaded 🧸💞",
  "You're my favorite mutual 🫶✨",
  "You're the kind comment in my angry thread 💌🔥",
  "Came for the memes, stayed for you 🧡😅",
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
  "Your face = my favorite meme. 🤣😍",
  "You're 99% charm, 1% sense. 💁‍♂️🧠",
  "I tolerate you. Proudly. 😂",
  "You're illegally good at this. 🚓💘",
  "Keep being annoying. It's working. 😤💓",
  "I'd fight for you. Probably lose. 🥊❤️",
  "You're my favorite notification. 📱💥",
  "If I roll my eyes any harder… 🙄💘",
  "Can you not be perfect? Rude. 😒",
  "Cute? Yes. Trouble? Definitely. 😇🔥",
  "Don't smile. It's distracting. 😶❤️",
  "You're oddly loveable. Oddly. 💥💕",
  "You're a walking plot twist. 📚🤪",
  "You're the reason autocorrect hates me. 📱😅",
  "Your brain should be studied. 🧠🔬",
  "I like you. Don't get used to it. 😏",
  "You're chaos with cute shoes. 👟💥",
  "Even your typos are charming. 📝💘",
  "If sarcasm was a language… 😜",
  "Who needs coffee? I have you. ☕💫",
  "You're not wrong. Just... rarely right. 😆",
  "You flirt like a confused emoji. 😳💬",
  "You're my favorite why. ❓❤️",
  "Weird. Funny. Yours. In that order. 🌀🤣❤️",
  "I tolerate you best. 👌💘",
  "You're the glitch I want. 🖥️❤️",
  "You plus me = mild chaos. 🔥👯",
  "I blame you for my grin. 😁🎯",
  "You're like WiFi—unavailable sometimes. 📶🙃",
  "Stay weird. It suits you. 😜🎩",
  "You're suspiciously awesome. 🔍✨",
  "You're the human version of r/wholesomememes 🧠💘",
  "Your energy is chaotic-good but mostly chaotic 🌪️❤️",
  "Certified r/aww moment, but with more sarcasm 🐸✨",
  "You're like a meme with feelings 😎🫶",
  "Flirting? No. This is just emotionally shitposting 💬💘",
  "You're why Reddit needs a 'love react' 💕🖱️",
  "You're a niche meme I accidentally fell for 📉💖",
  "You're weird in a 'top comment' kinda way 🧠🌟",
  "You're like my favorite sub — always surprising and mildly cursed 🔥🧸",
  "You're that one wholesome reply in a dumpster fire thread 🧯💗",
  "You + me = thread derailment 🔥😈",
  "Your face belongs on the front page of my heart 📰❤️",
  "You're basically my favorite glitch 🧬💘",
  "You're what I imagine when the internet says 'he's just a little guy' 🐣💖",
  "You're like a mood board made of cursed memes and hugs 🖼️🤗",
  "My brain says 'no', but my serotonin says 'you' 📉😊",
  "You're suspiciously perfect. Like a bot... but hotter 🤖🔥",
  "If loving you is cringe, then I'm r/cringe 💘🫡",
  "You're like a Reddit gold moment IRL 🥇💞",
  "You're the plot twist no one asked for — but I’m into it 🔀❤️",
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