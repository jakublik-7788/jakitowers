"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy, XCircle } from "lucide-react";
import { Song } from "@/app/scripts/songs";
import { ShareCard } from "./ShareCard";
import { CountdownTimer } from "./CountdownTimer";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const AppleMusicIcon = () => (
  <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
    <path
      fillRule="evenodd"
      d="m10.995 0 .573.001q.241 0 .483.007c.35.01.705.03 1.051.093.352.063.68.166.999.329a3.36 3.36 0 0 1 1.47 1.468c.162.32.265.648.328 1 .063.347.084.7.093 1.051q.007.241.007.483l.001.573v5.99l-.001.573q0 .241-.008.483c-.01.35-.03.704-.092 1.05a3.5 3.5 0 0 1-.33 1 3.36 3.36 0 0 1-1.468 1.468 3.5 3.5 0 0 1-1 .33 7 7 0 0 1-1.05.092q-.241.007-.483.008l-.573.001h-5.99l-.573-.001q-.241 0-.483-.008a7 7 0 0 1-1.052-.092 3.6 3.6 0 0 1-.998-.33 3.36 3.36 0 0 1-1.47-1.468 3.6 3.6 0 0 1-.328-1 7 7 0 0 1-.093-1.05Q.002 11.81 0 11.568V5.005l.001-.573q0-.241.007-.483c.01-.35.03-.704.093-1.05a3.6 3.6 0 0 1 .329-1A3.36 3.36 0 0 1 1.9.431 3.5 3.5 0 0 1 2.896.1 7 7 0 0 1 3.95.008Q4.19.002 4.432 0h.573zm-.107 2.518-4.756.959H6.13a.66.66 0 0 0-.296.133.5.5 0 0 0-.16.31c-.004.027-.01.08-.01.16v5.952c0 .14-.012.275-.106.39-.095.115-.21.15-.347.177l-.31.063c-.393.08-.65.133-.881.223a1.4 1.4 0 0 0-.519.333 1.25 1.25 0 0 0-.332.995c.031.297.166.582.395.792.156.142.35.25.578.296.236.047.49.031.858-.043.196-.04.38-.102.555-.205a1.4 1.4 0 0 0 .438-.405 1.5 1.5 0 0 0 .233-.55c.042-.202.052-.386.052-.588V6.347c0-.276.08-.35.302-.404.024-.005 3.954-.797 4.138-.833.257-.049.378.025.378.294v3.524c0 .14-.001.28-.096.396-.094.115-.211.15-.348.178l-.31.062c-.393.08-.649.133-.88.223a1.4 1.4 0 0 0-.52.334 1.26 1.26 0 0 0-.34.994c.03.297.174.582.404.792a1.2 1.2 0 0 0 .577.294c.237.048.49.03.858-.044.197-.04.381-.098.556-.202a1.4 1.4 0 0 0 .438-.405q.173-.252.233-.549a2.7 2.7 0 0 0 .044-.589V2.865c0-.273-.143-.443-.4-.42-.04.003-.383.064-.424.073"
    />
  </svg>
);

const SoundCloudIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M1.175 12.225c-.041 0-.082.01-.124.01a.55.55 0 01-.124-.01C.329 12.151 0 11.76 0 11.267c0-.314.152-.59.39-.767.119-.087.262-.136.41-.136.027 0 .056.003.083.007a3.174 3.174 0 01-.04-.484c0-1.801 1.42-3.26 3.17-3.26.223 0 .44.025.648.07A4.989 4.989 0 019.5 4c2.762 0 5 2.238 5 5 0 .232-.016.46-.047.685H14.5a2.5 2.5 0 010 5h-13a1.33 1.33 0 01-.325-.46z" />
  </svg>
);

const TidalIcon = () => (
  <svg viewBox="0 0 640 640" width="18" height="18" fill="currentColor">
    <path d="M107.2 112L105.9 112C73.6 145.1 40.5 177.5 7.9 210.5C5.3 213.3 1.8 215.6 0 219.1C35.6 254.5 71 290.1 106.6 325.5C142 290.2 177.3 254.7 212.7 219.4L212.7 218.1L139.5 144.9C128.8 133.8 117.3 123.6 107.2 112zM320.7 112L319.4 112C284.5 148.1 247.9 183 213.1 219.2C249 254.3 284.1 290.2 319.8 325.5C354.1 291.4 388.2 257.1 422.4 223.1C423.9 221.6 425.7 220.3 426.5 218.3C391.9 184.5 358.1 150.1 323.9 116.2C322.6 114.9 321.6 113.6 320.6 112.1zM534.2 112L532.9 112C515.7 130 497.8 147.3 480.3 165C462.4 182.7 444.9 200.7 426.8 218.3C427.6 220.6 429.8 221.9 431.4 223.8L533.3 325.5C569.4 290.6 604.1 254.3 640 219.4C639.5 217.2 637.4 215.9 636 214.4L555.8 134.2C548.7 126.8 540.9 120 534.3 112zM319.6 325.7C284.7 360.8 249.6 395.7 214.7 430.6C214.4 431.3 214 432.3 213.7 432.9C237.7 456.6 261.4 480.4 285.2 504.2C297 515.5 308 527.7 320.1 538.6C328.5 531.2 336.5 522.2 344.8 514.3C370.3 489 395.8 463.3 421.3 438C423.1 435.8 425.6 434.4 426.8 431.7C391.4 396.8 356.3 361.5 321.2 326.3L319.7 325.6z" />
  </svg>
);

const PLATFORMS = [
  { key: "spotify", Icon: SpotifyIcon, color: "#1DB954", label: "Spotify" },
  {
    key: "appleMusic",
    Icon: AppleMusicIcon,
    color: "#FC3C44",
    label: "Apple Music",
  },
  {
    key: "soundcloud",
    Icon: SoundCloudIcon,
    color: "#FF5500",
    label: "SoundCloud",
  },
  { key: "tidal", Icon: TidalIcon, color: "#00FFFF", label: "Tidal" },
] as const;

interface EndGameModalProps {
  status: "win" | "lose";
  song: Song;
  onClose: () => void;
  dayNumber: number;
  attempts: number;
}

export const EndGameModal = ({
  status,
  song,
  onClose,
  dayNumber,
  attempts,
}: EndGameModalProps) => {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const availablePlatforms = PLATFORMS.filter((p) => song.platforms?.[p.key]);

  const handleMidnight = useCallback(() => {
    // Odśwież stronę o północy, aby załadować nowy dzień
    window.location.reload();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border-2 border-accent/40 p-5 md:p-8 rounded-[36px] max-w-2xl w-full shadow-[0_0_30px_theme(colors.accent-glow/30%)] text-center relative overflow-hidden cursor-default"
      >
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

        {/* Ikona */}
        <div className="flex justify-center mb-4">
          {status === "win" ? (
            <div className="bg-green-500/20 p-3 rounded-full border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <Trophy className="text-green-400" size={38} />
            </div>
          ) : (
            <div className="bg-red-500/20 p-3 rounded-full border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <XCircle className="text-red-400" size={38} />
            </div>
          )}
        </div>

        <h2
          className={`text-4xl md:text-6xl font-[1000] italic uppercase tracking-tighter mb-1 ${
            status === "win" ? "text-green-400" : "text-red-500"
          }`}
        >
          {status === "win" ? "GRATULACJE!" : "NIESTETY..."}
        </h2>

        <p className="text-zinc-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-5">
          {status === "win"
            ? "ODGADŁEŚ DZISIEJSZĄ NUTKĘ"
            : "NIE TYM RAZEM, SPRÓBUJ JUTRO"}
        </p>

        {/* YouTube */}
        <div className="aspect-video w-full rounded-[20px] overflow-hidden border-2 border-white/5 shadow-2xl mb-5 bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Tytuł + artysta + platformy */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-black uppercase italic leading-none">
            {song.title}
          </h3>
          <p className="text-accent font-bold tracking-widest uppercase mt-1.5 text-sm">
            {song.artist}
          </p>
          {availablePlatforms.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-2">
              {availablePlatforms.map(({ key, Icon, color, label }) => (
                <a
                  key={key}
                  href={song.platforms![key]!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-110 active:scale-95 transition-all duration-200"
                  style={{ color }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Przyciski */}
        <div className="flex flex-col gap-2.5">
          <div className="w-full bg-zinc-900/80 text-white py-4 rounded-2xl font-black tracking-widest uppercase italic border border-white/10 flex items-center justify-center gap-2">
            <span>NOWA PIOSENKA ZA</span>
            <CountdownTimer onMidnight={handleMidnight} className="text-accent font-mono" />
          </div>

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