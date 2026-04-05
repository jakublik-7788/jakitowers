"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Song } from "@/app/types/song";

interface PlayerProps {
  isStarted: boolean;
  isPlaying: boolean;
  currentStep: number;
  currentTime: number;
  song: Song;
  onPlayClick: () => void;
  stopAudio: () => void;
  onSeek: (time: number) => void;
  isDisabled?: boolean;
}

export const Player = ({
  isStarted,
  isPlaying,
  currentStep,
  currentTime,
  song,
  onPlayClick,
  stopAudio,
  onSeek,
  isDisabled = false,
}: PlayerProps) => {
  const handleAction = () => {
    if (isDisabled) return;
    if (isPlaying) stopAudio();
    else onPlayClick();
  };

  // ─── Stan początkowy (przed pierwszym odtworzeniem) ───────────────────────
  if (!isStarted) {
    return (
      <motion.div
        key="idle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center py-16 md:py-20"
      >
        <motion.button
          onClick={handleAction}
          disabled={isDisabled}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="relative w-80 max-md:w-72 h-24 max-md:h-20 bg-zinc-900/60 border border-white/10 rounded-2xl flex items-center px-6 max-md:px-4 group overflow-hidden shadow-xl transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_var(--accent-glow)]"
        >
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 bg-gradient-to-r from-accent/15 to-transparent pointer-events-none"
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative z-10 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300"
          >
            <Play fill="currentColor" size={20} className="ml-1" />
          </motion.div>
          <div className="relative z-10 ml-5 flex flex-col items-start">
            <span className="text-white font-[1000] italic tracking-wider text-lg leading-none uppercase">
              ODTWÓRZ
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Daily Challenge
              </span>
              <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
          <div className="ml-auto flex items-end gap-1 h-6 relative z-10">
            {[0.3, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                className="w-1 bg-accent rounded-full opacity-40"
              />
            ))}
          </div>
        </motion.button>
      </motion.div>
    );
  }

  // ─── Stan aktywny (po odtworzeniu) ────────────────────────────────────────
  const lines = song.lyrics[0].words.slice(0, currentStep + 1);

  return (
    <motion.div
      key="active"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full max-w-xl transition-opacity duration-300 ${isDisabled ? "opacity-50" : "opacity-100"}`}
    >
      {/* Wersy tekstu */}
      <div className="flex flex-col gap-2 mb-4">
        <AnimatePresence mode="popLayout">
          {lines.map((phrase, i) => {
            const isActive =
              !isDisabled &&
              isPlaying &&
              currentTime >= phrase.start &&
              currentTime <= phrase.end;

            return (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => !isDisabled && onSeek(phrase.start)}
                style={{ cursor: isDisabled ? "default" : "pointer" }}
                className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all duration-300 ${
                  isActive
                    ? "bg-accent/12 border-accent/40 shadow-[0_0_20px_var(--accent-glow)]"
                    : "bg-white/2 border-white/5 hover:bg-white/4 hover:border-white/10"
                }`}
              >
                {/* Numer wersu */}
                <span
                  className={`text-[10px] font-black tabular-nums shrink-0 w-4 text-right transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-zinc-700"
                  }`}
                >
                  {i + 1}
                </span>

                {/* Separator */}
                <div
                  className={`w-px h-4 shrink-0 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-accent/60" : "bg-white/10"
                  }`}
                />

                {/* Tekst */}
                <p
                  className={`font-[1000] italic uppercase leading-tight tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-accent text-base md:text-lg"
                      : "text-zinc-500 text-sm md:text-base"
                  } ${phrase.text.length > 50 ? "text-sm md:text-base" : ""}`}
                >
                  {phrase.text}
                </p>

                {/* Ikona play przy hover (tylko gdy nie aktywny) */}
                {!isActive && !isDisabled && (
                  <div className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={10} className="text-zinc-600" />
                  </div>
                )}

                {/* Pulsujący dot przy aktywnym */}
                {isActive && (
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Przycisk play / pause */}
      <motion.button
        onClick={handleAction}
        disabled={isDisabled}
        whileHover={isDisabled ? {} : { scale: 1.01 }}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
        className={`relative w-full flex items-center gap-4 rounded-2xl px-5 py-3.5 border transition-all duration-300 overflow-hidden group ${
          isDisabled
            ? "bg-zinc-900/30 border-white/5 cursor-not-allowed"
            : isPlaying
            ? "bg-accent/15 border-accent/50 shadow-[0_0_25px_var(--accent-glow)]"
            : "bg-white/3 border-white/10 hover:border-accent/30 hover:bg-white/5"
        }`}
      >
        {/* Subtle animated bg gdy gra */}
        {isPlaying && (
          <motion.div
            animate={{ opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-accent pointer-events-none"
          />
        )}

        {/* Ikona */}
        <div
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isDisabled
              ? "bg-zinc-800 text-zinc-600"
              : isPlaying
              ? "bg-accent text-white shadow-[0_0_15px_var(--accent-glow)]"
              : "bg-white text-black group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_15px_var(--accent-glow)]"
          }`}
        >
          {isPlaying ? (
            <Pause fill="currentColor" size={14} />
          ) : (
            <Play fill="currentColor" size={14} className="ml-0.5" />
          )}
        </div>

        {/* Label */}
        <div className="relative z-10 flex flex-col items-start">
          <span
            className={`text-xs font-[1000] italic uppercase tracking-widest leading-none transition-colors duration-300 ${
              isDisabled ? "text-zinc-600" : isPlaying ? "text-accent" : "text-white"
            }`}
          >
            {isDisabled ? "Gra zakończona" : isPlaying ? "Odtwarzanie..." : "Odtwórz"}
          </span>
          {!isDisabled && (
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-0.5">
              Wersy {currentStep + 1} z 5
            </span>
          )}
        </div>

        {/* Waveform po prawej */}
        {isPlaying && (
          <div className="ml-auto flex items-end gap-0.5 h-5 relative z-10">
            {[0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.75].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [`${h * 100}%`, `${(1 - h * 0.6) * 100}%`, `${h * 100}%`],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 0.5 + i * 0.07,
                  repeat: Infinity,
                  delay: i * 0.06,
                  ease: "easeInOut",
                }}
                className="w-0.5 bg-accent rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>
    </motion.div>
  );
};