
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
    genreId: "g3", // R&B
    instrumentId: "piano",
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    coverArt: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=500&auto=format&fit=crop",
    duration: "3:23",
    genreId: "g3", // R&B
    instrumentId: "synthesizer",
  },
  {
    id: "3",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
    duration: "3:35",
    genreId: "g3", // R&B
    instrumentId: "guitar",
  },
  {
    id: "4",
    title: "Montero",
    artist: "Lil Nas X",
    album: "Montero",
    coverArt: "https://images.unsplash.com/photo-1598387993441-a364f854c3a1?q=80&w=500&auto=format&fit=crop",
    duration: "2:17",
    genreId: "g2", // Hip Hop
    instrumentId: "drums",
  },
  {
    id: "5",
    title: "Kiss Me More",
    artist: "Doja Cat ft. SZA",
    album: "Planet Her",
    coverArt: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=500&auto=format&fit=crop",
    duration: "3:29",
    genreId: "g2", // Hip Hop
    instrumentId: "synthesizer",
  },
  {
    id: "6",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3+: OVER YOU",
    coverArt: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
    duration: "2:21",
    genreId: "g3", // R&B
    instrumentId: "guitar",
  },
  {
    id: "7",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "Sour",
    coverArt: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=500&auto=format&fit=crop",
    duration: "2:58",
    genreId: "g6", // Rock
    instrumentId: "drums",
  },
  {
    id: "8",
    title: "Bad Habits",
    artist: "Ed Sheeran",
    album: "=",
    coverArt: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500&auto=format&fit=crop",
    duration: "3:51",
    genreId: "g4", // Country
    instrumentId: "guitar",
  },
];

// Mock playlists data
export interface Playlist {
  id: string;
  name: string;
  coverArt: string;
  songIds: string[];
}

const playlists: Playlist[] = [
  {
    id: "p1",
    name: "Weekend Vibes",
    coverArt: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=500&auto=format&fit=crop",
    songIds: ["1", "3", "6"],
  },
  {
    id: "p2",
    name: "Workout Mix",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop",
    songIds: ["4", "5", "7"],
  },
  {
    id: "p3",
    name: "Chill Session",
    coverArt: "https://images.unsplash.com/photo-1545128485-c400ce7b75d9?q=80&w=500&auto=format&fit=crop",
    songIds: ["2", "8", "3"],
  }
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

// New functions for genres and playlists
export const getSongsByGenre = (genreId: string): Song[] => {
  return songs.filter(song => song.genreId === genreId);
};

export const getRelatedSongsByGenre = (genreId: string): Song[] => {
  return songs.filter(song => song.genreId === genreId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
};

export const getAllPlaylists = (): Playlist[] => {
  return [...playlists];
};

export const getPlaylistById = (playlistId: string): Playlist | undefined => {
  return playlists.find(playlist => playlist.id === playlistId);
};

export const getSongsFromPlaylist = (playlistId: string): Song[] => {
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return [];
  
  return playlist.songIds
    .map(songId => songs.find(song => song.id === songId))
    .filter((song): song is Song => song !== undefined);
};

export const getSuggestedSongsForPlaylist = (playlistId: string): Song[] => {
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return getRecommendedSongs();
  
  // Get the songs in this playlist
  const playlistSongs = getSongsFromPlaylist(playlistId);
  
  // Find genres represented in this playlist
  const playlistGenres = [...new Set(playlistSongs.map(song => song.genreId))];
  
  // Find songs with similar genres that aren't already in the playlist
  return songs
    .filter(song => 
      playlistGenres.includes(song.genreId) && 
      !playlist.songIds.includes(song.id)
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);
};
