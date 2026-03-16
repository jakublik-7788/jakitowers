"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react"; // Import ikony do przycisku powrotu
import { dailySongs } from "./songs";
import { allSongs } from "./allsongs";
import { EndGameModal } from "./components/EndGameModal";
import { CalendarModal } from "./components/CalendarModal";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { ProgressGuesses } from "./components/ProgressGuesses";
import { SearchBar } from "./components/SearchBar";
import { NonLimitGame } from "./components/NonLimitGame";
import { SocialSidebar } from "./components/SocialSidebar";
import { SettingsModal } from "./components/SettingsModal";

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [gameMode, setGameMode] = useState<"daily" | "nonlimit">("daily");
  const [currentDay, setCurrentDay] = useState(1);
  const [totalDays] = useState(dailySongs.length);
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    { title: string; artist: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [gameHistory, setGameHistory] = useState<
    Record<string, "win" | "lose" | null>
  >({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const song = dailySongs.find((s) => s.day === currentDay) || dailySongs[0];

  const [guesses, setGuesses] = useState<
    { display: string; status: "correct" | "wrong" | "skipped" | "empty" }[]
  >(Array(5).fill({ display: "", status: "empty" }));

  // Scroll logic for suggestions
  useEffect(() => {
    if (selectedIndex >= 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selectedElement = container.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.offsetHeight;
        const elementTop = selectedElement.offsetTop;
        const elementBottom = elementTop + selectedElement.offsetHeight;

        if (elementTop < containerTop) {
          container.scrollTo({ top: elementTop, behavior: "smooth" });
        } else if (elementBottom > containerBottom) {
          container.scrollTo({
            top: elementBottom - container.offsetHeight,
            behavior: "smooth",
          });
        }
      }
    }
  }, [selectedIndex]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(song.audioSrc);
    } else {
      audioRef.current.src = song.audioSrc;
      audioRef.current.load();
    }
    const audio = audioRef.current;
    audio.volume = volume;
    let frameId: number;

    const syncLyrics = () => {
      setCurrentTime(audio.currentTime);
      const currentLines = song.lyrics[0].words.slice(0, currentStep + 1);
      const lastVisibleLine = currentLines[currentLines.length - 1];
      if (lastVisibleLine && audio.currentTime >= lastVisibleLine.end) {
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
      audio.pause();
    };
  }, [song, currentStep, stopAudio, volume]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // 1. Jeśli są podpowiedzi i któraś jest zaznaczona - wybierz ją
      if (suggestions.length > 0 && selectedIndex >= 0) {
        const selected = suggestions[selectedIndex];
        setInputValue(`${selected.artist} - ${selected.title}`);
        setSuggestions([]);
        setSelectedIndex(-1);
      }
      // 2. Jeśli NIE ma podpowiedzi (lub żadna nie jest wybrana),
      // ale w inputcie jest wpisany tekst - zatwierdź strzał
      else if (inputValue.trim() !== "") {
        handleGuess();
      }
      // 3. Jeśli input jest pusty - Enter nie robi nic (blokujemy skipowanie)
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0)
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleGuess = () => {
    if (!isStarted) return;
    if (isFinished || currentStep >= 5) return;
    const isSkip = inputValue.trim() === "";
    const exactMatch = allSongs.some(
      (s) =>
        `${s.artist} - ${s.title}`.toUpperCase() ===
        inputValue.trim().toUpperCase(),
    );

    if (!isSkip && !exactMatch) {
      setInputError(true);
      setTimeout(() => setInputError(false), 350);
      setSuggestions([]);
      return;
    }

    const songInDatabase = allSongs.find(
      (s) =>
        `${s.artist} - ${s.title}`.toUpperCase() ===
        inputValue.trim().toUpperCase(),
    );

    const newGuesses = [...guesses];
    let status: "correct" | "wrong" | "skipped" = "wrong";
    let displayText = "";

    if (isSkip) {
      displayText = "POMINIĘTO";
      status = "skipped";
    } else if (!songInDatabase) {
      displayText = "PRÓBUJ DALEJ..";
      status = "wrong";
    } else {
      const isCorrect =
        songInDatabase.title.toLowerCase() === song.title.toLowerCase();
      displayText =
        `${songInDatabase.artist} - ${songInDatabase.title}`.toUpperCase();
      status = isCorrect ? "correct" : "wrong";
    }

    newGuesses[currentStep] = { display: displayText, status: status };
    setGuesses(newGuesses);
    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);
    stopAudio();

    if (!isStarted) setIsStarted(true);

    if (status === "correct") {
      setIsFinished(true);
      setShowModal(true);
      const today = new Date();
      const dayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      setGameHistory((prev) => ({ ...prev, [dayKey]: "win" }));
      setTimeout(() => setGameStatus("win"), 800);
    } else if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
      setShowModal(true);
      const today = new Date();
      const dayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      setGameHistory((prev) => ({ ...prev, [dayKey]: "lose" }));
      setTimeout(() => setGameStatus("lose"), 800);
    }
  };

  const handlePlayClick = () => {
    setIsStarted(true);
    setIsPlaying(true);
    audioRef.current?.play();
  };

  const goToNextDay = () => {
    if (currentDay < totalDays) {
      setCurrentDay((prev) => prev + 1);
      resetGame();
    }
  };

  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay((prev) => prev - 1);
      resetGame();
    }
  };

  const resetGame = () => {
    setIsStarted(false);
    setIsFinished(false);
    setGameStatus(null);
    setShowModal(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setGuesses(Array(5).fill({ display: "", status: "empty" }));
    setInputValue("");
    setSuggestions([]);
    stopAudio();
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="h-screen bg-zinc-950 text-white flex flex-col overflow-hidden font-sans relative"
    >
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0 25px 25px 0;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: var(--accent-main);
          border-radius: 10px;
          border: 2px solid #09090b;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #a211db;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-zinc-950 to-[#0a0a0a] z-0" />

      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSettingsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
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
                <Header
                  volume={volume}
                  setVolume={setVolume}
                  isVolumeHovered={isVolumeHovered}
                  setIsVolumeHovered={setIsVolumeHovered}
                  onCalendarClick={() => setIsCalendarOpen(true)}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                  onPrevDay={goToPreviousDay}
                  onNextDay={goToNextDay}
                  currentDay={currentDay}
                  totalDays={totalDays}
                  gameMode={gameMode}
                  setGameMode={setGameMode}
                  isSettingsOpen={isSettingsOpen}
                  setIsSettingsOpen={setIsSettingsOpen}
                />
              </motion.div>

              <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1600px] mx-auto overflow-hidden relative z-10">
                <motion.div
                  variants={fadeInUp}
                  className="flex-1 flex items-center justify-center p-4 border-r border-white/5"
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
                  className="flex-1 flex items-center justify-center p-6 relative"
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
                <Header
                  volume={volume}
                  setVolume={setVolume}
                  isVolumeHovered={isVolumeHovered}
                  setIsVolumeHovered={setIsVolumeHovered}
                  onCalendarClick={() => setIsCalendarOpen(true)}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                  onPrevDay={goToPreviousDay}
                  onNextDay={goToNextDay}
                  currentDay={currentDay}
                  totalDays={totalDays}
                  gameMode={gameMode}
                  setGameMode={setGameMode}
                  isSettingsOpen={isSettingsOpen}
                  setIsSettingsOpen={setIsSettingsOpen}
                />
              </motion.div>
              <SocialSidebar variant="nonlimit" />
              <div className="flex-1 w-full max-w-[1600px] mx-auto relative z-10">
                <NonLimitGame volume={volume} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CalendarModal
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          gameHistory={gameHistory}
        />

        {/* PRZYCISK POWROTU DO WYNIKÓW - TYLKO FADE (opacity) i Twoje z-40 */}
        <AnimatePresence>
          {isFinished && !showModal && gameMode === "daily" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(true)}
              className="fixed bottom-8 right-8 z-40 flex flex-row-reverse items-center h-16 group transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-row-reverse items-center h-full bg-accent rounded-2xl shadow-[0_0_30px_var(--accent-glow)] overflow-hidden">
                <div className="w-16 h-16 flex items-center justify-center shrink-0 bg-accent relative z-20">
                  <Trophy
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                    size={28}
                  />
                </div>
                <div className="w-0 group-hover:w-28 transition-all duration-300 ease-in-out h-full flex items-center bg-accent relative z-10">
                  <span className="text-white font-[1000] uppercase italic text-l tracking-widest pl-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Wynik
                  </span>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {gameStatus && showModal && (
            <EndGameModal
              status={gameStatus}
              song={song}
              onClose={() => setShowModal(false)}
              dayNumber={currentDay}
              attempts={currentStep + 1}
            />
          )}
        </AnimatePresence>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </motion.main>
  );
}
