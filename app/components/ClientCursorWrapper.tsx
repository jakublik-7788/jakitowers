"use client";

import { useState, useEffect } from "react";
import { CustomCursor } from "./CustomCursor";

export const ClientCursorWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return !isMobile ? <CustomCursor /> : null;
};