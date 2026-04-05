"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { rapAllSongs } from "@/app/scripts/songs/rap/rapAllSongs";
import { klasykiAllSongs } from "@/app/scripts/songs/klasyki/klasykiAllSongs";
import { soundtrackiAllSongs } from "@/app/scripts/songs/soundtracki/soundtrackiAllSongs";
import { FooterModals } from "@/app/components/FooterModals";
import { CountdownTimer } from "./CountdownTimer";
import { nonlimitRapAllSongs } from "@/app/scripts/songs/nonlimit/nonlimitRapAllSongs";
import { nonlimitKlasykiAllSongs } from "@/app/scripts/songs/nonlimit/nonlimitKlasykiAllSongs";
import { nonlimitSoundtrackiAllSongs } from "@/app/scripts/songs/nonlimit/nonlimitsoundtrackiAllSongs";

interface SearchBarProps {
  isFinished: boolean;
  isStarted: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  suggestions: { title: string; artist: string }[];
  setSuggestions: (suggestions: { title: string; artist: string }[]) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onGuess: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  inputError?: boolean;
  guessedSongs: string[];
  gameMode?: "daily" | "nonlimit" | "soundtracki";
  nextSongTime?: Date;
  songSource?: "rap" | "klasyki" | "soundtracki";
  allSongs?: { title: string; artist: string }[];
}

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

export const SearchBar = ({
  isFinished,
  isStarted,
  inputValue,
  setInputValue,
  suggestions,
  setSuggestions,
  selectedIndex,
  setSelectedIndex,
  onKeyDown,
  onGuess,
  scrollContainerRef,
  inputError,
  guessedSongs,
  gameMode = "daily",
  nextSongTime,
  songSource = "rap",
  allSongs: allSongsProp,
}: SearchBarProps) => {
  const [hiddenSuggestions, setHiddenSuggestions] = useState<Set<string>>(new Set());
  const [showHiddenPanel, setShowHiddenPanel] = useState(false);

  // Wybór odpowiedniej bazy piosenek
  let songs;
  if (gameMode === "nonlimit") {
    if (songSource === "rap") songs = nonlimitRapAllSongs;
    else if (songSource === "klasyki") songs = nonlimitKlasykiAllSongs;
    else if (songSource === "soundtracki") songs = nonlimitSoundtrackiAllSongs;
    else songs = [];
  } else {
    if (songSource === "rap") songs = rapAllSongs;
    else if (songSource === "klasyki") songs = klasykiAllSongs;
    else if (songSource === "soundtracki") songs = soundtrackiAllSongs;
    else songs = [];
  }

  const allSongs = allSongsProp || songs;

  const showTimer = gameMode === "daily" && isFinished && nextSongTime;

  let placeholder = "";
  if (showTimer) {
    placeholder = "Nowa piosenka pojawi się za..";
  } else if (isFinished) {
    placeholder = "KONIEC GRY";
  } else if (!isStarted) {
    placeholder = "ODTWÓRZ BY ROZPOCZĄĆ..";
  } else {
    placeholder = "Wpisz tytuł...";
  }

  const getSuggestionKey = (s: { title: string; artist: string }) => {
    if (songSource === "soundtracki" || !s.artist) {
      return s.title.toLowerCase();
    }
    return (s.artist + " - " + s.title).toLowerCase();
  };

  const hideSuggestion = (s: { title: string; artist: string }) => {
    const key = getSuggestionKey(s);
    setHiddenSuggestions((prev) => new Set(prev).add(key));
    // Odroczenie aktualizacji listy podpowiedzi, aby uniknąć błędów podczas renderowania
    setTimeout(() => {
      setSuggestions(suggestions.filter((item) => getSuggestionKey(item) !== key));
    }, 0);
  };

  const unhideSuggestion = (key: string) => {
    setHiddenSuggestions((prev) => {
      const next = new Set(prev);
      next.delete(key);
      // Odroczenie odświeżenia listy podpowiedzi po przywróceniu
      setTimeout(() => {
        const trimmed = inputValue.trim();
        if (trimmed.length >= 2) {
          const searchTerm = trimmed.toLowerCase();
          const normalizedSearchTerm = normalizePolishChars(searchTerm);
          const filtered = allSongs
            .filter((s) => {
              if (next.has(getSuggestionKey(s))) return false;
              const fullName = `${s.artist} - ${s.title}`.toLowerCase();
              const isAlreadyGuessed = guessedSongs.some(
                (guess) => guess.toLowerCase() === fullName,
              );
              if (isAlreadyGuessed) return false;
              const title = s.title.toLowerCase();
              const artist = s.artist.toLowerCase();
              return (
                title.includes(searchTerm) ||
                artist.includes(searchTerm) ||
                normalizePolishChars(title).includes(normalizedSearchTerm) ||
                normalizePolishChars(artist).includes(normalizedSearchTerm)
              );
            })
            .slice(0, 30);
          setSuggestions(filtered);
        } else {
          setSuggestions([]);
        }
      }, 0);
      return next;
    });
  };

  const hiddenItems = useMemo(() => {
    if (!allSongs) return [];
    return allSongs.filter((s) => hiddenSuggestions.has(getSuggestionKey(s)));
  }, [allSongs, hiddenSuggestions]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    const trimmed = val.trim();
    if (trimmed.length >= 2) {
      const searchTerm = trimmed.toLowerCase();
      const normalizedSearchTerm = normalizePolishChars(searchTerm);
      const filtered = allSongs
        .filter((s) => {
          if (hiddenSuggestions.has(getSuggestionKey(s))) return false;
          const fullName = `${s.artist} - ${s.title}`.toLowerCase();
          const isAlreadyGuessed = guessedSongs.some(
            (guess) => guess.toLowerCase() === fullName,
          );
          if (isAlreadyGuessed) return false;
          const title = s.title.toLowerCase();
          const artist = s.artist.toLowerCase();
          return (
            title.includes(searchTerm) ||
            artist.includes(searchTerm) ||
            normalizePolishChars(title).includes(normalizedSearchTerm) ||
            normalizePolishChars(artist).includes(normalizedSearchTerm)
          );
        })
        .slice(0, 30);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (s: { title: string; artist: string }) => {
    const valueToSet = s.artist ? `${s.artist} - ${s.title}` : s.title;
    setInputValue(valueToSet);
    setSuggestions([]);
    setSelectedIndex(-1);
    setTimeout(() => {
      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (input) input.focus();
    }, 0);
  };

  const handleSuggestionKeyDown = (e: React.KeyboardEvent, s: { title: string; artist: string }) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectSuggestion(s);
    }
  };

  return (
    <div className="relative z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-16 max-md:pt-0 pb-2 max-md:pb-1">
      <div className="max-w-4xl mx-auto relative px-4">
        <AnimatePresence>
          {suggestions.length > 0 && !isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-4 w-full bg-zinc-950 border-2 border-accent/40 rounded-[25px] overflow-hidden z-50 shadow-2xl"
            >
              <div
                ref={scrollContainerRef}
                className="max-h-[350px] overflow-y-auto scrollbar-custom touch-pan-y"
              >
                {suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => handleSelectSuggestion(s)}
                    onKeyDown={(e) => handleSuggestionKeyDown(e, s)}
                    className={`w-full p-5 max-md:p-3 flex items-center justify-start border-b border-white/5 last:border-0 transition-all text-left cursor-pointer group ${
                      selectedIndex === idx ? "bg-accent/15" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <p
                        className={`font-bold text-lg max-md:text-sm ${
                          selectedIndex === idx ? "text-accent" : "text-white"
                        }`}
                      >
                        {s.title}
                      </p>
                      {s.artist && (
                        <p className="text-zinc-500 text-xs uppercase tracking-widest max-md:text-[10px]">
                          {s.artist}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Search
                        size={18}
                        className={
                          selectedIndex === idx
                            ? "text-accent"
                            : "text-zinc-700 max-md:w-4 max-md:h-4"
                        }
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          hideSuggestion(s);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded-full"
                        title="Odrzuć tę podpowiedź"
                      >
                        <X size={14} className="text-zinc-500 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {hiddenItems.length > 0 && (
                <div className="border-t border-white/10 bg-black/80 p-2 flex items-center justify-between">
                  <button
                    onClick={() => setShowHiddenPanel(!showHiddenPanel)}
                    className="text-[10px] font-bold text-zinc-500 hover:text-accent flex items-center gap-1"
                  >
                    {showHiddenPanel ? <EyeOff size={12} /> : <Eye size={12} />}
                    <span>
                      {showHiddenPanel ? "Ukryj odrzucone" : `Pokaż odrzucone (${hiddenItems.length})`}
                    </span>
                  </button>
                </div>
              )}
              <AnimatePresence>
                {showHiddenPanel && hiddenItems.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10 bg-zinc-900/90 overflow-hidden"
                  >
                    <div className="p-3 max-h-[200px] overflow-y-auto space-y-2">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        Odrzucone podpowiedzi (kliknij, aby przywrócić)
                      </p>
                      {hiddenItems.map((item, idx) => {
                        const key = getSuggestionKey(item);
                        return (
                          <button
                            key={idx}
                            onClick={() => unhideSuggestion(key)}
                            className="flex items-center justify-between w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div>
                              <p className="text-white text-sm font-bold line-through opacity-60">
                                {item.title}
                              </p>
                              {item.artist && (
                                <p className="text-zinc-500 text-[10px]">{item.artist}</p>
                              )}
                            </div>
                            <Trash2 size={12} className="text-red-400 rotate-90" />
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`flex gap-2 max-md:gap-1 bg-zinc-900/60 border p-2 max-md:p-1.5 rounded-[30px] backdrop-blur-sm transition-all duration-300 ${
            isStarted ? "border-accent/30" : "border-white/5 opacity-80"
          }`}
        >
          <div className="flex-1 flex items-center pl-6 max-md:pl-3 text-accent">
            <Search
              size={26}
              className={
                isStarted
                  ? "text-accent max-md:w-5 max-md:h-5"
                  : "text-zinc-700 max-md:w-5 max-md:h-5"
              }
            />
            <input
              type="text"
              disabled={isFinished || !isStarted}
              onKeyDown={onKeyDown}
              className="bg-transparent w-full p-4 max-md:p-2 outline-none text-white text-lg max-md:text-base font-bold ml-4 max-md:ml-2 placeholder:text-zinc-700 disabled:cursor-not-allowed"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
          {showTimer ? (
            <div className="px-4 max-md:px-2 py-2 max-md:py-1 rounded-[22px] bg-zinc-800/50 text-white flex items-center gap-2 font-bold text-xl max-md:text-xl whitespace-nowrap">
              <span className="tracking-wider uppercase text-zinc-400"></span>
              <CountdownTimer
                targetDate={nextSongTime}
                className="text-accent font-mono"
                showSeconds
              />
            </div>
          ) : (
            <button
              disabled={isFinished || !isStarted}
              onClick={onGuess}
              className={`px-12 max-md:px-5 py-5 max-md:py-3 rounded-[22px] font-[1000] text-sm tracking-[0.3em] transition-all duration-300 ${
                isFinished || !isStarted
                  ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  : inputError
                  ? "bg-red-500 text-white"
                  : inputValue.trim() === ""
                  ? "bg-zinc-800/30 text-zinc-600 hover:bg-accent/50 hover:text-white"
                  : "bg-accent text-white shadow-[0_0_20px_var(--accent-glow)]"
              }`}
            >
              {isFinished
                ? "KONIEC"
                : inputValue.trim() !== ""
                ? "ZATWIERDŹ"
                : "POMIŃ"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};