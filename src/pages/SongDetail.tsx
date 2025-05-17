
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { getSongById, getRecommendedSongs } from '@/services/songService';
import { Song } from '@/components/SongCard';
import SongList from '@/components/SongList';

const SongDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (id) {
      const foundSong = getSongById(id);
      setSong(foundSong || null);
      
      if (!foundSong) {
        toast.error("Song not found");
      }
    }
  }, [id]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    toast.info(isPlaying ? "Paused playback" : `Now playing: ${song?.title}`);
  };

  if (!song) {
    return (
      <div className="min-h-screen bg-streamr-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-streamr-gray mb-4">Song not found</p>
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
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={song.coverArt}
              alt={`${song.title} album art`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {song.title}
            </h1>
            <p className="text-streamr-blue text-xl mb-2">{song.artist}</p>
            <p className="text-streamr-gray mb-6">Album: {song.album}</p>

            <div className="flex items-center">
              <Button
                onClick={togglePlay}
                className={`${
                  isPlaying 
                  ? "bg-streamr-dark-accent hover:bg-streamr-dark-accent/80" 
                  : "bg-streamr-blue hover:bg-streamr-blue/80"
                } rounded-full px-8 py-2 text-white font-medium`}
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
              
              <div className="ml-4 flex items-center">
                <div className="h-1 w-64 bg-streamr-dark-accent rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-streamr-blue"></div>
                </div>
                <span className="ml-3 text-streamr-gray text-sm">{song.duration}</span>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-medium mb-2">Description</h2>
              <p className="text-streamr-gray">
                Experience the vibrant sounds of {song.artist}'s hit track "{song.title}" 
                from the album {song.album}. This captivating track showcases 
                {song.artist}'s unique style and musical expertise.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SongList title="You Might Also Like" songs={getRecommendedSongs()} />
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

export default SongDetail;
