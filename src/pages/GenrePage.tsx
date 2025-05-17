
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import SongList from '@/components/SongList';
import { getSongsByGenre, getRelatedSongsByGenre } from '@/services/songService';
import { genres } from '@/components/BrowseSection';

const GenrePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [genreName, setGenreName] = useState<string>('');
  
  useEffect(() => {
    if (id) {
      const genre = genres.find(g => g.id === id);
      if (genre) {
        setGenreName(genre.name);
      } else {
        toast.error("Genre not found");
      }
    }
  }, [id]);
  
  const genreSongs = id ? getSongsByGenre(id) : [];
  
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

      <main className="container mx-auto px-4 md:px-8 lg:px-12 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{genreName}</h1>
          <p className="text-streamr-gray">
            Explore the best {genreName} tracks in our collection
          </p>
        </div>

        {genreSongs.length > 0 ? (
          <SongList title={`Top ${genreName} Tracks`} songs={genreSongs} />
        ) : (
          <div className="text-center py-12">
            <p className="text-streamr-gray">No songs found for this genre</p>
          </div>
        )}
      </main>

      <footer className="py-8 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 text-center text-streamr-gray">
          <p>© {new Date().getFullYear()} StreamR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GenrePage;
