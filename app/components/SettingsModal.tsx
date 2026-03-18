"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

const accentColors = [
  { name: "Purple", main: "#bc13fe" },
  { name: "Pink",   main: "#fd51c4" },
  { name: "Blue",   main: "#3b82f6" },
  { name: "Cyan",   main: "#06b6d4" },
  { name: "Green",  main: "#22c55e" },
  { name: "Red",    main: "#f33131" },
  { name: "Orange", main: "#f59e0b" },
  { name: "Yellow", main: "#f7d200" },
];

const LS_SOUND_KEY = "jakitowers_sound_enabled";

export const SettingsModal = ({
  isOpen,
  onClose,
  soundEnabled,
  setSoundEnabled,
}: SettingsModalProps) => {

  const handleColorChange = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rgb = `${r}, ${g}, ${b}`;
    document.documentElement.style.setProperty("--accent-main", hex);
    document.documentElement.style.setProperty("--accent-glow", `rgba(${rgb}, 0.4)`);
    document.documentElement.style.setProperty("--accent-glow-strong", `rgba(${rgb}, 0.8)`);
    localStorage.setItem("selected-accent", hex);
    localStorage.setItem("selected-rgb", rgb);
  };

  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try { localStorage.setItem(LS_SOUND_KEY, String(next)); } catch { /* ignore */ }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/97"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden max-md:p-6" 
          >
            <div
              className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full pointer-events-none opacity-20"
              style={{ backgroundColor: "var(--accent-main)" }}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-8 max-md:mb-6"> {/* mobile fix */}
              <h2 className="text-2xl font-black italic tracking-tighter text-white max-md:text-xl">USTAWIENIA</h2> {/* mobile fix */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white max-md:p-3" 
              >
                <X size={20} className="max-md:w-5 max-md:h-5" /> {/* mobile fix */}
              </button>
            </div>

            <div className="space-y-8">

              {/* Kolor strony */}
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] block mb-4 max-md:mb-3 max-md:text-[9px]"> {/* mobile fix */}
                  KOLOR STRONY
                </label>
                <div className="grid grid-cols-8 gap-3 max-md:gap-2"> {/* mobile fix */}
                  {accentColors.map((color) => (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleColorChange(color.main)}
                      className="w-8 h-8 rounded-full border-2 border-white/10 transition-all hover:border-white/40 relative group max-md:w-7 max-md:h-7" 
                      style={{ backgroundColor: color.main }}
                    >
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap max-md:-top-7 max-md:text-[7px]"> {/* mobile fix */}
                        {color.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-white/5" />

              {/* Efekty dźwiękowe */}
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] block mb-4 max-md:mb-3 max-md:text-[9px]"> {/* mobile fix */}
                  EFEKTY DŹWIĘKOWE
                </label>
                <button
                  onClick={handleSoundToggle}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 max-md:px-4 max-md:py-3 ${ /* mobile fix */
                    soundEnabled
                      ? "border-accent/40 bg-accent/10"
                      : "border-white/10 bg-white/3 hover:bg-white/6"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {soundEnabled
                      ? <Volume2 size={18} style={{ color: "var(--accent-main)" }} className="max-md:w-5 max-md:h-5" /> /* mobile fix */
                      : <VolumeX size={18} className="text-zinc-500 max-md:w-5 max-md:h-5" /> /* mobile fix */
                    }
                    <div className="text-left">
                      <p className={`text-sm font-bold max-md:text-xs ${soundEnabled ? "text-white" : "text-zinc-400"}`}> {/* mobile fix */}
                        {soundEnabled ? "Dźwięki włączone" : "Dźwięki wyłączone"}
                      </p>
                      <p className="text-[10px] text-zinc-600 mt-0.5 max-md:text-[9px]"> {/* mobile fix */}
                        Kliknięcia, akcje, powiadomienia
                      </p>
                    </div>
                  </div>

                  {/* Toggle pill */}
                  <div className={`w-11 h-6 rounded-full transition-all duration-300 relative max-md:w-10 max-md:h-5 ${ /* mobile fix */
                    soundEnabled ? "bg-accent" : "bg-zinc-700"
                  }`}
                    style={soundEnabled ? { backgroundColor: "var(--accent-main)" } : {}}
                  >
                    <motion.div
                      animate={{ x: soundEnabled ? 25 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow max-md:w-3 max-md:h-3 max-md:top-1" /* mobile fix */
                    />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};