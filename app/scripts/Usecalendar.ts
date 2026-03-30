"use client";
import { useMemo } from "react";
import { dailySongs } from "./songs";

export const GAME_START_DATE = new Date(Date.UTC(2026, 2, 20));

export function todayDayNumber(): number {
  const now = new Date();
  const utcToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const diff = Math.floor((utcToday.getTime() - GAME_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const dayNum = diff + 1;
  if (dayNum < 1) return 1;
  if (dayNum > dailySongs.length) return dailySongs.length;
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
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

export function dateKeyToDayNumber(dateKey: string): number | null {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const diff = Math.floor((date.getTime() - GAME_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const dayNum = diff + 1;
  if (dayNum < 1 || dayNum > dailySongs.length) return null;
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
