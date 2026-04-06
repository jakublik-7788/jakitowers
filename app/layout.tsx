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
  metadataBase: new URL('https://jakitowers.pl'),
  title: "JAKI TO WERS – Codzienna gra muzyczna!",
  description: "Zmierz się z codziennymi wyzwaniami muzycznymi! Nowy utwór dnia z polskiego rapu, klasyków oraz soundtrack zawsze o północy.",
  openGraph: {
    title: "JAKI TO WERS – codzienna gra muzyczna",
    description: "Tryb dzienny oraz tryb nonlimit!",
  },
  robots: "index, follow",
  keywords: "aura, jaki to wers, jakitowers, cotozahit, co to za hit, rapdle, muzyczna gra, polski rap, zgadnij piosenkę, daily challenge, rap, hiphop, hip hop, music game, cotozahit, 100hitow, 100 hitow, hitow, hit",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var c = localStorage.getItem('jakitowers_accent_color');
                if (c && /^#[0-9a-fA-F]{6}$/.test(c)) {
                  document.documentElement.style.setProperty('--accent-main', c);
                  var r = parseInt(c.slice(1,3),16), g = parseInt(c.slice(3,5),16), b = parseInt(c.slice(5,7),16);
                  document.documentElement.style.setProperty('--accent-glow', 'rgba('+r+','+g+','+b+',0.4)');
                  document.documentElement.style.setProperty('--accent-glow-strong', 'rgba('+r+','+g+','+b+',0.2)');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
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