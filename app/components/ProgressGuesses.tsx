"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface ProgressGuessesProps {
  guesses: { display: string; status: "correct" | "wrong" | "skipped" | "empty" | "artist" }[];
  gameMode?: "daily" | "nonlimit";
}

export const ProgressGuesses = ({ guesses, gameMode = "daily" }: ProgressGuessesProps) => {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4 max-md:gap-2">
      <p className="text-[12px] max-md:text-[10px] font-black text-accent tracking-[0.7em] uppercase mb-4 max-md:mb-2 text-center">
        {gameMode === "daily" ? "HISTORIA PRÓB" : "HISTORIA PRÓB"}
      </p>
      {guesses.map((g, i) => {
        const hasText = !!g.display;
        const textLength = g.display?.length || 0;

        return (
          <motion.div
            layout
            key={i}
            className={`h-14 max-md:h-12 w-full rounded-2xl border-2 flex items-center justify-center px-4 max-md:px-2 transition-all duration-500 text-center relative overflow-hidden ${
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
            <span
              className="font-black tracking-widest uppercase truncate px-2"
              style={{
                fontSize: !hasText ? "10px" : textLength > 35 ? "8px" : textLength > 25 ? "9px" : "10px",
                lineHeight: "1",
              }}
            >
              {g.display || (gameMode === "daily" ? `PRÓBA ${i + 1}` : "______")}
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
        );
      })}
    </div>
  );
};