// app/components/ClipPlayer.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  X,
  Headphones,
  Lightbulb,
  MonitorPlay,
  Tag,
  Calendar,
  Users,
} from "lucide-react";
import { Song } from "@/app/types/song";

// ─── Constants ────────────────────────────────────────────────────────────────
const CLIP_DURATIONS: (1 | 3 | 5 | 10 | 15)[] = [1, 3, 5, 10, 15];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Guess {
  display: string;
  status: "correct" | "wrong" | "skipped" | "empty" | "artist";
}

interface ClipPlayerProps {
  song: Song;
  currentStep: number;
  isPlaying: boolean;
  isFinished: boolean;
  onPlay: () => void;
  onStop: () => void;
  guesses: Guess[];
  revealedHintsCount?: number;
}

// ─── Helper: kolor statusu kroku ─────────────────────────────────────────────
const getStepColor = (status: Guess["status"] | undefined) => {
  if (status === "correct")
    return "bg-green-500/20 border-green-500/40 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]";
  if (status === "wrong")
    return "bg-red-500/20 border-red-500/40 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]";
  if (status === "skipped")
    return "bg-zinc-500/20 border-zinc-500/40 text-zinc-400";
  return "border-white/8 bg-white/3 text-zinc-600";
};

// ─── Komponent podpowiedzi wewnątrz playera ───────────────────────────────────
const HintsSection = ({
  song,
  revealedCount,
}: {
  song: Song;
  revealedCount: number;
}) => {
  if (revealedCount <= 0) return null;

  const hints = [
    {
      key: "hint1" as const,
      label: "RODZAJ",
      icon: MonitorPlay,
      fallback: "film / serial / gra",
    },
    {
      key: "hint2" as const,
      label: "GATUNEK",
      icon: Tag,
      fallback: "akcja / horror / przygodowy",
    },
    {
      key: "hint3" as const,
      label: "DATA PREMIERY",
      icon: Calendar,
      fallback: "2000-2024",
    },
    {
      key: "hint4" as const,
      label: "REŻYSER / STUDIO",
      icon: Users,
      fallback: "Netflix / HBO / CDPR",
    },
  ];

  const visibleHints = hints.slice(0, revealedCount).map((hint) => ({
    ...hint,
    value: song[hint.key] || hint.fallback,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-5 pt-4 border-t border-white/10"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={12} className="text-accent" />
        <span className="text-[9px] font-black uppercase tracking-widest text-accent/70">
          PODPOWIEDZI ({revealedCount}/4)
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {visibleHints.map(({ label, icon: Icon, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-accent/5 border border-accent/15"
          >
            <Icon size={14} className="text-accent" />
            <div className="min-w-0 flex-1">
              <p className="text-[8px] font-black uppercase tracking-wider text-accent/50 leading-none mb-0.5">
                {label}
              </p>
              <div className="relative group/hint">
                <p className="text-[10px] md:text-xs font-bold text-white truncate">
                  {value}
                </p>
                {value.length > 15 && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-zinc-800 border border-white/15 rounded-lg text-[12px] font-bold text-white whitespace-nowrap z-50 shadow-xl opacity-0 pointer-events-none group-hover/hint:opacity-100 transition-opacity duration-150">
                    {value}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Główny komponent ClipPlayer ─────────────────────────────────────────────
export const ClipPlayer = ({
  song,
  currentStep,
  isPlaying,
  isFinished,
  onPlay,
  onStop,
  guesses,
  revealedHintsCount = 0,
}: ClipPlayerProps) => {
  const duration = CLIP_DURATIONS[currentStep] ?? 1;
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPlaying) {
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setProgress(Math.min((elapsed / duration) * 100, 100));
        if (elapsed >= duration) {
          clearInterval(timerRef.current!);
          setProgress(0);
        }
      }, 50);
    } else {
      setProgress(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* KROKI POSTĘPU */}
      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-center mb-5">
        {CLIP_DURATIONS.map((dur, i) => {
          const active = i === currentStep;
          const status = guesses[i]?.status;
          return (
            <React.Fragment key={i}>
              <div
                className={`flex items-center gap-1 px-2 md:px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border transition-all shrink-0
                  ${
                    active
                      ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_10px_var(--accent-glow)]"
                      : getStepColor(status)
                  }`}
              >
                {status === "correct" && (
                  <span className="text-green-400 text-[8px]">✓</span>
                )}
                {status === "wrong" && <X size={10} className="text-red-500" />}
                {dur}s
              </div>
              {i < CLIP_DURATIONS.length - 1 && (
                <div
                  className={`flex-1 min-w-[8px] h-px ${
                    status === "correct"
                      ? "bg-green-500/30"
                      : status === "wrong" || status === "skipped"
                        ? "bg-red-500/30"
                        : "bg-white/8"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* GŁÓWNY KARETKA PLAYERA */}
      <div
        className={`relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border-2 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300
          ${isPlaying ? "border-accent/60 shadow-[0_0_40px_var(--accent-glow)]" : "border-white/10"}
          ${isFinished ? "opacity-60" : ""}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

        {isPlaying && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, var(--accent-main) 0%, transparent 70%)",
              animation: "pulseOpacity 1.5s ease-in-out infinite alternate",
            }}
          />
        )}

        <div className="relative z-10 p-5 md:p-6">
          {/* Waveform */}
          <div className="flex items-center justify-center gap-[2px] md:gap-1 h-12 md:h-14 mb-4">
            {Array.from({ length: 24 }).map((_, i) => {
              const h = 15 + Math.sin(i * 0.7) * 25 + Math.sin(i * 1.3) * 12;
              return (
                <div
                  key={i}
                  className="w-1 md:w-1.5 rounded-full transition-all duration-75"
                  style={{
                    height: isPlaying ? `${h}%` : `${h * 0.3}%`,
                    background: isPlaying ? "var(--accent-main)" : "#3f3f46",
                    minHeight: 2,
                    animation: isPlaying
                      ? `waveform ${0.5 + i * 0.03}s ease-in-out infinite alternate`
                      : "none",
                  }}
                />
              );
            })}
          </div>

          {/* Timer i status */}
          <div className="text-center mb-4">
            <div className="text-4xl md:text-5xl font-[1000] italic text-white mb-1 tabular-nums">
              {duration}s
            </div>
            <div className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              {isFinished
                ? "Gra zakończona"
                : isPlaying
                  ? "Odtwarzanie..."
                  : `Fragment ${currentStep + 1} z 5`}
            </div>
          </div>

          {/* Pasek postępu */}
          {isPlaying && (
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-accent rounded-full transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Przycisk Play/Pause */}
          <div className="flex justify-center mb-4">
            <motion.button
              whileHover={isFinished ? {} : { scale: 1.05 }}
              whileTap={isFinished ? {} : { scale: 0.95 }}
              onClick={isPlaying ? onStop : onPlay}
              disabled={isFinished}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl
                ${
                  isFinished
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    : isPlaying
                      ? "bg-accent text-white shadow-[0_0_30px_var(--accent-glow)]"
                      : "bg-white text-black hover:bg-accent hover:text-white hover:shadow-[0_0_30px_var(--accent-glow)]"
                }`}
            >
              {isPlaying ? (
                <Pause
                  fill="currentColor"
                  size={24}
                  className="md:w-[28px] md:h-[28px]"
                />
              ) : (
                <Play
                  fill="currentColor"
                  size={24}
                  className="ml-1 md:w-[28px] md:h-[28px]"
                />
              )}
            </motion.button>
          </div>

          {/* Info audio */}
          {!isFinished && (
            <div className="flex items-center justify-center gap-1.5">
              <Headphones size={12} className="text-zinc-600" />
              <span className="text-zinc-600 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                {isPlaying
                  ? "Słuchaj uważnie..."
                  : "Kliknij aby odsłuchać fragment"}
              </span>
            </div>
          )}

          {/* PODPOWIEDZI - WEWNĄTRZ PLAYERA */}
          <HintsSection song={song} revealedCount={revealedHintsCount} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes waveform {
          from {
            transform: scaleY(0.4);
            opacity: 0.5;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        @keyframes pulseOpacity {
          from {
            opacity: 0.04;
          }
          to {
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};
