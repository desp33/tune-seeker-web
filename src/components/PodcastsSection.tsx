import React from 'react';
import { Link } from 'react-router-dom';
import { Podcast, Headphones, Star, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { podcastCategories } from '@/services/podcastService';

const PodcastsSection: React.FC = () => {
  // Map podcast categories to their respective icons
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'podcast-charts':
        return <Podcast className="h-6 w-6" />;
      case 'editors-picks':
        return <Star className="h-6 w-6" />;
      case 'all-time-hits':
        return <Headphones className="h-6 w-6" />;
      case 'categories':
        return <Calendar className="h-6 w-6" />;
      default:
        return <Podcast className="h-6 w-6" />;
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4">Podcasts</h2>
      <div className="overflow-x-auto">
  <div className="flex gap-4 w-max px-1 pb-2">
          {podcastCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/podcasts/${category.slug}`}
              className="inline-block"
            >
              <Card className="w-[220px] bg-streamr-dark-accent hover:bg-streamr-dark-accent/80 transition-all hover:scale-105 border-0">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-streamr-blue bg-opacity-20 text-streamr-blue">
                    {getCategoryIcon(category.slug)}
                  </div>
                  <h3 className="text-white font-medium text-center">{category.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastsSection;