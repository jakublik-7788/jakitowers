"use client";

import { useState, useEffect } from "react";
import { CountdownTimer } from "./CountdownTimer";
import { GAME_START_DATE } from "@/app/scripts/Usecalendar"; // dostosuj ścieżkę

export const PreLaunchOverlay = () => {
  const [isBeforeStart, setIsBeforeStart] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      setIsBeforeStart(now < GAME_START_DATE);
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://jakitowers.pl");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isBeforeStart) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/99.5">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic text-white mb-4">
          START ZA
        </h1>

        <div className="text-6xl md:text-8xl font-mono font-bold text-accent">
          <CountdownTimer targetDate={GAME_START_DATE} showSeconds={true} />
        </div>

        <div className="mt-8">
          <button
            onClick={handleCopyLink}
            className="text-zinc-400 hover:text-accent transition-colors text-sm underline underline-offset-4 cursor-pointer"
          >
            {copied ? "SKOPIOWANO!" : "GRA WYSTARTUJE 20 MARCA – KLIKNIJ, ABY SKOPIOWAĆ LINK"}
          </button>
        </div>
      </div>
    </div>
  );
};