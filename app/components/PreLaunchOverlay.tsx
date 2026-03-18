"use client";

import { useState, useEffect } from "react";
import { CountdownTimer } from "./CountdownTimer";

export const PreLaunchOverlay = () => {
  const [isBeforeMidnight, setIsBeforeMidnight] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      setIsBeforeMidnight(now < midnight);
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

  if (!isBeforeMidnight) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/97">
      <div className="text-center">

        <h1 className="text-4xl md:text-6xl font-black uppercase italic text-white mb-4">
          START ZA
        </h1>

        <div className="text-6xl md:text-8xl font-mono font-bold text-accent">
          <CountdownTimer showSeconds={true} />
        </div>

        {/* Link do skopiowania */}
        <div className="mt-8">
          <button
            onClick={handleCopyLink}
            className="text-zinc-400 hover:text-accent transition-colors text-sm underline underline-offset-4 cursor-pointer"
          >
            {copied ? "SKOPIOWANO!" : "GRA WYSTARTOJE O PÓŁNOCY – KLIKNIJ, ABY SKOPIOWAĆ LINK"}
          </button>
        </div>
      </div>
    </div>
  );
};