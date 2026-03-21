"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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

const LS_STATS_DAILY    = "jakitowers_stats_daily";
const LS_STATS_NONLIMIT = "jakitowers_stats_nonlimit";
const LS_SUBMITTED_KEY  = "jakitowers_submitted";

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
  } catch {
    /* ignore */
  }
}

// ─── Hook dla trybu DAILY ─────────────────────────────────────────────────────

export function useGameStats(currentDay: number) {
  const [localStats, setLocalStats] = useState<LocalStats>(defaultStats);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    setLocalStats(loadStats(LS_STATS_DAILY));
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGlobalStats = useCallback(
    async (day: number) => {
      if (!isMounted.current) return;
      setGlobalLoading(true);
      try {
        const res = await fetch(`/api/stats?day=${day}`);
        if (res.ok && isMounted.current) {
          setGlobalStats(await res.json());
        }
      } catch {
        /* ignore */
      } finally {
        if (isMounted.current) setGlobalLoading(false);
      }
    },
    []
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
        if (isMounted.current) saveStats(LS_STATS_DAILY, next);
        return next;
      });

      try {
        const submittedRaw = localStorage.getItem(LS_SUBMITTED_KEY);
        const submitted: number[] = submittedRaw ? JSON.parse(submittedRaw) : [];
        if (!submitted.includes(currentDay) && isMounted.current) {
          await fetch("/api/stats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ day: currentDay, attempt, won }),
          });
          localStorage.setItem(LS_SUBMITTED_KEY, JSON.stringify([...submitted, currentDay]));
          if (isMounted.current) await fetchGlobalStats(currentDay);
        }
      } catch {
        /* ignore */
      }
    },
    [currentDay, fetchGlobalStats]
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

// ─── Hook dla trybu NON LIMIT (tylko w pamięci, reset przy odświeżeniu) ─────

const LS_NONLIMIT_BEST_STREAK = "jakitowers_nonlimit_best_streak";

export function useNonLimitStats() {
  // Wczytujemy tylko najlepszą serię z localStorage
  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LS_NONLIMIT_BEST_STREAK);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Stan bieżących statystyk – wszystko poza maxStreak jest zerowane przy każdym uruchomieniu
  const [stats, setStats] = useState<LocalStats>(() => ({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: bestStreak,          // pobieramy zapisaną najlepszą serię
    attemptDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, X: 0 },
    lastPlayedDay: null,
  }));

  const recordResult = useCallback((won: boolean, attempt: number | null) => {
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
        // Sprawdzamy, czy obecna seria jest lepsza od dotychczasowej najlepszej
        if (next.currentStreak > next.maxStreak) {
          next.maxStreak = next.currentStreak;
          // Zapamiętujemy nowy rekord
          try {
            localStorage.setItem(LS_NONLIMIT_BEST_STREAK, next.maxStreak.toString());
          } catch { /* ignore */ }
        }
      } else {
        next.currentStreak = 0;
      }
      return next;
    });
  }, []);

  return { stats, recordResult };
}