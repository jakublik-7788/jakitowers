import { Metadata } from 'next';
import KlasykiDailyClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: 'KLASYKI',
  description: 'Codziennie nowy polski klasyk muzyczny. Posłuchaj fragmentu, i odgadnij tytuł!',
  openGraph: {
    title: 'Codzienne Klasyki – Jaki To Wers',
    description: 'Codziennie nowy klasyk polskiej muzyki. Zgadnij tytuł i artystę w 5 próbach.',
    url: 'https://jakitowers.pl/gra/daily/klasyki',
    type: 'website',
  },
  alternates: {
    canonical: 'https://jakitowers.pl/gra/daily/klasyki',
  },
};

export default function KlasykiDailyPage() {
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <h1>Codzienne Klasyki – Jaki To Wers</h1>
        <p>
          Każdego dnia nowy polski klasyk. Posłuchaj krótkiego fragmentu i odgadnij 
          tytuł oraz wykonawcę. Masz 5 prób – każda błędna odsłania kolejny fragment tekstu.
        </p>
      </div>
      <KlasykiDailyClientWrapper />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "Jaki To Wers – Klasyki Daily",
            "description": "Codzienna gra muzyczna z polskimi klasykami. Odgadnij piosenkę po fragmencie.",
            "url": "https://jakitowers.pl/gra/daily/klasyki",
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