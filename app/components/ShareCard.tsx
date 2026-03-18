"use client";

import React, { RefObject, useState } from "react";
import { domToPng } from "modern-screenshot";
import { Share2, Check } from "lucide-react";

interface ShareCardProps {
  status: "win" | "lose";
  currentSong: {
    title: string;
    artist: string;
  } | null;
  cardRef: RefObject<HTMLDivElement | null>;
  dayNumber: number;
  attempts: number;
}

const SITE_URL = "https://www.jakitowers.pl";

export const ShareCard = ({
  status,
  currentSong,
  cardRef,
  dayNumber,
  attempts,
}: ShareCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // Generuj i pobierz grafikę
      const dataUrl = await domToPng(cardRef.current, {
        quality: 1,
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `jakitowers-dzien-${dayNumber}.png`;
      link.href = dataUrl;
      link.click();

      // Skopiuj link do strony do schowka
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Błąd podczas generowania grafiki:", err);
    }
  };

  const isWin = status === "win";

  return (
    <>
      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-3 w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black tracking-widest hover:bg-white/10 active:scale-95 transition-all uppercase italic relative overflow-hidden"
      >
        {copied ? (
          <>
            <Check size={20} className="text-green-400 shrink-0" />
            <span className="text-green-400">Link skopiowany!</span>
          </>
        ) : (
          <>
            <Share2 size={20} className="text-accent shrink-0" />
            Pobierz wynik
          </>
        )}
      </button>

      {/* Drobna informacja że link zostanie skopiowany */}
      {!copied && (
        <p className="text-zinc-700 text-[10px] text-center -mt-1 tracking-wide">
          Link do strony zostanie skopiowany do schowka
        </p>
      )}

      {/* Szablon karty (poza ekranem) */}
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={cardRef}
          className="w-[1080px] h-[1920px] bg-[#050505] flex flex-col items-center justify-between p-24 overflow-hidden relative"
        >
          {/* Glow */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] blur-[150px] rounded-full opacity-20 ${
              isWin ? "bg-green-500" : "bg-red-500"
            }`}
          />

          {/* Logo + dzień */}
          <div className="relative z-10 text-center mt-12">
            <p className="text-accent text-4xl font-black tracking-widest mb-4">
              DZIEŃ #{dayNumber}
            </p>
            <h1 className="text-8xl font-[1000] italic tracking-tighter uppercase select-none leading-none text-white">
              JAKI<span className="text-accent not-italic">TO</span>WERS
            </h1>
            <div className="h-1.5 w-40 bg-accent mx-auto mt-6 shadow-[0_0_20px_var(--accent-glow)]" />
          </div>

          {/* Wynik */}
          <div className="relative z-10 text-center">
            <p className="text-zinc-500 text-4xl font-black tracking-[0.5em] uppercase mb-8">
              WYNIK
            </p>
            <div
              className={`text-[130px] font-[1000] italic leading-none uppercase tracking-tighter ${
                isWin ? "text-green-400 mb-4" : "text-red-500 mb-12"
              }`}
            >
              {isWin ? "ZGADNIĘTE" : "Niezgadnięte"}
            </div>

            {isWin && (
              <div className="mb-10">
                <p className="text-white text-7xl font-black italic tracking-tighter leading-none">
                  {attempts}/5
                </p>
                <p className="text-zinc-500 text-2xl font-bold uppercase tracking-widest mt-2">
                  wykorzystane próby
                </p>
              </div>
            )}

            <div
              className={`px-12 py-4 rounded-full border-4 inline-block ${
                isWin
                  ? "border-green-400/30 text-green-400"
                  : "border-red-500/30 text-red-500"
              }`}
            >
              <span className="text-4xl font-black tracking-widest uppercase">
                {isWin ? "GRATULACJE" : "SPRÓBUJ JUTRO"}
              </span>
            </div>
          </div>

          {/* Piosenka */}
          <div className="relative z-10 w-full bg-zinc-900/60 border-2 border-white/10 rounded-[50px] p-16 backdrop-blur-3xl mb-12">
            <div className="flex flex-col items-center text-center">
              <p className="text-zinc-500 text-2xl font-bold tracking-[0.4em] uppercase mb-8">
                DZISIEJSZA NUTKA:
              </p>
              <h2 className="text-white text-7xl font-[1000] uppercase italic leading-tight mb-4 drop-shadow-lg">
                {currentSong?.title}
              </h2>
              <p className="text-accent text-4xl font-bold uppercase tracking-[0.2em]">
                {currentSong?.artist}
              </p>
            </div>
          </div>

          {/* Footer z URL */}
          <div className="relative z-10 opacity-30">
            <p className="text-white text-3xl font-bold tracking-[0.6em] uppercase">
              {SITE_URL.replace("https://", "")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};