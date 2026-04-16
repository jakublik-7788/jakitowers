import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientCursorWrapper } from "./components/ClientCursorWrapper"; // nowy import

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
  title: {
    default: "Jaki To Wers - Codzienna gra muzyczna",
    template: "%s | Jaki To Wers",
  },
  description: "Jaki To Wers - Codzienna muzyczna gra online. Zgaduj utwór z rapu, polskich klasyków oraz słynnych soundtracków.",
  openGraph: {
    title: "Jaki To Wers - Codzienna gra muzyczna",
    description: "Jaki To Wers - Codzienna muzyczna gra onlina. Zgaduj utwór z rapu, polskich klasyków oraz słynnych soundtracków.",
    url: "https://jakitowers.pl",
    siteName: "JAKITOWERS",
    locale: "pl_PL",
    type: "website",
     images: [
      {
        url: "/Logo1.jpg",
        width: 1200,
        height: 630,
        alt: "Jaki To Wers – Codzienna gra muzyczna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaki To Wers - Codzienna gra muzyczna",
    description: "Jaki To Wers - Codzienna muzyczna gra online. Zgaduj utwór z rapu, polskich klasyków oraz słynnych soundtracków.",
    images: ["/LogoTwitter.jpg"],
  },
  robots: "index, follow",
  keywords: "jaki to wers, jakitowers, jaki to wers gra, zgadnij piosenkę, polski rap gra, codzienna gra muzyczna, rapdle, rap quiz, hip hop gra, jaki to wers online, hit, co to za hit, cotozahit, 100hitow, 100 hitow",
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
    // DODAJ suppressHydrationWarning TUTAJ
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var c = localStorage.getItem('jakitowers_accent_color');
                if (c && /^#[0-9a-fA-F]{6}$/.test(c)) {
                  var root = document.documentElement;
                  root.style.setProperty('--accent-main', c);
                  var r = parseInt(c.slice(1,3),16), 
                      g = parseInt(c.slice(3,5),16), 
                      b = parseInt(c.slice(5,7),16);
                  root.style.setProperty('--accent-glow', 'rgba('+r+','+g+','+b+',0.4)');
                  root.style.setProperty('--accent-glow-strong', 'rgba('+r+','+g+','+b+',0.2)');
                  var cur = localStorage.getItem('jakitowers_custom_cursor');
if (cur === 'false') {
  document.body.classList.add('cursor-default-mode');
}
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
        <ClientCursorWrapper />
      </body>
    </html>
  );
}