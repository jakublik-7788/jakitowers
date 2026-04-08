import { Metadata } from 'next';
import NonLimitClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: 'Non-Limit',
  description: 'Graj bez limitu w trybach RAP, KLASYKI i SOUNDTRACKI. Losowe piosenki, serie zwycięstw i lokalne rekordy. Nieograniczona zabawa!',
  openGraph: {
    title: 'Jaki To Wers - Non-Limit',
    description: 'Nielimitowana wersja gry – graj ile chcesz, wybierz źródło i bij własne rekordy serii.',
    url: 'https://jakitowers.pl/gra/nonlimit',
    type: 'website',
  },
  alternates: {
    canonical: 'https://jakitowers.pl/gra/nonlimit',
  },
};

export default function NonLimitPage() {
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <h1>Non‑Limit – Nielimitowana gra muzyczna Jaki To Wers</h1>
        <p>
          Wybierz tryb: Rap, Klasyki lub Soundtracki. Graj bez ograniczeń. 
          zdobywaj serie wygranych i poprawiaj swoje wyniki.
        </p>
      </div>
      <NonLimitClientWrapper />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": "Jaki To Wers – Non‑Limit",
            "description": "Nielimitowana wersja gry muzycznej z trzema trybami: Rap, Klasyki, Soundtracki. Losowe utwory, serie zwycięstw.",
            "url": "https://jakitowers.pl/gra/nonlimit",
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