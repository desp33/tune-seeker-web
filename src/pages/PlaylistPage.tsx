
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import SongList from '@/components/SongList';
import { getPlaylistById, getSongsFromPlaylist, getSuggestedSongsForPlaylist } from '@/services/songService';
import { Song } from '@/components/SongCard';
import { Playlist } from '@/services/songService';

const PlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);
  const [suggestedSongs, setSuggestedSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (id) {
      const foundPlaylist = getPlaylistById(id);
      if (foundPlaylist) {
        setPlaylist(foundPlaylist);
        setPlaylistSongs(getSongsFromPlaylist(id));
        setSuggestedSongs(getSuggestedSongsForPlaylist(id));
      } else {
        toast.error("Playlist not found");
      }
    }
  }, [id]);

  const handlePlayAll = () => {
    toast.info(`Playing ${playlist?.name} playlist`);
  };

  if (!playlist) {
    return (
      <div className="min-h-screen bg-streamr-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-streamr-gray mb-4">Playlist not found</p>
          <Link to="/" className="text-streamr-blue hover:underline">
            Back to home
          </Link>
        </div>
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

      <main className="container mx-auto px-4 md:px-8 lg:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 mb-12">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={playlist.coverArt}
              alt={`${playlist.name} cover`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {playlist.name}
            </h1>
            <p className="text-streamr-gray mb-6">{playlistSongs.length} songs</p>

            <Button 
              onClick={handlePlayAll}
              className="bg-streamr-blue hover:bg-streamr-blue/80 rounded-full px-8 py-2 text-white font-medium w-fit flex items-center">
              <Play size={18} className="mr-2" />
              Play All
            </Button>
          </div>
        </div>

        {playlistSongs.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Songs in Playlist</h2>
            <div className="bg-streamr-dark-accent rounded-lg p-4">
              {playlistSongs.map((song, index) => (
                <Link 
                  key={song.id} 
                  to={`/song/${song.id}`}
                  className="flex items-center py-2 px-4 hover:bg-streamr-dark/40 rounded-md transition-colors"
                >
                  <div className="w-8 text-streamr-gray">{index + 1}</div>
                  <div className="h-10 w-10 mr-4">
                    <img 
                      src={song.coverArt} 
                      alt={song.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white">{song.title}</h3>
                    <p className="text-streamr-gray text-sm">{song.artist}</p>
                  </div>
                  <div className="text-streamr-gray text-sm">{song.duration}</div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-streamr-gray">This playlist is empty</p>
          </div>
        )}

        {suggestedSongs.length > 0 && (
          <SongList title="You Might Also Like" songs={suggestedSongs} />
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
