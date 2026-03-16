"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isPressed, setIsPressed] = useState(false);

  // 1. RAW COORDINATES - bezpośrednie wartości
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. OGON (Trail) - fizyka dla płynności
  const trailX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.8 });
  const trailY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999]">
      {/* 1. OGON - reaguje na kliknięcie lekkim powiększeniem poświaty */}
      <motion.div
        className="absolute w-5 h-5 rounded-full mix-blend-screen opacity-60"
        animate={{
          scale: isPressed ? 1.5 : 1,
        }}
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, var(--accent-main) 0%, transparent 80%)",
          boxShadow: "0 0 20px var(--accent-main)",
        }}
      />

      {/* 2. GŁÓWNA KROPKA - reaguje na kliknięcie zmniejszeniem (efekt wciśnięcia) */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-white rounded-full z-10"
        animate={{
          scale: isPressed ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          x: mouseX, 
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 10px white",
        }}
      />
    </div>
  );
};