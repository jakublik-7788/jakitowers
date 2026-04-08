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
  Trophy,
  ArrowLeft,
  Home,
  Calendar,
  BarChart3,
  Settings,
  Music2,
  Volume2,
  Volume1,
  VolumeX,
  X,
  HelpCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { klasykiSongs as dailySongs } from "@/app/scripts/songs/klasyki/klasykiSongs";
import { klasykiAllSongs } from "@/app/scripts/songs/klasyki/klasykiAllSongs";
import { EndGameModal } from "@/app/components/EndGameModal";
import { CalendarModal } from "@/app/components/CalendarModal";
import { StatsModal } from "@/app/components/StatsModal";
import { Player } from "@/app/components/Player";
import { ProgressGuesses } from "@/app/components/ProgressGuesses";
import { SearchBar } from "@/app/components/SearchBar";
import { SettingsModal } from "@/app/components/SettingsModal";
import { RulesModal } from "@/app/components/RulesModal";
import { useSoundEffects } from "@/app/scripts/useSoundEffects";
import { useGameStats, GlobalStats } from "@/app/scripts/Usegamestats";
import { todayDayNumber, maxUnlockedDay } from "@/app/scripts/Usecalendar";
import { Footer } from "../../Footer";

// ─── Stała startu trybu ───────────────────────────────────────────────────────
const KLASYKI_START_DAY = 18;

// ─── Types ────────────────────────────────────────────────────────────────────
type GuessStatus = "correct" | "wrong" | "skipped" | "empty" | "artist";
interface Guess {
  display: string;
  status: GuessStatus;
}
interface SavedDayState {
  guesses: Guess[];
  currentStep: number;
  isFinished: boolean;
  gameStatus: "win" | "lose" | null;
  isStarted: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LS_ACCENT_KEY = "jakitowers_accent_color";
const LS_SOUND_KEY = "jakitowers_sound_enabled";
const LS_VOLUME_KEY = "jakitowers_volume";
const LS_DAY_PREFIX = "jakitowers_day_klasyki_";
const LS_RESULTS_KLASYKI_KEY = "jakitowers_klasyki_results";
const LS_RULES_SEEN_KEY = "jakitowers_rules_seen_klasyki";
const EMPTY_GUESSES: Guess[] = Array(5)
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
    split(b).some((y) => x === y),  // tylko ta jedna zmiana
  );
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
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

function saveDayState(day: number, state: SavedDayState): void {
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

function saveKlasykiResults(results: Record<number, "win" | "lose">): void {
  try {
    localStorage.setItem(LS_RESULTS_KLASYKI_KEY, JSON.stringify(results));
    window.dispatchEvent(new CustomEvent("gameResult"));
  } catch {}
}

function loadKlasykiResults(): Record<number, "win" | "lose"> {
  try {
    const r = localStorage.getItem(LS_RESULTS_KLASYKI_KEY);
    return r ? JSON.parse(r) : {};
  } catch {
    return {};
  }
}

const testGlobalStats: GlobalStats = {
  attempts: { "1": 5, "2": 8, "3": 12, "4": 7, "5": 3, X: 4 },
  total: 39,
  wins: 35,
};

const GlobalStatsMini = ({
  globalStats,
  globalLoading,
}: {
  globalStats: GlobalStats | null;
  globalLoading: boolean;
}) => {
  const displayStats = globalStats || testGlobalStats;
  if (globalLoading)
    return (
      <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 w-64">
        <div className="flex justify-center">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  const maxCount = Math.max(...Object.values(displayStats.attempts), 1);
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 w-64 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <h4 className="text-[10px] font-black tracking-widest uppercase text-zinc-400 mb-3">
        INNI GRACZE ({displayStats.total})
      </h4>
      <div className="space-y-1.5">
        {[1, 2, 3, 4, 5].map((num) => {
          const count = displayStats.attempts[num] || 0;
          return (
            <div key={num} className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 w-4">{num}</span>
              <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / maxCount) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-accent flex items-center justify-end px-2 text-[10px] font-bold text-white"
                >
                  {count > 0 && count}
                </motion.div>
              </div>
            </div>
          );
        })}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-400 w-4">X</span>
          <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((displayStats.attempts.X || 0) / maxCount) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-red-500/50 flex items-center justify-end px-2 text-[10px] font-bold text-white"
            >
              {(displayStats.attempts.X || 0) > 0 && displayStats.attempts.X}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Top Bar ──────────────────────────────────────────────────────────────────
interface TopBarProps {
  currentDay: number;
  totalDays: number;
  onPrev: () => void;
  onNext: () => void;
  onCalendar: () => void;
  onStats: () => void;
  onSettings: () => void;
  onBack: () => void;
  onRules: () => void;
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSound: () => void;
  getVolumeIcon: () => React.ReactNode;
  startDay?: number;
}

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
  onVolumeChange,
  onToggleSound,
  getVolumeIcon,
  startDay = KLASYKI_START_DAY,
}: TopBarProps) => (
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
            KLASYKI · DAILY
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
        <div className="px-3 py-1 rounded-lg bg-zinc-900/80 border border-white/8 text-center min-w-[60px]">
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
            {getVolumeIcon()}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={onVolumeChange}
            className="w-20 h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:transition-transform"
            style={{
              background: `linear-gradient(to right, var(--accent-main) 0%, var(--accent-main) ${volume * 100}%, #3f3f46 ${volume * 100}%, #3f3f46 100%)`,
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
          KLASYKI #{currentDay}
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

// ─── Panel Wyników ────────────────────────────────────────────────────────────
const ResultPanel = ({
  status,
  attempts,
  currentDay,
  onShowDetails,
  onPlaySoundtracki,
  onBackToMenu,
}: {
  status: "win" | "lose";
  attempts: number;
  currentDay: number;
  onShowDetails: () => void;
  onPlaySoundtracki: () => void;
  onBackToMenu: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="w-full max-w-[280px] sm:max-w-md mx-auto"
  >
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-accent/30 rounded-2xl p-4 sm:p-6 text-center">
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center ${status === "win" ? "bg-green-500/20" : "bg-red-500/20"}`}
      >
        <Trophy
          size={32}
          className={`sm:size-[40px] ${status === "win" ? "text-green-400" : "text-red-400"}`}
        />
      </div>
      <h3 className="text-xl sm:text-2xl font-[1000] italic uppercase mb-2">
        {status === "win" ? "ZGADNIĘTE!" : "NIEZGADNIĘTE!"}
      </h3>
      <p className="text-zinc-400 text-xs mb-4">
        Dzień #{currentDay} ·{" "}
        {status === "win" ? `${attempts} próba!` : "Spróbuj jutro"}
      </p>
      <div className="flex flex-col gap-2 sm:gap-3">
        <button
          onClick={onShowDetails}
          className="flex items-center justify-center gap-2 w-full py-2 sm:py-3 rounded-xl bg-accent text-white font-bold uppercase tracking-wider text-xs sm:text-sm hover:opacity-80 transition-all"
        >
          <Trophy size={14} className="sm:size-[16px]" />
          Szczegóły wyniku
        </button>
        {currentDay >= 18 && (
          <button
            onClick={onPlaySoundtracki}
            className="flex items-center justify-center gap-2 w-full py-2 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-white/20 transition-all"
          >
            <Music2 size={14} className="sm:size-[16px]" />
            ZGADUJ SOUNDTRACK
          </button>
        )}
        <button
          onClick={onBackToMenu}
          className="flex items-center justify-center gap-2 w-full py-2 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-white/10 hover:text-white transition-all"
        >
          <Home size={14} className="sm:size-[16px]" />
          Powrót do menu
        </button>
      </div>
    </div>
  </motion.div>
);

// ─── Main game component ──────────────────────────────────────────────────────
export default function KlasykiPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showModal, setShowModal] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [currentDay, setCurrentDay] = useState<number>(() =>
    Math.max(todayDayNumber(), KLASYKI_START_DAY),
  );
  const [totalDays] = useState(dailySongs.length);
  const [volume, setVolume] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    { title: string; artist: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [guesses, setGuesses] = useState<Guess[]>(() =>
    Array(5)
      .fill(null)
      .map(() => ({ display: "", status: "empty" as GuessStatus })),
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null);
  const [klasykiResults, setKlasykiResults] = useState<
    Record<number, "win" | "lose">
  >({});
  const [showGlobalStatsMini, setShowGlobalStatsMini] = useState(false);

  const stateLoadedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(isPlaying);
  const currentSongIdRef = useRef<number | null>(null);
  const currentStepRef = useRef(currentStep);
  const touchStartX = useRef<number | null>(null);

  const song = dailySongs.find((s) => s.day === currentDay) || dailySongs[0];

  const { play } = useSoundEffects(soundEnabled);
  const {
    localStats,
    globalStats,
    globalLoading,
    recordResult,
    refetchGlobalStats,
  } = useGameStats(currentDay, "klasyki");

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    const dayParam = searchParams.get("day");
    if (dayParam) {
      const d = parseInt(dayParam, 10);
      if (!isNaN(d) && d >= KLASYKI_START_DAY && d <= dailySongs.length)
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
        if (!isNaN(n)) setVolume(n);
      } else {
        setVolume(0.5);
      }
    } catch {}
    setKlasykiResults(loadKlasykiResults());
  }, [searchParams]);

  useEffect(() => {
    if (audioRef.current && volume !== null) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.volume = volume;
      if (wasPlaying && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [volume]);

  useEffect(() => {
    stateLoadedRef.current = false;
    const saved = loadDayState(currentDay);
    if (saved) {
      setGuesses(saved.guesses);
      setCurrentStep(saved.currentStep);
      setIsFinished(saved.isFinished);
      setGameStatus(saved.gameStatus);
      setIsStarted(saved.isStarted);
    } else {
      setGuesses(
        Array(5)
          .fill(null)
          .map(() => ({ display: "", status: "empty" as GuessStatus })),
      );
      setCurrentStep(0);
      setIsFinished(false);
      setGameStatus(null);
      setIsStarted(false);
    }
    setShowModal(false);
    setShowGlobalStatsMini(false);
    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);
    stopAudio();
    requestAnimationFrame(() => {
      stateLoadedRef.current = true;
    });
  }, [currentDay]);

  useEffect(() => {
    if (!stateLoadedRef.current) return;
    saveDayState(currentDay, {
      guesses,
      currentStep,
      isFinished,
      gameStatus,
      isStarted,
    });
  }, [guesses, currentStep, isFinished, gameStatus, isStarted, currentDay]);

  useEffect(() => {
    if (selectedIndex >= 0 && scrollContainerRef.current) {
      const c = scrollContainerRef.current;
      const el = c.children[selectedIndex] as HTMLElement;
      if (el) {
        if (el.offsetTop < c.scrollTop) {
          c.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        } else if (
          el.offsetTop + el.offsetHeight >
          c.scrollTop + c.offsetHeight
        ) {
          c.scrollTo({
            top: el.offsetTop + el.offsetHeight - c.offsetHeight,
            behavior: "smooth",
          });
        }
      }
    }
  }, [selectedIndex]);

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
      if (deltaX > 0 && currentDay > KLASYKI_START_DAY) goToPrevDay();
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

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

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

  useEffect(() => {
    if (!song) return;
    const newSongId = song.id;
    const isNewSong = currentSongIdRef.current !== newSongId;

    if (!audioRef.current) {
      audioRef.current = new Audio(song.audioSrc);
      currentSongIdRef.current = newSongId;
    } else if (isNewSong) {
      audioRef.current.pause();
      audioRef.current.src = song.audioSrc ?? "";
      audioRef.current.load();
      currentSongIdRef.current = newSongId;
      setIsPlaying(false);
      setCurrentTime(0);
    }

    if (audioRef.current && volume !== null) {
      audioRef.current.volume = volume;
    }

    let frameId: number;
    const audio = audioRef.current;
    if (!audio) return;

    const syncLyrics = () => {
      setCurrentTime(audio.currentTime);
      // ← ZMIANA: używamy currentStepRef.current zamiast currentStep
      const lastLine = song.lyrics[0].words
        .slice(0, currentStepRef.current + 1)
        .at(-1);
      if (lastLine && audio.currentTime >= lastLine.end) {
        stopAudio();
      } else if (!audio.paused) {
        frameId = requestAnimationFrame(syncLyrics);
      }
    };

    const onPlay = () => {
      frameId = requestAnimationFrame(syncLyrics);
    };
    const onPause = () => {
      cancelAnimationFrame(frameId);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", stopAudio);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", stopAudio);
      cancelAnimationFrame(frameId);
    };
  }, [song, currentStep, stopAudio, volume, isFinished]);

  useEffect(() => {
    const fn = () => {
      if (document.hidden && isPlayingRef.current) stopAudio();
    };
    document.addEventListener("visibilitychange", fn);
    return () => document.removeEventListener("visibilitychange", fn);
  }, [stopAudio]);

  const updateSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const q = normalizePolishChars(query.toLowerCase());
    setSuggestions(
      klasykiAllSongs
        .filter(
          (s) =>
            normalizePolishChars(s.title.toLowerCase()).includes(q) ||
            normalizePolishChars(s.artist.toLowerCase()).includes(q),
        )
        .slice(0, 10),
    );
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0 && selectedIndex >= 0) {
        play("select");
        const s = suggestions[selectedIndex];
        setInputValue(s.artist + " - " + s.title);
        setSuggestions([]);
        setSelectedIndex(-1);
      } else if (inputValue.trim()) {
        handleGuess();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0)
        setSelectedIndex((p) => Math.min(p + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) setSelectedIndex((p) => Math.max(p - 1, 0));
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key.length === 1) {
      play("type");
    }
  };

  const handleGuess = () => {
    if (!isStarted || isFinished || currentStep >= 5) return;

    const norm = (s: string) => normalizePolishChars(s.toUpperCase());
    const isSkip = inputValue.trim() === "";
    const exactMatch = klasykiAllSongs.some(
      (s) => norm(s.artist + " - " + s.title) === norm(inputValue.trim()),
    );

    if (!isSkip && !exactMatch) {
      setInputError(true);
      setTimeout(() => setInputError(false), 350);
      setSuggestions([]);
      play("wrong");
      return;
    }

    const songInDb = klasykiAllSongs.find(
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
      const isCorrect =
        songInDb.title.toLowerCase() === song.title.toLowerCase();
      const artistMatch =
        !isCorrect && hasCommonArtist(songInDb.artist, song.artist ?? "");
      displayText = (songInDb.artist + " - " + songInDb.title).toUpperCase();
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

    if (status === "correct") {
      setIsFinished(true);
      const r = { ...klasykiResults, [currentDay]: "win" as const };
      setKlasykiResults(r);
      saveKlasykiResults(r);
      recordResult(true, currentStep + 1);
      setGameStatus("win");
      setShowModal(true);
      setShowGlobalStatsMini(true);
      play("win");
    } else if (currentStep < 4) {
      setCurrentStep((p) => p + 1);
    } else {
      setIsFinished(true);
      const r = { ...klasykiResults, [currentDay]: "lose" as const };
      setKlasykiResults(r);
      saveKlasykiResults(r);
      recordResult(false, null);
      setGameStatus("lose");
      setShowModal(true);
      setShowGlobalStatsMini(true);
      play("lose");
    }
  };

  const handlePlayClick = () => {
    play("click");
    if (!isStarted) setIsStarted(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleSeek = useCallback(
    (time: number) => {
      if (!audioRef.current || isFinished) return;
      if (!isStarted) setIsStarted(true);
      audioRef.current.currentTime = time;
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    },
    [isStarted, isFinished],
  );

  const goToNextDay = () => {
    if (currentDay < maxUnlockedDay()) {
      play("click");
      setCurrentDay((p) => p + 1);
    }
  };
  const goToPrevDay = () => {
    if (currentDay > KLASYKI_START_DAY) {
      play("click");
      setCurrentDay((p) => p - 1);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (volume === null) return;
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem(LS_VOLUME_KEY, newVolume.toString());
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    play("click");
    localStorage.setItem(LS_SOUND_KEY, newState.toString());
    window.dispatchEvent(new CustomEvent("soundToggle", { detail: newState }));
  };

  const getVolumeIcon = () => {
    if (volume === null) return <Volume2 size={14} />;
    if (!soundEnabled) return <VolumeX size={14} />;
    if (volume === 0) return <VolumeX size={14} />;
    if (volume < 0.33) return <Volume1 size={14} />;
    return <Volume2 size={14} />;
  };

  const nextMidnight = useMemo(() => {
    const d = new Date();
    d.setHours(24, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    const seen = localStorage.getItem(LS_RULES_SEEN_KEY);
    if (!seen) setShowRules(true);
  }, []);

  const handleCloseRules = () => {
    setShowRules(false);
    localStorage.setItem(LS_RULES_SEEN_KEY, "true");
  };

  if (volume === null) {
    return (
      <div className="min-h-dvh bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-white flex flex-col overflow-hidden relative">
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
        totalDays={totalDays}
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
        onVolumeChange={handleVolumeChange}
        onToggleSound={toggleSound}
        getVolumeIcon={getVolumeIcon}
        startDay={KLASYKI_START_DAY}
      />

      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center overflow-hidden w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 md:py-0 md:gap-8 lg:gap-16">
        <div className="w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
          {!isFinished ? (
            <div className="w-full max-w-[280px] sm:max-w-md">
              <AnimatePresence mode="wait">
                <Player
                  key={isStarted ? "started" : "idle"}
                  isStarted={isStarted}
                  isPlaying={isPlaying}
                  currentStep={currentStep}
                  currentTime={currentTime}
                  song={song}
                  onPlayClick={handlePlayClick}
                  stopAudio={stopAudio}
                  onSeek={handleSeek}
                  isDisabled={isFinished}
                />
              </AnimatePresence>
            </div>
          ) : (
            <ResultPanel
              status={gameStatus || "lose"}
              attempts={currentStep + 1}
              currentDay={currentDay}
              onShowDetails={() => {
                play("modalOpen");
                setShowModal(true);
              }}
              onPlaySoundtracki={() => {
                play("click");
                router.push(`/gra/daily/soundtracki?day=${currentDay}`);
              }}
              onBackToMenu={() => {
                play("click");
                router.push("/");
              }}
            />
          )}
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-[280px] sm:max-w-md">
            <ProgressGuesses guesses={guesses} isGameFinished={isFinished} />
          </div>
        </div>
      </div>

      {!isFinished && (
        <div className="relative z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-4 pb-6 px-4">
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
            gameMode="daily"
            nextSongTime={nextMidnight}
            songSource="klasyki"
          />
        </div>
      )}

      <AnimatePresence>
        {showGlobalStatsMini && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="fixed bottom-8 right-8 z-[80001] max-md:hidden"
          >
            <GlobalStatsMini
              globalStats={globalStats}
              globalLoading={globalLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameStatus && showModal && (
          <EndGameModal
            status={gameStatus}
            song={song}
            onClose={() => {
              play("modalClose");
              setShowModal(false);
              setShowGlobalStatsMini(false);
            }}
            dayNumber={currentDay}
            attempts={currentStep + 1}
            gameMode="klasyki"
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
        klasykiResults={klasykiResults}
        soundtrackiResults={{}}
        onDayClick={(d) => setCurrentDay(Math.max(d, KLASYKI_START_DAY))}
        totalDays={totalDays}
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
      <AnimatePresence>
        {showRules && (
          <RulesModal modeKey="klasyki-daily" onClose={handleCloseRules} />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
