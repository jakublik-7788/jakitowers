"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { // Zmieniono na setInterval dla płynności
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          onLoadingComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      {/* Animowane tło - używa zmiennej CSS */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, var(--accent-main) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, var(--accent-main) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, var(--accent-main) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, var(--accent-main) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, var(--accent-main) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mb-12 h-16 w-16">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute text-6xl text-accent"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              x: [-50, 0, 50],
              y: [-20, -40, -20],
            }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          >
            {i === 0 ? "♪" : i === 1 ? "♫" : "♩"}
          </motion.div>
        ))}
      </div>

      <motion.h1
        className="text-7xl md:text-8xl font-[1000] italic tracking-tighter uppercase mb-8 text-white"
        style={{ filter: "drop-shadow(0 0 20px var(--accent-glow))" }}
      >
        <span>JAKI</span>
        <span className="text-accent not-italic">TO</span>
        <span>WERS</span>
      </motion.h1>

      <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-accent"
          style={{ width: `${progress}%`, boxShadow: "0 0 10px var(--accent-glow)" }}
        />
      </div>

      <p className="text-zinc-400 font-mono text-sm">{progress}%</p>
    </motion.div>
  );
};