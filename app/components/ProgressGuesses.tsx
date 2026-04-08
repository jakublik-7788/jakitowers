"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, SkipForward, UserCheck } from "lucide-react";

interface ProgressGuessesProps {
  guesses: {
    display: string;
    status: "correct" | "wrong" | "skipped" | "empty" | "artist";
  }[];
  gameMode?: "daily" | "nonlimit";
  isGameFinished?: boolean; // nowy prop – czy gra już zakończona
}

export const ProgressGuesses = ({
  guesses,
  gameMode = "daily",
  isGameFinished = false,
}: ProgressGuessesProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "correct":
        return {
          border: "border-green-500",
          bg: "bg-green-500/10",
          text: "text-green-400",
          shadow: "shadow-[0_0_12px_rgba(34,197,94,0.2)]",
          icon: (
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          ),
          badge: "✓",
        };
      case "artist":
        return {
          border: "border-amber-500",
          bg: "bg-amber-500/10",
          text: "text-amber-400",
          shadow: "shadow-[0_0_12px_rgba(245,158,11,0.2)]",
          icon: <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />,
          badge: "~",
        };
      case "wrong":
        return {
          border: "border-red-500",
          bg: "bg-red-500/10",
          text: "text-red-400",
          shadow: "shadow-[0_0_12px_rgba(239,68,68,0.2)]",
          icon: <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />,
          badge: "✗",
        };
      case "skipped":
        return {
          border: "border-zinc-500",
          bg: "bg-zinc-500/10",
          text: "text-zinc-300",
          shadow: "",
          icon: <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />,
          badge: "→",
        };
      default:
        return {
          border: "border-zinc-800/50",
          bg: "bg-zinc-900/30",
          text: "text-zinc-600",
          shadow: "",
          icon: null,
          badge: "",
        };
    }
  };

  // Rozbija "Autor - Tytuł" na dwie części
  const splitDisplay = (display: string): { artist: string; title: string } => {
    const dashIndex = display.indexOf(" - ");
    if (dashIndex !== -1) {
      return {
        artist: display.slice(0, dashIndex).trim(),
        title: display.slice(dashIndex + 3).trim(),
      };
    }
    return { artist: display, title: "" };
  };

  // Znajdź indeks pierwszej pustej próby (jeśli gra nie jest zakończona)
  const firstEmptyIndex = guesses.findIndex((g) => g.status === "empty");

  return (
    <div className="w-full max-w-sm flex flex-col gap-3 sm:gap-4">
      {/* Nagłówek */}
      <div className="flex items-center justify-center mb-1 px-1">
        <p className="text-[10px] sm:text-[12px] font-black text-accent tracking-[0.3em] sm:tracking-[0.7em] uppercase">
          HISTORIA PRÓB
        </p>
      </div>

      {/* Lista prób */}
      {guesses.map((g, i) => {
        const hasText = !!g.display;
        const config = getStatusConfig(g.status);
        const isEmpty = g.status === "empty";
        const emptyLabel = `PRÓBA ${i + 1}`;
        const { artist, title } = hasText
          ? splitDisplay(g.display)
          : { artist: "", title: "" };
        
        // Aktywna próba = pierwsza pusta i gra NIE jest zakończona
        const isActiveEmpty = isEmpty && i === firstEmptyIndex && !isGameFinished;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: i * 0.03 }}
            className={`relative w-full rounded-xl sm:rounded-2xl border-2 ${config.border} ${config.bg} ${!isEmpty ? config.shadow : ""} transition-all duration-200 overflow-hidden`}
            style={{ minHeight: hasText && title ? "4rem" : "3.5rem" }}
          >
            {/* Numer próby w tle */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-4xl sm:text-5xl font-black opacity-[0.04] pointer-events-none select-none">
              {i + 1}
            </div>

            {/* Treść */}
            <div className="relative z-10 flex items-center justify-between w-full h-full px-3 sm:px-4 py-2">
              <div className="flex-1 min-w-0 pr-2">
                {!hasText ? (
                  <span
                    className={`font-black tracking-wider uppercase block text-[10px] ${config.text}`}
                  >
                    {emptyLabel}
                  </span>
                ) : (
                  <div className="flex flex-col gap-0.5 group/text">
                    <div className="relative">
                      <span
                        className={`font-black tracking-wider uppercase truncate block leading-tight ${config.text}`}
                        style={{
                          fontSize: artist.length > 53 ? "8px" : "10px",
                        }}
                      >
                        {artist}
                      </span>
                      {artist.length > 53 && (
                        <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-zinc-800 border border-white/10 rounded-lg text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/text:opacity-100 transition-opacity duration-150 pointer-events-none z-50 shadow-xl">
                          {artist}
                        </div>
                      )}
                    </div>
                    {title && (
                      <div className="relative">
                        <span
                          className="font-semibold tracking-wide truncate block leading-tight text-white/80"
                          style={{
                            fontSize: title.length > 53 ? "7px" : "9px",
                          }}
                        >
                          {title}
                        </span>
                        {title.length > 53 && (
                          <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-zinc-800 border border-white/10 rounded-lg text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/text:opacity-100 transition-opacity duration-150 pointer-events-none z-50 shadow-xl">
                            {title}
                          </div>
                        )}
                      </div>
                    )}
                    <span
                      className={`text-[6px] sm:text-[7px] font-black uppercase tracking-wider opacity-60 mt-0.5 block ${config.text}`}
                    >
                      {g.status === "correct" && "POPRAWNA"}
                      {g.status === "artist" && "TRAFIONY ARTYSTA"}
                      {g.status === "wrong" && "BŁĘDNA"}
                      {g.status === "skipped" && "POMINIĘTA"}
                    </span>
                  </div>
                )}
              </div>

              {/* Ikona statusu */}
              <div className="ml-2 shrink-0">
                {config.icon ? (
                  config.icon
                ) : (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-zinc-700/40 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-zinc-700/40" />
                  </div>
                )}
              </div>
            </div>

            {/* Pasek postępu – tylko dla aktywnej próby i gdy gra NIE jest zakończona */}
            {isActiveEmpty && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent/20">
                <div
                  className="h-full bg-accent animate-pulse"
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};