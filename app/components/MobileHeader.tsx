"use client";

import { motion } from "framer-motion";
import { Calendar, BarChart2, Settings, Sun, Infinity } from "lucide-react";

interface MobileHeaderProps {
  gameMode: "daily" | "nonlimit";
  setGameMode: (mode: "daily" | "nonlimit") => void;
  onCalendarClick: () => void;
  onStatsClick: () => void;
  onSettingsClick: () => void;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  currentDay?: number;
  totalDays?: number;
}

export const MobileHeader = ({
  gameMode,
  setGameMode,
  onCalendarClick,
  onStatsClick,
  onSettingsClick,
  onPrevDay,
  onNextDay,
  currentDay,
  totalDays,
}: MobileHeaderProps) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Lewa strona - mini logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black italic tracking-tight">
            JAKI<span className="text-accent not-italic">TO</span>WERS
          </h1>
          {/* Strzałki tylko w daily */}
          {gameMode === "daily" && onPrevDay && onNextDay && currentDay && totalDays && (
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={onPrevDay}
                disabled={currentDay === 1}
                className={`text-zinc-400 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed p-1`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="text-xs font-bold text-accent">#{currentDay}</span>
              <button
                onClick={onNextDay}
                disabled={currentDay === totalDays}
                className={`text-zinc-400 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed p-1`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Prawa strona - ikony akcji */}
        <div className="flex items-center gap-3">
          <button onClick={onStatsClick} className="p-2 text-zinc-400 hover:text-accent">
            <BarChart2 size={20} />
          </button>
          {gameMode === "daily" && (
            <button onClick={onCalendarClick} className="p-2 text-zinc-400 hover:text-accent">
              <Calendar size={20} />
            </button>
          )}
          <button onClick={onSettingsClick} className="p-2 text-zinc-400 hover:text-accent">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Przyciski trybów pod spodem */}
      <div className="flex justify-center gap-4 mt-2">
        <button
          onClick={() => setGameMode("daily")}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
            gameMode === "daily"
              ? "bg-accent text-white shadow-[0_0_10px_var(--accent-glow)]"
              : "bg-zinc-800/50 text-zinc-400 border border-white/10"
          }`}
        >
          <Sun size={14} />
          <span>DAILY</span>
        </button>
        <button
          onClick={() => setGameMode("nonlimit")}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${
            gameMode === "nonlimit"
              ? "bg-accent text-white shadow-[0_0_10px_var(--accent-glow)]"
              : "bg-zinc-800/50 text-zinc-400 border border-white/10"
          }`}
        >
          <Infinity size={14} />
          <span>NON LIMIT</span>
        </button>
      </div>
    </header>
  );
};