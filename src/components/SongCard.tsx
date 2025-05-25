
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaPlayer } from '@/hooks/use-media-player';

export interface Song {
  audioUrl: string;
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  duration: string;
  genreId?: string;
  instrumentId?: string;
}

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { currentSong, isPlaying, togglePlayback } = useMediaPlayer();
  
  const isCurrentSongPlaying = currentSong?.id === song.id && isPlaying;
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    togglePlayback(song);
  };
  
  return (
    <Link 
      to={`/song/${song.id}`} 
      className="block bg-streamr-dark-accent rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-lg hover:shadow-streamr-blue/20"
    >
      <div className="flex justify-center px-3 pt-3 relative">
        <div className="w-[76%] relative pb-[76%]">
          <img 
            src={song.coverArt} 
            alt={`${song.title} album art`} 
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
            <Button
              onClick={handlePlayClick}
              variant="ghost"
              size="icon"
              className="text-white hover:scale-110 transition-transform"
            >
              {isCurrentSongPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex-grow">
          <h3 className="font-medium text-white truncate">{song.title}</h3>
          <p className="text-streamr-gray text-sm truncate">{song.artist}</p>
        </div>
      </div>
    </Link>
  );
};

export default SongCard;
