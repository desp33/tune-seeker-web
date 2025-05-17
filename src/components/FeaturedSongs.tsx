import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMediaPlayer } from '@/hooks/use-media-player';

interface FeaturedSong {
  id: string;
  name: string;
  artist: string;
  image: string;
}

const featuredSongs: FeaturedSong[] = [
  { 
    id: "f1", 
    name: "Blinding Lights", 
    artist: "The Weeknd",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f2", 
    name: "Levitating", 
    artist: "Dua Lipa",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f3", 
    name: "Save Your Tears", 
    artist: "The Weeknd",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f4", 
    name: "Montero", 
    artist: "Lil Nas X",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f5", 
    name: "Kiss Me More", 
    artist: "Doja Cat ft. SZA",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f6", 
    name: "Stay", 
    artist: "The Kid LAROI",
    image: "https://images.unsplash.com/photo-1492563817904-5f1dc687974f?q=80&w=250&auto=format&fit=crop" 
  },
];

const FeaturedSongs: React.FC = () => {
  const navigate = useNavigate();
  const { currentSong, isPlaying, playSong, pauseSong } = useMediaPlayer();

  const handleSongClick = (song: FeaturedSong) => {
    navigate(`/song/${song.id}`);
  };

  const handlePlayClick = (e: React.MouseEvent, song: FeaturedSong) => {
    e.stopPropagation();
    if (currentSong?.id === song.id && isPlaying) {
      pauseSong();
    } else {
      playSong({
        id: song.id,
        title: song.name,
        artist: song.artist,
        coverArt: song.image
      });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4">Top Featured Songs</h2>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredSongs.map((song) => (
            <CarouselItem key={song.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <Card 
                className="bg-transparent border-none cursor-pointer group"
                onClick={() => handleSongClick(song)}
              >
                <CardContent className="p-1 flex flex-col items-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 relative group">
                    <img src={song.image} alt={song.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        onClick={(e) => handlePlayClick(e, song)}
                        variant="ghost"
                        size="icon"
                        className="text-white hover:scale-110 transition-transform"
                      >
                        {currentSong?.id === song.id && isPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-medium">{song.name}</p>
                    <p className="text-streamr-gray text-xs">{song.artist}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedSongs;