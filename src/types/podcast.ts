// Type definitions for podcasts
export interface PodcastCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  coverArt: string;
  description: string;
  category: string;
  releaseSchedule: string;
  duration: string;
  categoryIds: string[];
}

export interface PodcastEpisode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  releaseDate: string;
  duration: string;
  listenerCount: number;
}