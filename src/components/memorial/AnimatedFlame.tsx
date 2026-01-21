'use client';

import { useEffect, useState } from 'react';

interface AnimatedFlameProps {
  isLit: boolean;
  isAnimating: boolean;
}

const AnimatedFlame = ({ isLit, isAnimating }: AnimatedFlameProps) => {
  const [flameScale, setFlameScale] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      // Flame springs up dramatically
      setFlameScale(0);
      const timer1 = setTimeout(() => setFlameScale(1.2), 50);
      const timer2 = setTimeout(() => setFlameScale(1), 300);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (isLit) {
      setFlameScale(1);
    } else {
      setFlameScale(0);
    }
  }, [isLit, isAnimating]);

  return (
    <div className="relative w-20 h-36 flex items-end justify-center mx-auto">
      {/* Candle base */}
      <div className="absolute bottom-0 w-10 h-24 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 dark:from-amber-200 dark:via-amber-300 dark:to-amber-400 rounded-t-lg shadow-lg">
        {/* Wax drip effect */}
        <div className="absolute top-0 left-1 w-2 h-4 bg-amber-100/80 dark:bg-amber-200/80 rounded-b-full" />
        <div className="absolute top-0 right-2 w-1.5 h-3 bg-amber-100/60 dark:bg-amber-200/60 rounded-b-full" />

        {/* Wick */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-800 dark:bg-gray-900 rounded-t-full" />
      </div>

      {/* Flame container */}
      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 transition-all ease-out"
        style={{
          opacity: flameScale,
          transform: `translate(-50%, 0) scale(${flameScale})`,
          transitionDuration: isAnimating ? '500ms' : '300ms',
        }}
      >
        {/* Outer glow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-400/20 dark:bg-amber-400/30 rounded-full blur-2xl animate-pulse" />

        {/* Outer flame (orange/red) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-orange-600 via-orange-400 to-transparent rounded-full opacity-70 animate-flicker-slower blur-[1px]" />

        {/* Middle flame (orange) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-14 bg-gradient-to-t from-orange-500 via-amber-400 to-amber-200 rounded-full animate-flicker-slow" />

        {/* Inner flame (yellow/white core) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-gradient-to-t from-amber-300 via-amber-100 to-white rounded-full blur-[1px] animate-flicker" />

        {/* Bright center */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-6 bg-gradient-to-t from-white via-amber-50 to-transparent rounded-full blur-[2px]" />
      </div>
    </div>
  );
};

export default AnimatedFlame;
