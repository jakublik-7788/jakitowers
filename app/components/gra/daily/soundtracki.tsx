"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  BarChart3,
  Settings,
  Volume2,
  Volume1,
  VolumeX,
  Play,
  Pause,
  Trophy,
  Home,
  X,
  Share2,
  Check,
  Clock,
  HelpCircle,
} from "lucide-react";
import { Footer } from "../../Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { soundtrackiSongs } from "@/app/scripts/songs/soundtracki/soundtrackiSongs";
import { soundtrackiAllSongs } from "@/app/scripts/songs/soundtracki/soundtrackiAllSongs";
import { StatsModal } from "@/app/components/StatsModal";
import { SettingsModal } from "@/app/components/SettingsModal";
import { CalendarModal } from "@/app/components/CalendarModal";
import { CountdownTimer } from "@/app/components/CountdownTimer";
import { ProgressGuesses } from "@/app/components/ProgressGuesses";
import { SearchBar } from "@/app/components/SearchBar";
import { ClipPlayer } from "@/app/components/ClipPlayer";
import { RulesModal } from "@/app/components/RulesModal";
import { useSoundEffects } from "@/app/scripts/useSoundEffects";
import { useGameStats } from "@/app/scripts/Usegamestats";
import { todayDayNumber, maxUnlockedDay } from "@/app/scripts/Usecalendar";
import { Song } from "@/app/types/song";
import { domToPng } from "modern-screenshot";

// ─── Stała startu trybu ───────────────────────────────────────────────────────
const SOUNDTRACKI_START_DAY = 18;

// ─── Types ────────────────────────────────────────────────────────────────────
type GuessStatus = "correct" | "wrong" | "skipped" | "empty";
interface Guess {
  display: string;
  status: GuessStatus;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LS_ACCENT_KEY = "jakitowers_accent_color";
const LS_SOUND_KEY = "jakitowers_sound_enabled";
const LS_VOLUME_KEY = "jakitowers_volume";
const LS_RESULTS_KEY = "jakitowers_soundtracki_results";
const LS_DAY_PREFIX = "jakitowers_day_soundtracki_";
const LS_RULES_SEEN_KEY = "jakitowers_rules_seen_soundtracki";
const MAX_ATTEMPTS = 5;
const CLIP_DURATIONS: (1 | 3 | 5 | 10 | 15)[] = [1, 3, 5, 10, 15];

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

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const applyAccentColor = (hex: string) => {
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

interface SavedDayState {
  guesses: Guess[];
  currentStep: number;
  isFinished: boolean;
  gameStatus: "win" | "lose" | null;
  hasStartedGame: boolean;
  revealedHintsCount: number;
}

function saveDayState(day: number, state: SavedDayState) {
  try {
    localStorage.setItem(LS_DAY_PREFIX + day, JSON.stringify(state));
  } catch {}
}
function loadDayState(day: number): SavedDayState | null {
  try {
    const r = localStorage.getItem(LS_DAY_PREFIX + day);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}
function saveResults(results: Record<number, "win" | "lose">) {
  try {
    localStorage.setItem(LS_RESULTS_KEY, JSON.stringify(results));
    window.dispatchEvent(new CustomEvent("gameResult"));
  } catch {}
}
function loadResults(): Record<number, "win" | "lose"> {
  try {
    const r = localStorage.getItem(LS_RESULTS_KEY);
    return r ? JSON.parse(r) : {};
  } catch {
    return {};
  }
}

// ─── TopBar ───────────────────────────────────────────────────────────────────
const TopBar = ({
  currentDay,
  onPrev,
  onNext,
  onCalendar,
  onStats,
  onSettings,
  onBack,
  onRules,
  volume,
  soundEnabled,
  onVolumeChange,
  onToggleSound,
  startDay = SOUNDTRACKI_START_DAY,
}: {
  currentDay: number;
  onPrev: () => void;
  onNext: () => void;
  onCalendar: () => void;
  onStats: () => void;
  onSettings: () => void;
  onBack: () => void;
  onRules: () => void;
  volume: number;
  soundEnabled: boolean;
  onVolumeChange: (v: number) => void;
  onToggleSound: () => void;
  startDay?: number;
}) => {
  const VolumeIcon =
    !soundEnabled || volume === 0 ? VolumeX : volume < 0.33 ? Volume1 : Volume2;
  return (
    <>
      {/* Desktop TopBar */}
      <div className="relative z-50 items-center justify-between px-4 md:px-8 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md shrink-0 hidden md:flex">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Menu</span>
          </button>
          <div className="hidden sm:block h-5 w-px bg-white/20" />
          <span className="hidden sm:block text-xl font-[1000] italic tracking-tighter uppercase">
            JAKI<span style={{ color: "var(--accent-main)" }}>TO</span>WERS
          </span>
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/10 border border-accent/20">
            <span className="text-accent text-[9px] font-black tracking-[0.3em] uppercase">
              SOUNDTRACKI · DAILY
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentDay <= startDay}
            className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-accent hover:border-accent/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="px-3 py-1 rounded-lg bg-zinc-900/80 border border-white/8 min-w-[60px] text-center">
            <span className="text-accent font-black text-xs tracking-widest">
              #{currentDay}
            </span>
          </div>
          <button
            onClick={onNext}
            disabled={currentDay >= maxUnlockedDay()}
            className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-accent hover:border-accent/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onStats}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <BarChart3 size={14} />
            <span>Statystyki</span>
          </button>
          <button
            onClick={onCalendar}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Calendar size={14} />
            <span>Kalendarz</span>
          </button>

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
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
              style={{
                background: `linear-gradient(to right, var(--accent-main) ${volume * 100}%, #3f3f46 ${volume * 100}%)`,
              }}
            />
            <span className="text-zinc-500 text-[10px] font-mono w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <button
            onClick={onStats}
            className="md:hidden w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
          >
            <BarChart3 size={14} />
          </button>
          <button
            onClick={onCalendar}
            className="md:hidden w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
          >
            <Calendar size={14} />
          </button>
          <button
            onClick={onRules}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
            title="Zasady gry"
          >
            <HelpCircle size={14} />
          </button>
          <button
            onClick={onSettings}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white transition-all"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* Mobile TopBar */}
      <div className="relative z-50 flex items-center justify-between px-3 py-3 border-b border-white/5 bg-black/40 backdrop-blur-md shrink-0 md:hidden">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 active:text-white active:bg-white/10 transition-all"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
          <span className="text-accent font-black text-xs tracking-widest">
            SOUNDTRACKI #{currentDay}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onStats}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 active:text-white active:bg-white/10 transition-all"
          >
            <BarChart3 size={16} />
          </button>
          <button
            onClick={onCalendar}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 active:text-white active:bg-white/10 transition-all"
          >
            <Calendar size={16} />
          </button>
          <button
            onClick={onRules}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 active:text-white active:bg-white/10 transition-all"
          >
            <HelpCircle size={16} />
          </button>
          <button
            onClick={onSettings}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400 active:text-white active:bg-white/10 transition-all"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

// ─── End Game Modal ───────────────────────────────────────────────────────────
const EndModal = ({
  status,
  song,
  dayNumber,
  attempts,
  onClose,
}: {
  status: "win" | "lose";
  song: Song;
  dayNumber: number;
  attempts: number;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showShareCard, setShowShareCard] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const handleDownloadShareCard = () => {
    setShowShareCard(true);
    setTimeout(() => {
      const shareCardElement = shareCardRef.current;
      if (!shareCardElement) {
        setShowShareCard(false);
        return;
      }

      import("modern-screenshot").then(({ domToPng }) => {
        domToPng(shareCardElement, { quality: 1, scale: 2 })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `daily_soundtracki_${dayNumber}.png`;
            link.href = dataUrl;
            link.click();
            navigator.clipboard.writeText("https://www.jakitowers.pl");
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          })
          .catch((err) => {
            console.error("Błąd podczas generowania grafiki:", err);
          })
          .finally(() => {
            setShowShareCard(false);
          });
      });
    }, 100);
  };

  useEffect(() => {
    if (!song.fullAudioSrc) return;
    const audio = new Audio(song.fullAudioSrc);
    audioRef.current = audio;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlayingFull(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    const savedVolume = localStorage.getItem(LS_VOLUME_KEY);
    audio.volume = savedVolume ? parseFloat(savedVolume) : 0.7;

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [song.fullAudioSrc]);

  const toggleFullAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingFull) audioRef.current.pause();
    else audioRef.current.play().catch(console.warn);
    setIsPlayingFull(!isPlayingFull);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const handleMidnight = useCallback(() => window.location.reload(), []);
  const hasFullAudio = !!song.fullAudioSrc;
  const isWin = status === "win";
  const SITE_URL = "https://www.jakitowers.pl";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/97 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-zinc-950 border-2 border-accent/40 rounded-[32px] p-6 md:p-8 max-w-2xl w-full shadow-[0_0_60px_var(--accent-glow)] relative overflow-hidden my-4"
        >
          <div
            className="absolute -top-20 -left-20 w-56 h-56 blur-[100px] rounded-full pointer-events-none opacity-20"
            style={{ background: status === "win" ? "#22c55e" : "#ef4444" }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all z-10"
          >
            <X size={14} />
          </button>
          <div className="flex justify-center mb-3">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${status === "win" ? "bg-green-500/15 border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.3)]" : "bg-red-500/15 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.3)]"}`}
            >
              {status === "win" ? (
                <Trophy size={24} className="text-green-400" />
              ) : (
                <span className="text-red-400 text-2xl font-black">✕</span>
              )}
            </div>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-[1000] italic uppercase tracking-tighter mb-0.5 text-center ${status === "win" ? "text-green-400" : "text-red-500"}`}
          >
            {status === "win" ? "ZGADNIĘTE!" : "NIESTETY..."}
          </h2>
          <p className="text-zinc-500 text-[10px] font-black tracking-[0.3em] uppercase mb-4 text-center">
            {status === "win"
              ? `DZIEŃ #${dayNumber} · ${attempts}/5 PRÓB`
              : `DZIEŃ #${dayNumber} · NIE TYM RAZEM`}
          </p>
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
          <div className="mb-4 p-4 rounded-2xl bg-white/4 border border-white/8 text-center">
            <h3 className="text-white font-[1000] italic uppercase text-xl md:text-2xl tracking-tight leading-tight">
              {song.title}
            </h3>
          </div>

          {hasFullAudio && (
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
                    onChange={handleSeek}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--accent-main) ${(currentTime / (duration || 1)) * 100}%, #3f3f46 ${(currentTime / (duration || 1)) * 100}%)`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            <div className="w-full bg-zinc-900/80 py-3 rounded-2xl font-black tracking-widest uppercase italic border border-white/10 flex items-center justify-center gap-2 text-sm">
              <Clock size={14} className="text-zinc-500" />
              <span className="text-zinc-400 text-xs">Nowy soundtrack za</span>
              <CountdownTimer
                onMidnight={handleMidnight}
                className="text-accent font-mono text-sm"
              />
            </div>

            <button
              onClick={handleDownloadShareCard}
              className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 text-white py-3 rounded-2xl font-black tracking-widest hover:bg-white/10 active:scale-95 transition-all uppercase italic text-sm"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-400" />
                  <span className="text-green-400">Link skopiowany!</span>
                </>
              ) : (
                <>
                  <Share2 size={16} className="text-accent" />
                  POBIERZ WYNIK
                </>
              )}
            </button>
            {!copied && (
              <p className="text-zinc-700 text-[10px] text-center -mt-1 tracking-wide">
                Link do strony zostanie skopiowany do schowka
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Ukryta karta do pobrania */}
      {showShareCard && (
        <div className="fixed left-[-9999px] top-0">
          <div
            ref={shareCardRef}
            className="w-[1080px] h-[1920px] bg-[#050505] flex flex-col items-center justify-between p-24 overflow-hidden relative"
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] blur-[150px] rounded-full opacity-20 ${isWin ? "bg-green-500" : "bg-red-500"}`}
            />
            <div className="relative z-10 text-center mt-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-12 w-px bg-accent/30" />
                <div>
                  <p className="text-accent text-3xl font-black tracking-[0.3em] uppercase mb-1">
                    SOUNDTRACKI
                  </p>
                  <p className="text-zinc-500 text-xl font-bold tracking-widest">
                    CODZIENNY CHALLENGE
                  </p>
                </div>
              </div>
              <p className="text-accent text-4xl font-black tracking-widest mb-4">
                DZIEŃ #{dayNumber}
              </p>
              <h1 className="text-8xl font-[1000] italic tracking-tighter uppercase select-none leading-none text-white">
                JAKI<span className="text-accent">TO</span>WERS
              </h1>
              <div className="h-1.5 w-40 bg-accent mx-auto mt-6 shadow-[0_0_20px_var(--accent-glow)]" />
            </div>
            <div className="relative z-10 text-center">
              <p className="text-zinc-500 text-4xl font-black tracking-[0.5em] uppercase mb-8">
                WYNIK
              </p>
              <div
                className={`text-[130px] font-[1000] italic leading-none uppercase tracking-tighter ${isWin ? "text-green-400 mb-4" : "text-red-500 mb-12"}`}
              >
                {isWin ? "ZGADNIĘTE" : "NIEZGADNIĘTE"}
              </div>
              {isWin && (
                <div className="mb-10">
                  <p className="text-white text-7xl font-black italic tracking-tighter leading-none">
                    {attempts}/5
                  </p>
                  <p className="text-zinc-500 text-2xl font-bold uppercase tracking-widest mt-2">
                    wykorzystane próby
                  </p>
                </div>
              )}
              <div
                className={`px-12 py-4 rounded-full border-4 inline-block ${isWin ? "border-green-400/30 text-green-400" : "border-red-500/30 text-red-500"}`}
              >
                <span className="text-4xl font-black tracking-widest uppercase">
                  {isWin ? "GRATULACJE" : "SPRÓBUJ JUTRO"}
                </span>
              </div>
            </div>
            <div className="relative z-10 w-full bg-zinc-900/60 border-2 border-white/10 rounded-[50px] p-16 backdrop-blur-3xl mb-12">
              <div className="flex flex-col items-center text-center">
                <p className="text-zinc-500 text-2xl font-bold tracking-[0.4em] uppercase mb-8">
                  DZISIEJSZY SOUNDTRACK
                </p>
                <h2 className="text-white text-7xl font-[1000] uppercase italic leading-tight mb-4 drop-shadow-lg">
                  {song.title}
                </h2>
              </div>
            </div>
            <div className="relative z-10 opacity-30">
              <p className="text-white text-3xl font-bold tracking-[0.6em] uppercase">
                {SITE_URL.replace("https://", "")}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function DailySoundtracki() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentDay, setCurrentDay] = useState<number>(() =>
    Math.max(todayDayNumber(), SOUNDTRACKI_START_DAY),
  );
  const [volume, setVolumeState] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guesses, setGuesses] = useState<Guess[]>(() =>
    Array(MAX_ATTEMPTS)
      .fill(null)
      .map(() => ({ display: "", status: "empty" as GuessStatus })),
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    { title: string; artist: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputError, setInputError] = useState(false);
  const [results, setResults] = useState<Record<number, "win" | "lose">>({});
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [stateLoaded, setStateLoaded] = useState(false);
  const [hasStartedGame, setHasStartedGame] = useState(false);
  const [revealedHintsCount, setRevealedHintsCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const { play } = useSoundEffects(soundEnabled);
  const {
    localStats,
    globalStats,
    globalLoading,
    recordResult,
    refetchGlobalStats,
  } = useGameStats(currentDay, "soundtracki");

  const song =
    soundtrackiSongs.find((s) => s.day === currentDay) || soundtrackiSongs[0];

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Init
  useEffect(() => {
    const dayParam = searchParams.get("day");
    if (dayParam) {
      const d = parseInt(dayParam, 10);
      if (
        !isNaN(d) &&
        d >= SOUNDTRACKI_START_DAY &&
        d <= soundtrackiSongs.length
      )
        setCurrentDay(d);
    }
    try {
      const c =
        localStorage.getItem(LS_ACCENT_KEY) ||
        localStorage.getItem("selected-accent");
      if (c && /^#[0-9a-fA-F]{6}$/.test(c)) applyAccentColor(c);
      const s = localStorage.getItem(LS_SOUND_KEY);
      if (s !== null) setSoundEnabled(s === "true");
      const v = localStorage.getItem(LS_VOLUME_KEY);
      if (v !== null) {
        const n = parseFloat(v);
        if (!isNaN(n)) setVolumeState(n);
      } else setVolumeState(0.5);
    } catch {
      setVolumeState(0.5);
    }
    setResults(loadResults());
    if (!localStorage.getItem(LS_RULES_SEEN_KEY)) setShowRules(true);
  }, [searchParams]);

  useEffect(() => {
    const onVol = (e: Event) => {
      const v = (e as CustomEvent).detail;
      setVolumeState(v);
      if (audioRef.current) audioRef.current.volume = v;
    };
    const onSnd = (e: Event) => {
      setSoundEnabled((e as CustomEvent).detail);
    };
    window.addEventListener("volumeChange", onVol);
    window.addEventListener("soundToggle", onSnd);
    return () => {
      window.removeEventListener("volumeChange", onVol);
      window.removeEventListener("soundToggle", onSnd);
    };
  }, []);

  // Load/reset day state
  useEffect(() => {
    setStateLoaded(false);
    const saved = loadDayState(currentDay);
    if (saved) {
      setGuesses(saved.guesses);
      setCurrentStep(saved.currentStep);
      setIsFinished(saved.isFinished);
      setGameStatus(saved.gameStatus);
      setHasStartedGame(saved.hasStartedGame);
      setRevealedHintsCount(saved.revealedHintsCount);
    } else {
      setGuesses(
        Array(MAX_ATTEMPTS)
          .fill(null)
          .map(() => ({ display: "", status: "empty" as GuessStatus })),
      );
      setCurrentStep(0);
      setIsFinished(false);
      setGameStatus(null);
      setHasStartedGame(false);
      setRevealedHintsCount(0);
    }
    setShowModal(false);
    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);
    stopAudio();
    requestAnimationFrame(() => setStateLoaded(true));
  }, [currentDay]);

  // Persist day state
  useEffect(() => {
    if (!stateLoaded) return;
    saveDayState(currentDay, {
      guesses,
      currentStep,
      isFinished,
      gameStatus,
      hasStartedGame,
      revealedHintsCount,
    });
  }, [
    guesses,
    currentStep,
    isFinished,
    gameStatus,
    hasStartedGame,
    revealedHintsCount,
    currentDay,
    stateLoaded,
  ]);

  const currentClipUrl = song?.clips?.[CLIP_DURATIONS[currentStep]];

  useEffect(() => {
    if (!currentClipUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(currentClipUrl);
    } else {
      const currentSrc = audioRef.current.src;
      const isSame =
        currentSrc === currentClipUrl || currentSrc.endsWith(currentClipUrl);
      if (!isSame) {
        audioRef.current.src = currentClipUrl;
        audioRef.current.load();
      }
    }
    if (volume !== null) audioRef.current.volume = volume;
  }, [currentClipUrl]);

  useEffect(() => {
    if (audioRef.current && volume !== null) audioRef.current.volume = volume;
  }, [volume]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [currentClipUrl]);

  useEffect(() => {
    const fn = () => {
      if (document.hidden && isPlayingRef.current) stopAudio();
    };
    document.addEventListener("visibilitychange", fn);
    return () => document.removeEventListener("visibilitychange", fn);
  }, [stopAudio]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      setIsPlaying(false);
    };
  }, []);

  // ─── Document-level swipe (działa nawet gdy modal jest otwarty) ───────────
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(deltaX) < 50) return;
      if (deltaX > 0 && currentDay > SOUNDTRACKI_START_DAY) goToPrevDay();
      else if (deltaX < 0 && currentDay < maxUnlockedDay()) goToNextDay();
    };
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentDay]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePlay = () => {
    if (isFinished || !audioRef.current) return;
    play("click");
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(console.warn);
    setIsPlaying(true);
    if (!hasStartedGame) setHasStartedGame(true);
  };

  const updateSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const q = normalizePolishChars(query.toLowerCase());
    setSuggestions(
      soundtrackiAllSongs
        .filter((s) => normalizePolishChars(s.title.toLowerCase()).includes(q))
        .slice(0, 10),
    );
  }, []);

  const handleInputChange = (v: string) => {
    setInputValue(v);
    updateSuggestions(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0 && selectedIndex >= 0) {
        play("select");
        setInputValue(suggestions[selectedIndex].title);
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
    } else if (e.key.length === 1) {
      play("type");
    }
  };

  const handleGuess = () => {
    if (isFinished || currentStep >= MAX_ATTEMPTS || !song) return;
    stopAudio();
    const norm = (s: string) => normalizePolishChars(s.toUpperCase());
    const isSkip = inputValue.trim() === "";
    const guessedTitle = inputValue.trim();
    const exactMatch = soundtrackiAllSongs.some(
      (s) => norm(s.title) === norm(guessedTitle),
    );

    if (!isSkip && !exactMatch) {
      setInputError(true);
      setTimeout(() => setInputError(false), 350);
      setSuggestions([]);
      play("wrong");
      return;
    }

    const newGuesses = [...guesses];
    let status: GuessStatus = "wrong";
    let displayText = "";

    if (isSkip) {
      displayText = "POMINIĘTO";
      status = "skipped";
      play("skip");
    } else {
      const isCorrect = norm(guessedTitle) === norm(song.title);
      displayText = guessedTitle.toUpperCase();
      status = isCorrect ? "correct" : "wrong";
      if (isCorrect) play("correct");
      else play("wrong");
    }

    newGuesses[currentStep] = { display: displayText, status };
    setGuesses(newGuesses);
    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);

    if (status === "correct") {
      setIsFinished(true);
      setGameStatus("win");
      const r = { ...results, [currentDay]: "win" as const };
      setResults(r);
      saveResults(r);
      recordResult(true, currentStep + 1);
      setShowModal(true);
      play("win");
    } else if (currentStep < MAX_ATTEMPTS - 1) {
      setCurrentStep((p) => p + 1);
      setRevealedHintsCount((prev) => Math.min(prev + 1, 4));
    } else {
      setIsFinished(true);
      setGameStatus("lose");
      const r = { ...results, [currentDay]: "lose" as const };
      setResults(r);
      saveResults(r);
      recordResult(false, null);
      setShowModal(true);
      play("lose");
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
    try {
      localStorage.setItem(LS_VOLUME_KEY, v.toString());
    } catch {}
    window.dispatchEvent(new CustomEvent("volumeChange", { detail: v }));
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      localStorage.setItem(LS_SOUND_KEY, next.toString());
    } catch {}
    window.dispatchEvent(new CustomEvent("soundToggle", { detail: next }));
  };

  const goToNextDay = () => {
    if (currentDay < maxUnlockedDay()) {
      play("click");
      setCurrentDay((p) => p + 1);
    }
  };
  const goToPrevDay = () => {
    if (currentDay > SOUNDTRACKI_START_DAY) {
      play("click");
      setCurrentDay((p) => p - 1);
    }
  };

  if (volume === null)
    return (
      <div className="min-h-dvh bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );

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
      `}</style>

      <div className="fixed inset-0 bg-gradient-to-b from-zinc-950 via-[#080808] to-zinc-950 z-0 pointer-events-none" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] opacity-[0.06] rounded-full pointer-events-none"
        style={{ background: "var(--accent-main)" }}
      />

      <TopBar
        currentDay={currentDay}
        onPrev={goToPrevDay}
        onNext={goToNextDay}
        onCalendar={() => {
          play("modalOpen");
          setIsCalendarOpen(true);
        }}
        onStats={() => {
          play("modalOpen");
          refetchGlobalStats();
          setIsStatsOpen(true);
        }}
        onSettings={() => {
          play("modalOpen");
          setIsSettingsOpen(true);
        }}
        onBack={() => router.push("/")}
        onRules={() => {
          play("modalOpen");
          setShowRules(true);
        }}
        volume={volume}
        soundEnabled={soundEnabled}
        onVolumeChange={setVolume}
        onToggleSound={toggleSound}
        startDay={SOUNDTRACKI_START_DAY}
      />

      <div className="relative z-10 flex-1 flex flex-col md:flex-row md:items-center md:justify-center w-full max-w-6xl mx-auto px-4 py-6 md:py-8 gap-6 md:gap-8">
        <div className="w-full md:w-auto md:flex-1 flex justify-center">
          {!isFinished ? (
            <ClipPlayer
              song={song}
              currentStep={currentStep}
              isPlaying={isPlaying}
              isFinished={isFinished}
              onPlay={handlePlay}
              onStop={stopAudio}
              guesses={guesses}
              revealedHintsCount={revealedHintsCount}
            />
          ) : (
            <div className="w-full max-w-md">
              <div className="bg-zinc-900/80 backdrop-blur-sm border border-accent/30 rounded-2xl p-5 text-center">
                <div
                  className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center ${gameStatus === "win" ? "bg-green-500/20" : "bg-red-500/20"}`}
                >
                  <Trophy
                    size={28}
                    className={
                      gameStatus === "win" ? "text-green-400" : "text-red-400"
                    }
                  />
                </div>
                <h3 className="text-xl font-[1000] italic uppercase mb-1">
                  {gameStatus === "win" ? "ZGADNIĘTE!" : "NIEZGADNIĘTE!"}
                </h3>
                <p className="text-zinc-400 text-xs mb-4">
                  Dzień #{currentDay} ·{" "}
                  {gameStatus === "win"
                    ? `${currentStep + 1} próba!`
                    : "Spróbuj jutro"}
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      play("modalOpen");
                      setShowModal(true);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent text-white font-bold uppercase tracking-wider text-xs hover:opacity-80 transition-all"
                  >
                    <Trophy size={14} /> Szczegóły wyniku
                  </button>
                  <button
                    onClick={() => {
                      play("click");
                      router.push("/");
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 font-bold uppercase tracking-wider text-xs hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Home size={14} /> Powrót do menu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <ProgressGuesses guesses={guesses} />
        </div>
      </div>

      {!isFinished && (
        <div className="relative z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-4 pb-6 px-4">
          <SearchBar
            isFinished={isFinished}
            isStarted={hasStartedGame}
            inputValue={inputValue}
            setInputValue={handleInputChange}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            onKeyDown={handleKeyDown}
            onGuess={handleGuess}
            scrollContainerRef={scrollContainerRef}
            inputError={inputError}
            guessedSongs={guesses.map((g) => g.display).filter(Boolean)}
            gameMode="soundtracki"
            songSource="soundtracki"
            allSongs={soundtrackiAllSongs}
          />
        </div>
      )}

      <AnimatePresence>
        {gameStatus && showModal && (
          <EndModal
            status={gameStatus}
            song={song}
            dayNumber={currentDay}
            attempts={currentStep + 1}
            onClose={() => {
              play("modalClose");
              setShowModal(false);
            }}
          />
        )}
        {showRules && (
          <RulesModal
            modeKey="soundtracki-daily"
            onClose={() => {
              setShowRules(false);
              try {
                localStorage.setItem(LS_RULES_SEEN_KEY, "true");
              } catch {}
            }}
          />
        )}
      </AnimatePresence>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => {
          play("modalClose");
          setIsCalendarOpen(false);
        }}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        rapResults={{}}
        klasykiResults={{}}
        soundtrackiResults={results}
        onDayClick={(d) => setCurrentDay(Math.max(d, SOUNDTRACKI_START_DAY))}
        totalDays={soundtrackiSongs.length}
      />
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => {
          play("modalClose");
          setIsStatsOpen(false);
        }}
        stats={localStats}
        globalStats={globalStats}
        globalLoading={globalLoading}
        currentDay={currentDay}
        gameMode="daily"
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
