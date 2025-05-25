// Mock podcast data service
import { Podcast, PodcastCategory, PodcastEpisode } from "@/types/podcast";

// Define mock podcast categories with descriptions
const podcastCategories: PodcastCategory[] = [
  { 
    id: 'pc1', 
    title: 'Podcast Charts', 
    slug: 'podcast-charts',
    description: 'The most popular podcasts trending right now on StreamR'
  },
  { 
    id: 'pc2', 
    title: 'Editors Picks', 
    slug: 'editors-picks',
    description: 'Hand-selected podcasts curated by our editorial team'
  },
  { 
    id: 'pc3', 
    title: 'All Time Hits', 
    slug: 'all-time-hits',
    description: 'The most loved podcasts of all time with millions of listeners'
  },
  { 
    id: 'pc4', 
    title: 'Categories', 
    slug: 'categories',
    description: 'Browse podcasts by category to find your next favorite show'
  },
  {
    id: "1",
    title: "Podcast Charts",
    slug: "podcast-charts",
    description: "Top trending podcasts right now across all categories."
  },
  {
    id: "2",
    title: "Tech & Startups",
    slug: "tech-startups",
    description: "Insights from the world of technology and business."
  },
  {
    id: "3",
    title: "Health & Wellness",
    slug: "health-wellness",
    description: "Podcasts to boost your mental and physical health."
  }
];

// Mock podcasts data
const podcasts: Podcast[] = [
  {
    id: 'pod1',
    title: 'Tech Today',
    host: 'Alex Chen',
    coverArt: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=500&auto=format&fit=crop',
    description: 'Daily tech news and analysis of the latest trends in technology',
    category: 'Technology',
    releaseSchedule: 'Weekly',
    duration: '45 min',
    categoryIds: ['pc1', 'pc2']
  },
  {
    id: 'pod2',
    title: 'Crime Stories',
    host: 'Sarah Johnson',
    coverArt: 'https://images.unsplash.com/photo-1577999499505-e4a0a7695097?q=80&w=500&auto=format&fit=crop',
    description: 'True crime stories that will keep you on the edge of your seat',
    category: 'True Crime',
    releaseSchedule: 'Bi-weekly',
    duration: '60 min',
    categoryIds: ['pc1', 'pc3']
  },
  {
    id: 'pod3',
    title: 'Health Matters',
    host: 'Dr. Michael Rivera',
    coverArt: 'https://images.unsplash.com/photo-1551150441-3f3828204ef0?q=80&w=500&auto=format&fit=crop',
    description: 'Health tips and discussions about wellness and lifestyle',
    category: 'Health & Wellness',
    releaseSchedule: 'Weekly',
    duration: '30 min',
    categoryIds: ['pc2', 'pc4']
  },
  {
    id: 'pod4',
    title: 'Financial Freedom',
    host: 'Emma Davidson',
    coverArt: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=500&auto=format&fit=crop',
    description: 'Learn how to manage your finances and build wealth',
    category: 'Finance',
    releaseSchedule: 'Monthly',
    duration: '45 min',
    categoryIds: ['pc4']
  },
  {
    id: 'pod5',
    title: 'Comedy Hour',
    host: 'Jake Wilson',
    coverArt: 'https://images.unsplash.com/photo-1603223146791-9738408d943a?q=80&w=500&auto=format&fit=crop',
    description: 'Laugh out loud with the funniest comedians in the industry',
    category: 'Comedy',
    releaseSchedule: 'Weekly',
    duration: '60 min',
    categoryIds: ['pc1', 'pc3']
  },
  {
    id: 'pod6',
    title: 'History Uncovered',
    host: 'Professor Lisa Thomas',
    coverArt: 'https://images.unsplash.com/photo-1561657819-51c0c4e0f5f6?q=80&w=500&auto=format&fit=crop',
    description: 'Exploring the hidden stories of history that shaped our world',
    category: 'History',
    releaseSchedule: 'Bi-weekly',
    duration: '50 min',
    categoryIds: ['pc2', 'pc3']
  },
  {
    id: 'pod7',
    title: 'Science Explained',
    host: 'Dr. Robert Adams',
    coverArt: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=500&auto=format&fit=crop',
    description: 'Breaking down complex scientific topics in an easy-to-understand way',
    category: 'Science',
    releaseSchedule: 'Weekly',
    duration: '40 min',
    categoryIds: ['pc2', 'pc4']
  },
  {
    id: 'pod8',
    title: 'Daily News Roundup',
    host: 'Carlos Martinez',
    coverArt: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=500&auto=format&fit=crop',
    description: 'Get your daily dose of news from around the world',
    category: 'News',
    releaseSchedule: 'Daily',
    duration: '20 min',
    categoryIds: ['pc1']
  },
  
];

// Mock podcast episodes
const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 'ep1',
    podcastId: 'pod1',
    title: 'The Future of AI',
    description: 'Discussing the latest developments in artificial intelligence and what it means for society',
    releaseDate: '2025-05-15',
    duration: '42:30',
    listenerCount: 45200
  },
  {
    id: 'ep2',
    podcastId: 'pod1',
    title: 'Web3 and the Metaverse',
    description: 'Exploring the next generation of the internet and virtual worlds',
    releaseDate: '2025-05-08',
    duration: '46:15',
    listenerCount: 38900
  },
  {
    id: 'ep3',
    podcastId: 'pod2',
    title: 'The Mystery of the Missing Artifacts',
    description: 'The mysterious disappearance of valuable artifacts from a museum',
    releaseDate: '2025-05-12',
    duration: '58:45',
    listenerCount: 67300
  },
  {
    id: 'ep4',
    podcastId: 'pod3',
    title: 'Sleep Optimization Techniques',
    description: 'How to improve your sleep quality for better health',
    releaseDate: '2025-05-14',
    duration: '32:10',
    listenerCount: 29800
  },
  {
    id: 'ep5',
    podcastId: 'pod4',
    title: 'Investing for Beginners',
    description: 'A step-by-step guide to start investing in the stock market',
    releaseDate: '2025-04-30',
    duration: '47:20',
    listenerCount: 52400
  },
  {
    id: "ep1",
    podcastId: "the-daily-byte",
    title: "AI in 2025",
    description: "A quick look at how AI is reshaping our daily lives.",
    releaseDate: "2025-05-15",
    duration: "09:45",
    listenerCount: 3200
  },
  {
    id: "ep2",
    podcastId: "the-daily-byte",
    title: "Quantum Computing Basics",
    description: "What is quantum computing and why should you care?",
    releaseDate: "2025-05-16",
    duration: "10:10",
    listenerCount: 2800
  },
  {
    id: "ep3",
    podcastId: "founders-journal",
    title: "My Startup Almost Died",
    description: "Lessons learned from a major product launch failure.",
    releaseDate: "2025-05-10",
    duration: "18:22",
    listenerCount: 4600
  },
  {
    id: "ep4",
    podcastId: "mindful-minutes",
    title: "5-Minute Breathing Reset",
    description: "A guided session for focus and calm.",
    releaseDate: "2025-05-12",
    duration: "05:00",
    listenerCount: 2200
  }
];

// Functions to retrieve podcast data
export const getAllPodcastCategories = (): PodcastCategory[] => {
  return podcastCategories;
};

export const getPodcastCategoryBySlug = (slug: string): PodcastCategory | undefined => {
  return podcastCategories.find(category => category.slug === slug);
};

export const getPodcastsByCategory = (categoryId: string): Podcast[] => {
  return podcasts.filter(podcast => podcast.categoryIds.includes(categoryId));
};

export const getPodcastById = (id: string): Podcast | undefined => {
  return podcasts.find(podcast => podcast.id === id);
};

export const getPodcastEpisodes = (podcastId: string): PodcastEpisode[] => {
  return podcastEpisodes.filter(episode => episode.podcastId === podcastId);
};

// Get featured podcasts (for home page)
export const getFeaturedPodcasts = (): Podcast[] => {
  return podcasts.slice(0, 4);
};

// Get podcasts for a specific category slug
export const getPodcastsByCategorySlug = (slug: string): Podcast[] => {
  const category = podcastCategories.find(cat => cat.slug === slug);
  if (!category) return [];
  
  return getPodcastsByCategory(category.id);
};

export { podcastCategories };