// TimerContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type TimerContextType = {
  startTime: number;
  getElapsed: () => number;
  clickCount: number;
};

const TimerContext = createContext<TimerContextType>({
  startTime: 0,
  getElapsed: () => 0,
  clickCount: 0,
});

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [startTime] = useState(Date.now());
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleClick = () => setClickCount((prev) => prev + 1);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const getElapsed = () => Date.now() - startTime;

  return (
    <TimerContext.Provider value={{ startTime, getElapsed, clickCount }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
