import { Metadata, Viewport } from 'next';
import HomeClientWrapper from '@/app/components/HomeClientWrapper';

// Metadane dla strony głównej
export const metadata: Metadata = {
  metadataBase: new URL('https://jakitowers.pl'),
  title: {
    default: "Jaki To Wers - Codzienna gra muzyczna",
    template: "%s | Jaki To Wers",
  },
  description: "Jaki To Wers - Codzienna muzyczna gra onlina. Zgaduj utwór z rapu, polskich klasyków oraz słynnych soundtracków.",
  openGraph: {
    title: "Jaki To Wers - Codzienna gra muzyczna",
    description: "Jaki To Wers - Codzienna muzyczna gra onlina. Zgaduj utwór z rapu, polskich klasyków oraz słynnych soundtracków.",
    url: "https://jakitowers.pl",
    siteName: "JAKITOWERS",
    locale: "pl_PL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://jakitowers.pl',
  },
  keywords: "jaki to wers, jakitowers, gra muzyczna, zgadnij piosenkę, polski rap quiz, codzienna gra, rapdle",
  authors: [{ name: "JAKITOWERS" }],
  creator: "JAKITOWERS",
  publisher: "JAKITOWERS",
  category: "game",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function HomePage() {
  return (
    <>
      {/* Tekst SEO widoczny tylko dla robotów */}
      <div className="sr-only" aria-hidden="true">
        <h1>Jaki To Wers – Codzienna gra muzyczna</h1>
        <p>
          Jaki To Wers to codzienna gra polegająca na odgadywaniu piosenek. 
          Każdego dnia o północy pojawia się nowy fragment utworu z polskiego rapu, 
          klasyków lub ścieżki dźwiękowej. Masz 5 prób – sprawdź swoją wiedzę muzyczną!
        </p>
        <h2>Tryby gry</h2>
        <ul>
          <li>RAP – codzienny challenge z polskim rapem</li>
          <li>KLASYKI – codzienny challenge z polskimi klasykami</li>
          <li>SOUNDTRACKI – odgadnij tytuł filmu/serialu/gry po fragmencie</li>
          <li>NON-LIMIT – nielimitowana gra w trzech kategoriach</li>
        </ul>
      </div>

      <HomeClientWrapper />

      {/* Structured Data dla strony głównej */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "sameAs": [
  "https://www.instagram.com/jakitowers_/",
  "https://www.tiktok.com/@jakitowers_/"
],
            "name": "Jaki To Wers",
            "url": "https://jakitowers.pl",
            "description": "Codzienna gra muzyczna – odgadnij piosenkę po fragmencie.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://jakitowers.pl/gra/daily/rap?day={day}",
              "query-input": "required name=day"
            },
            "inLanguage": "pl-PL",
            "creator": {
              "@type": "Organization",
              "name": "JAKITOWERS"
            }
          })
        }}
      />
    </>
  );
}