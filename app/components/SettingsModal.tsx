"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const accentColors = [
  { name: "Purple", main: "#bc13fe" },
  { name: "Pink", main: "#fd51c4" },
  { name: "Blue",   main: "#3b82f6" },
  { name: "Cyan",   main: "#06b6d4" },
  { name: "Green",  main: "#22c55e" },
  { name: "Red",    main: "#f33131" },
  { name: "Orange", main: "#f59e0b" },
  { name: "Yellow", main: "#f7d200" },
];

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  
  const handleColorChange = (hex: string) => {
    // Konwersja HEX na RGB, aby zachować czystość renderowania cieni
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rgb = `${r}, ${g}, ${b}`;

    // Ustawiamy 3 zmienne dla różnych zastosowań
    document.documentElement.style.setProperty("--accent-main", hex);
    document.documentElement.style.setProperty("--accent-glow", `rgba(${rgb}, 0.4)`);
    document.documentElement.style.setProperty("--accent-glow-strong", `rgba(${rgb}, 0.8)`);
    
    localStorage.setItem("selected-accent", hex);
    localStorage.setItem("selected-rgb", rgb);
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
          >
            {/* Dekoracyjny blask w tle modalu - teraz używa zmiennej */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full pointer-events-none opacity-20" 
              style={{ backgroundColor: "var(--accent-main)" }} 
            />

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic tracking-tighter text-white">USTAWIENIA</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] block mb-4">
                  KOLOR STRONY
                </label>
                <div className="grid grid-cols-8 gap-3">
                  {accentColors.map((color) => (
                    <motion.button
                      key={color.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleColorChange(color.main)}
                      className="w-8 h-8 rounded-full border-2 border-white/10 transition-all hover:border-white/30 relative group"
                      style={{ backgroundColor: color.main }}
                    >
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {color.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                 <p className="text-[10px] text-zinc-600 text-center italic">
                    More settings coming soon...
                 </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};