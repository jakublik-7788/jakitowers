"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart2, Trophy, Calendar, TrendingUp } from "lucide-react";
import { LocalStats, GlobalStats } from "@/app/scripts/Usegamestats";

const testGlobalStats: GlobalStats = {
  attempts: { "1": 5, "2": 8, "3": 12, "4": 7, "5": 3, X: 4 },
  total: 39,
  wins: 35,
};

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: LocalStats;
  globalStats: GlobalStats | null;
  globalLoading: boolean;
  currentDay: number;
  gameMode: "daily" | "nonlimit";
}

export const StatsModal = ({
  isOpen,
  onClose,
  stats,
  globalStats,
  globalLoading,
  currentDay,
  gameMode,
}: StatsModalProps) => {
  if (!isOpen) return null;

  const totalGames = stats.gamesPlayed;
  const winRate = totalGames > 0 ? Math.round((stats.gamesWon / totalGames) * 100) : 0;
  const maxAttempts = 5;

  const distribution = Array.from({ length: maxAttempts }, (_, i) => {
    const key = (i + 1).toString();
    return stats.attemptDistribution[key] || 0;
  });
  const lostCount = stats.attemptDistribution.X || 0;
  const maxCount = Math.max(...distribution, lostCount, 1);

  const displayGlobalStats = globalStats || testGlobalStats;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/97"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border-2 border-accent/30 rounded-[32px] w-full max-w-md shadow-[0_0_50px_var(--accent-glow)] relative overflow-hidden max-md:max-w-[90%]"
          >
            <div className="bg-zinc-900/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between max-md:p-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-accent/20 rounded-xl">
                  <BarChart2 className="text-accent max-md:w-5 max-md:h-5" size={20} />
                </div>
                <h2 className="text-xl font-black uppercase italic tracking-tight max-md:text-lg">STATYSTYKI</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={18} className="max-md:w-5 max-md:h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-custom max-md:p-3 max-md:space-y-3">
              <div className="grid grid-cols-4 gap-1.5 max-md:gap-1">
                <div className="bg-white/5 rounded-xl py-2.5 px-1 text-center border border-white/10">
                  <div className="text-lg font-black text-accent leading-none max-md:text-base">{stats.gamesPlayed}</div>
                  <div className="text-[8px] font-bold tracking-tight uppercase text-zinc-400 mt-1 max-md:text-[7px]">Gry</div>
                </div>
                <div className="bg-white/5 rounded-xl py-2.5 px-1 text-center border border-white/10">
                  <div className="text-lg font-black text-green-400 leading-none max-md:text-base">{stats.gamesWon}</div>
                  <div className="text-[8px] font-bold tracking-tight uppercase text-zinc-400 mt-1 max-md:text-[7px]">Wygrane</div>
                </div>
                <div className="bg-white/5 rounded-xl py-2.5 px-1 text-center border border-white/10">
                  <div className="text-lg font-black text-red-500 leading-none max-md:text-base">{lostCount}</div>
                  <div className="text-[8px] font-bold tracking-tight uppercase text-zinc-400 mt-1 max-md:text-[7px]">Przegrane</div>
                </div>
                <div className="bg-white/5 rounded-xl py-2.5 px-1 text-center border border-white/10">
                  <div className="text-lg font-black text-yellow-400 leading-none max-md:text-base">{winRate}%</div>
                  <div className="text-[8px] font-bold tracking-tight uppercase text-zinc-400 mt-1 max-md:text-[7px]">Winrate</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/10 to-transparent rounded-xl p-3 border border-accent/20 max-md:p-2">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-accent max-md:w-4 max-md:h-4" size={16} />
                  <h3 className="text-xs font-black tracking-widest uppercase max-md:text-[10px]">SERIA ZWYCIĘSTW</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-accent max-md:text-xl">{stats.currentStreak}</div>
                    <div className="text-[8px] text-zinc-400 tracking-wider mt-0.5">OBECNA</div>
                  </div>
                  <div className="text-2xl font-black text-zinc-400 max-md:text-xl">/</div>
                  <div>
                    <div className="text-2xl font-black text-yellow-400 max-md:text-xl">{stats.maxStreak}</div>
                    <div className="text-[8px] text-zinc-400 tracking-wider mt-0.5">NAJLEPSZA</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-accent max-md:w-4 max-md:h-4" size={16} />
                  <h3 className="text-xs font-black tracking-widest uppercase max-md:text-[10px]">ROZKŁAD PRÓB</h3>
                </div>
                <div className="space-y-1.5">
                  {distribution.map((count, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <div className="w-6 text-[10px] font-bold text-zinc-400 max-md:text-[9px]">{index + 1}</div>
                      <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / maxCount) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="h-full bg-accent flex items-center justify-end px-2 text-[10px] font-bold text-white"
                        >
                          {count > 0 && count}
                        </motion.div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 text-[10px] font-bold text-zinc-400 max-md:text-[9px]">X</div>
                    <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(lostCount / maxCount) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-full bg-red-500/50 flex items-center justify-end px-2 text-[10px] font-bold text-white"
                      >
                        {lostCount > 0 && lostCount}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {gameMode === "daily" && (
                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-accent max-md:w-4 max-md:h-4" size={16} />
                    <h3 className="text-xs font-black tracking-widest uppercase max-md:text-[10px]">
                      DZISIAJ WŚRÓD GRACZY ({displayGlobalStats.total})
                    </h3>
                  </div>
                  {globalLoading ? (
                    <div className="flex justify-center py-3">
                      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="space-y-1.5">
                        {[1, 2, 3, 4, 5].map((num) => {
                          const count = displayGlobalStats.attempts[num] || 0;
                          const maxVal = Math.max(...Object.values(displayGlobalStats.attempts), 1);
                          return (
                            <div key={num} className="flex items-center gap-1.5">
                              <div className="w-6 text-[10px] font-bold text-zinc-400 max-md:text-[9px]">{num}</div>
                              <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(count / maxVal) * 100}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="h-full bg-accent flex items-center justify-end px-2 text-[10px] font-bold text-white"
                                >
                                  {count > 0 && count}
                                </motion.div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 text-[10px] font-bold text-zinc-400 max-md:text-[9px]">X</div>
                          <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  ((displayGlobalStats.attempts.X || 0) /
                                    Math.max(...Object.values(displayGlobalStats.attempts), 1)) *
                                  100
                                }%`,
                              }}
                              transition={{ duration: 0.5 }}
                              className="h-full bg-red-500/50 flex items-center justify-end px-2 text-[10px] font-bold text-white"
                            >
                              {(displayGlobalStats.attempts.X || 0) > 0 && displayGlobalStats.attempts.X}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-white/5 rounded-xl p-2 text-center">
                          <div className="text-lg font-black text-accent max-md:text-base">{displayGlobalStats.total}</div>
                          <div className="text-[8px] font-bold tracking-widest uppercase text-zinc-400 mt-0.5">Rozegrano</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2 text-center">
                          <div className="text-lg font-black text-green-400 max-md:text-base">{displayGlobalStats.wins}</div>
                          <div className="text-[8px] font-bold tracking-widest uppercase text-zinc-400 mt-0.5">Wygrane</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};