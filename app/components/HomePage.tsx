"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Disc3,
  Headphones,
  Infinity,
  Calendar,
  ChevronRight,
  Clock,
  HelpCircle,
  X,
  MessageCircle,
  Settings,
  Coffee,
  Volume2,
  VolumeX,
  Volume1,
  ArrowLeft,
  ArrowRight,
  Trophy,
  Tv,
  Lock,
  YoutubeIcon
} from "lucide-react";
import { todayDayNumber, maxUnlockedDay } from "../scripts/Usecalendar";
import { CountdownTimer } from "./CountdownTimer";
import { CalendarModal } from "./CalendarModal";
import { SettingsModal } from "./SettingsModal";
import { FooterModals, useContactModal } from "./FooterModals";
import { useSoundEffects } from "../scripts/useSoundEffects";
import { useCursorSetting } from "../scripts/UseCursorSettings";

// ─── Stałe blokady trybów ─────────────────────────────────────────────────────
const KLASYKI_START_DAY = 18;
const SOUNDTRACKI_START_DAY = 18;

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const Youtube = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// ─── localStorage helpers ─────────────────────────────────────────────────────
const LS_RESULTS_RAP_KEY = "jakitowers_rap_results";
const LS_RESULTS_KLASYKI_KEY = "jakitowers_klasyki_results";
const LS_RESULTS_SOUNDTRACKI_KEY = "jakitowers_soundtracki_results";
const LS_ACCENT_KEY = "jakitowers_accent_color";
const LS_SOUND_KEY = "jakitowers_sound_enabled";
const LS_VOLUME_KEY = "jakitowers_volume";

type GameResult = "win" | "lose";

function loadRapResults(): Record<number, GameResult> {
  try {
    const r = localStorage.getItem(LS_RESULTS_RAP_KEY);
    if (!r) return {};
    const parsed = JSON.parse(r);
    return Object.fromEntries(
      Object.entries(parsed).map(([k, v]) => [Number(k), v]),
    ) as Record<number, GameResult>;
  } catch {
    return {};
  }
}

function loadKlasykiResults(): Record<number, GameResult> {
  try {
    const r = localStorage.getItem(LS_RESULTS_KLASYKI_KEY);
    if (!r) return {};
    const parsed = JSON.parse(r);
    return Object.fromEntries(
      Object.entries(parsed).map(([k, v]) => [Number(k), v]),
    ) as Record<number, GameResult>;
  } catch {
    return {};
  }
}

function loadSoundtrackiResults(): Record<number, GameResult> {
  try {
    const r = localStorage.getItem(LS_RESULTS_SOUNDTRACKI_KEY);
    if (!r) return {};
    const parsed = JSON.parse(r);
    return Object.fromEntries(
      Object.entries(parsed).map(([k, v]) => [Number(k), v]),
    ) as Record<number, GameResult>;
  } catch {
    return {};
  }
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const updateColorInCSS = (color: string) => {
  document.documentElement.style.setProperty("--accent-main", color);
  document.documentElement.style.setProperty(
    "--accent-glow",
    hexToRgba(color, 0.4),
  );
};

// ─── Zasady gry ────────────────────────────────────────────────────────────────
const RULES: Record<string, string[]> = {
  "rap-daily": [
    "Codziennie nowa piosenka z polskiego rapu – zawsze o północy.",
    "Kliknij ODTWÓRZ – usłyszysz fragment piosenki.",
    "Masz 5 prób żeby odgadnąć tytuł i artystę.",
    "Każda błędna próba odkrywa kolejny fragment tekstu.",
    "Pomiń próbę jeśli nie wiesz – też zobaczysz nowy fragment.",
    "Wynik oznaczony żółtym kolorem oznacza trafiony wykonawca, ale zły tytuł.",
  ],
  "klasyki-daily": [
    "Codziennie nowy polski klasyk – zawsze o północy.",
    "Kliknij ODTWÓRZ – usłyszysz fragment piosenki.",
    "Masz 5 prób żeby odgadnąć tytuł i artystę..",
    "Każda błędna próba odkrywa kolejny fragment tekstu.",
    "Pomiń próbę jeśli nie wiesz – też zobaczysz nowy fragment.",
    "Wynik oznaczony żółtym kolorem oznacza trafiony wykonawca, ale zły tytuł.",
  ],
  "soundtracki-daily": [
    "Zgaduj nazwę filmu, serialu lub gry z której pochodzi soundtrack.",
    "Codziennie nowa ścieżka dźwiękowa z filmu, serialu lub gry.",
    "Usłyszysz krótki fragment – zacznij od 1 sekundy!",
    "Masz 5 prób żeby odgadnąć tytuł.",
    "Każda błędna próba lub pominięcie odsłania dłuższy fragment.",
    "Kolejne fragmenty: 1s → 3s → 5s → 10s → 15s.",
    "Każda błędna próba odsłania również podpowiedź!",
  ],
  nonlimit: [
    "Graj ile chcesz – losowe piosenki bez limitu.",
    "Wybierz źródło: RAP, KLASYKI lub SOUNDTRACKI",
    "Dla RAP i KLASYKI mechanika taka sama jak w trybach dziennych.",
    "Dla SOUNDTRACKI mechanika taka sama jak w trybie dziennym.",
    "Zbieraj serie wygranych i bij rekordy!",
    "Statystyki sesji resetują się po zamknięciu strony.",
    "Najlepsza seria jest zapisywana lokalnie.",
  ],
};

// ─── RulesModal ────────────────────────────────────────────────────────────────
const RulesModal = ({
  modeKey,
  onClose,
  playSound,
}: {
  modeKey: string;
  onClose: () => void;
  playSound: (type: string) => void;
}) => {
  const titles: Record<string, string> = {
    "rap-daily": "RAP – Codzienny Challenge",
    "klasyki-daily": "Klasyki – Codzienny Challenge",
    "soundtracki-daily": "SOUNDTRACKI – Codzienny Challenge",
    nonlimit: "Non-Limit",
  };
  const rules = RULES[modeKey] || [];

  const handleClose = () => {
    playSound("modalClose");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95"
      onClick={handleClose}
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
              {titles[modeKey]}
            </h2>
          </div>
          <button
            onClick={handleClose}
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
          onClick={handleClose}
          className="w-full py-4 bg-accent text-white font-[1000] italic uppercase tracking-widest rounded-2xl shadow-[0_0_20px_var(--accent-glow)] text-sm"
        >
          Rozumiem, gram!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// ─── Komponent timera dla kafelka ─────────────────────────────────────────────
const ModeTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2 text-sm font-mono text-accent">
      <Clock size={14} />
      <span className="font-bold">
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

// ─── GŁÓWNA STRONA ─────────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [selectedDay, setSelectedDay] = useState(todayDayNumber());
  const [maxDay, setMaxDay] = useState(todayDayNumber());

  const [rulesKey, setRulesKey] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [rapResults, setRapResults] = useState<Record<number, GameResult>>({});
  const [klasykiResults, setKlasykiResults] = useState<
    Record<number, GameResult>
  >({});
  const [soundtrackiResults, setSoundtrackiResults] = useState<
    Record<number, GameResult>
  >({});
  const [todayDay, setTodayDay] = useState(1);

  const touchStartX = useRef<number | null>(null);

  const { openContact, ContactModalComponent } = useContactModal();
  const { play } = useSoundEffects(soundEnabled);
  const { cursorEnabled, setCursorEnabled } = useCursorSetting();

  const nextMidnight = React.useMemo(() => {
    const d = new Date();
    d.setHours(24, 0, 0, 0);
    return d;
  }, []);

  const refreshResults = () => {
    setRapResults(loadRapResults());
    setKlasykiResults(loadKlasykiResults());
    setSoundtrackiResults(loadSoundtrackiResults());
  };

  useEffect(() => {
    const savedColor = localStorage.getItem(LS_ACCENT_KEY);
    if (savedColor && /^#[0-9a-fA-F]{6}$/.test(savedColor)) {
      updateColorInCSS(savedColor);
    } else {
      updateColorInCSS("#bc13fe");
    }

    const savedVolume = localStorage.getItem(LS_VOLUME_KEY);
    if (savedVolume !== null) setVolume(parseFloat(savedVolume));

    const sound = localStorage.getItem(LS_SOUND_KEY);
    if (sound !== null) setSoundEnabled(sound === "true");

    const day = todayDayNumber();
    const maxUnlocked = maxUnlockedDay();
    setTodayDay(day);
    setMaxDay(maxUnlocked);
    setSelectedDay(Math.min(day, maxUnlocked));

    refreshResults();
    setIsReady(true);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LS_RESULTS_RAP_KEY) setRapResults(loadRapResults());
      if (e.key === LS_RESULTS_KLASYKI_KEY)
        setKlasykiResults(loadKlasykiResults());
      if (e.key === LS_RESULTS_SOUNDTRACKI_KEY)
        setSoundtrackiResults(loadSoundtrackiResults());
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("gameResult", refreshResults);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("gameResult", refreshResults);
    };
  }, []);

  useEffect(() => {
    if (isReady) localStorage.setItem(LS_VOLUME_KEY, volume.toString());
  }, [volume, isReady]);

  useEffect(() => {
    const handleColorChange = (event: CustomEvent) => {
      const newColor = event.detail;
      if (newColor && /^#[0-9a-fA-F]{6}$/.test(newColor))
        updateColorInCSS(newColor);
    };
    window.addEventListener("colorChange", handleColorChange as EventListener);
    return () =>
      window.removeEventListener(
        "colorChange",
        handleColorChange as EventListener,
      );
  }, []);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    window.dispatchEvent(
      new CustomEvent("volumeChange", { detail: newVolume }),
    );
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem(LS_SOUND_KEY, newState.toString());
    window.dispatchEvent(new CustomEvent("soundToggle", { detail: newState }));
    play("click");
  };

  const getVolumeIcon = () => {
    if (!soundEnabled) return <VolumeX size={18} />;
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.33) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  const handleColorChange = (color: string) => {
    updateColorInCSS(color);
    localStorage.setItem(LS_ACCENT_KEY, color);
    window.dispatchEvent(new CustomEvent("colorChange", { detail: color }));
  };

  const handleDonate = () => {
    play("click");
    window.open("https://buycoffee.to/jakitowers", "_blank");
  };

  const goToPreviousDay = () => {
    if (selectedDay > 1) {
      play("click");
      setSelectedDay(selectedDay - 1);
    }
  };

  const goToNextDay = () => {
    if (selectedDay < maxDay) {
      play("click");
      setSelectedDay(selectedDay + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const minSwipeDistance = 50;
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && selectedDay > 1) goToPreviousDay();
      else if (deltaX < 0 && selectedDay < maxDay) goToNextDay();
    }
    touchStartX.current = null;
  };

  const isRapPlayed = (day: number) => rapResults[day] !== undefined;
  const getRapStatus = (day: number) => rapResults[day];
  const isKlasykiPlayed = (day: number) => klasykiResults[day] !== undefined;
  const getKlasykiStatus = (day: number) => klasykiResults[day];
  const isSoundtrackiPlayed = (day: number) =>
    soundtrackiResults[day] !== undefined;
  const getSoundtrackiStatus = (day: number) => soundtrackiResults[day];

  // ─── Blokada trybów ───────────────────────────────────────────────────────────
  const klasykiLocked = selectedDay < KLASYKI_START_DAY;
  const soundtrackiLocked = selectedDay < SOUNDTRACKI_START_DAY;

  const modes = [
    {
      id: "rap-daily",
      href: `/gra/daily/rap?day=${selectedDay}`,
      label: "RAP",
      sub: "Codzienny Challenge",
      desc: isRapPlayed(selectedDay)
        ? "Zagrane – wynik dostępny"
        : "Odgadnij codzienną rapową nutkę!",
      badge: isRapPlayed(selectedDay)
        ? getRapStatus(selectedDay) === "win"
          ? "Zgadnięte"
          : "Niezgadnięte"
        : `Dzień ${selectedDay}`,
      badgeColor: isRapPlayed(selectedDay)
        ? getRapStatus(selectedDay) === "win"
          ? "bg-green-500/20 text-green-400 border-green-500/40"
          : "bg-red-500/20 text-red-400 border-red-500/40"
        : "bg-accent/20 text-accent border-accent/40",
      rulesKey: "rap-daily",
      icon: Headphones,
      isPlayed: isRapPlayed(selectedDay),
      isWin: isRapPlayed(selectedDay) && getRapStatus(selectedDay) === "win",
      isLocked: false,
    },
    {
      id: "klasyki-daily",
      href: klasykiLocked
        ? `/gra/daily/klasyki?day=${KLASYKI_START_DAY}`
        : `/gra/daily/klasyki?day=${selectedDay}`,
      label: "KLASYKI",
      sub: "Codzienny Challenge",
      desc: klasykiLocked
        ? `Dostępne od dnia ${KLASYKI_START_DAY}`
        : isKlasykiPlayed(selectedDay)
          ? "Zagrane – wynik dostępny"
          : "Odgadnij codzienny klasyk!",
      badge: klasykiLocked
        ? `Od dnia ${KLASYKI_START_DAY}`
        : isKlasykiPlayed(selectedDay)
          ? getKlasykiStatus(selectedDay) === "win"
            ? "Zgadnięte"
            : "Niezgadnięte"
          : `Dzień ${selectedDay}`,
      badgeColor: klasykiLocked
        ? "bg-zinc-700/40 text-zinc-500 border-zinc-600/40"
        : isKlasykiPlayed(selectedDay)
          ? getKlasykiStatus(selectedDay) === "win"
            ? "bg-green-500/20 text-green-400 border-green-500/40"
            : "bg-red-500/20 text-red-400 border-red-500/40"
          : "bg-accent/20 text-accent border-accent/40",
      rulesKey: "klasyki-daily",
      icon: Disc3,
      isPlayed: !klasykiLocked && isKlasykiPlayed(selectedDay),
      isWin:
        !klasykiLocked &&
        isKlasykiPlayed(selectedDay) &&
        getKlasykiStatus(selectedDay) === "win",
      isLocked: klasykiLocked,
    },
    {
      id: "soundtracki-daily",
      href: soundtrackiLocked
        ? `/gra/daily/soundtracki?day=${SOUNDTRACKI_START_DAY}`
        : `/gra/daily/soundtracki?day=${selectedDay}`,
      label: "SOUNDTRACKI",
      sub: "Codzienny Challenge",
      desc: soundtrackiLocked
        ? `Dostępne od dnia ${SOUNDTRACKI_START_DAY}`
        : isSoundtrackiPlayed(selectedDay)
          ? "Zagrane – wynik dostępny"
          : "Odgadnij słynną ścieżkę dźwiękową!",
      badge: soundtrackiLocked
        ? `Od dnia ${SOUNDTRACKI_START_DAY}`
        : isSoundtrackiPlayed(selectedDay)
          ? getSoundtrackiStatus(selectedDay) === "win"
            ? "Zgadnięte"
            : "Niezgadnięte"
          : `Dzień ${selectedDay}`,
      badgeColor: soundtrackiLocked
        ? "bg-zinc-700/40 text-zinc-500 border-zinc-600/40"
        : isSoundtrackiPlayed(selectedDay)
          ? getSoundtrackiStatus(selectedDay) === "win"
            ? "bg-green-500/20 text-green-400 border-green-500/40"
            : "bg-red-500/20 text-red-400 border-red-500/40"
          : "bg-accent/20 text-accent border-accent/40",
      rulesKey: "soundtracki-daily",
      icon: Tv,
      isPlayed: !soundtrackiLocked && isSoundtrackiPlayed(selectedDay),
      isWin:
        !soundtrackiLocked &&
        isSoundtrackiPlayed(selectedDay) &&
        getSoundtrackiStatus(selectedDay) === "win",
      isLocked: soundtrackiLocked,
    },
    {
      id: "nonlimit",
      href: "/gra/nonlimit",
      label: "NON-LIMIT",
      sub: "RAP / KLASYKI / SOUNDTRACKI",
      desc: "Graj bez limitu!",
      badge: "∞",
      badgeColor: "bg-accent/20 text-accent border-accent/40",
      rulesKey: "nonlimit",
      icon: Infinity,
      isPlayed: false,
      isWin: false,
      isLocked: false,
    },
  ];

  if (!isReady) {
    return (
      <div className="min-h-dvh bg-zinc-950 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-white flex flex-col relative overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[130px] opacity-[0.07] rounded-full"
          style={{ background: "var(--accent-main)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] blur-[140px] opacity-[0.04] rounded-full"
          style={{ background: "var(--accent-main)" }}
        />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="relative z-50 flex items-center justify-between px-5 md:px-10 py-4 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="flex items-center justify-center gap-2 md:hidden w-full">
          <button
            onClick={handleDonate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-accent hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider whitespace-nowrap"
          >
            <Coffee size={14} />
            <span>Wesprzyj</span>
          </button>
          <button
            onClick={() => {
              play("modalOpen");
              setShowCalendar(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider whitespace-nowrap"
          >
            <Calendar size={14} />
            <span>Kalendarz</span>
          </button>
          <button
            onClick={() => {
              play("modalOpen");
              setShowSettings(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider whitespace-nowrap"
          >
            <Settings size={14} />
            <span>Ustawienia</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleDonate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 hover:border-accent/50 text-zinc-400 hover:text-accent hover:bg-white/10 transition-all group"
          >
            <Coffee
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-xs font-bold uppercase tracking-wider">
              Wesprzyj projekt
            </span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8">
            <button
              onClick={toggleSound}
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
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              disabled={!soundEnabled}
              className="w-24 h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-700 disabled:opacity-50 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
              style={{
                background: `linear-gradient(to right, var(--accent-main) 0%, var(--accent-main) ${volume * 100}%, #3f3f46 ${volume * 100}%, #3f3f46 100%)`,
              }}
            />
            <span className="text-zinc-500 text-[10px] font-mono w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => {
              play("modalOpen");
              setShowCalendar(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Calendar size={14} />
            <span>Kalendarz</span>
          </button>
          <button
            onClick={() => {
              play("modalOpen");
              setShowSettings(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Settings size={14} />
            <span>Ustawienia</span>
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative z-10 flex flex-col items-center text-center px-4 pt-12 pb-6 md:pt-16 md:pb-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-5"
        >
          <button
            onClick={goToPreviousDay}
            disabled={selectedDay <= 1}
            className="p-1 hover:bg-white/10 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} className="text-accent" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-[10px] font-black tracking-[0.3em] uppercase">
              DZIEŃ #{selectedDay}
            </span>
          </div>
          <button
            onClick={goToNextDay}
            disabled={selectedDay >= maxDay}
            className="p-1 hover:bg-white/10 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight size={16} className="text-accent" />
          </button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-[1000] italic tracking-tighter uppercase leading-none mb-4"
        >
          JAKI<span style={{ color: "var(--accent-main)" }}>TO</span>WERS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-sm md:text-base max-w-m mb-3"
        >
          Zmierz się z codziennymi wyzwaniami muzycznymi! <br />
          Nowy utwór dnia z polskiego rapu, klasyków oraz soundtrack zawsze o
          północy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1.5 mt-2"
        >
          <span className="text-zinc-600 text-xs font-bold uppercase tracking-wider">
            Wybierz tryb gry
          </span>
        </motion.div>
      </section>

      {/* ── TRYBY GRY ── */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className={`group relative border-2 rounded-[24px] p-6 transition-all duration-300 overflow-hidden h-full
                ${
                  mode.isLocked
                    ? "bg-zinc-900/30 border-white/5 opacity-60 cursor-not-allowed"
                    : "bg-zinc-900/50 border-white/8 hover:border-accent/50 cursor-pointer hover:shadow-[0_0_40px_var(--accent-glow)]"
                }`}
              onClick={() => {
                if (mode.isLocked) {
                  play("wrong");
                  return;
                }
                play("click");
                router.push(mode.href);
              }}
            >
              {/* Hover glow – tylko dla odblokowanych */}
              {!mode.isLocked && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 20% 20%, var(--accent-glow) 0%, transparent 65%)",
                  }}
                />
              )}

              <div className="relative z-10 flex flex-col h-full">
                {/* Górna część */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors
                    ${
                      mode.isLocked
                        ? "bg-white/3 border-white/5"
                        : "bg-white/5 border-white/10 group-hover:border-accent/40"
                    }`}
                  >
                    {mode.isLocked ? (
                      <Lock size={18} className="text-zinc-600" />
                    ) : (
                      <mode.icon
                        size={20}
                        className="text-zinc-500 group-hover:text-accent transition-colors"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-full border ${mode.badgeColor}`}
                    >
                      {mode.badge}
                    </span>
                    {!mode.isLocked && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          play("modalOpen");
                          setRulesKey(mode.rulesKey);
                        }}
                        className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:bg-white/10 transition-all"
                        title="Zasady"
                      >
                        <HelpCircle size={11} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Środkowa część */}
                <div className="flex-1">
                  <p className="text-[10px] font-black tracking-[0.25em] uppercase text-zinc-500 mb-0.5">
                    {mode.sub}
                  </p>
                  <h2
                    className={`text-2xl font-[1000] italic uppercase tracking-tight mb-3
                    ${mode.isLocked ? "text-zinc-600" : "text-white"}`}
                  >
                    {mode.label}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-3">
                    {mode.desc}
                  </p>

                  {mode.isPlayed && mode.id !== "nonlimit" && (
                    <div className="mb-3">
                      <ModeTimer targetDate={nextMidnight} />
                    </div>
                  )}
                </div>

                {/* Dolna część */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  {mode.isLocked ? (
                    <span className="text-[10px] font-black tracking-widest uppercase text-zinc-600">
                      Nowy tryb
                    </span>
                  ) : (
                    <>
                      <span className="text-[10px] font-black tracking-widest uppercase text-accent opacity-0 group-hover:opacity-100 transition-all duration-200">
                        {mode.isPlayed ? "Sprawdź wynik" : "Zagraj teraz"}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 shadow-[0_0_15px_var(--accent-glow)]">
                        {mode.isPlayed ? (
                          <Trophy size={16} className="text-white" />
                        ) : (
                          <ChevronRight size={16} className="text-white" />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SOCIAL KAFELKI ── */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-8">
        {/* DESKTOP */}
        <div className="hidden md:grid md:grid-cols-4 gap-3">
          <motion.a
            href="https://www.instagram.com/jakitowers_/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => play("click")}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-white/18 hover:bg-zinc-900 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-white/20 flex items-center justify-center shrink-0 transition-all text-white">
              <InstagramIcon size={20} />
            </div>
            <div className="min-w-0 overflow-hidden">
              <p className="font-black text-sm text-white leading-tight">
                jakitowers_
              </p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                Instagram
              </p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.tiktok.com/@jakitowers_/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.57 }}
            onClick={() => play("click")}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-white/18 hover:bg-zinc-900 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-white/20 flex items-center justify-center shrink-0 transition-all text-white">
              <TikTokIcon size={20} />
            </div>
            <div className="min-w-0 overflow-hidden">
              <p className="font-black text-sm text-white leading-tight">
                jakitowers_
              </p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                TikTok
              </p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.youtube.com/@jakitowers/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.57 }}
            onClick={() => play("click")}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-white/18 hover:bg-zinc-900 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-white/20 flex items-center justify-center shrink-0 transition-all text-white">
              <YoutubeIcon size={20} />
            </div>
            <div className="min-w-0 overflow-hidden">
              <p className="font-black text-sm text-white leading-tight">
                jakitowers_
              </p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                YouTube
              </p>
            </div>
          </motion.a>

          <motion.button
            onClick={() => {
              play("modalOpen");
              openContact();
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64 }}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-white/18 hover:bg-zinc-900 transition-all duration-200 group text-left w-full"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-white/18 flex items-center justify-center shrink-0 transition-all text-white">
              <MessageCircle size={20} />
            </div>
            <div className="min-w-0 overflow-hidden">
              <p className="font-black text-sm text-white leading-tight">
                Napisz do nas
              </p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                Kontakt
              </p>
            </div>
          </motion.button>
        </div>

        {/* MOBILE */}
        <div className="md:hidden space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <motion.a
              href="https://www.instagram.com/jakitowers_/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => play("click")}
              className="flex flex-col items-center gap-2 px-2 py-4 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-white/18 hover:bg-zinc-900 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-white/20 flex items-center justify-center transition-all text-white">
                <InstagramIcon size={24} />
              </div>
              <div className="text-center">
                <p className="font-black text-xs text-white">jakitowers_</p>
                <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mt-0.5">
                  Instagram
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/@jakitowers_/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.57 }}
              onClick={() => play("click")}
              className="flex flex-col items-center gap-2 px-2 py-4 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-white/18 hover:bg-zinc-900 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-white/20 flex items-center justify-center transition-all text-white">
                <TikTokIcon size={24} />
              </div>
              <div className="text-center">
                <p className="font-black text-xs text-white">jakitowers_</p>
                <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mt-0.5">
                  TikTok
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@jakitowers/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.57 }}
              onClick={() => play("click")}
              className="flex flex-col items-center gap-2 px-2 py-4 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-white/18 hover:bg-zinc-900 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-white/20 flex items-center justify-center transition-all text-white">
                <YoutubeIcon size={24} />
              </div>
              <div className="text-center">
                <p className="font-black text-xs text-white">jakitowers_</p>
                <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mt-0.5">
                  YouTube
                </p>
              </div>
            </motion.a>
          </div>

          <motion.button
            onClick={() => {
              play("modalOpen");
              openContact();
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64 }}
            className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-white/18 hover:bg-zinc-900 transition-all duration-200 group text-left w-full"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-white/18 flex items-center justify-center shrink-0 transition-all text-white">
              <MessageCircle size={20} />
            </div>
            <div className="min-w-0 overflow-hidden">
              <p className="font-black text-sm text-white leading-tight">
                Napisz do nas
              </p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                Kontakt
              </p>
            </div>
          </motion.button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/5 mt-auto py-4 px-6 flex flex-col items-center bg-black/20">
        <FooterModals />
      </footer>

      <AnimatePresence>
        {rulesKey && (
          <RulesModal
            modeKey={rulesKey}
            onClose={() => setRulesKey(null)}
            playSound={play as (type: string) => void}
          />
        )}
      </AnimatePresence>

      <CalendarModal
        isOpen={showCalendar}
        onClose={() => {
          play("modalClose");
          setShowCalendar(false);
        }}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        rapResults={rapResults}
        klasykiResults={klasykiResults}
        soundtrackiResults={soundtrackiResults}
        onDayClick={(day) => {
          setSelectedDay(day);
          setShowCalendar(false);
        }}
        totalDays={maxDay}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => {
          play("modalClose");
          setShowSettings(false);
        }}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onColorChange={handleColorChange}
        cursorEnabled={cursorEnabled}
  setCursorEnabled={setCursorEnabled}
      />

      <ContactModalComponent />
    </div>
  );
}
