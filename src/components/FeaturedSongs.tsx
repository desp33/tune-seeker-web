
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturedSong {
  id: string;
  name: string;
  image: string;
}

const featuredSongs: FeaturedSong[] = [
  { 
    id: "f1", 
    name: "Song 1", 
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f2", 
    name: "Song 2", 
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f3", 
    name: "Song 3", 
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f4", 
    name: "Song 4", 
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f5", 
    name: "Song 5", 
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=250&auto=format&fit=crop" 
  },
  { 
    id: "f6", 
    name: "Song 6", 
    image: "https://images.unsplash.com/photo-1492563817904-5f1dc687974f?q=80&w=250&auto=format&fit=crop" 
  },
];

const FeaturedSongs: React.FC = () => {
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
              <Card className="bg-transparent border-none">
                <CardContent className="p-1 flex flex-col items-center">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
                    <img src={song.image} alt={song.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white text-sm font-medium text-center">{song.name}</p>
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
