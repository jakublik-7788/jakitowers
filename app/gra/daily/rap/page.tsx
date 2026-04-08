import { Metadata } from 'next';
import RapDailyClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: 'RAP',
  description: 'Codziennie nowy polski rapowy hit. Posłuchaj fragmentu, i odgadnij tytuł!',
  openGraph: {
    title: 'Codzienny Rap – Jaki To Wers',
    description: 'Codziennie nowy utwór z polskiego rapu. Sprawdź swoją wiedzę i rywalizuj ze znajomymi.',
    url: 'https://jakitowers.pl/gra/daily/rap',
    type: 'website',
  },
  alternates: {
    canonical: 'https://jakitowers.pl/gra/daily/rap',
  },
};

export default function RapDailyPage() {
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <h1>Codzienny Rap – Jaki To Wers</h1>
        <p>
          Każdego dnia nowy rapowy hit. Posłuchaj krótkiego fragmentu i odgadnij 
          tytuł oraz wykonawcę. Masz 5 prób – każda błędna odsłania kolejny fragment tekstu.
        </p>
      </div>
      <RapDailyClientWrapper />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "Jaki To Wers – Rap Daily",
            "description": "Codzienna gra polegająca na odgadywaniu polskich piosenek rapowych po fragmencie.",
            "url": "https://jakitowers.pl/gra/daily/rap",
            "gamePlatform": "Web Browser",
            "numberOfPlayers": 1,
            "gameMode": "Single player",
            "applicationCategory": "Game",
            "operatingSystem": "Any",
          }),
        }}
      />
    </>
  );
}