import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "./components/CustomCursor"; // Upewnij się, że ścieżka jest poprawna

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon Music Quiz",
  description: "Zgadnij hit w neonowym klimacie",
};

// Pomocniczy komponent dla poświaty tła (Ambient Glow)
const AmbientGlow = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div 
      className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.15] transition-colors duration-1000"
      style={{ backgroundColor: 'var(--accent-main)' }}
    />
    <div 
      className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.15] transition-colors duration-1000"
      style={{ backgroundColor: 'var(--accent-main)' }}
    />
  </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-background 
          text-foreground 
          min-h-screen 
          selection:bg-accent/30
        `}
      >
        {/* Poświata tła zmieniająca się z kolorem akcentu */}
        <AmbientGlow />
        
        {/* Twój interaktywny kursor */}

        {/* Treść strony */}
        <main className="relative z-10">
          {children}
        </main>
        <CustomCursor />
      </body>
    </html>
  );
}