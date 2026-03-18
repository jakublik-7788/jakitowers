"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  onMidnight?: () => void;
  className?: string;
  showSeconds?: boolean;
}

export const CountdownTimer = ({ onMidnight, className = "", showSeconds = true }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("00:00" + (showSeconds ? ":00" : ""));
        onMidnight?.();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimeLeft(
        showSeconds
          ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
          : `${pad(hours)}:${pad(minutes)}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [onMidnight, showSeconds]);

  return <span className={className}>{timeLeft}</span>;
};