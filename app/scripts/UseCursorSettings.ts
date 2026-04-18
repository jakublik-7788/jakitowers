"use client";

import { useState, useEffect } from "react";

const LS_CURSOR_KEY = "jakitowers_custom_cursor";

export const useCursorSetting = () => {
  const [cursorEnabled, setCursorEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem(LS_CURSOR_KEY);
      if (saved !== null) return saved !== "false"; // jeśli user już wybrał → szanuj wybór
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      return !isMobile; // domyślnie: mobile → wyłączony, desktop → włączony
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!cursorEnabled) {
      document.body.classList.add("cursor-default-mode");
    } else {
      document.body.classList.remove("cursor-default-mode");
    }
  }, [cursorEnabled]);

  const setCursor = (val: boolean) => {
    setCursorEnabled(val);
    try {
      localStorage.setItem(LS_CURSOR_KEY, String(val));
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("cursorChange", { detail: val }));
  };

  return { cursorEnabled, setCursorEnabled: setCursor };
};
