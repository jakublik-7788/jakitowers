"use client";

import { useCallback, useRef } from "react";

type SoundType =
  | "click"
  | "hover"
  | "correct"
  | "wrong"
  | "skip"
  | "type"
  | "modalOpen"
  | "modalClose"
  | "select"
  | "win"
  | "lose";

const createContext = () => {
  if (typeof window === "undefined") return null;
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const useSoundEffects = (enabled: boolean) => {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (!enabled) return null;
    if (!ctxRef.current) ctxRef.current = createContext();
    if (ctxRef.current?.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, [enabled]);

  // ── Helper: pojedynczy ton z fade-out ────────────────────────────────────
  const tone = useCallback((
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    volume: number,
    type: OscillatorType = "sine",
    freqEnd?: number,
  ) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Delikatny high-cut żeby brzmiało mniej "elektronicznie"
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 3000;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    if (freqEnd) {
      osc.frequency.exponentialRampToValueAtTime(freqEnd, startTime + duration);
    }

    // Bardzo krótki attack + szybki decay
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);
  }, []);

  // ── Dźwięki ───────────────────────────────────────────────────────────────
  const play = useCallback((sound: SoundType) => {
    const ctx = getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;

    switch (sound) {

      // Bardzo cichy, krótki tick — jak kliknięcie w Notion
      case "click": {
        tone(ctx, 1100, t, 0.04, 0.06);
        tone(ctx, 600,  t + 0.01, 0.03, 0.03);
        break;
      }

      // Prawie niesłyszalny hover — subtelna zmiana tonu
      case "hover": {
        tone(ctx, 1400, t, 0.025, 0.025);
        break;
      }

      // Poprawna odpowiedź — dwa delikatne tony w górę
      case "correct": {
        tone(ctx, 700,  t,       0.08, 0.09);
        tone(ctx, 1050, t + 0.07, 0.1, 0.07);
        break;
      }

      // Zła odpowiedź — krótki, miękki "bump" w dół
      case "wrong": {
        tone(ctx, 280, t,       0.09, 0.07, "sine");
        tone(ctx, 220, t + 0.05, 0.1, 0.05, "sine");
        break;
      }

      // Pominięcie — neutralny krótki sweep
      case "skip": {
        tone(ctx, 900, t, 0.1, 0.05, "sine", 500);
        break;
      }

      // Wpisywanie — bardzo cichy, losowy tick klawiatury
      case "type": {
        const freq = 900 + Math.random() * 300;
        tone(ctx, freq, t, 0.018, 0.018);
        break;
      }

      // Otwarcie modala — lekki sweep w górę
      case "modalOpen": {
        tone(ctx, 400, t, 0.12, 0.05, "sine", 650);
        break;
      }

      // Zamknięcie modala — lekki sweep w dół
      case "modalClose": {
        tone(ctx, 650, t, 0.1, 0.04, "sine", 400);
        break;
      }

      // Wybranie podpowiedzi — pojedynczy cichy "pop"
      case "select": {
        tone(ctx, 950,  t,        0.05, 0.07);
        tone(ctx, 1300, t + 0.04, 0.04, 0.04);
        break;
      }

      // Wygrana — trzy delikatne tony rosnąco, jak powiadomienie
      case "win": {
        tone(ctx, 660,  t,        0.12, 0.08);
        tone(ctx, 880,  t + 0.1,  0.12, 0.07);
        tone(ctx, 1100, t + 0.2,  0.18, 0.08);
        tone(ctx, 1320, t + 0.32, 0.2,  0.06);
        break;
      }

      // Przegrana — dwa tony opadające, spokojne
      case "lose": {
        tone(ctx, 500, t,       0.15, 0.06);
        tone(ctx, 380, t + 0.14, 0.18, 0.05);
        break;
      }
    }
  }, [getCtx, tone]);

  return { play };
};