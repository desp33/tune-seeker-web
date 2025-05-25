import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';
import { MadeForYouCategory, MadeForYouPlaylist } from '@/types/madeForYou';
import { getMadeForYouCategoryBySlug, getPlaylistsByCategorySlug } from '@/services/madeForYouService';
import PlaylistCard from '@/components/PlaylistCard';

const MadeForYouPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<MadeForYouCategory | null>(null);
  const [playlists, setPlaylists] = useState<MadeForYouPlaylist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Fetch the category and related playlists
      const categoryData = getMadeForYouCategoryBySlug(slug);
      const playlistsData = getPlaylistsByCategorySlug(slug);
      
      setCategory(categoryData || null);
      setPlaylists(playlistsData);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-streamr-dark text-white flex items-center justify-center">
        <p>Loading playlists...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-streamr-dark text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-streamr-gray mb-4">Playlist category not found</p>
          <Link to="/" className="text-streamr-blue hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-streamr-dark text-white">
      <header className="py-6 px-4 md:px-8 lg:px-12 bg-streamr-dark shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Logo size="md" />
            </Link>
            <Separator orientation="vertical" className="h-8 bg-gray-700" />
            <h1 className="text-2xl font-bold">{category.title}</h1>
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
          <h1 className="text-3xl font-bold mb-4">{category.title}</h1>
          <p className="text-streamr-gray max-w-3xl">{category.description}</p>
        </div>

        {playlists.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-xl text-streamr-gray mb-4">
              No playlists found in this category yet.
            </p>
            <p className="text-streamr-gray">
              Check back soon as we're constantly adding new content!
            </p>
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

export default MadeForYouPage;