import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { getSongById, getRelatedSongsByGenre } from '@/services/songService';
import { Song } from '@/services/songService';
import SongList from '@/components/SongList';
import { useMediaPlayer } from '@/hooks/use-media-player';
import { Button } from '@/components/ui/button';

const SongPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [relatedSongs, setRelatedSongs] = useState<Song[]>([]);
  const { currentSong, isPlaying, togglePlayback } = useMediaPlayer();
  
  useEffect(() => {
    if (id) {
      const foundSong = getSongById(id);
      if (foundSong) {
        setSong(foundSong);
        if (foundSong.genreId) {
          const related = getRelatedSongsByGenre(foundSong.genreId);
          setRelatedSongs(related.filter(s => s.id !== foundSong.id));
        }
      } else {
        toast.error("Song not found");
      }
    }
  }, [id]);

  const handlePlayClick = () => {
    if (song) {
      togglePlayback(song);
    }
  };
  
  if (!song) {
    return (
      <div className="min-h-screen bg-streamr-dark text-white flex items-center justify-center">
        <p className="text-streamr-gray">Loading song...</p>
      </div>
    );
  }

  const isCurrentSongPlaying = currentSong?.id === song.id && isPlaying;
  
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
            src={song.coverArt} 
            alt={song.title}
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/400/400';
            }}
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{song.title}</h1>
            <p className="text-streamr-gray text-lg mb-2">{song.artist}</p>
            <p className="text-streamr-gray mb-4">{song.album}</p>
            <p className="text-streamr-gray text-sm mb-6">Duration: {song.duration}</p>
            
            <Button
              onClick={handlePlayClick}
              className="flex items-center gap-2 bg-streamr-blue hover:bg-streamr-blue/80 text-white px-6 py-3 rounded-full"
            >
              {isCurrentSongPlaying ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Play
                </>
              )}
            </Button>
          </div>
        </div>

        {relatedSongs.length > 0 && (
          <div className="mt-12">
            <SongList title="Related Songs" songs={relatedSongs} />
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

export default SongPage;