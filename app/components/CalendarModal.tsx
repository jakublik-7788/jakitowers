"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  gameHistory: Record<string, "win" | "lose" | null>;
}

export const CalendarModal = ({
  isOpen,
  onClose,
  currentMonth,
  setCurrentMonth,
  gameHistory,
}: CalendarModalProps) => {
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const today = new Date();
  const isFutureDate = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date > today;
  };

  const monthNames = [
    "STYCZEŃ", "LUTY", "MARZEC", "KWIECIEŃ", "MAJ", "CZERWIEC",
    "LIPIEC", "SIERPIEŃ", "WRZESIEŃ", "PAŹDZIERNIK", "LISTOPAD", "GRUDZIEŃ",
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    if (nextMonth <= today) {
      setCurrentMonth(nextMonth);
    }
  };

  const getDayKey = (day: number) => {
    return `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Kalendarz */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            {/* ZMIANA: shadow używa teraz zmiennej --accent-glow zamiast stałego koloru */}
            <div className="bg-zinc-950 border-2 border-accent/40 rounded-[30px] p-6 shadow-[0_0_50px_var(--accent-glow)]">
              
              {/* Header kalendarza */}
              <div className="flex items-center justify-between mb-6">
                <motion.button
                  whileHover={{ scale: 1.1, color: "var(--accent-main)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevMonth}
                  className="text-zinc-400 hover:text-accent transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </motion.button>

                <h2 className="text-xl font-black text-white tracking-wider">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>

                <motion.button
                  whileHover={{ scale: 1.1, color: "var(--accent-main)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextMonth}
                  disabled={
                    currentMonth.getMonth() === today.getMonth() &&
                    currentMonth.getFullYear() === today.getFullYear()
                  }
                  className={`text-zinc-400 hover:text-accent transition-colors ${
                    currentMonth.getMonth() === today.getMonth() &&
                    currentMonth.getFullYear() === today.getFullYear()
                      ? "opacity-30 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.button>
              </div>

              {/* Dni tygodnia */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"].map((day) => (
                  <div key={day} className="text-center text-zinc-500 text-xs font-black tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              {/* Dni miesiąca */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayKey = getDayKey(day);
                  const status = gameHistory[dayKey];
                  const isToday =
                    day === today.getDate() &&
                    currentMonth.getMonth() === today.getMonth() &&
                    currentMonth.getFullYear() === today.getFullYear();
                  const isFuture = isFutureDate(day);

                  return (
                    <motion.button
                      key={day}
                      whileHover={{ scale: isFuture ? 1 : 1.05 }}
                      whileTap={{ scale: isFuture ? 1 : 0.95 }}
                      onClick={() => { if (!isFuture) onClose(); }}
                      disabled={isFuture}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center font-black text-sm relative
                        ${
                          isFuture
                            ? "text-zinc-800 cursor-not-allowed"
                            : status === "win"
                            ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                            : status === "lose"
                            ? "bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                            : "text-zinc-400 hover:text-white hover:bg-accent/10 hover:border-accent/30"
                        }
                        ${
                          isToday
                            ? "border-2 border-accent shadow-[0_0_15px_var(--accent-glow)]" 
                            : "border border-transparent"
                        }
                        transition-all duration-200
                      `}
                    >
                      {day}
                      {isToday && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Legenda */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-xs text-zinc-400">Wygrana</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <span className="text-xs text-zinc-400">Przegrana</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* ZMIANA: shadow dzisiejszego dnia w legendzie */}
                  <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]" />
                  <span className="text-xs text-zinc-400">Dzisiaj</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};