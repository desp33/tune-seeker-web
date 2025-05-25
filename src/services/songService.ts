// This is an updated version of the songService with added functionality for instruments

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  duration: string;
  audioUrl: string;
  genreId?: string;
  instrumentIds?: string[];
}

export interface Playlist {
  id: string;
  name: string;
  coverArt: string;
  slug: string;
  songIds: string[];
}

// Sample data
const songs: Song[] = [
  {
    id: '1',
    title: 'Mountain High',
    artist: 'Echo Valley',
    album: 'Nature\'s Call',
    coverArt: '/api/placeholder/400/400',
    duration: '3:45',
    audioUrl: '',
    genreId: 'g1', // Jazz
    instrumentIds: ['i1', 'i3'] // Guitar, Drums
  },
  {
    id: '2',
    title: 'Urban Jungle',
    artist: 'City Lights',
    album: 'Downtown',
    coverArt: '/api/placeholder/400/400',
    duration: '4:20',
    audioUrl: '',
    genreId: 'g2', // Hip Hop
    instrumentIds: ['i2', 'i3'] // Piano, Drums
  },
  {
    id: '3',
    title: 'Sunset Dreams',
    artist: 'Horizon',
    album: 'Evening Glow',
    coverArt: '/api/placeholder/400/400',
    duration: '5:12',
    audioUrl: '',
    genreId: 'g3', // R&B
    instrumentIds: ['i1', 'i5'] // Guitar, Vocals
  },
  {
    id: '4',
    title: 'Acoustic Memories',
    artist: 'Wood & Strings',
    album: 'Unplugged',
    coverArt: '/api/placeholder/400/400',
    duration: '3:30',
    audioUrl: '',
    genreId: 'g5', // Folk
    instrumentIds: ['i1'] // Guitar
  },
  {
    id: '5',
    title: 'Rainy Day',
    artist: 'Weather Patterns',
    album: 'Seasons',
    coverArt: '/api/placeholder/400/400',
    duration: '4:05',
    audioUrl: '',
    genreId: 'g1', // Jazz
    instrumentIds: ['i2', 'i4'] // Piano, Flute
  },
  {
    id: '6',
    title: 'Electric Vibes',
    artist: 'Power Surge',
    album: 'Voltage',
    coverArt: '/api/placeholder/400/400',
    duration: '3:50',
    audioUrl: '',
    genreId: 'g6', // Rock
    instrumentIds: ['i1', 'i3'] // Guitar, Drums
  },
  {
    id: '7',
    title: 'Morning Light',
    artist: 'Dawn Chorus',
    album: 'First Light',
    coverArt: '/api/placeholder/400/400',
    duration: '4:15',
    audioUrl: '',
    genreId: 'g4', // Country
    instrumentIds: ['i1', 'i5'] // Guitar, Vocals
  },
  {
    id: '8',
    title: 'Digital Frontier',
    artist: 'Tech Beats',
    album: 'Binary',
    coverArt: '/api/placeholder/400/400',
    duration: '5:30',
    audioUrl: '',
    genreId: 'g2', // Hip Hop
    instrumentIds: ['i2', 'i3'] // Piano, Drums
  },
  {
    id: '9',
    title: 'Ocean Breeze',
    artist: 'Coastal Sounds',
    album: 'Seaside',
    coverArt: '/api/placeholder/400/400',
    duration: '3:40',
    audioUrl: '',
    genreId: 'g1', // Jazz
    instrumentIds: ['i4', 'i5'] // Flute, Vocals
  },
  {
    id: '10',
    title: 'Desert Rose',
    artist: 'Sand Dunes',
    album: 'Mirage',
    coverArt: '/api/placeholder/400/400',
    duration: '4:50',
    audioUrl: '',
    genreId: 'g5', // Folk
    instrumentIds: ['i6', 'i5'] // Sitar, Vocals
  }
];

const playlists: Playlist[] = [
  {
    id: 'pl1',
    name: 'Chill Vibes',
    coverArt: '/api/placeholder/400/400',
    slug: 'chill-vibes',
    songIds: ['1', '3', '5', '9']
  },
  {
    id: 'pl2',
    name: 'Top Hits',
    coverArt: '/api/placeholder/400/400',
    slug: 'top-hits',
    songIds: ['2', '6', '8']
  },
  {
    id: 'pl3',
    name: 'Workout Mix',
    coverArt: '/api/placeholder/400/400',
    slug: 'workout-mix',
    songIds: ['2', '6', '8', '4']
  },
  {
    id: 'pl4',
    name: 'Focus Flow',
    coverArt: '/api/placeholder/400/400',
    slug: 'focus-flow',
    songIds: ['1', '5', '9', '10']
  },
];

// Service functions
export const getAllSongs = (): Song[] => {
  return songs;
}

export const getSongById = (id: string): Song | undefined => {
  return songs.find(song => song.id === id);
}

export const getSongsByGenre = (genreId: string): Song[] => {
  return songs.filter(song => song.genreId === genreId);
}

export const getSongsByInstrument = (instrumentId: string): Song[] => {
  return songs.filter(song => song.instrumentIds?.includes(instrumentId));
}

export const getRecommendedSongs = (): Song[] => {
  // For demo purposes, just return a subset of songs
  return songs.slice(0, 4);
}

export const searchSongs = (query: string): Song[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase().trim();
  
  return songs.filter(song => 
    song.title.toLowerCase().includes(lowercaseQuery) ||
    song.artist.toLowerCase().includes(lowercaseQuery) ||
    song.album.toLowerCase().includes(lowercaseQuery)
  );
}

export const getAllPlaylists = (): Playlist[] => {
  return playlists;
}

export const getPlaylistBySlug = (slug: string): Playlist | undefined => {
  return playlists.find(playlist => playlist.slug === slug);
}

export const getPlaylistById = (id: string): Playlist | undefined => {
  return playlists.find(playlist => playlist.id === id);
}

export const getSongsFromPlaylist = (playlistId: string): Song[] => {
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return [];
  
  return playlist.songIds
    .map(songId => songs.find(song => song.id === songId))
    .filter((song): song is Song => song !== undefined);
}

export const getSuggestedSongsForPlaylist = (playlistId: string): Song[] => {
  // This would typically use some recommendation logic
  // For demo purposes, just return songs not in the playlist
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return [];
  
  return songs.filter(song => !playlist.songIds.includes(song.id)).slice(0, 3);
}

export const getRelatedSongsByGenre = (genreId: string): Song[] => {
  // Get songs of the same genre
  return songs.filter(song => song.genreId === genreId).slice(0, 4);
}