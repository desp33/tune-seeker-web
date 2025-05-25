import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';
import { Podcast, PodcastEpisode } from '@/types/podcast';
import { getPodcastById, getPodcastEpisodes } from '@/services/podcastService';

const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const podcastData = getPodcastById(id);
      if (podcastData) {
        setPodcast(podcastData);
        setEpisodes(getPodcastEpisodes(id));
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-streamr-dark text-white flex items-center justify-center">
        <p>Loading podcast...</p>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="min-h-screen bg-streamr-dark text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-streamr-gray mb-4">Podcast not found</p>
          <Link to="/" className="text-streamr-blue hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-streamr-dark text-white">
      <header className="py-6 px-4 md:px-8 lg:px-12 bg-streamr-dark shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Logo size="md" />
            </Link>
          </div>
          <Link to="/">
            <Button variant="ghost" className="text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 lg:px-12 py-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 mb-12">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={podcast.coverArt}
              alt={podcast.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-streamr-blue text-white">{podcast.category}</Badge>
              <Badge variant="outline" className="text-streamr-gray border-gray-700">
                {podcast.releaseSchedule}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {podcast.title}
            </h1>
            <p className="text-streamr-blue text-xl mb-4">Hosted by {podcast.host}</p>
            
            <p className="text-streamr-gray mb-6">
              {podcast.description}
            </p>
            
            <Button className="w-fit bg-streamr-blue hover:bg-streamr-blue/80">
              <Play className="mr-2 h-4 w-4" /> Subscribe to Podcast
            </Button>
          </div>
        </div>

        <Separator className="bg-gray-800 my-8" />
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Episodes</h2>
          
          {episodes.length > 0 ? (
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div 
                  key={episode.id} 
                  className="bg-streamr-dark-accent p-4 rounded-lg hover:bg-streamr-dark-accent/80 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white text-lg mb-2">{episode.title}</h3>
                      <p className="text-streamr-gray text-sm mb-3">{episode.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-streamr-gray">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {episode.releaseDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {episode.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {formatNumber(episode.listenerCount)} listeners
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="text-white">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-streamr-gray">No episodes available yet.</p>
            </div>
          )}
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

export default PodcastDetailPage;