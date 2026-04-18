"use client";

import { useEffect, useState } from "react";
import { CustomCursor } from "./CustomCursor";

const LS_CURSOR_KEY = "jakitowers_custom_cursor";

export const ClientCursorWrapper = () => {
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
    const handler = (e: CustomEvent) => setCursorEnabled(e.detail);
    window.addEventListener("cursorChange", handler as EventListener);
    return () =>
      window.removeEventListener("cursorChange", handler as EventListener);
  }, []);

  if (!cursorEnabled) return null;
  return <CustomCursor />;
};
