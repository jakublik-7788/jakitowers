"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { allSongs } from "@/app/scripts/allsongs";
import { FooterModals } from "@/app/components/FooterModals";
import { CountdownTimer } from "./CountdownTimer";

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
  gameMode?: "daily" | "nonlimit";        // nowy prop
  nextSongTime?: Date;                    // czas rozpoczęcia nowej piosenki (dla daily)
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
}: SearchBarProps) => {
  // Czy pokazujemy timer zamiast przycisku?
  const showTimer = gameMode === "daily" && isFinished && nextSongTime;

  // Placeholder w polu tekstowym
  let placeholder = "";
  if (showTimer) {
    placeholder = "Nowa piosenka pojawi się za..";
  } else if (isFinished) {
    placeholder = "KONIEC GRY";
  } else if (!isStarted) {
    placeholder = "ODTWÓRZ BY ROZPOCZĄĆ..";
  } else {
    placeholder = "Znasz ten numer? Wpisz tytuł...";
  }

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
                    className={`w-full p-5 max-md:p-3 flex items-center justify-start border-b border-white/5 last:border-0 transition-all text-left ${
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
                      <p className="text-zinc-500 text-xs uppercase tracking-widest max-md:text-[10px]">
                        {s.artist}
                      </p>
                    </div>
                    <Search
                      size={18}
                      className={
                        selectedIndex === idx
                          ? "text-accent ml-4"
                          : "text-zinc-700 ml-4 max-md:w-4 max-md:h-4"
                      }
                    />
                  </button>
                ))}
              </div>
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
              onChange={(e) => {
                const val = e.target.value;
                setInputValue(val);

                const trimmed = val.trim();
                if (trimmed.length >= 2) {
                  const searchTerm = trimmed.toLowerCase();
                  const normalizedSearchTerm = normalizePolishChars(searchTerm);
                  setSuggestions(
                    allSongs
                      .filter((s) => {
                        const fullName =
                          `${s.artist} - ${s.title}`.toLowerCase();
                        const isAlreadyGuessed = guessedSongs.some(
                          (guess) => guess.toLowerCase() === fullName,
                        );
                        if (isAlreadyGuessed) return false;
                        const title = s.title.toLowerCase();
                        const artist = s.artist.toLowerCase();
                        return (
                          title.includes(searchTerm) ||
                          artist.includes(searchTerm) ||
                          normalizePolishChars(title).includes(
                            normalizedSearchTerm,
                          ) ||
                          normalizePolishChars(artist).includes(
                            normalizedSearchTerm,
                          )
                        );
                      })
                      .slice(0, 30), // zwiększony limit dla lepszego wyszukiwania
                  );
                } else {
                  setSuggestions([]);
                }
              }}
            />
          </div>
          {showTimer ? (
            <div className="px-4 max-md:px-2 py-2 max-md:py-1 rounded-[22px] bg-zinc-800/50 text-white flex items-center gap-2 font-bold text-xl max-md:text-xl whitespace-nowrap">
              <span className="tracking-wider uppercase text-zinc-400">
              </span>
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

        <FooterModals />
      </div>
    </div>
  );
};