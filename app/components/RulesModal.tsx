"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

const RULES: Record<string, string[]> = {
  "rap-daily": [
    "Codziennie nowa piosenka z polskiego rapu – zawsze o północy.",
    "Kliknij ODTWÓRZ – usłyszysz fragment piosenki.",
    "Masz 5 prób żeby odgadnąć tytuł i artystę.",
    "Każda błędna próba odkrywa kolejny fragment tekstu.",
    "Pomiń próbę jeśli nie wiesz – też zobaczysz nowy fragment.",
    "Wynik oznaczony żółtym kolorem oznacza trafiony wykonawca, ale zły tytuł.",
  ],
  "klasyki-daily": [
    "Codziennie nowy polski klasyk – zawsze o północy.",
    "Kliknij ODTWÓRZ – usłyszysz fragment piosenki.",
    "Masz 5 prób żeby odgadnąć tytuł i artystę.",
    "Każda błędna próba odkrywa kolejny fragment tekstu.",
    "Pomiń próbę jeśli nie wiesz – też zobaczysz nowy fragment.",
    "Wynik oznaczony żółtym kolorem oznacza trafiony wykonawca, ale zły tytuł.",
  ],
  "soundtracki-daily": [
    "Zgaduj nazwę filmu, serialu lub gry z której pochodzi soundtrack.",
    "Codziennie nowa ścieżka dźwiękowa z filmu, serialu lub gry.",
    "Usłyszysz krótki fragment – zacznij od 1 sekundy!",
    "Masz 5 prób żeby odgadnąć tytuł.",
    "Każda błędna próba lub pominięcie odsłania dłuższy fragment.",
    "Kolejne fragmenty: 1s → 3s → 5s → 10s → 15s.",
    "Każda błędna próba odsłania również podpowiedź!",
  ],
  nonlimit: [
    "Graj ile chcesz – losowe piosenki bez limitu.",
    "Wybierz źródło: RAP, KLASYKI lub SOUNDTRACKI.",
    "Dla RAP i KLASYKI mechanika taka sama jak w trybach dziennych.",
    "Dla SOUNDTRACKI odgadnij tytuł po fragmencie audio.",
    "Zbieraj serie wygranych i bij rekordy!",
    "Statystyki sesji resetują się po zamknięciu strony.",
    "Najlepsza seria jest zapisywana lokalnie.",
  ],
};

const TITLES: Record<string, string> = {
  "rap-daily": "RAP – Codzienny Challenge",
  "klasyki-daily": "Klasyki – Codzienny Challenge",
  "soundtracki-daily": "SOUNDTRACKI – Codzienny Challenge",
  nonlimit: "Non-Limit",
};

interface RulesModalProps {
  modeKey: string;
  onClose: () => void;
}

export const RulesModal = ({ modeKey, onClose }: RulesModalProps) => {
  const rules = RULES[modeKey] || [];
  const title = TITLES[modeKey] || "Zasady gry";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 border-2 border-accent/40 rounded-[32px] p-8 max-w-md w-full shadow-[0_0_60px_var(--accent-glow)]"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-accent text-[10px] font-black tracking-[0.3em] uppercase mb-1">
              Zasady gry
            </p>
            <h2 className="text-xl font-[1000] italic uppercase tracking-tight text-white">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3 mb-8">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-xs font-black shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-zinc-300 text-sm leading-relaxed">{rule}</p>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full py-4 bg-accent text-white font-[1000] italic uppercase tracking-widest rounded-2xl shadow-[0_0_20px_var(--accent-glow)] text-sm"
        >
          Rozumiem, gram!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};