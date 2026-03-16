"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, CheckCircle2, XCircle, Search } from "lucide-react";
import { allSongs } from "@/app/allsongs";
import { dailySongs } from "@/app/songs";
import { Song } from "@/app/songs";

// Funkcja do zamiany polskich znaków na ich podstawowe odpowiedniki
const normalizePolishChars = (str: string): string => {
  const polishMap: { [key: string]: string } = {
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

  return str.replace(
    /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g,
    (char) => polishMap[char] || char,
  );
};

interface NonLimitGameProps {
  volume: number;
}

export const NonLimitGame = ({ volume }: NonLimitGameProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState<
    { display: string; status: "correct" | "wrong" | "skipped" | "empty" }[]
  >(Array(5).fill({ display: "", status: "empty" }));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    { title: string; artist: string }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [guessedSongs, setGuessedSongs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [inputError, setInputError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const loadNewSong = useCallback(() => {
    const availableSongs = allSongs.filter(
      (s) => !guessedSongs.includes(s.title),
    );

    let songTitle: string;
    if (availableSongs.length === 0) {
      setGuessedSongs([]);
      songTitle = allSongs[Math.floor(Math.random() * allSongs.length)].title;
    } else {
      songTitle =
        availableSongs[Math.floor(Math.random() * availableSongs.length)].title;
    }

    const fullSong =
      dailySongs.find((s) => s.title === songTitle) || dailySongs[0];
    setCurrentSong(fullSong);

    setAttempts(Array(5).fill({ display: "", status: "empty" }));
    setCurrentAttempt(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setInputValue("");
    setSuggestions([]);
    setGameStatus(null);
    setIsFinished(false);
    setInputError(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [guessedSongs]);

  useEffect(() => {
    loadNewSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ODDZIELONY HOOK TYLKO DLA GŁOŚNOŚCI
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // HOOK DO ŁADOWANIA UTWORU
  useEffect(() => {
    if (!currentSong) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong.audioSrc);
    } else {
      audioRef.current.src = currentSong.audioSrc;
      audioRef.current.load();
    }
    audioRef.current.volume = volume;
  }, [currentSong, volume]);

  // HOOK DO SYNCHRONIZACJI TEKSTU I ODTWARZANIA
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    let frameId: number;

    const syncLyrics = () => {
      setCurrentTime(audio.currentTime);
      const currentLines = currentSong.lyrics[0].words.slice(
        0,
        currentAttempt + 1,
      );
      const lastVisibleLine = currentLines[currentLines.length - 1];

      if (lastVisibleLine && audio.currentTime >= lastVisibleLine.end) {
        audio.pause();
        setIsPlaying(false);
        audio.currentTime = 0;
        setCurrentTime(0);
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
    const onEnded = () => {
      stopAudio();
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      cancelAnimationFrame(frameId);
    };
  }, [currentSong, currentAttempt, stopAudio]);

  const handlePlayClick = () => {
    if (!currentSong || isFinished) return;
    setIsPlaying(true);
    audioRef.current?.play();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (suggestions.length > 0 && selectedIndex >= 0) {
        const selected = suggestions[selectedIndex];
        setInputValue(`${selected.artist} - ${selected.title}`);
        setSuggestions([]);
        setSelectedIndex(-1);
      } 
      // ZMIANA: Enter działa tylko jeśli wpisano tekst
      else if (inputValue.trim() !== "") {
        handleGuess();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleGuess = () => {
    if (!currentSong || isFinished || currentAttempt >= 5) return;

    const isSkip = inputValue.trim() === "";

    // Normalizuj wpisane wartości i wartości w bazie
    const normalizedInput = normalizePolishChars(
      inputValue.trim().toUpperCase(),
    );

    // Sprawdź czy input pasuje do którejś piosenki w bazie (uwzględniając polskie znaki)
    const exactMatch = allSongs.some((s) => {
      const songString = `${s.artist} - ${s.title}`.toUpperCase();
      const normalizedSong = normalizePolishChars(songString);
      return normalizedSong === normalizedInput;
    });

    // Jeśli nie jest pominięciem i nie ma matcha - tylko efekt wizualny
    if (!isSkip && !exactMatch) {
      setInputError(true);
      setTimeout(() => setInputError(false), 300);
      setSuggestions([]); // Ukrywamy podpowiedzi
      return; // Zatrzymujemy próbę
    }

    // Znajdź piosenkę w bazie (uwzględniając polskie znaki)
    const songInDatabase = allSongs.find((s) => {
      const songString = `${s.artist} - ${s.title}`.toUpperCase();
      const normalizedSong = normalizePolishChars(songString);
      return normalizedSong === normalizedInput;
    });

    const newAttempts = [...attempts];
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
        songInDatabase.title.toLowerCase() === currentSong.title.toLowerCase();
      displayText =
        `${songInDatabase.artist} - ${songInDatabase.title}`.toUpperCase();
      status = isCorrect ? "correct" : "wrong";
    }

    newAttempts[currentAttempt] = { display: displayText, status: status };
    setAttempts(newAttempts);

    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);

    stopAudio();

    if (status === "correct") {
      setIsFinished(true);
      setScore((prev) => prev + 1);
      setGuessedSongs((prev) => [...prev, currentSong.title]);
      setTimeout(() => setGameStatus("win"), 600);
    } else if (currentAttempt < 4) {
      setCurrentAttempt((prev) => prev + 1);
    } else {
      setIsFinished(true);
      setTimeout(() => setGameStatus("lose"), 600);
    }
  };

  const handleNextSong = () => {
    loadNewSong();
  };

  const handleTryAgain = () => {
    setGameStatus(null);
    setAttempts(Array(5).fill({ display: "", status: "empty" }));
    setCurrentAttempt(0);
    setIsFinished(false);
    setInputValue("");
    setSuggestions([]);
    setInputError(false);
    loadNewSong();
  };

  if (!currentSong) return null;

  const hasLongLines = currentSong.lyrics[0].words.some(
    (phrase) => phrase.text.length >= 50,
  );
  const textSizeClass = hasLongLines
    ? "text-sm md:text-xl"
    : "text-base md:text-2xl";

  return (
    <div className="h-full flex flex-col relative z-10">
      {/* Główna zawartość */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1600px] mx-auto overflow-hidden relative z-10">
        {/* Lewa strona - player */}
        <div className="flex-1 flex items-center justify-center p-4 border-r border-white/5">
          <div className="bg-zinc-900/10 border-2 border-accent/20 rounded-[30px] p-5 md:p-7 shadow-[0_0_50px_theme(colors.accent-glow/10%)] flex items-center gap-5 md:gap-8 min-h-[120px] w-full max-w-xl backdrop-blur-sm">
            <div className="flex-shrink-0 self-center">
              <motion.button
                onClick={isPlaying ? stopAudio : handlePlayClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? "bg-accent text-white hover:bg-white hover:text-black"
                    : "bg-white text-black hover:bg-accent hover:text-white"
                } shadow-[0_0_20px_var(--accent-glow)]`}
              >
                {isPlaying ? (
                  <Pause
                    fill="currentColor"
                    size={20}
                    className="md:w-7 md:h-7"
                  />
                ) : (
                  <Play
                    fill="currentColor"
                    size={20}
                    className="ml-1 md:w-7 md:h-7 md:ml-1.5"
                  />
                )}
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col gap-3 min-w-0">
              <AnimatePresence mode="popLayout">
                {currentSong.lyrics[0].words
                  .slice(0, currentAttempt + 1)
                  .map((phrase, i) => {
                    const isActive =
                      isPlaying &&
                      currentTime >= phrase.start &&
                      currentTime <= phrase.end;
                    return (
                      <motion.div
                        layout
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          color: isActive ? "var(--accent-main)" : "#1e1e21",
                          // textShadow: isActive
                          //   ? "0 0 15px rgba(188,19,254,0.8)"
                          //   : "none",
                        }}
                        className="w-full"
                      >
                        <p
                          className={`font-[1000] tracking-wide uppercase italic select-none leading-tight ${textSizeClass}`}
                        >
                          {phrase.text}
                        </p>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Prawa strona - progres */}
        <div className="flex-1 flex items-center justify-center p-6 relative">
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[12px] font-black text-accent tracking-[0.7em] uppercase">
                HISTORIA PRÓB
              </p>
              <p className="text-[12px] font-black text-zinc-500 tracking-widest uppercase bg-zinc-900/50 px-3 py-1 rounded-full border border-white/5">
                WYNIK: <span className="text-white">{score}</span>
              </p>
            </div>
            {attempts.map((g, i) => (
              <motion.div
                layout
                key={i}
                className={`h-14 w-full rounded-2xl border-2 flex items-center justify-center px-6 transition-all duration-500 text-center backdrop-blur-sm ${
                  g.status === "correct"
                    ? "border-green-500 bg-green-500/15 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    : g.status === "wrong"
                      ? "border-red-500 bg-red-500/15 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                      : g.status === "skipped"
                        ? "border-zinc-200 bg-white/15 text-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "border-zinc-800/80 bg-zinc-900/30 text-zinc-700"
                }`}
              >
                <span className="text-[10px] font-black tracking-widest uppercase truncate">
                  {g.display || `PRÓBA ${i + 1}`}
                </span>
                {g.status === "correct" && (
                  <CheckCircle2 className="ml-2 shrink-0" size={16} />
                )}
                {g.status === "wrong" && (
                  <XCircle className="ml-2 shrink-0" size={16} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Poprawiony Search Bar - z animacją pojawiania się */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-16 pb-16 w-full relative z-30"
      >
        <div className="max-w-4xl mx-auto relative px-4">
          <AnimatePresence>
            {suggestions.length > 0 && !isFinished && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full mb-6 w-full bg-zinc-900/95 backdrop-blur-xl border-2 border-accent/40 rounded-[25px] overflow-hidden z-50 shadow-2xl"
              >
                <div
                  ref={scrollContainerRef}
                  className="max-h-[350px] overflow-y-auto scrollbar-custom"
                >
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={(e) => {
                        e.preventDefault();
                        setInputValue(`${s.artist} - ${s.title}`);
                        setSuggestions([]);
                        setSelectedIndex(-1);
                        setTimeout(() => {
                          const input = document.querySelector(
                            'input[type="text"]',
                          ) as HTMLInputElement;
                          if (input) input.focus();
                        }, 0);
                      }}
                      className={`w-full p-5 flex items-center justify-start border-b border-white/5 last:border-0 transition-all text-left ${
                        selectedIndex === idx ? "bg-accent/15" : ""
                      }`}
                    >
                      <div className="flex-1">
                        <p
                          className={`font-bold text-lg ${
                            selectedIndex === idx ? "text-accent" : "text-white"
                          }`}
                        >
                          {s.title}
                        </p>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest">
                          {s.artist}
                        </p>
                      </div>
                      <Search
                        size={18}
                        className={
                          selectedIndex === idx
                            ? "text-accent ml-4"
                            : "text-zinc-700 ml-4"
                        }
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-5 bg-zinc-900/60 border border-accent/30 p-3 rounded-[30px] backdrop-blur-md">
            <div className="flex-1 flex items-center pl-6 text-accent">
              <Search size={26} />
              <input
                type="text"
                disabled={isFinished}
                onKeyDown={handleKeyDown}
                autoFocus
                className="bg-transparent w-full p-4 outline-none text-white text-lg font-bold ml-4 placeholder:text-zinc-700"
                placeholder="Znasz ten numer? Wpisz tytuł..."
                value={inputValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setInputValue(val);
                  if (val.length >= 2) {
                    const searchTerm = val.toLowerCase();
                    const normalizedSearchTerm = normalizePolishChars(searchTerm);
                    
                    setSuggestions(
                      allSongs
                        .filter((s) => {
                          const fullName = `${s.artist} - ${s.title}`.toLowerCase();
                          
                          // FILTR: Nie pokazuj piosenek, które są już w historii prób
                          const isAlreadyGuessed = attempts.some(
                            (a) => a.display.toLowerCase() === fullName
                          );
                          if (isAlreadyGuessed) return false;

                          const title = s.title.toLowerCase();
                          const artist = s.artist.toLowerCase();
                          const normalizedTitle = normalizePolishChars(title);
                          const normalizedArtist = normalizePolishChars(artist);

                          return (
                            title.includes(searchTerm) ||
                            artist.includes(searchTerm) ||
                            normalizedTitle.includes(normalizedSearchTerm) ||
                            normalizedArtist.includes(normalizedSearchTerm)
                          );
                        })
                        .slice(0, 15),
                    );
                  } else setSuggestions([]);
                }}
              />
            </div>
            <button
              onClick={handleGuess}
              className={`px-12 py-5 rounded-[22px] font-[1000] text-sm tracking-[0.3em] transition-colors duration-300 
                ${
                  isFinished
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    : inputError
                      ? "bg-red-500 text-white"
                      : inputValue.trim() === ""
                        ? "bg-zinc-800/50 text-zinc-400 hover:bg-accent/50 hover:text-white"
                        : "bg-accent text-white shadow-[0_0_20px_var(--accent-glow)]"
                }`}
            >
              {inputValue.trim() !== "" ? "ZATWIERDŹ" : "POMIŃ"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal wygranej/przegranej - identyczny jak w daily */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {gameStatus && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80000] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  className="bg-zinc-950 border-2 border-accent/40 p-6 md:p-10 rounded-[40px] max-w-2xl w-full shadow-[0_0_30px_theme(colors.accent-glow/30%)] text-center relative overflow-hidden"
                >
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />

                  <div className="flex justify-center mb-6">
                    {gameStatus === "win" ? (
                      <div className="bg-green-500/20 p-4 rounded-full border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                        <CheckCircle2 className="text-green-400" size={48} />
                      </div>
                    ) : (
                      <div className="bg-red-500/20 p-4 rounded-full border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                        <XCircle className="text-red-400" size={48} />
                      </div>
                    )}
                  </div>

                  <h2
                    className={`text-4xl md:text-6xl font-[1000] italic uppercase tracking-tighter mb-2 ${
                      gameStatus === "win" ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {gameStatus === "win" ? "GRATULACJE!" : "NIESTETY..."}
                  </h2>

                  <p className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-8">
                    {gameStatus === "win"
                      ? "ZGADŁEŚ TĘ PIOSENKĘ!"
                      : `NIE TYM RAZEM...`}
                  </p>

                  {/* NAJPIERW FILMIK Z YOUTUBE */}
                  <div className="aspect-video w-full rounded-[25px] overflow-hidden border-2 border-white/5 shadow-2xl mb-8 bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>

                  {/* POTEM TYTUŁ NA BIAŁO I WYKONAWCA NA FIOLETOWO */}
                  <div className="mb-10">
                    <h3 className="text-2xl md:text-3xl font-black uppercase italic leading-none text-white">
                      {currentSong.title}
                    </h3>
                    <p className="text-accent font-bold tracking-widest uppercase mt-2">
                      {currentSong.artist}
                    </p>
                  </div>

                  {gameStatus === "win" ? (
                    <button
                      onClick={handleNextSong}
                      className="w-full bg-accent text-white py-5 rounded-2xl font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all uppercase italic shadow-[0_0_30px_var(--accent-glow)]"
                    >
                      NASTĘPNA PIOSENKA
                    </button>
                  ) : (
                    <button
                      onClick={handleTryAgain}
                      className="w-full bg-accent text-white py-5 rounded-2xl font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all uppercase italic shadow-[0_0_30px_var(--accent-glow)]"
                    >
                      SPRÓBUJ PONOWNIE
                    </button>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};
