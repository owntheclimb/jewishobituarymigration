'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface CandleContextType {
  isPageDarkened: boolean;
  setPageDarkened: (darkened: boolean) => void;
  darkenPage: () => void;
}

const CandleContext = createContext<CandleContextType | undefined>(undefined);

export function CandleProvider({ children }: { children: ReactNode }) {
  const [isPageDarkened, setPageDarkened] = useState(false);

  const darkenPage = useCallback(() => {
    setPageDarkened(true);
    // Auto-restore after 6 seconds
    setTimeout(() => setPageDarkened(false), 6000);
  }, []);

  return (
    <CandleContext.Provider value={{ isPageDarkened, setPageDarkened, darkenPage }}>
      {/* Darkening overlay */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 transition-opacity duration-1000 pointer-events-none ${
          isPageDarkened ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <div className="relative z-50">
        {children}
      </div>
    </CandleContext.Provider>
  );
}

export function useCandleContext() {
  const context = useContext(CandleContext);
  if (!context) {
    // Return a no-op version if used outside provider (for flexibility)
    return {
      isPageDarkened: false,
      setPageDarkened: () => {},
      darkenPage: () => {},
    };
  }
  return context;
}
