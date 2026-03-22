"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, CheckCircle2, XCircle } from "lucide-react";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);
const AppleMusicIcon = () => (
  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
    <path
      fillRule="evenodd"
      d="m10.995 0 .573.001q.241 0 .483.007c.35.01.705.03 1.051.093.352.063.68.166.999.329a3.36 3.36 0 0 1 1.47 1.468c.162.32.265.648.328 1 .063.347.084.7.093 1.051q.007.241.007.483l.001.573v5.99l-.001.573q0 .241-.008.483c-.01.35-.03.704-.092 1.05a3.5 3.5 0 0 1-.33 1 3.36 3.36 0 0 1-1.468 1.468 3.5 3.5 0 0 1-1 .33 7 7 0 0 1-1.05.092q-.241.007-.483.008l-.573.001h-5.99l-.573-.001q-.241 0-.483-.008a7 7 0 0 1-1.052-.092 3.6 3.6 0 0 1-.998-.33 3.36 3.36 0 0 1-1.47-1.468 3.6 3.6 0 0 1-.328-1 7 7 0 0 1-.093-1.05Q.002 11.81 0 11.568V5.005l.001-.573q0-.241.007-.483c.01-.35.03-.704.093-1.05a3.6 3.6 0 0 1 .329-1A3.36 3.36 0 0 1 1.9.431 3.5 3.5 0 0 1 2.896.1 7 7 0 0 1 3.95.008Q4.19.002 4.432 0h.573zm-.107 2.518-4.756.959H6.13a.66.66 0 0 0-.296.133.5.5 0 0 0-.16.31c-.004.027-.01.08-.01.16v5.952c0 .14-.012.275-.106.39-.095.115-.21.15-.347.177l-.31.063c-.393.08-.65.133-.881.223a1.4 1.4 0 0 0-.519.333 1.25 1.25 0 0 0-.332.995c.031.297.166.582.395.792.156.142.35.25.578.296.236.047.49.031.858-.043.196-.04.38-.102.555-.205a1.4 1.4 0 0 0 .438-.405 1.5 1.5 0 0 0 .233-.55c.042-.202.052-.386.052-.588V6.347c0-.276.08-.35.302-.404.024-.005 3.954-.797 4.138-.833.257-.049.378.025.378.294v3.524c0 .14-.001.28-.096.396-.094.115-.211.15-.348.178l-.31.062c-.393.08-.649.133-.88.223a1.4 1.4 0 0 0-.52.334 1.26 1.26 0 0 0-.34.994c.03.297.174.582.404.792a1.2 1.2 0 0 0 .577.294c.237.048.49.03.858-.044.197-.04.381-.098.556-.202a1.4 1.4 0 0 0 .438-.405q.173-.252.233-.549a2.7 2.7 0 0 0 .044-.589V2.865c0-.273-.143-.443-.4-.42-.04.003-.383.064-.424.073"
    />
  </svg>
);
const SoundCloudIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M1.175 12.225c-.041 0-.082.01-.124.01a.55.55 0 01-.124-.01C.329 12.151 0 11.76 0 11.267c0-.314.152-.59.39-.767.119-.087.262-.136.41-.136.027 0 .056.003.083.007a3.174 3.174 0 01-.04-.484c0-1.801 1.42-3.26 3.17-3.26.223 0 .44.025.648.07A4.989 4.989 0 019.5 4c2.762 0 5 2.238 5 5 0 .232-.016.46-.047.685H14.5a2.5 2.5 0 010 5h-13a1.33 1.33 0 01-.325-.46z" />
  </svg>
);
const TidalIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004 4.004-4.004 4.004 4.004 4.004-4.004L12.012 3.992zM8.008 12l-4.004 4.004L0 12l4.004-4.004L8.008 12zm8.008 0l-4.004 4.004 4.004 4.004L24 12l-4.004-4.004L15.996 12z" />
  </svg>
);

const PLATFORMS = [
  { key: "spotify", Icon: SpotifyIcon, color: "#1DB954", label: "Spotify" },
  { key: "appleMusic", Icon: AppleMusicIcon, color: "#FC3C44", label: "Apple Music" },
  { key: "soundcloud", Icon: SoundCloudIcon, color: "#FF5500", label: "SoundCloud" },
  { key: "tidal", Icon: TidalIcon, color: "#00FFFF", label: "Tidal" },
] as const;

import { allSongs } from "@/app/scripts/allsongs";
import { dailySongs } from "@/app/scripts/songs";
import { Song } from "@/app/scripts/songs";
import { SearchBar } from "@/app/components/SearchBar";
import { useSoundEffects } from "@/app/scripts/useSoundEffects";

const normalizePolishChars = (str: string): string => {
  const map: { [k: string]: string } = {
    ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
    Ą: "A", Ć: "C", Ę: "E", Ł: "L", Ń: "N", Ó: "O", Ś: "S", Ź: "Z", Ż: "Z",
  };
  return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => map[c] || c);
};

const hasCommonArtist = (a: string, b: string): boolean => {
  const norm = (s: string) => normalizePolishChars(s.toLowerCase().trim());
  const split = (s: string) => s.split(/[,&(]/).map(norm).filter((x) => x.length > 1);
  return split(a).some((x) => split(b).some((y) => x.includes(y) || y.includes(x)));
};

interface NonLimitGameProps {
  volume: number;
  soundEnabled: boolean;
  onGameEnd: (won: boolean, attempt: number | null) => void;
}

export const NonLimitGame = ({
  volume,
  soundEnabled,
  onGameEnd,
}: NonLimitGameProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState<
    { display: string; status: "correct" | "wrong" | "skipped" | "empty" | "artist" }[]
  >(Array(5).fill({ display: "", status: "empty" }));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ title: string; artist: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [guessedSongs, setGuessedSongs] = useState<string[]>([]);
  const [playedTitles, setPlayedTitles] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [inputError, setInputError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(isPlaying);
  const { play } = useSoundEffects(soundEnabled);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Synchronizacja ref z isPlaying
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const loadNewSong = useCallback(() => {
    stopAudio();
    const available = dailySongs.filter((s) => !playedTitles.includes(s.title));
    let selectedSong: Song;
    if (available.length === 0) {
      setPlayedTitles([]);
      selectedSong = dailySongs[Math.floor(Math.random() * dailySongs.length)];
    } else {
      selectedSong = available[Math.floor(Math.random() * available.length)];
    }
    setCurrentSong(selectedSong);
    setAttempts(Array(5).fill({ display: "", status: "empty" }));
    setCurrentAttempt(0);
    setCurrentTime(0);
    setInputValue("");
    setSuggestions([]);
    setGameStatus(null);
    setIsFinished(false);
    setInputError(false);
    setGuessedSongs([]);
  }, [playedTitles, stopAudio]);

  useEffect(() => {
    loadNewSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Ustawianie głośności (niezależne od źródła) ─────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // ── Ładowanie źródła dźwięku i synchronizacji (requestAnimationFrame) ────────
  useEffect(() => {
    if (!currentSong) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong.audioSrc);
    } else if (audioRef.current.src !== currentSong.audioSrc) {
      audioRef.current.src = currentSong.audioSrc;
      audioRef.current.load();
    }
    audioRef.current.volume = volume;

    let frameId: number;
    const audio = audioRef.current;
    const syncLyrics = () => {
      setCurrentTime(audio.currentTime);
      const last = currentSong.lyrics[0].words.slice(0, currentAttempt + 1).at(-1);
      if (last && audio.currentTime >= last.end) {
        audio.pause();
        setIsPlaying(false);
        audio.currentTime = 0;
        setCurrentTime(0);
      } else if (!audio.paused) {
        frameId = requestAnimationFrame(syncLyrics);
      }
    };
    const onPlay = () => { frameId = requestAnimationFrame(syncLyrics); };
    const onPause = () => { cancelAnimationFrame(frameId); };
    const onEnded = () => { stopAudio(); };
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

  // ── Zatrzymaj odtwarzanie, gdy użytkownik przejdzie na inną kartę ──────────
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlayingRef.current) {
        stopAudio();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [stopAudio]);

  // Przewijanie podpowiedzi
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

  const handlePlayClick = () => {
    if (!currentSong || isFinished) return;
    play("click");
    setIsPlaying(true);
    audioRef.current?.play();
  };

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
    if (!currentSong || isFinished || currentAttempt >= 5) return;
    const norm = (s: string) => normalizePolishChars(s.toUpperCase());
    const isSkip = inputValue.trim() === "";
    const exactMatch = allSongs.some(
      (s) => norm(`${s.artist} - ${s.title}`) === norm(inputValue.trim()),
    );
    if (!isSkip && !exactMatch) {
      setInputError(true);
      setTimeout(() => setInputError(false), 300);
      setSuggestions([]);
      play("wrong");
      return;
    }
    const songInDb = allSongs.find(
      (s) => norm(`${s.artist} - ${s.title}`) === norm(inputValue.trim()),
    );
    const newAttempts = [...attempts];
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
      const isCorrect = songInDb.title.toLowerCase() === currentSong.title.toLowerCase();
      const artistMatch = !isCorrect && hasCommonArtist(songInDb.artist, currentSong.artist);
      displayText = `${songInDb.artist} - ${songInDb.title}`.toUpperCase();
      status = isCorrect ? "correct" : artistMatch ? "artist" : "wrong";
      if (isCorrect) play("correct");
      else if (artistMatch) play("select");
      else play("wrong");
    }
    newAttempts[currentAttempt] = { display: displayText, status };
    setAttempts(newAttempts);
    setInputValue("");
    setSuggestions([]);
    setSelectedIndex(-1);
    stopAudio();

    setGuessedSongs((prev) => [...prev, displayText]);

    if (status === "correct") {
      setIsFinished(true);
      setScore((p) => p + 1);
      setPlayedTitles((p) => [...p, currentSong.title]);
      onGameEnd(true, currentAttempt + 1);
      setTimeout(() => {
        setGameStatus("win");
        play("win");
      }, 600);
    } else if (currentAttempt < 4) {
      setCurrentAttempt((p) => p + 1);
    } else {
      setIsFinished(true);
      setPlayedTitles((p) => [...p, currentSong.title]);
      onGameEnd(false, null);
      setTimeout(() => {
        setGameStatus("lose");
        play("lose");
      }, 600);
    }
  };

  const handleNextSong = () => {
    play("click");
    loadNewSong();
  };
  const handleTryAgain = () => {
    play("click");
    loadNewSong();
  };

  if (!currentSong) return null;

  const hasLongLines = currentSong.lyrics[0].words.some((p) => p.text.length >= 50);
  const textSizeClass = hasLongLines ? "text-sm md:text-xl" : "text-base md:text-2xl";

  return (
    <div className="h-full flex flex-col relative z-10">
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1600px] mx-auto overflow-hidden relative z-10">
        <div className="flex-1 flex items-center justify-center p-4 max-md:p-2 border-r border-white/5 max-md:border-r-0 max-md:border-b max-md:border-white/5">
          <div className="bg-zinc-900/10 border-2 border-accent/20 rounded-[30px] p-5 md:p-7 max-md:p-4 shadow-[0_0_50px_theme(colors.accent-glow/10%)] flex items-center gap-5 md:gap-8 max-md:gap-4 min-h-[120px] max-md:min-h-[100px] w-full max-w-xl backdrop-blur-sm">
            <div className="flex-shrink-0 self-center">
              <motion.button
                onClick={isPlaying ? stopAudio : handlePlayClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 md:w-16 md:h-16 max-md:w-14 max-md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? "bg-accent text-white hover:bg-white hover:text-black"
                    : "bg-white text-black hover:bg-accent hover:text-white"
                } shadow-[0_0_20px_var(--accent-glow)]`}
              >
                {isPlaying ? (
                  <Pause fill="currentColor" size={20} className="md:w-7 md:h-7 max-md:w-6 max-md:h-6" />
                ) : (
                  <Play fill="currentColor" size={20} className="ml-1 md:w-7 md:h-7 md:ml-1.5 max-md:w-6 max-md:h-6" />
                )}
              </motion.button>
            </div>
            <div className="flex-1 flex flex-col gap-3 max-md:gap-2 min-w-0">
              <AnimatePresence mode="popLayout">
                {currentSong.lyrics[0].words.slice(0, currentAttempt + 1).map((phrase, i) => {
                  const isActive = isPlaying && currentTime >= phrase.start && currentTime <= phrase.end;
                  return (
                    <motion.div layout key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                      <p
                        className={`font-[1000] tracking-wide uppercase italic select-none leading-tight ${textSizeClass} max-md:text-xs`}
                        style={{ color: isActive ? "var(--accent-main)" : "#1e1e21" }}
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

        <div className="flex-1 flex items-center justify-center p-6 max-md:p-3 relative">
          <div className="w-full max-w-sm flex flex-col gap-4 max-md:gap-2">
            <div className="flex justify-center items-center mb-2">
              <p className="text-[12px] max-md:text-[10px] font-black text-accent tracking-[0.7em] uppercase text-center mr-[-0.7em]">
                HISTORIA PRÓB
              </p>
            </div>
            {attempts.map((g, i) => (
              <motion.div
                layout
                key={i}
                className={`h-14 max-md:h-12 w-full rounded-2xl border-2 flex items-center justify-center px-6 max-md:px-3 transition-all duration-500 text-center backdrop-blur-sm relative overflow-hidden ${
                  g.status === "correct"
                    ? "border-green-500 bg-green-500/15 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    : g.status === "artist"
                    ? "border-yellow-400 bg-yellow-400/15 text-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                    : g.status === "wrong"
                    ? "border-red-500 bg-red-500/15 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                    : g.status === "skipped"
                    ? "border-zinc-200 bg-white/15 text-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "border-zinc-800/80 bg-zinc-900/30 text-zinc-700"
                }`}
              >
                <span className="text-[10px] max-md:text-[9px] font-black tracking-widest uppercase truncate">
                  {g.display || `PRÓBA ${i + 1}`}
                </span>
                <div className="absolute right-4 max-md:right-2 flex items-center">
                  {g.status === "correct" && (
                    <CheckCircle2 className="shrink-0 text-green-400 max-md:w-4 max-md:h-4" size={16} />
                  )}
                  {g.status === "wrong" && (
                    <XCircle className="shrink-0 text-red-500 max-md:w-4 max-md:h-4" size={16} />
                  )}
                  {g.status === "artist" && (
                    <span className="shrink-0 text-yellow-400 font-black text-base max-md:text-sm">~</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <SearchBar
        isFinished={isFinished}
        isStarted={true}
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
        guessedSongs={guessedSongs}
      />

      {mounted &&
        createPortal(
          <AnimatePresence>
            {gameStatus && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80000] flex items-center justify-center p-4 bg-black/97"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  className="bg-zinc-950 border-2 border-accent/40 p-5 md:p-8 max-md:p-4 rounded-[36px] max-w-2xl w-full shadow-[0_0_30px_theme(colors.accent-glow/30%)] text-center relative overflow-hidden"
                >
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
                  <div className="flex justify-center mb-4">
                    {gameStatus === "win" ? (
                      <div className="bg-green-500/20 p-3 rounded-full border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                        <CheckCircle2 className="text-green-400 max-md:w-8 max-md:h-8" size={38} />
                      </div>
                    ) : (
                      <div className="bg-red-500/20 p-3 rounded-full border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                        <XCircle className="text-red-400 max-md:w-8 max-md:h-8" size={38} />
                      </div>
                    )}
                  </div>
                  <h2
                    className={`text-4xl md:text-6xl max-md:text-3xl font-[1000] italic uppercase tracking-tighter mb-2 ${
                      gameStatus === "win" ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {gameStatus === "win" ? "GRATULACJE!" : "NIESTETY..."}
                  </h2>
                  <p className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-[10px] max-md:text-[8px] mb-5">
                    {gameStatus === "win" ? "ZGADŁEŚ TĘ PIOSENKĘ!" : "NIE TYM RAZEM..."}
                  </p>
                  <div className="aspect-video w-full rounded-[20px] overflow-hidden border-2 border-white/5 shadow-2xl mb-5 bg-black">
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
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl max-md:text-lg font-black uppercase italic leading-none text-white">
                      {currentSong.title}
                    </h3>
                    <p className="text-accent font-bold tracking-widest uppercase mt-1.5 text-sm max-md:text-xs">
                      {currentSong.artist}
                    </p>
                    {(() => {
                      const avail = PLATFORMS.filter((p) => currentSong.platforms?.[p.key]);
                      return avail.length > 0 ? (
                        <div className="flex items-center justify-center gap-2 mt-2">
                          {avail.map(({ key, Icon, color, label }) => (
                            <a
                              key={key}
                              href={currentSong.platforms![key]!}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                              className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-110 active:scale-95 transition-all duration-200"
                              style={{ color }}
                            >
                              <Icon />
                            </a>
                          ))}
                        </div>
                      ) : null;
                    })()}
                  </div>
                  {gameStatus === "win" ? (
                    <button
                      onClick={handleNextSong}
                      className="w-full bg-accent text-white py-4 max-md:py-3 rounded-2xl font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all uppercase italic shadow-[0_0_30px_var(--accent-glow)] max-md:text-sm"
                    >
                      NASTĘPNA PIOSENKA
                    </button>
                  ) : (
                    <button
                      onClick={handleTryAgain}
                      className="w-full bg-accent text-white py-4 max-md:py-3 rounded-2xl font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all uppercase italic shadow-[0_0_30px_var(--accent-glow)] max-md:text-sm"
                    >
                      NASTĘPNA PIOSENKA
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