
import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Star, User, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MadeForYouCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  slug: string;
}

const madeForYouCategories: MadeForYouCategory[] = [
  { id: 'mfy1', title: 'Your Daily Mix', icon: <Music className="h-6 w-6" />, slug: 'daily-mix' },
  { id: 'mfy2', title: 'New Releases', icon: <Star className="h-6 w-6" />, slug: 'new-releases' },
  { id: 'mfy3', title: 'Fav Artists', icon: <User className="h-6 w-6" />, slug: 'favorite-artists' },
  { id: 'mfy4', title: 'On Repeat', icon: <Clock className="h-6 w-6" />, slug: 'on-repeat' },
];

const MadeForYouSection: React.FC = () => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4">Made For You</h2>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4">
          {madeForYouCategories.map((category) => (
            <Link 
              key={category.id} 
              to={`/made-for-you/${category.slug}`}
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

export default MadeForYouSection;
