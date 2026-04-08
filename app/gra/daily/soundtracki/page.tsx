import { Metadata } from 'next';
import SoundtrackiDailyClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: 'SOUNDTRACKI',
  description: 'Codziennie nowa ścieżka dźwiękowa z filmu, serialu lub gry. Posłuchaj fragementu i odgadnij tytuł!',
  openGraph: {
    title: 'Codzienne Soundtracki – Jaki To Wers',
    description: 'Codziennie nowy soundtrack do odgadnięcia. Sprawdź, czy znasz muzykę z filmów, seriali i gier.',
    url: 'https://jakitowers.pl/gra/daily/soundtracki',
    type: 'website',
  },
  alternates: {
    canonical: 'https://jakitowers.pl/gra/daily/soundtracki',
  },
};

export default function SoundtrackiDailyPage() {
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <h1>Codzienne Soundtracki – Jaki To Wers</h1>
        <p>
          Codziennie nowy fragment ścieżki dźwiękowej. Masz 5 prób – każda odsłania 
          dłuższy fragment (1s → 3s → 5s → 10s → 15s) oraz podpowiedź. Odgadnij tytuł filmu, serialu lub gry!
        </p>
      </div>
      <SoundtrackiDailyClientWrapper />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "Jaki To Wers – Soundtracki Daily",
            "description": "Codzienna gra polegająca na odgadywaniu soundtracków z filmów, seriali i gier.",
            "url": "https://jakitowers.pl/gra/daily/soundtracki",
            "gamePlatform": "Web Browser",
            "numberOfPlayers": 1,
            "gameMode": "Single player",
            "applicationCategory": "Game",
          }),
        }}
      />
    </>
  );
}