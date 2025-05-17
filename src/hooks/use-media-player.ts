import { create } from 'zustand';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
}

interface MediaPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
}

export const useMediaPlayer = create<MediaPlayerState>((set) => ({
  currentSong: null,
  isPlaying: false,
  playSong: (song) => set({ currentSong: song, isPlaying: true }),
  pauseSong: () => set({ isPlaying: false }),
}));