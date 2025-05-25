import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import SongList from '@/components/SongList';
import { getPlaylistBySlug, getSongsFromPlaylist } from '@/services/songService';
import { Song, Playlist } from '@/services/songService';

const PlaylistPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  
  useEffect(() => {
    if (slug) {
      const foundPlaylist = getPlaylistBySlug(slug);
      if (foundPlaylist) {
        setPlaylist(foundPlaylist);
        const playlistSongs = getSongsFromPlaylist(foundPlaylist.id);
        setSongs(playlistSongs);
      } else {
        toast.error("Playlist not found");
      }
    }
  }, [slug]);
  
  if (!playlist) {
    return (
      <div className="min-h-screen bg-streamr-dark text-white flex items-center justify-center">
        <p className="text-streamr-gray">Loading playlist...</p>
      </div>
    );
  }
  
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
        <div className="mb-8 flex items-start gap-6">
          <img 
            src={playlist.coverArt} 
            alt={playlist.name}
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/400/400';
            }}
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{playlist.name}</h1>
            <p className="text-streamr-gray mb-4">
              {songs.length} {songs.length === 1 ? 'song' : 'songs'}
            </p>
            <p className="text-streamr-gray">
              Your curated playlist
            </p>
          </div>
        </div>

        {songs.length > 0 ? (
          <SongList title="Songs" songs={songs} />
        ) : (
          <div className="text-center py-12">
            <p className="text-streamr-gray">No songs in this playlist</p>
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

export default PlaylistPage;