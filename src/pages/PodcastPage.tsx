
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import SongList from '@/components/SongList';
import { getRecommendedSongs } from '@/services/songService';

const PodcastPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const songs = getRecommendedSongs(); // Using recommended songs as mock data

  // Convert slug to readable title
  const getPageTitle = () => {
    if (!slug) return 'Podcasts';
    
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-streamr-dark text-white">
      <header className="py-6 px-4 md:px-8 lg:px-12 bg-streamr-dark shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Logo size="md" />
            </Link>
            <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
          </div>
          <Link to="/">
            <Button variant="ghost" className="text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 lg:px-12 py-8 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{getPageTitle()}</h1>
          <p className="text-streamr-gray">Discover the best podcasts in this collection.</p>
        </div>

        <SongList title="Featured Podcasts" songs={songs} />
      </main>

      <footer className="py-8 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 text-center text-streamr-gray">
          <p>© {new Date().getFullYear()} StreamR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PodcastPage;
