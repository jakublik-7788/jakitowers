import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientCursorWrapper } from "./components/ClientCursorWrapper"; // nowy import
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
  title: "JAKI TO WERS – zgadnij hit po wersach!",
  description: "Codziennie nowy utwór z polskiego rapu – zgadnij tytuł i artystę po fragmentach tekstu. Graj online za darmo! Tryb codzienny oraz tryb bez limitu!",
  openGraph: {
    title: "JAKI TO WERS – codzienna gra muzyczna",
    description: "Zgadnij piosenkę po fragmentach tekstu – codziennie nowy utwór!",
    images: "/jakitowers.png",
  },
  robots: "index, follow",
  keywords: "jaki to wers, jakitowers, cotozahit, co to za hit, rapdle, muzyczna gra, polski rap, zgadnij piosenkę, daily challenge, rap, hiphop, hip hop, music game",
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
        {/* <PreLaunchOverlay /> */}
      </body>
    </html>
  );
}