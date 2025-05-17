import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMediaPlayer } from '@/hooks/use-media-player';

const MediaPlayer: React.FC = () => {
  const { currentSong, isPlaying, playSong, pauseSong } = useMediaPlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-streamr-dark-accent border-t border-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center flex-1">
          <img 
            src={currentSong.coverArt} 
            alt={currentSong.title} 
            className="w-12 h-12 rounded object-cover"
          />
          <div className="ml-4">
            <Link 
              to={`/song/${currentSong.id}`}
              className="text-white hover:text-streamr-blue transition-colors"
            >
              {currentSong.title}
            </Link>
            <p className="text-streamr-gray text-sm">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-streamr-gray hover:text-white">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => isPlaying ? pauseSong() : playSong(currentSong)}
              variant="ghost"
              size="icon"
              className="text-white hover:text-streamr-blue"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-streamr-gray hover:text-white">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md mt-2">
            <span className="text-streamr-gray text-xs">0:00</span>
            <Slider
              defaultValue={[0]}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-streamr-gray text-xs">3:45</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="text-streamr-gray h-5 w-5" />
          <Slider
            defaultValue={[80]}
            max={100}
            step={1}
            className="w-28"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;