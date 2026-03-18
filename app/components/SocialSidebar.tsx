"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ExternalLink, Music2 } from "lucide-react";

export const SocialSidebar = ({ variant }: { variant?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const accentColor = "var(--accent-main)";

  const socials = [
    { name: "Instagram", icon: Instagram, href: "https://jakitowers.pl" },
    { name: "TikTok", icon: Music2, href: "https://jakitowers.pl" },
    { name: "ExternalLink", icon: ExternalLink, href: "https://jakitowers.pl" },
  ];

  return (
    <motion.div
      key={variant}
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] flex items-center pr-12 cursor-none max-md:hidden"
      style={{ height: "300px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-1.5 rounded-r-full z-20"
        animate={{
          backgroundColor: isHovered ? accentColor : "rgba(255, 255, 255, 0.2)",
          height: isHovered ? "200px" : "128px",
          boxShadow: isHovered ? `0 0 15px ${accentColor}` : "none",
        }}
        transition={{ duration: 0.3 }}
      />

      <AnimatePresence>
        {!isHovered && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 0.4, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            className="absolute left-6 text-[10px] tracking-[0.3em] font-bold uppercase pointer-events-none select-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}
          >
            Socials
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: -20, opacity: 0, scale: 0.95 }}
            animate={{ x: 15, opacity: 1, scale: 1 }}
            exit={{ x: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-4 rounded-[24px] bg-black/60 backdrop-blur-xl border border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col gap-6">
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.3,
                    color: accentColor,
                    filter: `drop-shadow(0 0 10px ${accentColor})`,
                  }}
                  className="text-white/60 transition-all duration-300"
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};