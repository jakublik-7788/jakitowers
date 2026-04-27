"use client";

import { useMemo } from "react";
import { rapSongs } from "./songs/rap/rapSongs";

export const GAME_START_DATE = new Date(Date.UTC(2026, 2, 19, 23, 0, 0)); // 19 marca 23:00 UTC = 20 marca 00:00 UTC+1 (zima)

function getPolandOffset(): number {
  const now = new Date();
  const jan = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const jul = new Date(Date.UTC(now.getUTCFullYear(), 6, 1));
  const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  const isDST = now.getTimezoneOffset() < stdOffset;
  return isDST ? 2 : 1;
}

function todayPoland(): Date {
  const now = new Date();
  const polandOffset = getPolandOffset() * 60 * 60 * 1000;
  const polandNow = new Date(now.getTime() + polandOffset);
  return new Date(Date.UTC(polandNow.getUTCFullYear(), polandNow.getUTCMonth(), polandNow.getUTCDate()));
}

export function todayDayNumber(): number {
  const diff = Math.floor((todayPoland().getTime() - GAME_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const dayNum = diff + 1;
  if (dayNum < 1) return 1;
  if (dayNum > rapSongs.length) return rapSongs.length;
  return dayNum;
}

export function maxUnlockedDay(): number {
  return todayDayNumber();
}

export function isDayUnlocked(dayNumber: number): boolean {
  return dayNumber <= maxUnlockedDay();
}

export function dayNumberToDateKey(dayNumber: number): string {
  const date = new Date(GAME_START_DATE);
  date.setUTCDate(date.getUTCDate() + dayNumber - 1);
  const polandOffset = getPolandOffset() * 60 * 60 * 1000;
  const polandDate = new Date(date.getTime() + polandOffset);
  return `${polandDate.getUTCFullYear()}-${polandDate.getUTCMonth() + 1}-${polandDate.getUTCDate()}`;
}

export function dateKeyToDayNumber(dateKey: string): number | null {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const diff = Math.floor((date.getTime() - GAME_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const dayNum = diff + 1;
  if (dayNum < 1 || dayNum > rapSongs.length) return null;
  return dayNum;
}

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
