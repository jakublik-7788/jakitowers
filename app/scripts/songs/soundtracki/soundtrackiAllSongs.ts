import { SongSuggestion } from "@/app/types/song";
import { soundtrackiSongs } from "./soundtrackiSongs";

export const soundtrackiAllSongs: SongSuggestion[] = soundtrackiSongs.map(song => ({
  title: song.title,
  artist: "",   // w trybie soundtracku nie używamy artysty
}));