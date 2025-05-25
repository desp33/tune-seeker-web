import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import SongList from '@/components/SongList';
import { getAllSongs } from '@/services/songService';

const LibraryPage: React.FC = () => {
  const songs = getAllSongs();
  
  // Creating categories for the library view
  const recentlyPlayed = songs.slice(0, 5);
  const favorites = songs.slice(5, 10);
  const yourUploads = songs.slice(3, 8);
  
  return (
    <div className="min-h-screen bg-streamr-dark text-white">
      <header className="py-6 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="md" />
          <Link
            to="/"
            className="flex items-center text-streamr-gray hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 lg:px-12 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Library</h1>
          <p className="text-streamr-gray">
            Access all your music in one place
          </p>
        </div>

        <div className="space-y-12">
          <SongList title="Recently Played" songs={recentlyPlayed} />
          <SongList title="Your Favorites" songs={favorites} />
          <SongList title="Your Uploads" songs={yourUploads} />
        </div>
      </main>

      <footer className="py-8 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 text-center text-streamr-gray">
          <p>© {new Date().getFullYear()} StreamR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LibraryPage;
