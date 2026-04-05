"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Trophy,
  ArrowLeft,
  Infinity,
  RotateCcw,
  Flame,
  Volume2,
  Volume1,
  VolumeX,
  X,
  Headphones,
  Disc3,
  Play,
  Pause,
  Tv,
  HelpCircle,
} from "lucide-react";
import { nonlimitRapSongs } from "@/app/scripts/songs/nonlimit/nonlimitRapSongs";
import { nonlimitKlasykiSongs } from "@/app/scripts/songs/nonlimit/nonlimitKlasykiSongs";
import { nonlimitSoundtrackiSongs } from "@/app/scripts/songs/nonlimit/nonlimitsoundtrackiSongs";
import { nonlimitRapAllSongs } from "@/app/scripts/songs/nonlimit/nonlimitRapAllSongs";
import { nonlimitKlasykiAllSongs } from "@/app/scripts/songs/nonlimit/nonlimitKlasykiAllSongs";
import { nonlimitSoundtrackiAllSongs } from "@/app/scripts/songs/nonlimit/nonlimitsoundtrackiAllSongs";
import { Player } from "@/app/components/Player";
import { ClipPlayer } from "@/app/components/ClipPlayer";
import { ProgressGuesses } from "@/app/components/ProgressGuesses";
import { SearchBar } from "@/app/components/SearchBar";
import { SettingsModal } from "@/app/components/SettingsModal";
import { StatsModal } from "@/app/components/StatsModal";
import { RulesModal } from "@/app/components/RulesModal";
import { useSoundEffects } from "@/app/scripts/useSoundEffects";
import { useNonLimitStats } from "@/app/scripts/Usegamestats";
import { Song } from "@/app/types/song";
import { Footer } from "../Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
type GuessStatus = "correct" | "wrong" | "skipped" | "empty" | "artist";
type SourceMode = "rap" | "klasyki" | "soundtracki";
interface Guess {
  display: string;
  status: GuessStatus;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LS_ACCENT_KEY = "jakitowers_accent_color";
const LS_SOUND_KEY = "jakitowers_sound_enabled";
const LS_VOLUME_KEY = "jakitowers_volume";
const LS_RULES_SEEN_NONLIMIT = "jakitowers_rules_seen_nonlimit";
const MAX_ATTEMPTS = 5;
const CLIP_DURATIONS: (1 | 3 | 5 | 10 | 15)[] = [1, 3, 5, 10, 15];

const makeEmptyGuesses = (): Guess[] =>
  Array(5)
    .fill(null)
    .map(() => ({ display: "", status: "empty" as GuessStatus }));

// ─── Helpers ──────────────────────────────────────────────────────────────────
const normalizePolishChars = (str: string): string => {
  const map: Record<string, string> = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
    Ą: "A",
    Ć: "C",
    Ę: "E",
    Ł: "L",
    Ń: "N",
    Ó: "O",
    Ś: "S",
    Ź: "Z",
    Ż: "Z",
  };
  return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => map[c] || c);
};

const hasCommonArtist = (a: string, b: string): boolean => {
  const norm = (s: string) => normalizePolishChars(s.toLowerCase().trim());
  const split = (s: string) =>
    s
      .split(/[,&(]/)
      .map(norm)
      .filter((x) => x.length > 1);
  return split(a).some((x) =>
    split(b).some((y) => x.includes(y) || y.includes(x)),
  );
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
};

const applyAccentColor = (hex: string): void => {
  document.documentElement.style.setProperty("--accent-main", hex);
  document.documentElement.style.setProperty(
    "--accent-glow",
    hexToRgba(hex, 0.4),
  );
  document.documentElement.style.setProperty(
    "--accent-glow-strong",
    hexToRgba(hex, 0.2),
  );
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── RulesModal ───────────────────────────────────────────────────────────────
const RulesModalComponent = ({ onClose }: { onClose: () => void }) => {
  const rules = [
    "Graj ile chcesz – losowe piosenki bez limitu.",
    "Wybierz źródło: RAP, KLASYKI lub SOUNDTRACKI.",
    "Dla RAP i KLASYKI mechanika taka sama jak w trybach dziennych.",
    "Dla SOUNDTRACKI odgadnij tytuł po fragmencie audio.",
    "Zbieraj serie wygranych i bij rekordy!",
    "Statystyki sesji resetują się po zamknięciu strony.",
    "Najlepsza seria jest zapisywana lokalnie.",
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border-2 border-accent/40 rounded-[32px] p-8 max-w-md w-full shadow-[0_0_60px_var(--accent-glow)]"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-accent text-[10px] font-black tracking-[0.3em] uppercase mb-1">
              Zasady gry
            </p>
            <h2 className="text-xl font-[1000] italic uppercase tracking-tight text-white">
              NON-LIMIT
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3 mb-8">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-xs font-black shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-zinc-300 text-sm leading-relaxed">{rule}</p>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full py-4 bg-accent text-white font-[1000] italic uppercase tracking-widest rounded-2xl shadow-[0_0_20px_var(--accent-glow)] text-sm"
        >
          Rozumiem, gram!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// ─── TopBar ───────────────────────────────────────────────────────────────────
const TopBar = ({
  source,
  streak,
  onBack,
  onStats,
  onSettings,
  onRules,
  volume,
  onVolumeChange,
  onToggleSound,
  soundEnabled,
}: {
  source: SourceMode | null;
  streak: number;
  onBack: () => void;
  onStats: () => void;
  onSettings: () => void;
  onRules: () => void;
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
}) => {
  const VolumeIcon =
    !soundEnabled || volume === 0 ? VolumeX : volume < 0.33 ? Volume1 : Volume2;
  const modeLabel =
    source === "rap"
      ? "NON-LIMIT · RAP"
      : source === "klasyki"
        ? "NON-LIMIT · KLASYKI"
        : source === "soundtracki"
          ? "NON-LIMIT · SOUNDTRACKI"
          : "NON-LIMIT";
  return (
    <div className="relative z-50 px-4 md:px-8 py-3 border-b border-white/5 bg-black/40 backdrop-blur-md shrink-0">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Menu</span>
          </button>
          <div className="hidden md:block h-5 w-px bg-white/10" />
          <span className="hidden md:block text-xl font-[1000] italic tracking-tighter uppercase">
            JAKI<span style={{ color: "var(--accent-main)" }}>TO</span>WERS
          </span>
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/10 border border-accent/20">
            <span className="text-accent text-[9px] font-black tracking-[0.3em] uppercase">
              {modeLabel}
            </span>
          </div>
        </div>

        {streak > 0 ? (
          <motion.div
            key={streak}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
          >
            <Flame size={14} className="text-yellow-400" />
            <span className="text-yellow-400 font-black text-sm">{streak}</span>
            <span className="text-yellow-600 text-[10px] font-bold uppercase tracking-wider hidden md:block">
              seria
            </span>
          </motion.div>
        ) : (
          <div className="invisible">·</div>
        )}

        <div className="flex items-center gap-1.5 justify-end">
          {source && (
            <button
              onClick={onStats}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-zinc-500 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="18" y="3" width="4" height="18" />
                <rect x="10" y="8" width="4" height="13" />
                <rect x="2" y="13" width="4" height="8" />
              </svg>
              Statystyki
            </button>
          )}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8">
            <button
              onClick={onToggleSound}
              className="text-zinc-400 hover:text-accent transition-colors"
            >
              <VolumeIcon size={14} />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={onVolumeChange}
              className="w-20 h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background:
                  "linear-gradient(to right, var(--accent-main) 0%, var(--accent-main) " +
                  volume * 100 +
                  "%, #3f3f46 " +
                  volume * 100 +
                  "%, #3f3f46 100%)",
              }}
            />
            <span className="text-zinc-500 text-[10px] font-mono w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <button
            onClick={onRules}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
            title="Zasady gry"
          >
            <HelpCircle size={14} />
          </button>
          {source && (
            <button
              onClick={onStats}
              className="md:hidden w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="18" y="3" width="4" height="18" />
                <rect x="10" y="8" width="4" height="13" />
                <rect x="2" y="13" width="4" height="8" />
              </svg>
            </button>
          )}
          <button
            onClick={onSettings}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── ModeSelector ─────────────────────────────────────────────────────────────
const ModeSelector = ({ onSelect }: { onSelect: (s: SourceMode) => void }) => (
  <div className="flex-1 flex flex-col items-center justify-start pt-24 md:pt-56 px-4 gap-6 md:gap-8 pb-8">
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Infinity size={20} className="text-accent" />
        <span className="text-accent text-[10px] font-black tracking-[0.35em] uppercase">
          Non-Limit
        </span>
      </div>
      <h2 className="text-2xl md:text-4xl font-[1000] italic uppercase tracking-tighter text-white leading-none">
        Wybierz tryb
      </h2>
      <p className="text-zinc-500 text-xs md:text-sm mt-2">
        Graj ile chcesz. Zbieraj serię. Bij rekordy.
      </p>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
      {[
        {
          source: "rap" as SourceMode,
          label: "RAP",
          sub: "Współczesny",
          desc: "Najlepsze kawałki z polskiego rapu",
          icon: Headphones,
        },
        {
          source: "klasyki" as SourceMode,
          label: "KLASYKI",
          sub: "POLSKIE",
          desc: "Najlepsze polskie klasyki",
          icon: Disc3,
        },
        {
          source: "soundtracki" as SourceMode,
          label: "SOUNDTRACK",
          sub: "FILMY / GRY / SERIALE",
          desc: "Odgadnij tytuł po fragmencie",
          icon: Tv,
        },
      ].map((m, i) => (
        <motion.button
          key={m.source}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(m.source)}
          className="group relative bg-zinc-900/60 border-2 border-white/8 rounded-[24px] p-6 text-left transition-all duration-300 overflow-hidden hover:border-accent/60 hover:shadow-[0_0_40px_var(--accent-glow)]"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 20% 20%, var(--accent-glow) 0%, transparent 65%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <m.icon
                  size={22}
                  className="text-zinc-500 group-hover:text-accent transition-colors"
                />
              </div>
              <span className="text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">
                NON-LIMIT
              </span>
            </div>
            <p className="text-[10px] font-black tracking-[0.25em] uppercase text-zinc-500 mb-0.5">
              {m.sub}
            </p>
            <h3 className="text-2xl font-[1000] italic uppercase tracking-tight text-white mb-3">
              {m.label}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{m.desc}</p>
            <div className="mt-5">
              <span className="text-[10px] font-black tracking-widest uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Zacznij grać
              </span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  </div>
);

// ─── RoundResult ──────────────────────────────────────────────────────────────
const RoundResult = ({
  status,
  song,
  streak,
  onNext,
}: {
  status: "win" | "lose";
  song: Song;
  streak: number;
  onNext: () => void;
}) => {
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (song.fullAudioSrc && audioRef.current) {
      const audio = audioRef.current;
      const onMeta = () => setDuration(audio.duration);
      audio.addEventListener("loadedmetadata", onMeta);
      return () => audio.removeEventListener("loadedmetadata", onMeta);
    }
  }, [song.fullAudioSrc]);

  const toggleFullAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingFull) audioRef.current.pause();
    else audioRef.current.play().catch(console.warn);
    setIsPlayingFull(!isPlayingFull);
  };
  const handleSeekFull = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  };
  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const hasFullAudio = !!song.fullAudioSrc;
  const hasYoutube = !!song.youtubeId;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/96 overflow-y-auto"
      onClick={onNext}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border-2 border-accent/40 rounded-[32px] p-6 md:p-8 max-w-lg w-full shadow-[0_0_60px_var(--accent-glow)] text-center relative overflow-hidden my-4"
      >
        <div
          className="absolute -top-20 -left-20 w-56 h-56 blur-[100px] rounded-full pointer-events-none opacity-20"
          style={{ background: status === "win" ? "#22c55e" : "#ef4444" }}
        />
        <div className="flex justify-center mb-4">
          <div
            className={
              "w-16 h-16 rounded-2xl flex items-center justify-center border-2 " +
              (status === "win"
                ? "bg-green-500/15 border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                : "bg-red-500/15 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.3)]")
            }
          >
            {status === "win" ? (
              <Trophy size={28} className="text-green-400" />
            ) : (
              <span className="text-red-400 text-3xl font-black">✕</span>
            )}
          </div>
        </div>
        <h2
          className={
            "text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter mb-1 " +
            (status === "win" ? "text-green-400" : "text-red-500")
          }
        >
          {status === "win" ? "GRATULACJE!" : "NIESTETY..."}
        </h2>
        <p className="text-zinc-500 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          {status === "win" ? "ODGADNIĘTE!" : "Nie tym razem.."}
        </p>
        {streak > 0 && (
          <motion.div
            key={streak}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4 mt-2">
              <Flame size={16} className="text-yellow-400" />
              <span className="text-yellow-400 font-black text-lg">
                {streak}
              </span>
              <span className="text-yellow-600 text-xs font-bold uppercase tracking-widest">
                w serii
              </span>
            </div>
          </motion.div>
        )}
        {hasFullAudio && (
          <>
            {song.imageUrl && (
              <div className="mb-5 flex justify-center">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl max-w-full">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-full h-auto max-h-[300px] object-contain bg-black/40"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-image.jpg";
                    }}
                  />
                </div>
              </div>
            )}
            <div className="mb-5 bg-zinc-900/60 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleFullAudio}
                  className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:scale-105 transition-all shadow-md"
                >
                  {isPlayingFull ? (
                    <Pause
                      fill="currentColor"
                      size={20}
                      className="text-white"
                    />
                  ) : (
                    <Play
                      fill="currentColor"
                      size={20}
                      className="text-white ml-0.5"
                    />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>{fmt(currentTime)}</span>
                    <span>{fmt(duration)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.01"
                    value={currentTime}
                    onChange={handleSeekFull}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--accent-main) ${(currentTime / (duration || 1)) * 100}%, #3f3f46 ${(currentTime / (duration || 1)) * 100}%)`,
                    }}
                  />
                </div>
                <audio
                  ref={audioRef}
                  src={song.fullAudioSrc}
                  onTimeUpdate={() =>
                    audioRef.current &&
                    setCurrentTime(audioRef.current.currentTime)
                  }
                  onEnded={() => setIsPlayingFull(false)}
                  onLoadedMetadata={(e) =>
                    setDuration(e.currentTarget.duration)
                  }
                />
              </div>
            </div>
          </>
        )}
        {!hasFullAudio && hasYoutube && (
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/8 mb-5 bg-black">
            <iframe
              width="100%"
              height="100%"
              src={
                "https://www.youtube.com/embed/" +
                song.youtubeId +
                "?autoplay=1"
              }
              title={song.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        <div className="my-5 p-4 rounded-2xl bg-white/4 border border-white/8">
          <h3 className="text-white font-[1000] italic uppercase text-xl md:text-2xl tracking-tight leading-tight">
            {song.title}
          </h3>
          {!hasFullAudio && song.artist && (
            <p className="text-accent font-bold tracking-widest uppercase text-sm mt-1">
              {song.artist}
            </p>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-4 bg-accent text-white font-[1000] italic uppercase tracking-widest rounded-2xl shadow-[0_0_20px_var(--accent-glow)] text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} /> Następny utwór
        </motion.button>
        <p className="text-zinc-700 text-[10px] mt-3 uppercase tracking-widest">
          lub kliknij gdziekolwiek
        </p>
      </motion.div>
    </motion.div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function NonLimitGame() {
  const router = useRouter();

  const [source, setSource] = useState<SourceMode | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>(makeEmptyGuesses);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    { title: string; artist: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputError, setInputError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [revealedHintsCount, setRevealedHintsCount] = useState(0);

  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 0.5;
    try {
      const v = localStorage.getItem(LS_VOLUME_KEY);
      if (v !== null) {
        const n = parseFloat(v);
        if (!isNaN(n)) return n;
      }
    } catch {}
    return 0.5;
  });

  const volumeRef = useRef(volume);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const queuesRef = useRef<Record<SourceMode, Song[]>>({
    rap: [],
    klasyki: [],
    soundtracki: [],
  });
  const qIndexRef = useRef<Record<SourceMode, number>>({
    rap: 0,
    klasyki: 0,
    soundtracki: 0,
  });
  const lastIdRef = useRef<Record<SourceMode, number | undefined>>({
    rap: undefined,
    klasyki: undefined,
    soundtracki: undefined,
  });
  const sourceRef = useRef<SourceMode | null>(null);
  const stepRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const isFinishedRef = useRef(isFinished);
  const isStartedRef = useRef(isStarted);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cleanupLyricsRef = useRef<(() => void) | undefined>(undefined);

  const { play } = useSoundEffects(soundEnabled);
  const { stats, recordResult } = useNonLimitStats(source || "rap");

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  useEffect(() => {
    stepRef.current = currentStep;
  }, [currentStep]);
  useEffect(() => {
    isFinishedRef.current = isFinished;
  }, [isFinished]);
  useEffect(() => {
    isStartedRef.current = isStarted;
  }, [isStarted]);

  useEffect(() => {
    try {
      const c =
        localStorage.getItem(LS_ACCENT_KEY) ||
        localStorage.getItem("selected-accent");
      if (c && /^#[0-9a-fA-F]{6}$/.test(c)) applyAccentColor(c);
      const s = localStorage.getItem(LS_SOUND_KEY);
      if (s !== null) setSoundEnabled(s === "true");
    } catch {}
    if (!localStorage.getItem(LS_RULES_SEEN_NONLIMIT)) setShowRules(true);
    setIsReady(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_VOLUME_KEY, volume.toString());
    } catch {}
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (document.hidden && isPlayingRef.current) stopAudio();
    };
    document.addEventListener("visibilitychange", fn);
    return () => document.removeEventListener("visibilitychange", fn);
  }, [stopAudio]);

  useEffect(() => {
    if (selectedIndex >= 0 && scrollContainerRef.current) {
      const c = scrollContainerRef.current;
      const el = c.children[selectedIndex] as HTMLElement;
      if (el) {
        if (el.offsetTop < c.scrollTop)
          c.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        else if (el.offsetTop + el.offsetHeight > c.scrollTop + c.offsetHeight)
          c.scrollTo({
            top: el.offsetTop + el.offsetHeight - c.offsetHeight,
            behavior: "smooth",
          });
      }
    }
  }, [selectedIndex]);

  const pickNextSong = useCallback(
    (mode: SourceMode, pool: Song[], excludeId?: number): Song => {
      let queue = queuesRef.current[mode];
      let idx = qIndexRef.current[mode];
      if (queue.length === 0 || idx >= queue.length) {
        let fresh = shuffleArray(pool);
        if (excludeId !== undefined)
          fresh = fresh.filter((s) => s.id !== excludeId);
        if (fresh.length === 0) fresh = shuffleArray(pool);
        queuesRef.current[mode] = fresh;
        qIndexRef.current[mode] = 1;
        lastIdRef.current[mode] = fresh[0].id;
        return fresh[0];
      }
      const song = queue[idx];
      qIndexRef.current[mode] = idx + 1;
      lastIdRef.current[mode] = song.id;
      return song;
    },
    [],
  );

  const startLyricsSync = useCallback(
    (song: Song) => {
      const audio = audioRef.current;
      if (!audio) return undefined;
      let frameId: number;
      const sync = () => {
        setCurrentTime(audio.currentTime);
        const lastLine = song.lyrics[0].words
          .slice(0, stepRef.current + 1)
          .at(-1);
        if (lastLine && audio.currentTime >= lastLine.end) stopAudio();
        else if (!audio.paused) frameId = requestAnimationFrame(sync);
      };
      const onPlay = () => {
        frameId = requestAnimationFrame(sync);
      };
      const onPause = () => {
        cancelAnimationFrame(frameId);
      };
      const onEnded = () => stopAudio();
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      audio.addEventListener("ended", onEnded);
      return () => {
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
        audio.removeEventListener("ended", onEnded);
        cancelAnimationFrame(frameId);
      };
    },
    [stopAudio],
  );

  useEffect(() => {
    if (!currentSong || source === "soundtracki") return;
    if (cleanupLyricsRef.current) cleanupLyricsRef.current();
    cleanupLyricsRef.current = startLyricsSync(currentSong);
    return () => {
      if (cleanupLyricsRef.current) cleanupLyricsRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, source]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      setIsPlaying(false);
      setCurrentTime(0);
    };
  }, []);

  const startNewRound = useCallback(
    (mode: SourceMode, pool: Song[], excludeId?: number) => {
      stopAudio();
      const next = pickNextSong(mode, pool, excludeId);
      sourceRef.current = mode;
      if (mode !== "soundtracki") {
        if (!audioRef.current) {
          audioRef.current = new Audio(next.audioSrc);
        } else {
          audioRef.current.src = next.audioSrc;
          audioRef.current.load();
        }
        audioRef.current.volume = volumeRef.current;
      }
      setCurrentSong(next);
      setGuesses(makeEmptyGuesses());
      setCurrentStep(0);
      setIsStarted(mode !== "soundtracki");
      setIsFinished(false);
      setGameStatus(null);
      setShowResult(false);
      setInputValue("");
      setSuggestions([]);
      setSelectedIndex(-1);
      setRevealedHintsCount(0);
    },
    [pickNextSong, stopAudio],
  );

  const handleSelectSource = (s: SourceMode) => {
    setSource(s);
    sourceRef.current = s;
    const pool =
      s === "rap"
        ? nonlimitRapSongs
        : s === "klasyki"
          ? nonlimitKlasykiSongs
          : nonlimitSoundtrackiSongs;
    startNewRound(s, pool);
  };

  const handleNextRound = () => {
    if (!source) return;
    const pool =
      source === "rap"
        ? nonlimitRapSongs
        : source === "klasyki"
          ? nonlimitKlasykiSongs
          : nonlimitSoundtrackiSongs;
    startNewRound(source, pool, lastIdRef.current[source]);
  };

  const handlePlayClick = useCallback(() => {
    if (source === "soundtracki") {
      if (isFinishedRef.current || !currentSong) return;
      play("click");
      const clipDur = CLIP_DURATIONS[stepRef.current];
      const clipUrl = currentSong.clips?.[clipDur];
      if (!clipUrl) return;

      if (!audioRef.current) {
        audioRef.current = new Audio(clipUrl);
      } else {
        const currentSrc = audioRef.current.src;
        const isSame = currentSrc === clipUrl || currentSrc.endsWith(clipUrl);
        if (!isSame) {
          audioRef.current.src = clipUrl;
          audioRef.current.load();
        }
      }
      audioRef.current.volume = volumeRef.current;
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.warn);
      setIsPlaying(true);
      if (!isStartedRef.current) setIsStarted(true);
    } else {
      play("click");
      setIsPlaying(true);
      audioRef.current?.play();
    }
  }, [source, currentSong, play]);

  // ─── NOWE: seek do dowolnego wersu (rap i klasyki) ────────────────────────
  const handleSeek = useCallback(
    (time: number) => {
      if (!audioRef.current || isFinishedRef.current || source === "soundtracki") return;

      if (!isStartedRef.current) setIsStarted(true);

      audioRef.current.currentTime = time;

      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    },
    [source],
  );

  const updateSuggestions = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        setSelectedIndex(-1);
        return;
      }
      const q = normalizePolishChars(query.toLowerCase());
      const songs =
        source === "rap"
          ? nonlimitRapAllSongs
          : source === "klasyki"
            ? nonlimitKlasykiAllSongs
            : nonlimitSoundtrackiAllSongs;
      setSuggestions(
        (songs as { title: string; artist: string }[])
          .filter(
            (s) =>
              normalizePolishChars(s.title.toLowerCase()).includes(q) ||
              (s.artist &&
                normalizePolishChars(s.artist.toLowerCase()).includes(q)),
          )
          .slice(0, 50),
      );
      setSelectedIndex(-1);
    },
    [source],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0 && selectedIndex >= 0) {
        play("select");
        const s = suggestions[selectedIndex];
        const val =
          source === "soundtracki" || !s.artist
            ? s.title
            : s.artist + " - " + s.title;
        setInputValue(val);
        setSuggestions([]);
        setSelectedIndex(-1);
      } else if (inputValue.trim()) {
        handleGuess();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length)
        setSelectedIndex((p) => Math.min(p + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length) setSelectedIndex((p) => Math.max(p - 1, 0));
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key.length === 1) play("type");
  };

  const handleGuess = () => {
    if (!isStarted || isFinished || currentStep >= MAX_ATTEMPTS || !currentSong)
      return;
    const norm = (s: string) => normalizePolishChars(s.toUpperCase());
    const isSkip = inputValue.trim() === "";
    const isSoundtracki = source === "soundtracki";
    const allSongs =
      source === "rap"
        ? nonlimitRapAllSongs
        : source === "klasyki"
          ? nonlimitKlasykiAllSongs
          : nonlimitSoundtrackiAllSongs;
    const exactMatch = isSoundtracki
      ? allSongs.some((s) => norm(s.title) === norm(inputValue.trim()))
      : allSongs.some(
          (s) => norm(s.artist + " - " + s.title) === norm(inputValue.trim()),
        );

    if (!isSkip && !exactMatch) {
      setInputError(true);
      setTimeout(() => setInputError(false), 350);
      setSuggestions([]);
      play("wrong");
      return;
    }

    const songInDb = isSoundtracki
      ? allSongs.find((s) => norm(s.title) === norm(inputValue.trim()))
      : allSongs.find(
          (s) => norm(s.artist + " - " + s.title) === norm(inputValue.trim()),
        );
    const newGuesses = [...guesses];
    let status: GuessStatus = "wrong";
    let displayText = "";

    if (isSkip) {
      displayText = "POMINIĘTO";
      status = "skipped";
      play("skip");
    } else if (!songInDb) {
      displayText = "PRÓBUJ DALEJ..";
      status = "wrong";
      play("wrong");
    } else {
      const isCorrect = isSoundtracki
        ? norm(songInDb.title) === norm(currentSong.title)
        : songInDb.title.toLowerCase() === currentSong.title.toLowerCase();
      const artistMatch =
        !isCorrect &&
        !isSoundtracki &&
        hasCommonArtist(songInDb.artist, currentSong.artist);
      displayText = isSoundtracki
        ? songInDb.title.toUpperCase()
        : (songInDb.artist + " - " + songInDb.title).toUpperCase();
      status = isCorrect ? "correct" : artistMatch ? "artist" : "wrong";
      if (isCorrect) play("correct");
      else if (artistMatch) play("select");
      else play("wrong");
    }

    newGuesses[currentStep] = { display: displayText, status };
    setGuesses(newGuesses);
    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);
    stopAudio();
    if (isSoundtracki && audioRef.current) audioRef.current.onended = null;

    if (status === "correct") {
      setIsFinished(true);
      setGameStatus("win");
      recordResult(true, currentStep + 1);
      setShowResult(true);
      play("win");
    } else if (currentStep < MAX_ATTEMPTS - 1) {
      setCurrentStep((p) => p + 1);
      if (isSoundtracki) setRevealedHintsCount((prev) => Math.min(prev + 1, 4));
      if (isSoundtracki && audioRef.current) audioRef.current.src = "";
    } else {
      setIsFinished(true);
      setGameStatus("lose");
      recordResult(false, null);
      setShowResult(true);
      play("lose");
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(parseFloat(e.target.value));

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    play("click");
    try {
      localStorage.setItem(LS_SOUND_KEY, next.toString());
    } catch {}
  };

  if (!isReady)
    return (
      <div className="h-dvh bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const currentAllSongs =
    source === "rap"
      ? nonlimitRapAllSongs
      : source === "klasyki"
        ? nonlimitKlasykiAllSongs
        : nonlimitSoundtrackiAllSongs;

  return (
    <div className="min-h-dvh bg-zinc-950 text-white flex flex-col relative">
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: var(--accent-main);
          border-radius: 10px;
        }
        @keyframes waveBar {
          from { transform: scaleY(0.35); opacity: 0.45; }
          to { transform: scaleY(1); opacity: 1; }
        }
        @keyframes waveform {
          from { transform: scaleY(0.4); opacity: 0.5; }
          to { transform: scaleY(1); opacity: 1; }
        }
        @keyframes pulseOpacity {
          from { opacity: 0.04; }
          to { opacity: 0.1; }
        }
      `}</style>

      <div className="fixed inset-0 bg-gradient-to-b from-zinc-950 via-[#080808] to-zinc-950 z-0 pointer-events-none" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] opacity-[0.06] rounded-full pointer-events-none"
        style={{ background: "var(--accent-main)" }}
      />

      <AnimatePresence>
        {showRules && (
          <RulesModalComponent
            onClose={() => {
              setShowRules(false);
              try {
                localStorage.setItem(LS_RULES_SEEN_NONLIMIT, "true");
              } catch {}
            }}
          />
        )}
      </AnimatePresence>

      <TopBar
        source={source}
        streak={stats.currentStreak}
        onBack={() => router.push("/")}
        onStats={() => {
          play("modalOpen");
          setIsStatsOpen(true);
        }}
        onSettings={() => {
          play("modalOpen");
          setIsSettingsOpen(true);
        }}
        onRules={() => {
          play("click");
          setShowRules(true);
        }}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onToggleSound={toggleSound}
        soundEnabled={soundEnabled}
      />

      <AnimatePresence mode="wait">
        {!source ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-y-auto relative z-10"
          >
            <ModeSelector onSelect={handleSelectSource} />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col relative z-10"
          >
            <div className="flex items-center justify-center gap-2 py-2 border-b border-white/5 bg-black/20 shrink-0">
              <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                Tryb:
              </span>
              {(["rap", "klasyki", "soundtracki"] as SourceMode[]).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (s !== source) {
                      play("click");
                      handleSelectSource(s);
                    }
                  }}
                  className={
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border " +
                    (source === s
                      ? "bg-accent/20 border-accent/40 text-accent"
                      : "bg-white/3 border-white/8 text-zinc-600 hover:text-zinc-300")
                  }
                >
                  {s === "rap"
                    ? "RAP"
                    : s === "klasyki"
                      ? "KLASYKI"
                      : "SOUNDTRACKI"}
                </button>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-center overflow-y-auto">
              <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-8">
                  <div className="w-full md:flex-1 flex justify-center">
                    {currentSong && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSong.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="w-full flex justify-center"
                        >
                          {source === "soundtracki" ? (
                            <ClipPlayer
                              song={currentSong}
                              currentStep={currentStep}
                              isPlaying={isPlaying}
                              isFinished={isFinished}
                              onPlay={handlePlayClick}
                              onStop={stopAudio}
                              guesses={guesses}
                              revealedHintsCount={revealedHintsCount}
                            />
                          ) : (
                            <Player
                              isStarted={isStarted}
                              isPlaying={isPlaying}
                              currentStep={currentStep}
                              currentTime={currentTime}
                              song={currentSong}
                              onPlayClick={handlePlayClick}
                              stopAudio={stopAudio}
                              onSeek={handleSeek}
                              isDisabled={isFinished}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                  <div className="w-full md:flex-1 flex justify-center">
                    <ProgressGuesses guesses={guesses} gameMode="nonlimit" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-20 shrink-0 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent pt-4 pb-4 px-4">
              <SearchBar
                isFinished={isFinished}
                isStarted={isStarted}
                inputValue={inputValue}
                setInputValue={(v) => {
                  setInputValue(v);
                  updateSuggestions(v);
                }}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                onKeyDown={handleKeyDown}
                onGuess={handleGuess}
                scrollContainerRef={scrollContainerRef}
                inputError={inputError}
                guessedSongs={guesses.map((g) => g.display).filter(Boolean)}
                gameMode={source === "soundtracki" ? "soundtracki" : "nonlimit"}
                allSongs={currentAllSongs}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResult && gameStatus && currentSong && (
          <RoundResult
            status={gameStatus}
            song={currentSong}
            streak={stats.currentStreak}
            onNext={handleNextRound}
          />
        )}
      </AnimatePresence>

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => {
          play("modalClose");
          setIsStatsOpen(false);
        }}
        stats={stats}
        globalStats={null}
        globalLoading={false}
        currentDay={0}
        gameMode="nonlimit"
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          play("modalClose");
          setIsSettingsOpen(false);
        }}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
      <Footer />
    </div>
  );
}