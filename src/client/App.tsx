import React, { useState, useRef, useEffect } from 'react';
import { SnooAnimation } from './components/SnooAnimation';
import { GameControls } from './components/GameControls';
import { Counter } from './components/Counter';
import { EmojiEffect } from './components/EmojiEffect';
import { Timer } from './components/Timer';
import { ResultPage } from './components/ResultPage';
import { LoadingScreen } from './components/LoadingScreen';
import { AboutGame } from './components/AboutGame';
import { MyScore } from './components/MyScore';
import { LeaderDashboard } from './components/LeaderDashboard';
import { TopNavigation } from './components/TopNavigation';

type GameState = 'loading' | 'playing' | 'finished' | 'about' | 'score' | 'leaderboard';
type ClickSpeed = 'no-clicks' | 'very-slow' | 'slow' | 'normal' | 'fast' | 'very-fast';

export const App = () => {
  const [gameState, setGameState] = useState<GameState>('loading');
  const [snooMood, setSnooMood] = useState<'happy' | 'sad'>('happy');
  const [loveCount, setLoveCount] = useState(0);
  const [irritateCount, setIrritateCount] = useState(0);
  const [emojis, setEmojis] = useState<Array<{ id: number; type: 'love' | 'irritate'; x: number; y: number; dx: number; dy: number }>>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [disabledButton, setDisabledButton] = useState<'love' | 'irritate' | null>(null);
  const [clickSpeed, setClickSpeed] = useState<ClickSpeed>('no-clicks');
  
  // Stats tracking
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [bestClickSpeed, setBestClickSpeed] = useState(0);
  const [favoriteAction, setFavoriteAction] = useState<'love' | 'irritate' | 'balanced'>('balanced');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedCheckRef = useRef<NodeJS.Timeout | null>(null);
  const clickTimestamps = useRef<number[]>([]);
  const lastClickTime = useRef<number>(0);

  // Loading effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setGameState('playing');
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Timer countdown - runs independently
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      setGameState('finished');
      // Update stats when game finishes
      setTotalGamesPlayed(prev => prev + 1);
      setTotalClicks(prev => prev + loveCount + irritateCount);
      setTotalTimeSpent(prev => prev + 10);
      
      // Calculate click speed for this game
      const totalGameClicks = loveCount + irritateCount;
      const gameClickSpeed = totalGameClicks / 10; // clicks per second
      setBestClickSpeed(prev => Math.max(prev, gameClickSpeed));
      
      // Update favorite action
      if (loveCount > irritateCount) {
        setFavoriteAction('love');
      } else if (irritateCount > loveCount) {
        setFavoriteAction('irritate');
      } else {
        setFavoriteAction('balanced');
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, gameStarted, loveCount, irritateCount]);

  // Speed calculation - runs every 500ms when game is active
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const checkSpeed = () => {
        const now = Date.now();
        const totalClicks = loveCount + irritateCount;
        
        // If no clicks at all
        if (totalClicks === 0) {
          setClickSpeed('no-clicks');
        } else {
          // Check recent activity (last 3 seconds)
          const recentClicks = clickTimestamps.current.filter(timestamp => now - timestamp < 3000);
          const timeSinceLastClick = now - lastClickTime.current;
          
          // If no recent clicks (more than 3 seconds since last click)
          if (timeSinceLastClick > 3000) {
            setClickSpeed('very-slow');
          } else {
            // Calculate clicks per second based on recent activity
            const clicksPerSecond = recentClicks.length / 3;
            
            if (clicksPerSecond >= 2.5) {
              setClickSpeed('very-fast');
            } else if (clicksPerSecond >= 1.5) {
              setClickSpeed('fast');
            } else if (clicksPerSecond >= 0.8) {
              setClickSpeed('normal');
            } else {
              setClickSpeed('slow');
            }
          }
        }
      };

      // Initial check
      checkSpeed();
      
      // Set up interval for continuous speed checking
      speedCheckRef.current = setInterval(checkSpeed, 500);
    }

    return () => {
      if (speedCheckRef.current) {
        clearInterval(speedCheckRef.current);
      }
    };
  }, [gameStarted, timeLeft, loveCount, irritateCount]);

  const handleAction = (type: 'love' | 'irritate') => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const now = Date.now();
    lastClickTime.current = now;

    // Track click timestamp
    clickTimestamps.current.push(now);
    // Keep only last 20 clicks for performance
    if (clickTimestamps.current.length > 20) {
      clickTimestamps.current = clickTimestamps.current.slice(-20);
    }

    if (type === 'love') {
      setLoveCount(prev => prev + 1);
      setSnooMood('happy');
      setDisabledButton('irritate');
    } else {
      setIrritateCount(prev => prev + 1);
      setSnooMood('sad');
      setDisabledButton('love');
    }

    createEmojiEffects(type);
  };

  const createEmojiEffects = (type: 'love' | 'irritate') => {
    const newEmojis = [];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = 80 + Math.random() * 40;
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;

      const throwDistance = 200 + Math.random() * 300;
      const throwAngle = Math.random() * 2 * Math.PI;
      const endX = Math.cos(throwAngle) * throwDistance;
      const endY = Math.sin(throwAngle) * throwDistance;

      newEmojis.push({
        id: Date.now() + i,
        type,
        x: startX,
        y: startY,
        dx: endX,
        dy: endY,
      });
    }

    setEmojis(prev => [...prev, ...newEmojis]);

    setTimeout(() => {
      setEmojis(prev => prev.filter(emoji => !newEmojis.some(newEmoji => newEmoji.id === emoji.id)));
    }, 3000);
  };

  const handleRestart = () => {
    setGameState('playing');
    setSnooMood('happy');
    setLoveCount(0);
    setIrritateCount(0);
    setEmojis([]);
    setTimeLeft(10);
    setGameStarted(false);
    setDisabledButton(null);
    setClickSpeed('no-clicks');
    clickTimestamps.current = [];
    lastClickTime.current = 0;
    
    // Clear all timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (speedCheckRef.current) {
      clearInterval(speedCheckRef.current);
    }
  };

  const handleClose = () => {
    handleRestart();
  };

  if (gameState === 'loading') {
    return <LoadingScreen />;
  }

  if (gameState === 'about') {
    return <AboutGame onClose={() => setGameState('playing')} />;
  }

  if (gameState === 'score') {
    return (
      <MyScore
        onClose={() => setGameState('playing')}
        totalGamesPlayed={totalGamesPlayed}
        totalClicks={totalClicks}
        totalTimeSpent={totalTimeSpent}
        bestClickSpeed={Math.round(bestClickSpeed * 10) / 10}
        favoriteAction={favoriteAction}
      />
    );
  }

  if (gameState === 'leaderboard') {
    return <LeaderDashboard onClose={() => setGameState('playing')} />;
  }

  if (gameState === 'finished') {
    return (
      <ResultPage
        loveCount={loveCount}
        irritateCount={irritateCount}
        onRestart={handleRestart}
        onClose={handleClose}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top Navigation */}
      <TopNavigation
        onAboutGame={() => setGameState('about')}
        onMyScore={() => setGameState('score')}
        onLeaderboard={() => setGameState('leaderboard')}
      />

      {/* Timer */}
      {gameStarted && (
        <Timer timeLeft={timeLeft} />
      )}

      {/* Main content container */}
      <div className="flex-1 flex items-center justify-center pt-8 pb-32" ref={containerRef}>
        <div className="text-center relative">
          <div className="relative inline-block">
            <SnooAnimation mood={snooMood} />
            {emojis.map(emoji => (
              <EmojiEffect
                key={emoji.id}
                type={emoji.type}
                x={emoji.x}
                y={emoji.y}
                dx={emoji.dx}
                dy={emoji.dy}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed positioned UI elements */}
      <Counter loveCount={loveCount} irritateCount={irritateCount} clickSpeed={clickSpeed} />
      <GameControls 
        onAction={handleAction} 
        disabled={timeLeft === 0}
        disabledButton={disabledButton}
      />
    </div>
  );
};