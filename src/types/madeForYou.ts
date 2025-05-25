// Type definitions for Made For You section
export interface MadeForYouCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface MadeForYouPlaylist {
  id: string;
  title: string;
  coverArt: string;
  description: string;
  trackCount: number;
  duration: string;
  categoryIds: string[];
  createdDate: string;
}

export interface MadeForYouTrack {
  id: string;
  playlistId: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  releaseDate: string;
  playCount: number;
}