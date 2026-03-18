// app/scripts/useCalendar.ts
"use client";

import { useMemo } from "react";
import { dailySongs } from "./songs";

// ─── Data startu gry ──────────────────────────────────────────────────────────
// Day #1 = 19 marca 2026
const GAME_START_DATE = new Date("2026-03-17T00:00:00");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Dzisiejsza data bez godziny */
function today(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Który numer dnia jest dostępny dzisiaj.
 * Jeśli jest przed startem gry → zwraca 1 (żeby nie crashowało).
 * Jeśli przekracza liczbę piosenek → zwraca ostatnią piosenkę.
 */
export function todayDayNumber(): number {
  const start = new Date(GAME_START_DATE);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((today().getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const dayNum = diff + 1; // diff=0 → day 1, diff=1 → day 2, itd.
  if (dayNum < 1) return 1;
  if (dayNum > dailySongs.length) return dailySongs.length;
  return dayNum;
}

/**
 * Maksymalny odblokowany numer dnia (= dzisiaj).
 * Gracz może przeglądać tylko dni <= tego numeru.
 */
export function maxUnlockedDay(): number {
  return todayDayNumber();
}

/** Czy dany numer dnia jest już odblokowany (przeszły lub dzisiaj) */
export function isDayUnlocked(dayNumber: number): boolean {
  return dayNumber <= maxUnlockedDay();
}

/** Zamienia numer dnia na klucz "YYYY-M-D" */
export function dayNumberToDateKey(dayNumber: number): string {
  const date = new Date(GAME_START_DATE);
  date.setDate(date.getDate() + dayNumber - 1);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/** Zamienia klucz "YYYY-M-D" na numer dnia (null jeśli poza zakresem) */
export function dateKeyToDayNumber(dateKey: string): number | null {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  const start = new Date(GAME_START_DATE);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const dayNum = diff + 1;
  if (dayNum < 1 || dayNum > dailySongs.length) return null;
  return dayNum;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Buduje mapę { "YYYY-M-D": "win" | "lose" | null }
 * tylko dla odblokowanych dni (przeszłe + dzisiaj).
 */
export function useCalendarHistory(
  dayResults: Record<number, "win" | "lose">
): Record<string, "win" | "lose" | null> {
  return useMemo(() => {
    const unlocked = maxUnlockedDay();
    const history: Record<string, "win" | "lose" | null> = {};
    for (let i = 1; i <= unlocked; i++) {
      const key = dayNumberToDateKey(i);
      history[key] = dayResults[i] ?? null;
    }
    return history;
  }, [dayResults]);
}