export interface Word {
  text: string;
  start: number;
  end: number;
}

export interface LyricLine {
  lineIndex: number;
  words: Word[];
}

export interface Song {
  id: number;
  day: number;               // dla daily
  title: string;             // do odgadnięcia (nazwa filmu/gry/serialu)
  artist?: string;           // opcjonalny – dla soundtracków może być pusty
  audioSrc?: string;         // opcjonalny – pełny plik audio (dla trybu lyrics)
  youtubeId?: string;        // opcjonalny – ID YouTube (dla trybu lyrics)
  imageUrl?: string;         // URL obrazka (plakat, logo) – wyświetlany po odgadnięciu
  fullAudioSrc?: string;     // pełny plik audio – odtwarzany po odgadnięciu
  hint1?: string;            // rodzaj: "Film" | "Serial" | "Gra"
  hint2?: string;            // gatunek: "Horror", "Przygodowy" itp.
  hint3?: string;            // rok wydania: "2010"
  hint4?: string;            // reżyser/studio: "Christopher Nolan"     
  lyrics: LyricLine[];       // dla trybu lyrics; dla soundtracków pusta tablica
  platforms?: {
    spotify?: string;
    appleMusic?: string;
    soundcloud?: string;
    tidal?: string;
  };
  clips?: {                  // dla trybu soundtrack – klipy o różnej długości
    1: string;
    3: string;
    5: string;
    10: string;
    15: string;
  };
}

export interface SongSuggestion {
  title: string;
  artist: string;
}