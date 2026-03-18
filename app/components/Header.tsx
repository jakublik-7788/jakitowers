"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  Volume,
  Volume1,
  VolumeX,
  Calendar,
  Infinity,
  Sun,
  Settings,
  BarChart2,
} from "lucide-react";
import { Logo } from "./Logo";

interface HeaderProps {
  volume: number;
  setVolume: (value: number) => void;
  isVolumeHovered: boolean;
  setIsVolumeHovered: (value: boolean) => void;
  onCalendarClick: () => void;
  onStatsClick: () => void;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  currentDay?: number;
  totalDays?: number;
  gameMode: "daily" | "nonlimit";
  setGameMode: (mode: "daily" | "nonlimit") => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (value: boolean) => void;
}

export const Header = ({
  volume,
  setVolume,
  isVolumeHovered,
  setIsVolumeHovered,
  onCalendarClick,
  onStatsClick,
  isHovered,
  setIsHovered,
  onPrevDay,
  onNextDay,
  currentDay,
  totalDays,
  gameMode,
  setGameMode,
  setIsSettingsOpen,
}: HeaderProps) => {
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={24} />;
    if (volume < 0.25) return <Volume size={24} />;
    if (volume < 0.6) return <Volume1 size={24} />;
    return <Volume2 size={24} />;
  };

  return (
    <div className="relative z-50 pt-12 pb-16 max-md:pt-6 max-md:pb-8 flex flex-col items-center bg-gradient-to-b from-black via-black/90 to-transparent">
      <div className="absolute top-8 left-8 max-md:top-4 max-md:left-4 flex gap-4 text-zinc-700 items-center">
        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsVolumeHovered(true)}
          onMouseLeave={() => setIsVolumeHovered(false)}
        >
          <motion.button
            whileHover={{ scale: 1.1, color: "var(--accent-main)" }}
            className="z-30 w-10 h-10 max-md:w-12 max-md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/5 bg-black border border-white/5"
            style={{ boxShadow: isVolumeHovered ? "0 0 15px var(--accent-glow)" : "none" }}
          >
            {getVolumeIcon()}
          </motion.button>

          <AnimatePresence>
            {isVolumeHovered && (
              <motion.div
                initial={{ width: 0, opacity: 0, x: 0 }}
                animate={{ width: 160, opacity: 1, x: 10 }}
                exit={{ width: 0, opacity: 0, x: 0 }}
                className="absolute left-full top-1/2 -translate-y-1/2 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 z-20 shadow-2xl"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer touch-manipulation"
                  style={{ accentColor: "var(--accent-main)" }}
                />
                <span
                  className="text-[10px] font-black w-8 tabular-nums"
                  style={{ color: "var(--accent-main)" }}
                >
                  {Math.round(volume * 100)}%
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Logo
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        onPrevDay={gameMode === "daily" ? onPrevDay : undefined}
        onNextDay={gameMode === "daily" ? onNextDay : undefined}
        currentDay={gameMode === "daily" ? currentDay : undefined}
        totalDays={gameMode === "daily" ? totalDays : undefined}
      />

      <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 w-full max-w-6xl flex justify-between px-6 pointer-events-none max-md:px-3 max-md:top-[20%]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setGameMode("daily")}
          className={`pointer-events-auto flex items-center gap-2 px-6 max-md:px-4 py-3 max-md:py-2.5 rounded-full backdrop-blur-sm border font-black italic tracking-wider text-sm uppercase transition-all duration-300 group ${
            gameMode === "daily"
              ? "bg-accent text-white shadow-[0_0_15px_var(--accent-glow)]"
              : "bg-zinc-800/30 border-white/5 text-zinc-400 hover:text-white hover:bg-accent/20"
          }`}
        >
          <Sun
            size={18}
            className={gameMode === "daily" ? "text-white" : "text-zinc-500 group-hover:text-accent"}
          />
          <span>DAILY</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setGameMode("nonlimit")}
          className={`pointer-events-auto flex items-center gap-2 px-6 max-md:px-4 py-3 max-md:py-2.5 rounded-full backdrop-blur-sm border font-black italic tracking-wider text-sm uppercase transition-all duration-300 group ${
            gameMode === "nonlimit"
              ? "bg-accent text-white shadow-[0_0_15px_var(--accent-glow)]"
              : "bg-zinc-800/30 border-white/5 text-zinc-400 hover:text-white hover:bg-accent/20"
          }`}
        >
          <Infinity
            size={18}
            className={gameMode === "nonlimit" ? "text-white" : "text-zinc-500 group-hover:text-accent"}
          />
          <span>NON LIMIT</span>
        </motion.button>
      </div>

      <div className="absolute top-8 right-8 max-md:top-4 max-md:right-4 flex gap-2 text-zinc-700 items-center">
        <motion.button
          whileHover={{ scale: 1.1, color: "var(--accent-main)" }}
          onClick={onStatsClick}
          className="w-10 h-10 max-md:w-12 max-md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/5"
        >
          <BarChart2 size={24} />
        </motion.button>

        <AnimatePresence>
          {gameMode === "daily" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1, color: "var(--accent-main)" }}
              onClick={onCalendarClick}
              className="w-10 h-10 max-md:w-12 max-md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/5"
            >
              <Calendar size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1, color: "var(--accent-main)" }}
          onClick={() => setIsSettingsOpen(true)}
          className="w-10 h-10 max-md:w-12 max-md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/5"
        >
          <Settings size={24} />
        </motion.button>
      </div>
    </div>
  );
}