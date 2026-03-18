// app/components/Logo.tsx
"use client";

import { motion } from "framer-motion";

interface LogoProps {
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  currentDay?: number;
  totalDays?: number;
}

export const Logo = ({
  isHovered,
  setIsHovered,
  onPrevDay,
  onNextDay,
  currentDay = 1,
  totalDays = 100,
}: LogoProps) => {
  return (
    <div className="flex flex-col items-center w-full px-4 max-md:px-2">
      <motion.button
        onClick={() => window.location.reload()}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.99 }}
      >
        <h1 className="text-8xl max-md:text-5xl font-[1000] italic tracking-tighter uppercase select-none leading-none">
          JAKI
          <span className="text-accent not-italic">TO</span>
          WERS
        </h1>

        <div className="relative h-0.5 w-full mt-1 flex justify-center">
          <motion.div
            className="absolute h-full bg-gradient-to-l from-accent to-transparent"
            initial={{ width: "0%", opacity: 0 }}
            animate={
              isHovered
                ? {
                    width: "50%",
                    opacity: 0.6,
                  }
                : {
                    width: "0%",
                    opacity: 0,
                  }
            }
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            style={{
              right: "50%",
            }}
          />

          <motion.div
            className="absolute h-full bg-gradient-to-r from-accent to-transparent"
            initial={{ width: "0%", opacity: 0 }}
            animate={
              isHovered
                ? {
                    width: "50%",
                    opacity: 0.6,
                  }
                : {
                    width: "0%",
                    opacity: 0,
                  }
            }
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            style={{
              left: "50%",
            }}
          />
        </div>
      </motion.button>

      {onPrevDay && onNextDay && currentDay && totalDays && (
        <div className="flex items-center justify-center gap-4 max-md:gap-3 mt-4 max-md:mt-2 w-full">
          <motion.button
            whileHover={{ x: -3, color: "var(--accent-main)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevDay}
            disabled={currentDay === 1}
            className={`text-zinc-600 transition-colors ${
              currentDay === 1 ? "opacity-30 cursor-not-allowed" : "hover:text-accent"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="max-md:w-5 max-md:h-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </motion.button>

          <div className="bg-zinc-900/50 px-6 max-md:px-4 py-1 rounded-full border border-white/5 shadow-inner">
            <span className="text-accent font-black tracking-tighter text-lg max-md:text-base drop-shadow-[0_0_8px_rgba(188,19,254,0.5)]">
              #{currentDay}
            </span>
          </div>

          <motion.button
            whileHover={{ x: 3, color: "var(--accent-main)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onNextDay}
            disabled={currentDay === totalDays}
            className={`text-zinc-600 transition-colors ${
              currentDay === totalDays ? "opacity-30 cursor-not-allowed" : "hover:text-accent"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="max-md:w-5 max-md:h-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      )}
    </div>
  );
};