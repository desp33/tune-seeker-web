
import { Song } from "@/components/SongCard";

// Mock data for our application
const songs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop",
    duration: "3:20",
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    coverArt: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=500&auto=format&fit=crop",
    duration: "3:23",
  },
  {
    id: "3",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
    duration: "3:35",
  },
  {
    id: "4",
    title: "Montero",
    artist: "Lil Nas X",
    album: "Montero",
    coverArt: "https://images.unsplash.com/photo-1598387993441-a364f854c3a1?q=80&w=500&auto=format&fit=crop",
    duration: "2:17",
  },
  {
    id: "5",
    title: "Kiss Me More",
    artist: "Doja Cat ft. SZA",
    album: "Planet Her",
    coverArt: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=500&auto=format&fit=crop",
    duration: "3:29",
  },
  {
    id: "6",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3+: OVER YOU",
    coverArt: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
    duration: "2:21",
  },
  {
    id: "7",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "Sour",
    coverArt: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=500&auto=format&fit=crop",
    duration: "2:58",
  },
  {
    id: "8",
    title: "Bad Habits",
    artist: "Ed Sheeran",
    album: "=",
    coverArt: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500&auto=format&fit=crop",
    duration: "3:51",
  },
];

export const getSongById = (id: string): Song | undefined => {
  return songs.find(song => song.id === id);
};

export const getAllSongs = (): Song[] => {
  return [...songs];
};

export const searchSongs = (query: string): Song[] => {
  const lowercaseQuery = query.toLowerCase();
  return songs.filter(song => 
    song.title.toLowerCase().includes(lowercaseQuery) ||
    song.artist.toLowerCase().includes(lowercaseQuery) ||
    song.album.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRecommendedSongs = (): Song[] => {
  return [...songs].sort(() => 0.5 - Math.random()).slice(0, 6);
};

export const getNewReleases = (): Song[] => {
  return [...songs].sort(() => 0.5 - Math.random()).slice(0, 6);
};

export const getTopCharts = (): Song[] => {
  return [...songs].sort(() => 0.5 - Math.random()).slice(0, 6);
};
