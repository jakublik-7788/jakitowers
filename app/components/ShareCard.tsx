"use client";

import React, { RefObject } from "react";
import { domToPng } from "modern-screenshot";
import { Share2 } from "lucide-react";

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

export const ShareCard = ({ 
  status, 
  currentSong, 
  cardRef, 
  dayNumber, 
  attempts 
}: ShareCardProps) => {
  
  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await domToPng(cardRef.current, {
        quality: 1,
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `jaki-to-wers-dzien-${dayNumber}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Błąd podczas generowania grafiki:", err);
    }
  };

  const isWin = status === "win";

  return (
    <>
      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-3 w-full mt-4 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black tracking-widest hover:bg-white/10 active:scale-95 transition-all uppercase italic"
      >
        <Share2 size={20} className="text-accent" />
        Pobierz wynik
      </button>

      {/* SZABLON KARTY */}
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={cardRef}
          className="w-[1080px] h-[1920px] bg-[#050505] flex flex-col items-center justify-between p-24 overflow-hidden relative"
        >
          {/* Subtle Glow Background */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] blur-[150px] rounded-full opacity-20 ${isWin ? 'bg-green-500' : 'bg-red-500'}`} />

          {/* 1. LOGO STRONY NA GÓRZE + DZIEŃ */}
          <div className="relative z-10 text-center mt-12">
            <p className="text-accent text-4xl font-black tracking-widest mb-4">DZIEŃ #{dayNumber}</p>
            <h1 className="text-8xl md:text- font-[1000] italic tracking-tighter uppercase select-none leading-none text-white">
              JAKI
              <span className="text-accent not-italic">TO</span>
              WERS
            </h1>
            <div className="h-1.5 w-40 bg-accent mx-auto mt-6 shadow-[0_0_20px_var(--accent-glow)]" />
          </div>

          {/* 2. WYNIK: ZGADNIĘTE / NIEZGADNIĘTE */}
          <div className="relative z-10 text-center">
            <p className="text-zinc-500 text-4xl font-black tracking-[0.5em] uppercase mb-8">WYNIK</p>
            <div className={`text-[130px] font-[1000] italic leading-none uppercase tracking-tighter ${isWin ? 'text-green-400 mb-4' : 'text-red-500 mb-12'}`}>
              {isWin ? "ZGADNIĘTE" : "Niezgadnięte"}
            </div>
            
            {/* LICZNIK PRÓB - POKAZUJE TYLKO PRZY WYGRANEJ */}
            {isWin && (
              <div className="mb-10 animate-in fade-in zoom-in duration-500">
                <p className="text-white text-7xl font-black italic tracking-tighter leading-none">
                  {attempts}/5
                </p>
                <p className="text-zinc-500 text-2xl font-bold uppercase tracking-widest mt-2">wykorzystane próby</p>
              </div>
            )}

            <div className={`px-12 py-4 rounded-full border-4 inline-block ${isWin ? 'border-green-400/30 text-green-400' : 'border-red-500/30 text-red-500'}`}>
               <span className="text-4xl font-black tracking-widest uppercase">
                 {isWin ? "GRATULACJE" : "SPRÓBUJ JUTRO"}
               </span>
            </div>
          </div>

          {/* 3. PROSTOKĄT: DZISIEJSZA NUTKA */}
          <div className="relative z-10 w-full bg-zinc-900/60 border-2 border-white/10 rounded-[50px] p-16 backdrop-blur-3xl mb-12">
            <div className="flex flex-col items-center text-center">
              <p className="text-zinc-500 text-2xl font-bold tracking-[0.4em] uppercase mb-8">DZISIEJSZA NUTKA:</p>
              <h2 className="text-white text-7xl font-[1000] uppercase italic leading-tight mb-4 drop-shadow-lg">
                {currentSong?.title}
              </h2>
              <p className="text-accent text-4xl font-bold uppercase tracking-[0.2em]">
                {currentSong?.artist}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 opacity-30">
            <p className="text-white text-3xl font-bold tracking-[0.6em] uppercase">
              WWW.JAKITOWERS.PL
            </p>
          </div>
        </div>
      </div>
    </>
  );
};