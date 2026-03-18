"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { dailySongs } from "./scripts/songs";
import { allSongs } from "./scripts/allsongs";
import { EndGameModal } from "./components/EndGameModal";
import { CalendarModal } from "./components/CalendarModal";
import { StatsModal } from "./components/StatsModal";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { ProgressGuesses } from "./components/ProgressGuesses";
import { SearchBar } from "./components/SearchBar";
import { NonLimitGame } from "./components/NonLimitGame";
import { SocialSidebar } from "./components/SocialSidebar";
import { SettingsModal } from "./components/SettingsModal";
import { useSoundEffects } from "./scripts/useSoundEffects";
import { useGameStats, useNonLimitStats, GlobalStats } from "./scripts/Usegamestats";
import { useCalendarHistory, todayDayNumber, maxUnlockedDay } from "./scripts/Usecalendar";

// ─── Typy ─────────────────────────────────────────────────────────────────────

type GuessStatus = "correct" | "wrong" | "skipped" | "empty" | "artist";
interface Guess { display: string; status: GuessStatus; }

interface SavedDayState {
  guesses: Guess[];
  currentStep: number;
  isFinished: boolean;
  gameStatus: "win" | "lose" | null;
  isStarted: boolean;
}

// ─── localStorage keys ────────────────────────────────────────────────────────

const LS_ACCENT_KEY  = "jakitowers_accent_color";
const LS_SOUND_KEY   = "jakitowers_sound_enabled";
const LS_DAY_PREFIX  = "jakitowers_day_";       // + dayNumber → SavedDayState
const LS_RESULTS_KEY = "jakitowers_day_results"; // Record<number, "win"|"lose">

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EMPTY_GUESSES: Guess[] = Array(5).fill({ display: "", status: "empty" });

const normalizePolishChars = (str: string): string => {
  const map: Record<string, string> = {
    ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
    Ą: "A", Ć: "C", Ę: "E", Ł: "L", Ń: "N", Ó: "O", Ś: "S", Ź: "Z", Ż: "Z",
  };
  return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => map[c] || c);
};

const hasCommonArtist = (a: string, b: string) => {
  const norm = (s: string) => normalizePolishChars(s.toLowerCase().trim());
  const split = (s: string) =>
    s.split(/[,&(]/).map(norm).filter((x) => x.length > 1);
  return split(a).some((x) => split(b).some((y) => x.includes(y) || y.includes(x)));
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const applyAccentColor = (hex: string) => {
  document.documentElement.style.setProperty("--accent-main", hex);
  document.documentElement.style.setProperty("--accent-glow", hexToRgba(hex, 0.4));
  document.documentElement.style.setProperty("--accent-glow-strong", hexToRgba(hex, 0.2));
};

// ─── Persist helpers ──────────────────────────────────────────────────────────

function saveDayState(day: number, state: SavedDayState) {
  try { localStorage.setItem(LS_DAY_PREFIX + day, JSON.stringify(state)); } catch { /* ignore */ }
}
function loadDayState(day: number): SavedDayState | null {
  try { const r = localStorage.getItem(LS_DAY_PREFIX + day); return r ? JSON.parse(r) : null; }
  catch { return null; }
}
function saveDayResults(results: Record<number, "win" | "lose">) {
  try { localStorage.setItem(LS_RESULTS_KEY, JSON.stringify(results)); } catch { /* ignore */ }
}
function loadDayResults(): Record<number, "win" | "lose"> {
  try { const r = localStorage.getItem(LS_RESULTS_KEY); return r ? JSON.parse(r) : {}; }
  catch { return {}; }
}

// ─── Testowe dane globalne ────────────────────────────────────────────────────

const testGlobalStats: GlobalStats = {
  attempts: { "1": 5, "2": 8, "3": 12, "4": 7, "5": 3, X: 4 },
  total: 39,
  wins: 35,
};

// ─── Mini panel globalnych statystyk ──────────────────────────────────────────

const GlobalStatsMini = ({ globalStats, globalLoading }: { globalStats: GlobalStats | null; globalLoading: boolean }) => {
  const displayStats = globalStats || testGlobalStats;

  if (globalLoading) {
    return (
      <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 w-64">
        <div className="flex justify-center">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...Object.values(displayStats.attempts), 1);
  const attempts = [1, 2, 3, 4, 5];

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 w-64 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <h4 className="text-[10px] font-black tracking-widest uppercase text-zinc-400 mb-3">
        INNI GRACZE ({displayStats.total})
      </h4>
      <div className="space-y-1.5">
        {attempts.map((num) => {
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
              animate={{ width: `${((displayStats.attempts.X || 0) / maxCount) * 100}%` }}
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

// ─── Główny komponent ─────────────────────────────────────────────────────────

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [gameMode, setGameMode] = useState<"daily" | "nonlimit">("daily");
  const [currentDay, setCurrentDay] = useState<number>(() => todayDayNumber());
  const [totalDays] = useState(dailySongs.length);
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ title: string; artist: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Stan gry — ładowany z localStorage
  const [guesses, setGuesses] = useState<Guess[]>(EMPTY_GUESSES);
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null);

  // Wyniki dni (dla kalendarza) — ładowane z localStorage
  const [dayResults, setDayResults] = useState<Record<number, "win" | "lose">>({});

  const stateLoadedRef = useRef(false);
  const [showGlobalStatsMini, setShowGlobalStatsMini] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const song = dailySongs.find((s) => s.day === currentDay) || dailySongs[0];

  const { play } = useSoundEffects(soundEnabled);
  const { localStats, globalStats, globalLoading, recordResult, refetchGlobalStats } = useGameStats(currentDay);
  const { stats: nonLimitStats, recordResult: recordNonLimitResult } = useNonLimitStats();
  const gameHistory = useCalendarHistory(dayResults);

  // ── 1. Wczytaj ustawienia + wyniki dni ─────────────────────────────────────
  useEffect(() => {
    try {
      const savedColor = localStorage.getItem(LS_ACCENT_KEY) || localStorage.getItem("selected-accent");
      if (savedColor && /^#[0-9a-fA-F]{6}$/.test(savedColor)) applyAccentColor(savedColor);
      const savedSound = localStorage.getItem(LS_SOUND_KEY);
      if (savedSound !== null) setSoundEnabled(savedSound === "true");
    } catch { /* ignore */ }

    const results = loadDayResults();
    setDayResults(results);
  }, []);

  // ── 2. Wczytaj stan dnia gdy zmienia się currentDay ────────────────────────
  useEffect(() => {
    stateLoadedRef.current = false;

    const saved = loadDayState(currentDay);
    if (saved) {
      setGuesses(saved.guesses);
      setCurrentStep(saved.currentStep);
      setIsFinished(saved.isFinished);
      setGameStatus(saved.gameStatus);
      setIsStarted(saved.isStarted);
      setShowModal(false);
      setShowGlobalStatsMini(false);
    } else {
      setGuesses([...EMPTY_GUESSES]);
      setCurrentStep(0);
      setIsFinished(false);
      setGameStatus(null);
      setIsStarted(false);
      setShowModal(false);
      setShowGlobalStatsMini(false);
    }

    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);
    stopAudio();

    requestAnimationFrame(() => { stateLoadedRef.current = true; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay]);

  // ── 3. Zapisuj stan gry gdy coś się zmieni ─────────────────────────────────
  useEffect(() => {
    if (!stateLoadedRef.current) return;
    saveDayState(currentDay, { guesses, currentStep, isFinished, gameStatus, isStarted });
  }, [guesses, currentStep, isFinished, gameStatus, isStarted, currentDay]);

  // ── Scroll podpowiedzi ─────────────────────────────────────────────────────
  useEffect(() => {
    if (selectedIndex >= 0 && scrollContainerRef.current) {
      const c = scrollContainerRef.current;
      const el = c.children[selectedIndex] as HTMLElement;
      if (el) {
        if (el.offsetTop < c.scrollTop)
          c.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        else if (el.offsetTop + el.offsetHeight > c.scrollTop + c.offsetHeight)
          c.scrollTo({ top: el.offsetTop + el.offsetHeight - c.offsetHeight, behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!song) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(song.audioSrc);
    } else if (audioRef.current.src !== song.audioSrc) {
      audioRef.current.src = song.audioSrc;
      audioRef.current.load();
    }
    const audio = audioRef.current;
    audio.volume = volume;
    let frameId: number;
    const syncLyrics = () => {
      setCurrentTime(audio.currentTime);
      const lastLine = song.lyrics[0].words.slice(0, currentStep + 1).at(-1);
      if (lastLine && audio.currentTime >= lastLine.end) stopAudio();
      else if (!audio.paused) frameId = requestAnimationFrame(syncLyrics);
    };
    const onPlay = () => { frameId = requestAnimationFrame(syncLyrics); };
    const onPause = () => { cancelAnimationFrame(frameId); };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", stopAudio);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", stopAudio);
      cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song, currentStep, stopAudio]);

  // ── Logika gry ─────────────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0 && selectedIndex >= 0) {
        play("select");
        const s = suggestions[selectedIndex];
        setInputValue(`${s.artist} - ${s.title}`);
        setSuggestions([]);
        setSelectedIndex(-1);
      } else if (inputValue.trim() !== "") {
        handleGuess();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) setSelectedIndex((p) => Math.min(p + 1, suggestions.length - 1));
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
    const exactMatch = allSongs.some((s) => norm(`${s.artist} - ${s.title}`) === norm(inputValue.trim()));

    if (!isSkip && !exactMatch) {
      setInputError(true);
      setTimeout(() => setInputError(false), 350);
      setSuggestions([]);
      play("wrong");
      return;
    }

    const songInDb = allSongs.find((s) => norm(`${s.artist} - ${s.title}`) === norm(inputValue.trim()));
    const newGuesses = [...guesses];
    let status: "correct" | "wrong" | "skipped" | "artist" = "wrong";
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
      const isCorrect = songInDb.title.toLowerCase() === song.title.toLowerCase();
      const artistMatch = !isCorrect && hasCommonArtist(songInDb.artist, song.artist);
      displayText = `${songInDb.artist} - ${songInDb.title}`.toUpperCase();
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
      const newResults = { ...dayResults, [currentDay]: "win" as const };
      setDayResults(newResults);
      saveDayResults(newResults);
      recordResult(true, currentStep + 1);
      setGameStatus("win");
      setShowModal(true);
      setShowGlobalStatsMini(true);
      play("win");
    } else if (currentStep < 4) {
      setCurrentStep((p) => p + 1);
    } else {
      setIsFinished(true);
      const newResults = { ...dayResults, [currentDay]: "lose" as const };
      setDayResults(newResults);
      saveDayResults(newResults);
      recordResult(false, null);
      setGameStatus("lose");
      setShowModal(true);
      setShowGlobalStatsMini(true);
      play("lose");
    }
  };

  const handlePlayClick = () => {
    play("click");
    setIsStarted(true);
    setIsPlaying(true);
    audioRef.current?.play();
  };

  const goToNextDay = () => {
    if (currentDay < maxUnlockedDay()) { play("click"); setCurrentDay((p) => p + 1); }
  };
  const goToPreviousDay = () => {
    if (currentDay > 1) { play("click"); setCurrentDay((p) => p - 1); }
  };

  const handleSettingsOpen = () => { play("modalOpen"); setIsSettingsOpen(true); };
  const handleSettingsClose = () => { play("modalClose"); setIsSettingsOpen(false); };
  const handleCalendarOpen = () => { play("modalOpen"); setIsCalendarOpen(true); };
  const handleCalendarClose = () => { play("modalClose"); setIsCalendarOpen(false); };
  const handleStatsOpen = () => {
    play("modalOpen");
    if (gameMode === "daily") {
      refetchGlobalStats();
    }
    setIsStatsOpen(true);
  };
  const handleStatsClose = () => { play("modalClose"); setIsStatsOpen(false); };

  const handleEndGameModalClose = useCallback(() => {
    play("modalClose");
    setShowModal(false);
    setShowGlobalStatsMini(false);
  }, [play]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const sharedHeaderProps = {
    volume,
    setVolume,
    isVolumeHovered,
    setIsVolumeHovered,
    onCalendarClick: handleCalendarOpen,
    onStatsClick: handleStatsOpen,
    isHovered,
    setIsHovered,
    onPrevDay: goToPreviousDay,
    onNextDay: goToNextDay,
    currentDay,
    totalDays,
    gameMode,
    setGameMode: (m: "daily" | "nonlimit") => { play("click"); setGameMode(m); },
    isSettingsOpen,
    setIsSettingsOpen: handleSettingsOpen,
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="h-dvh bg-zinc-950 text-white flex flex-col overflow-hidden font-sans relative"
    >
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar { width: 6px; }
        .scrollbar-custom::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 0 25px 25px 0; }
        .scrollbar-custom::-webkit-scrollbar-thumb { background: var(--accent-main); border-radius: 10px; border: 2px solid #09090b; }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover { opacity: 0.8; }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-zinc-950 to-[#0a0a0a] z-0" />

      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSettingsClose}
            className="fixed inset-0 bg-black/95 z-[100]"
          />
        )}
      </AnimatePresence>

      <div className="relative z-40 flex flex-col h-full">
        <AnimatePresence mode="wait">
          {gameMode === "daily" ? (
            <motion.div
              key="daily"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-40 flex flex-col h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Header {...sharedHeaderProps} />
              </motion.div>
              <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1600px] mx-auto overflow-hidden relative z-10">
                <motion.div
                  variants={fadeInUp}
                  className="flex-1 flex items-center justify-center p-4 md:p-4 max-md:p-2 border-r border-white/5 max-md:border-r-0 max-md:border-b max-md:border-white/5"
                >
                  <AnimatePresence mode="wait">
                    <Player
                      key={isStarted ? "started" : "not-started"}
                      isStarted={isStarted}
                      isPlaying={isPlaying}
                      currentStep={currentStep}
                      currentTime={currentTime}
                      song={song}
                      onPlayClick={handlePlayClick}
                      stopAudio={stopAudio}
                      isDisabled={isFinished}
                    />
                  </AnimatePresence>
                  <SocialSidebar variant="daily" />
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="flex-1 flex items-center justify-center p-6 max-md:p-3 relative"
                >
                  <ProgressGuesses guesses={guesses} />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative z-20"
              >
                <SearchBar
                  isFinished={isFinished}
                  isStarted={isStarted}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  suggestions={suggestions}
                  setSuggestions={setSuggestions}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  onKeyDown={handleKeyDown}
                  onGuess={handleGuess}
                  scrollContainerRef={scrollContainerRef}
                  inputError={inputError}
                  guessedSongs={guesses.map((g) => g.display).filter(Boolean)}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="nonlimit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-40 flex flex-col h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Header {...sharedHeaderProps} />
              </motion.div>
              <SocialSidebar variant="nonlimit" />
              <div className="flex-1 w-full max-w-[1600px] mx-auto relative z-10">
                <NonLimitGame
                  volume={volume}
                  soundEnabled={soundEnabled}
                  onGameEnd={recordNonLimitResult}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CalendarModal
          isOpen={isCalendarOpen}
          onClose={handleCalendarClose}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          dayResults={dayResults}
          onDayClick={(dayNum) => setCurrentDay(dayNum)}
        />

        <StatsModal
          isOpen={isStatsOpen}
          onClose={handleStatsClose}
          stats={gameMode === "daily" ? localStats : nonLimitStats}
          globalStats={gameMode === "daily" ? globalStats : null}
          globalLoading={globalLoading}
          currentDay={currentDay}
          gameMode={gameMode}
        />

        <AnimatePresence>
          {gameStatus && showModal && (
            <EndGameModal
              status={gameStatus}
              song={song}
              onClose={handleEndGameModalClose}
              dayNumber={currentDay}
              attempts={currentStep + 1}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showGlobalStatsMini && gameMode === "daily" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="fixed bottom-8 right-8 z-[80001] max-md:hidden"
              style={{ transform: "translateX(-120%)" }}
            >
              <GlobalStatsMini globalStats={globalStats} globalLoading={globalLoading} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFinished && !showModal && gameMode === "daily" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                play("modalOpen");
                setShowModal(true);
              }}
              className="fixed bottom-8 right-8 z-40 flex flex-row-reverse items-center h-16 group max-md:bottom-4 max-md:right-4 max-md:h-12"
            >
              <div className="flex flex-row-reverse items-center h-full bg-accent rounded-2xl shadow-[0_0_30px_var(--accent-glow)] overflow-hidden">
                <div className="w-16 h-16 max-md:w-12 max-md:h-12 flex items-center justify-center shrink-0 bg-accent relative z-20">
                  <Trophy className="text-white group-hover:rotate-12 transition-transform duration-300 max-md:w-5 max-md:h-5" size={28} />
                </div>
                <div className="w-0 group-hover:w-28 max-md:group-hover:w-20 transition-all duration-300 ease-in-out h-full flex items-center bg-accent relative z-10">
                  <span className="text-white font-[1000] uppercase italic text-l tracking-widest pl-6 max-md:pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap max-md:text-sm">
                    Wynik
                  </span>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-2 right-4 z-[200] pointer-events-none select-none max-md:bottom-1 max-md:right-2">
        <span className="text-[10px] max-md:text-[8px] font-bold tracking-[0.15em] uppercase text-zinc-700">
          © {new Date().getFullYear()} Jakitowers
        </span>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleSettingsClose}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
    </motion.main>
  );
}