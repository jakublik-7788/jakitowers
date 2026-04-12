"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { todayDayNumber } from "@/app/scripts/Usecalendar";

export interface LocalStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  attemptDistribution: Record<string, number>;
  lastPlayedDay: number | null;
}

export interface GlobalStats {
  attempts: Record<string, number>;
  total: number;
  wins: number;
}

const LS_STATS_DAILY_RAP = "jakitowers_stats_daily_rap";
const LS_STATS_DAILY_KLASYKI = "jakitowers_stats_daily_klasyki";
const LS_STATS_DAILY_SOUNDTRACKI = "jakitowers_stats_daily_soundtracki";

const LS_NONLIMIT_BEST_STREAK_RAP = "jakitowers_nonlimit_best_streak_rap";
const LS_NONLIMIT_BEST_STREAK_KLASYKI = "jakitowers_nonlimit_best_streak_klasyki";
const LS_NONLIMIT_BEST_STREAK_SOUNDTRACKI = "jakitowers_nonlimit_best_streak_soundtracki";

const getSubmittedKey = (mode: string) => `jakitowers_submitted_${mode}`;
const CACHE_VERSION = "v2";
const getCacheKey = (mode: string, day: number) =>
  `jakitowers_globalcache_${CACHE_VERSION}_${mode}_${day}`;

// Stare dni (już zakończone) cache'ujemy długo — dane się nie zmienią
// Dzisiejszy dzień — nigdy nie cache'ujemy, zawsze świeży fetch
const CACHE_TTL_OLD = 24 * 60 * 60 * 1000; // 24h dla poprzednich dni

const defaultStats = (): LocalStats => ({
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  attemptDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, X: 0 },
  lastPlayedDay: null,
});

function loadStats(key: string): LocalStats {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...defaultStats(), ...JSON.parse(raw) } : defaultStats();
  } catch {
    return defaultStats();
  }
}

function saveStats(key: string, stats: LocalStats) {
  try {
    localStorage.setItem(key, JSON.stringify(stats));
  } catch {}
}

export function useGameStats(
  currentDay: number,
  mode: "rap" | "klasyki" | "soundtracki" = "rap",
) {
  const statsKey =
    mode === "rap"
      ? LS_STATS_DAILY_RAP
      : mode === "klasyki"
        ? LS_STATS_DAILY_KLASYKI
        : LS_STATS_DAILY_SOUNDTRACKI;

  const [localStats, setLocalStats] = useState<LocalStats>(defaultStats);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const isMounted = useRef(true);
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (mode === "rap") {
      const oldKey = "jakitowers_stats_daily";
      const newKey = statsKey;
      const oldData = localStorage.getItem(oldKey);
      const newData = localStorage.getItem(newKey);
      if (oldData && !newData) {
        try {
          localStorage.setItem(newKey, oldData);
          setLocalStats(loadStats(newKey));
        } catch {}
      }
    }
  }, [mode, statsKey]);

  useEffect(() => {
    isMounted.current = true;
    setLocalStats(loadStats(statsKey));
    return () => {
      isMounted.current = false;
    };
  }, [statsKey]);

  const fetchGlobalStats = useCallback(
    async (day: number, skipCache = false) => {
      if (!isMounted.current) return;
      if (fetchingRef.current) return;

      const isToday = day >= todayDayNumber();

      // Dzisiejszy dzień — zawsze idź do serwera, nigdy nie używaj cache
      if (!isToday && !skipCache) {
        try {
          const cacheKey = getCacheKey(mode, day);
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL_OLD) {
              setGlobalStats(data);
              return;
            }
          }
        } catch {}
      }

      fetchingRef.current = true;
      setGlobalLoading(true);
      try {
        const res = await fetch(`/api/stats?day=${day}&mode=${mode}`);
        if (res.ok && isMounted.current) {
          const data = await res.json();
          setGlobalStats(data);
          // Zapisz do cache tylko stare dni — dzisiejszy zawsze fetchujemy świeżo
          if (!isToday) {
            try {
              localStorage.setItem(
                getCacheKey(mode, day),
                JSON.stringify({ data, timestamp: Date.now() }),
              );
            } catch {}
          }
        }
      } catch {
      } finally {
        fetchingRef.current = false;
        if (isMounted.current) setGlobalLoading(false);
      }
    },
    [mode],
  );

  useEffect(() => {
    fetchGlobalStats(currentDay);
  }, [currentDay, fetchGlobalStats]);

  const recordResult = useCallback(
    async (won: boolean, attempt: number | null) => {
      setLocalStats((prev) => {
        const next = { ...prev };
        next.gamesPlayed += 1;
        next.lastPlayedDay = currentDay;
        const distKey = won && attempt !== null ? String(attempt) : "X";
        next.attemptDistribution = {
          ...prev.attemptDistribution,
          [distKey]: (prev.attemptDistribution[distKey] ?? 0) + 1,
        };
        if (won) {
          next.gamesWon += 1;
          next.currentStreak += 1;
          next.maxStreak = Math.max(next.currentStreak, prev.maxStreak);
        } else {
          next.currentStreak = 0;
        }
        if (isMounted.current) saveStats(statsKey, next);
        return next;
      });

      try {
        const submittedKey = getSubmittedKey(mode);
        const submittedRaw = localStorage.getItem(submittedKey);
        const submitted: number[] = submittedRaw ? JSON.parse(submittedRaw) : [];
        if (!submitted.includes(currentDay) && isMounted.current) {
          await fetch("/api/stats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ day: currentDay, attempt, won, mode }),
          });
          localStorage.setItem(
            submittedKey,
            JSON.stringify([...submitted, currentDay]),
          );
          // Nie ma co czyścić cache dla dzisiejszego dnia — i tak go nie zapisujemy
          if (isMounted.current) await fetchGlobalStats(currentDay, true);
        }
      } catch {}
    },
    [currentDay, fetchGlobalStats, statsKey, mode],
  );

  const refetchGlobalStats = useCallback(() => {
    fetchGlobalStats(currentDay);
  }, [currentDay, fetchGlobalStats]);

  return {
    localStats,
    globalStats,
    globalLoading,
    recordResult,
    refetchGlobalStats,
  };
}

export function useNonLimitStats(
  mode: "rap" | "klasyki" | "soundtracki" = "rap",
) {
  const bestStreakKey =
    mode === "rap"
      ? LS_NONLIMIT_BEST_STREAK_RAP
      : mode === "klasyki"
        ? LS_NONLIMIT_BEST_STREAK_KLASYKI
        : LS_NONLIMIT_BEST_STREAK_SOUNDTRACKI;

  const [bestStreak, setBestStreak] = useState<number>(0);
  const [stats, setStats] = useState<LocalStats>(defaultStats);

  useEffect(() => {
    let loaded = 0;
    try {
      const saved = localStorage.getItem(bestStreakKey);
      if (saved !== null) loaded = parseInt(saved, 10);
    } catch {}
    if (loaded === 0 && mode === "rap") {
      try {
        const oldBest = localStorage.getItem("jakitowers_nonlimit_best_streak");
        if (oldBest !== null) {
          loaded = parseInt(oldBest, 10);
          localStorage.setItem(bestStreakKey, loaded.toString());
        }
      } catch {}
    }
    setBestStreak(loaded);
    setStats({
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: loaded,
      attemptDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, X: 0 },
      lastPlayedDay: null,
    });
  }, [mode, bestStreakKey]);

  const recordResult = useCallback(
    (won: boolean, attempt: number | null) => {
      setStats((prev) => {
        const next = { ...prev };
        next.gamesPlayed += 1;
        const distKey = won && attempt !== null ? String(attempt) : "X";
        next.attemptDistribution = {
          ...prev.attemptDistribution,
          [distKey]: (prev.attemptDistribution[distKey] ?? 0) + 1,
        };
        if (won) {
          next.gamesWon += 1;
          next.currentStreak += 1;
          if (next.currentStreak > next.maxStreak) {
            next.maxStreak = next.currentStreak;
            try {
              localStorage.setItem(bestStreakKey, next.maxStreak.toString());
            } catch {}
            setBestStreak(next.maxStreak);
          }
        } else {
          next.currentStreak = 0;
        }
        return next;
      });
    },
    [bestStreakKey],
  );

  return { stats, recordResult };
}