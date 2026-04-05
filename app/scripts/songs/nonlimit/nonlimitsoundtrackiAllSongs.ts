// scripts/songs/nonlimit/nonlimitSoundtrackiAllSongs.ts
import { SongSuggestion } from "@/app/types/song";
import { nonlimitSoundtrackiSongs } from "./nonlimitsoundtrackiSongs";

export const nonlimitSoundtrackiAllSongs: SongSuggestion[] = nonlimitSoundtrackiSongs.map((song) => ({
  title: song.title,
  artist: "", // w soundtrackach nie używamy artysty
}));