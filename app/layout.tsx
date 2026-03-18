import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { CustomCursor } from "./components/CustomCursor";
import { PreLaunchOverlay } from "./components/PreLaunchOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAKI TO WERS",
  description: "Zgaduj wersy najpopularniejszych rapowych hitów!",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const AmbientGlow = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div
      className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.15] transition-colors duration-1000"
      style={{ backgroundColor: "var(--accent-main)" }}
    />
    <div
      className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.15] transition-colors duration-1000"
      style={{ backgroundColor: "var(--accent-main)" }}
    />
  </div>
);

// Komponent kliencki do warunkowego renderowania kursora
const ClientCursor = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return !isMobile ? <CustomCursor /> : null;
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-background
          text-foreground
          min-h-dvh
          selection:bg-accent/30
        `}
      >
        <AmbientGlow />
        <main className="relative z-10">{children}</main>
        <ClientCursor />
        {/* <PreLaunchOverlay /> */}
      </body>
    </html>
  );
}