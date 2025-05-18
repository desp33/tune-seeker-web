
import { create } from 'zustand';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  album?: string;
  duration?: string;
  genreId?: string;
  instrumentId?: string;
}

interface MediaPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  togglePlayback: (song: Song) => void;
}

export const useMediaPlayer = create<MediaPlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  playSong: (song) => set({ currentSong: song, isPlaying: true }),
  pauseSong: () => set({ isPlaying: false }),
  resumeSong: () => set({ isPlaying: true }),
  togglePlayback: (song) => {
    const { currentSong, isPlaying } = get();
    
    // If same song, toggle play state
    if (currentSong && currentSong.id === song.id) {
      set({ isPlaying: !isPlaying });
    } else {
      // New song, play it
      set({ currentSong: song, isPlaying: true });
    }
  }
}));
