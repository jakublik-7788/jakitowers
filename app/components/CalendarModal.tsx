"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { dateKeyToDayNumber, isDayUnlocked, todayDayNumber } from "@/app/scripts/Usecalendar";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  rapResults: Record<number, "win" | "lose">;
  klasykiResults: Record<number, "win" | "lose">;
  soundtrackiResults: Record<number, "win" | "lose">; // NEW
  onDayClick: (day: number) => void;
  totalDays: number;
}

export const CalendarModal = ({
  isOpen,
  onClose,
  currentMonth,
  setCurrentMonth,
  rapResults,
  klasykiResults,
  soundtrackiResults,
  onDayClick,
  totalDays,
}: CalendarModalProps) => {
  const today = todayDayNumber();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDayNumber = (day: number): number | null => {
    return dateKeyToDayNumber(
      `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${day}`
    );
  };

  const getDayStatus = (day: number): {
    rap: "win" | "lose" | null;
    klasyki: "win" | "lose" | null;
    soundtracki: "win" | "lose" | null;
  } => {
    const dayNum = getDayNumber(day);
    if (!dayNum) return { rap: null, klasyki: null, soundtracki: null };
    return {
      rap: rapResults[dayNum] || null,
      klasyki: klasykiResults[dayNum] || null,
      soundtracki: soundtrackiResults[dayNum] || null,
    };
  };

  const isDayClickable = (day: number): boolean => {
    const dayNum = getDayNumber(day);
    if (!dayNum) return false;
    return dayNum <= totalDays && isDayUnlocked(dayNum);
  };

  const handleDayClick = (day: number) => {
    const dayNum = getDayNumber(day);
    if (dayNum && dayNum <= totalDays && isDayUnlocked(dayNum)) {
      onDayClick(dayNum);
      onClose();
    }
  };

  const isToday = (day: number): boolean => {
    const dayNum = getDayNumber(day);
    return dayNum === today;
  };

  const monthNames = [
    "STYCZEŃ", "LUTY", "MARZEC", "KWIECIEŃ", "MAJ", "CZERWIEC",
    "LIPIEC", "SIERPIEŃ", "WRZESIEŃ", "PAŹDZIERNIK", "LISTOPAD", "GRUDZIEŃ"
  ];

  const weekDays = ["PON", "WT", "ŚR", "CZW", "PT", "SOB", "NDZ"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border-2 border-accent/40 rounded-[32px] p-6 max-w-md w-full shadow-[0_0_60px_var(--accent-glow)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <Calendar size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-accent text-[10px] font-black tracking-[0.3em] uppercase mb-0.5">
                    ARCHIWUM
                  </p>
                  <h2 className="text-xl font-[1000] italic uppercase tracking-tight text-white">
                    Kalendarz
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-zinc-400 hover:text-white" />
              </button>
            </div>

            {/* Nawigacja miesięczna */}
            <div className="flex items-center justify-between mb-6 px-2">
              <button
                onClick={handlePrevMonth}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all flex items-center justify-center"
              >
                <ChevronLeft size={20} className="text-zinc-400" />
              </button>
              <h3 className="text-lg font-[1000] tracking-wider text-white">
                {monthNames[currentMonth.getMonth()]} <span className="text-accent">{currentMonth.getFullYear()}</span>
              </h3>
              <button
                onClick={handleNextMonth}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all flex items-center justify-center"
              >
                <ChevronRight size={20} className="text-zinc-400" />
              </button>
            </div>

            {/* Dni tygodnia */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-[11px] font-black tracking-wider text-zinc-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Kalendarz */}
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 }).map(
                (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                )
              )}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const clickable = isDayClickable(day);
                const isCurrentDay = isToday(day);
                const dayNum = getDayNumber(day);
                const isFuture = dayNum && dayNum > totalDays;
                const status = getDayStatus(day);
                
                let bgClass = "";
                let textClass = "";
                let borderClass = "";
                
                if (isCurrentDay) {
                  bgClass = "bg-accent/30";
                  textClass = "text-white font-bold";
                  borderClass = "border-accent/60";
                } else if (!clickable || isFuture) {
                  bgClass = "bg-white/5";
                  textClass = "text-zinc-600";
                  borderClass = "border-white/5";
                } else {
                  bgClass = "bg-white/10 hover:bg-white/20";
                  textClass = "text-zinc-300";
                  borderClass = "border-white/10 hover:border-accent/40";
                }
                
                return (
                  <button
                    key={day}
                    onClick={() => clickable && !isFuture && handleDayClick(day)}
                    disabled={!clickable || isFuture}
                    className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-200 border ${
                      clickable && !isFuture ? "cursor-pointer" : "cursor-not-allowed"
                    } ${bgClass} ${borderClass} hover:scale-105 active:scale-95`}
                  >
                    {/* Numer dnia */}
                    <span className={`text-base font-black ${textClass}`}>
                      {day}
                    </span>
                    
                    {/* Trzy kropki – RAP, KLASYKI, SOUNDTRACKI */}
                    <div className="flex gap-1 mt-1">
                      {status.rap && (
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            status.rap === "win" ? "bg-green-500" : "bg-red-500"
                          } shadow-[0_0_4px_currentColor]`} 
                          title="RAP"
                        />
                      )}
                      {status.klasyki && (
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            status.klasyki === "win" ? "bg-green-500" : "bg-red-500"
                          } shadow-[0_0_4px_currentColor]`} 
                          title="KLASYKI"
                        />
                      )}
                      {status.soundtracki && (
                        <div 
                          className={`w-2 h-2 rounded-full ${
                            status.soundtracki === "win" ? "bg-green-500" : "bg-red-500"
                          } shadow-[0_0_4px_currentColor]`} 
                          title="SOUNDTRACKI"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legenda – zaktualizowana */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-5 border-t border-white/10">
              {/* Kropki z kolorami */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-bold text-zinc-400">Wygrana</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                <span className="text-[10px] font-bold text-zinc-400">Przegrana</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_6px_var(--accent-glow)]" />
                <span className="text-[10px] font-bold text-zinc-400">Dzisiaj</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/10" />
                <span className="text-[10px] font-bold text-zinc-400">Nieodblokowany</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};