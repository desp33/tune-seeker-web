// Mock Made For You data service
import { MadeForYouCategory, MadeForYouPlaylist, MadeForYouTrack } from "@/types/madeForYou";

// Define mock Made For You categories with descriptions
const madeForYouCategories: MadeForYouCategory[] = [
  { 
    id: 'mfy1', 
    title: 'Your Daily Mix', 
    slug: 'daily-mix',
    description: 'Fresh songs customized to your taste, updated daily'
  },
  { 
    id: 'mfy2', 
    title: 'Weekly Mix', 
    slug: 'weekly-mix',
    description: 'New recommendations refreshed each week based on your listening habits'
  },
  { 
    id: 'mfy3', 
    title: 'New Releases', 
    slug: 'new-releases',
    description: 'The latest tracks from artists you follow and might enjoy'
  },
  { 
    id: 'mfy4', 
    title: 'Favorite Artists', 
    slug: 'favorite-artists',
    description: 'Top tracks and recommendations from your most-played artists'
  },
  { 
    id: 'mfy5', 
    title: 'On Repeat', 
    slug: 'on-repeat',
    description: 'Songs you\'ve been playing on loop recently'
  },
];

// Mock playlists data
const madeForYouPlaylists: MadeForYouPlaylist[] = [
  {
    id: 'mix1',
    title: 'Daily Mix 1',
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop',
    description: 'Pop and indie hits customized for your taste',
    trackCount: 25,
    duration: '1h 25min',
    categoryIds: ['mfy1', 'mfy5'],
    createdDate: '2025-05-20'
  },
  {
    id: 'mix2',
    title: 'Daily Mix 2',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop',
    description: 'Hip hop and R&B tracks selected for you',
    trackCount: 22,
    duration: '1h 18min',
    categoryIds: ['mfy1'],
    createdDate: '2025-05-20'
  },
  {
    id: 'mix3',
    title: 'Weekly Discovery',
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop',
    description: 'New music we think you\'ll love based on your recent listening',
    trackCount: 30,
    duration: '1h 45min',
    categoryIds: ['mfy2', 'mfy3'],
    createdDate: '2025-05-15'
  },
  {
    id: 'mix4',
    title: 'New From Your Artists',
    coverArt: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop',
    description: 'Latest releases from artists you follow',
    trackCount: 18,
    duration: '56min',
    categoryIds: ['mfy3', 'mfy4'],
    createdDate: '2025-05-18'
  },
  {
    id: 'mix5',
    title: 'Your Top 2025',
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop',
    description: 'The songs you\'ve been loving this year so far',
    trackCount: 50,
    duration: '2h 40min',
    categoryIds: ['mfy5'],
    createdDate: '2025-05-01'
  },
  {
    id: 'mix6',
    title: 'Throwback Mix',
    coverArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=500&auto=format&fit=crop',
    description: 'Songs from your past that you might want to revisit',
    trackCount: 35,
    duration: '1h 52min',
    categoryIds: ['mfy4', 'mfy5'],
    createdDate: '2025-05-10'
  },
  {
    id: 'mix7',
    title: 'Artist Focus: Your Favorite',
    coverArt: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=500&auto=format&fit=crop',
    description: 'Deep dive into your most-played artist this month',
    trackCount: 20,
    duration: '1h 12min',
    categoryIds: ['mfy4'],
    createdDate: '2025-05-12'
  },
  {
    id: 'mix8',
    title: 'Fresh Finds',
    coverArt: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=500&auto=format&fit=crop',
    description: 'Emerging tracks from artists you might enjoy',
    trackCount: 28,
    duration: '1h 32min',
    categoryIds: ['mfy2', 'mfy3'],
    createdDate: '2025-05-17'
  },
];

// Mock tracks data
const madeForYouTracks: MadeForYouTrack[] = [
  {
    id: 'track1',
    playlistId: 'mix1',
    title: 'Summer Breeze',
    artist: 'Aurora Nights',
    album: 'Sunset Dreams',
    duration: '3:45',
    releaseDate: '2025-04-15',
    playCount: 4250
  },
  {
    id: 'track2',
    playlistId: 'mix1',
    title: 'Electric Feels',
    artist: 'Pulse Wave',
    album: 'Neon Sky',
    duration: '4:12',
    releaseDate: '2025-03-28',
    playCount: 3820
  },
  {
    id: 'track3',
    playlistId: 'mix1',
    title: 'Midnight Glow',
    artist: 'Luna Park',
    album: 'Starlight',
    duration: '3:28',
    releaseDate: '2025-05-10',
    playCount: 2980
  },
  {
    id: 'track4',
    playlistId: 'mix2',
    title: 'Urban Flow',
    artist: 'City Beats',
    album: 'Downtown',
    duration: '3:55',
    releaseDate: '2025-04-02',
    playCount: 5670
  },
  {
    id: 'track5',
    playlistId: 'mix3',
    title: 'New Horizons',
    artist: 'Skyward',
    album: 'Elevation',
    duration: '4:20',
    releaseDate: '2025-05-08',
    playCount: 3240
  },
];

// Functions to retrieve Made For You data
export const getAllMadeForYouCategories = (): MadeForYouCategory[] => {
  return madeForYouCategories;
};

export const getMadeForYouCategoryBySlug = (slug: string): MadeForYouCategory | undefined => {
  return madeForYouCategories.find(category => category.slug === slug);
};

export const getPlaylistsByCategory = (categoryId: string): MadeForYouPlaylist[] => {
  return madeForYouPlaylists.filter(playlist => playlist.categoryIds.includes(categoryId));
};

export const getPlaylistById = (id: string): MadeForYouPlaylist | undefined => {
  return madeForYouPlaylists.find(playlist => playlist.id === id);
};

export const getPlaylistTracks = (playlistId: string): MadeForYouTrack[] => {
  return madeForYouTracks.filter(track => track.playlistId === playlistId);
};

// Get featured playlists (for home page)
export const getFeaturedPlaylists = (): MadeForYouPlaylist[] => {
  return madeForYouPlaylists.slice(0, 4);
};

// Get playlists for a specific category slug
export const getPlaylistsByCategorySlug = (slug: string): MadeForYouPlaylist[] => {
  const category = madeForYouCategories.find(cat => cat.slug === slug);
  if (!category) return [];
  
  return getPlaylistsByCategory(category.id);
};

export { madeForYouCategories };