import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Podcast } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Podcast as PodcastType } from '@/types/podcast';

interface PodcastCardProps {
  podcast: PodcastType;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <Card className="w-full bg-streamr-dark-accent hover:bg-streamr-dark-accent/80 transition-all hover:scale-105 border-0">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden">
            <img 
              src={podcast.coverArt} 
              alt={podcast.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:scale-110 transition-transform"
              >
                <Play className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-streamr-blue rounded-full p-1">
            <Podcast className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="p-4">
          <Link to={`/podcast-detail/${podcast.id}`}>
            <h3 className="font-medium text-white truncate hover:text-streamr-blue transition-colors">
              {podcast.title}
            </h3>
          </Link>
          <p className="text-streamr-gray text-sm truncate mt-1">
            {podcast.host}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-streamr-gray text-xs">{podcast.category}</span>
            <span className="text-streamr-gray text-xs">{podcast.duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastCard;