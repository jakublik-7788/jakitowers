"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Song } from "@/app/scripts/songs";

interface PlayerProps {
  isStarted: boolean;
  isPlaying: boolean;
  currentStep: number;
  currentTime: number;
  song: Song;
  onPlayClick: () => void;
  stopAudio: () => void;
  isDisabled?: boolean; // DODANE
}

export const Player = ({
  isStarted,
  isPlaying,
  currentStep,
  currentTime,
  song,
  onPlayClick,
  stopAudio,
  isDisabled = false, // DODANE
}: PlayerProps) => {
  // Sprawdź czy któryś z wersów ma 50+ znaków
  const hasLongLines = song.lyrics[0].words.some(
    (phrase) => phrase.text.length >= 50,
  );

  // Określ rozmiar czcionki dla wszystkich wersów
  const textSizeClass = hasLongLines
    ? "text-sm md:text-xl"
    : "text-base md:text-2xl";

  // Funkcja pomocnicza do kliknięć
  const handleAction = () => {
    if (isDisabled) return;
    if (isPlaying) {
      stopAudio();
    } else {
      onPlayClick();
    }
  };

  if (!isStarted) {
    return (
      <motion.div
        key="audio-deck-start"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative flex items-center justify-center py-20 transition-opacity duration-500 ${isDisabled ? "opacity-40 pointer-events-none" : "opacity-100"}`}
      >
        <motion.button
          layoutId="player-box"
          onClick={handleAction}
          disabled={isDisabled}
          whileHover={isDisabled ? {} : { scale: 1.02 }}
          whileTap={isDisabled ? {} : { scale: 0.98 }}
          className={`relative w-80 h-24 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center px-6 group overflow-hidden shadow-2xl transition-all duration-300 ${isDisabled ? "cursor-not-allowed" : "hover:shadow-[0_0_30px_theme(colors.accent-glow/50%)]"}`}
        >
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            whileHover={isDisabled ? {} : { x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent pointer-events-none"
          />

          <motion.div
            whileHover={isDisabled ? {} : { scale: 1.1 }}
            className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isDisabled ? "bg-zinc-700 text-zinc-500" : "bg-white text-black group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_20px_var(--accent-glow)]"}`}
          >
            <Play fill="currentColor" size={20} className="ml-1" />
          </motion.div>

          <div className="relative z-10 ml-6 flex flex-col items-start">
            <span className="text-white font-black italic tracking-wider text-lg leading-none uppercase">
              {isDisabled ? "Gra Zakończona" : "ODTWÓRZ"}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Daily Challenge
              </span>
              {!isDisabled && <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />}
            </div>
          </div>

          <div className="ml-auto flex items-end gap-1 h-6 relative z-10">
            {[0.3, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
              <motion.div
                key={i}
                animate={isDisabled ? { height: "20%" } : {
                  height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                className="w-1 bg-accent rounded-full opacity-50"
              />
            ))}
          </div>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="player-box-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-zinc-900/10 border-2 border-accent/20 rounded-[30px] p-5 md:p-7 shadow-[0_0_50px_theme(colors.accent-glow/10%)] flex items-center gap-5 md:gap-8 min-h-[120px] w-full max-w-xl backdrop-blur-sm transition-all duration-500 ${isDisabled ? "opacity-50 grayscale-[0.5]" : "opacity-100"}`}
    >
      <div className="flex-shrink-0 self-center">
        <motion.button
          layoutId="player-box-circle"
          onClick={handleAction}
          disabled={isDisabled}
          whileHover={isDisabled ? {} : { scale: 1.1 }}
          whileTap={isDisabled ? {} : { scale: 0.95 }}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDisabled 
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
              : isPlaying
                ? "bg-accent text-white hover:bg-white hover:text-black shadow-[0_0_20px_var(--accent-glow)]"
                : "bg-white text-black hover:bg-accent hover:text-white shadow-[0_0_20px_var(--accent-glow)]"
          }`}
        >
          {isPlaying ? (
            <Pause fill="currentColor" size={20} className="md:w-7 md:h-7" />
          ) : (
            <Play
              fill="currentColor"
              size={20}
              className="ml-1 md:w-7 md:h-7 md:ml-1.5"
            />
          )}
        </motion.button>
      </div>

      <div className={`flex-1 flex flex-col gap-3 min-w-0 ${isDisabled ? "pointer-events-none" : ""}`}>
        <AnimatePresence mode="popLayout">
          {song.lyrics[0].words.slice(0, currentStep + 1).map((phrase, i) => {
            const isActive =
              !isDisabled && // Tekst nie świeci się, gdy gra skończona
              isPlaying &&
              currentTime >= phrase.start &&
              currentTime <= phrase.end;

            return (
              <motion.div
                layout
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <p
                  className={`font-[1000] tracking-wide uppercase italic select-none leading-tight transition-all duration-300 ${textSizeClass}`}
                  style={{
                    color: isActive ? "var(--accent-main)" : isDisabled ? "#3f3f46" : "#1e1e21",
                  }}
                >
                  {phrase.text}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};