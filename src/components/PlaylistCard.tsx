
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { MadeForYouPlaylist } from '@/types/madeForYou';

interface PlaylistCardProps {
  playlist: MadeForYouPlaylist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <Card className="bg-streamr-dark-accent hover:bg-streamr-dark-accent/80 border-0 transition-all duration-300 hover:scale-[1.03] overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={playlist.coverArt} 
            alt={playlist.title} 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              size="icon" 
              className="rounded-full bg-streamr-blue hover:bg-streamr-blue/90"
              onClick={(e) => {
                e.preventDefault();
                // Handle play functionality
                console.log('Playing playlist:', playlist.id);
              }}
            >
              <Play className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-white truncate">{playlist.title}</h3>
          <p className="text-streamr-gray text-sm mt-1 line-clamp-2">{playlist.description}</p>
          <p className="text-streamr-gray text-xs mt-2">{playlist.trackCount} tracks • {playlist.duration}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaylistCard;