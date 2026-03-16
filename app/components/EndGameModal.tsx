"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Trophy, XCircle } from "lucide-react";
import { Song } from "@/app/songs";
import { ShareCard } from "./ShareCard";

interface EndGameModalProps {
  status: "win" | "lose";
  song: Song;
  onClose: () => void;
  dayNumber: number;   // DODANE
  attempts: number;    // DODANE
}

export const EndGameModal = ({
  status,
  song,
  onClose,
  dayNumber,   // DODANE
  attempts,    // DODANE
}: EndGameModalProps) => {
  const shareCardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80 cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border-2 border-accent/40 p-6 md:p-10 rounded-[40px] max-w-2xl w-full shadow-[0_0_30px_theme(colors.accent-glow/30%)] text-center relative overflow-hidden cursor-default"
      >
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />

        <div className="flex justify-center mb-6">
          {status === "win" ? (
            <div className="bg-green-500/20 p-4 rounded-full border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <Trophy className="text-green-400" size={48} />
            </div>
          ) : (
            <div className="bg-red-500/20 p-4 rounded-full border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <XCircle className="text-red-400" size={48} />
            </div>
          )}
        </div>

        <h2
          className={`text-4xl md:text-6xl font-[1000] italic uppercase tracking-tighter mb-2 ${
            status === "win" ? "text-green-400" : "text-red-500"
          }`}
        >
          {status === "win" ? "GRATULACJE!" : "NIESTETY..."}
        </h2>

        <p className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-8">
          {status === "win"
            ? "ODGADŁEŚ DZISIEJSZĄ NUTKĘ"
            : "NIE TYM RAZEM, SPRÓBUJ JUTRO"}
        </p>

        <div className="aspect-video w-full rounded-[25px] overflow-hidden border-2 border-white/5 shadow-2xl mb-8 bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-black uppercase italic leading-none">
            {song.title}
          </h3>
          <p className="text-accent font-bold tracking-widest uppercase mt-2">
            {song.artist}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-accent text-white py-5 rounded-2xl font-black tracking-widest hover:scale-[1.02] active:scale-95 transition-all uppercase italic shadow-[0_0_30px_var(--accent-glow)]"
          >
            NASTĘPNY WERS JUTRO
          </button>

          {/* TUTAJ POPRAWIONE PRZEKAZYWANIE DANYCH */}
          <ShareCard 
            status={status} 
            currentSong={song} 
            cardRef={shareCardRef} 
            dayNumber={dayNumber} 
            attempts={attempts} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};