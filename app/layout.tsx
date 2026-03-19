import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientCursorWrapper } from "./components/ClientCursorWrapper"; // nowy import
import { PreLaunchOverlay } from "./components/PreLaunchOverlay";
import { Analytics } from "@vercel/analytics/next";

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
        <ClientCursorWrapper /> {/* tutaj używamy wrappera */}
        <PreLaunchOverlay />
        <Analytics />
      </body>
    </html>
  );
}