
import React from 'react';
import { Link } from 'react-router-dom';
import { Podcast, Headphones, Star, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PodcastCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  slug: string;
}

const podcastCategories: PodcastCategory[] = [
  { id: 'pc1', title: 'Podcast Charts', icon: <Podcast className="h-6 w-6" />, slug: 'podcast-charts' },
  { id: 'pc2', title: 'Editors Picks', icon: <Star className="h-6 w-6" />, slug: 'editors-picks' },
  { id: 'pc3', title: 'All Time Hits', icon: <Headphones className="h-6 w-6" />, slug: 'all-time-hits' },
  { id: 'pc4', title: 'Categories', icon: <Calendar className="h-6 w-6" />, slug: 'categories' },
];

const PodcastsSection: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4">Podcasts</h2>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4">
          {podcastCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/podcasts/${category.slug}`}
              className="inline-block"
            >
              <Card className="w-[220px] bg-streamr-dark-accent hover:bg-streamr-dark-accent/80 transition-all hover:scale-105 border-0">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-streamr-blue bg-opacity-20 text-streamr-blue">
                    {category.icon}
                  </div>
                  <h3 className="text-white font-medium text-center">{category.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PodcastsSection;
