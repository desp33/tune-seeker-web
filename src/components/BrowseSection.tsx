
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongList from '@/components/SongList';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Library, Download, ListMusic, Music, Folder } from 'lucide-react';
import { getAllSongs } from '@/services/songService';

type BrowseCategory = 'library' | 'downloads' | 'playlists' | 'genres' | 'instruments';

interface BrowseItem {
  id: string;
  label: string;
  value: BrowseCategory;
  icon: React.ElementType;
}

const browseItems: BrowseItem[] = [
  { id: 'b1', label: 'Your Library', value: 'library', icon: Library },
  { id: 'b2', label: 'Downloads', value: 'downloads', icon: Download },
  { id: 'b3', label: 'Playlists', value: 'playlists', icon: ListMusic },
  { id: 'b4', label: 'Genres', value: 'genres', icon: ListMusic },
  { id: 'b5', label: 'Instruments', value: 'instruments', icon: Music },
];

const BrowseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BrowseCategory>('library');
  const songs = getAllSongs();

  // Filter songs based on selected category (in a real app this would be dynamic)
  // Here we're just showing different numbers of songs to simulate different content
  const getCategoryContent = (category: BrowseCategory) => {
    switch (category) {
      case 'library':
        return songs.slice(0, 6);
      case 'downloads':
        return songs.slice(2, 6);
      case 'playlists':
        return songs.slice(0, 5);
      case 'genres':
        return songs.slice(1, 7);
      case 'instruments':
        return songs.slice(3, 7);
      default:
        return songs.slice(0, 6);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4 text-left">Browse</h2>
      
      <Tabs defaultValue="library" 
        value={activeCategory} 
        onValueChange={(value) => setActiveCategory(value as BrowseCategory)}
        className="w-full"
      >
        <ScrollArea className="w-full">
          <TabsList className="bg-transparent h-12 mb-6 flex w-full overflow-x-auto gap-6 justify-start">
            {browseItems.map((item) => (
              <TabsTrigger 
                key={item.id}
                value={item.value} 
                className="flex-shrink-0 flex items-center gap-2 bg-transparent border-0 relative px-0 transition-all
                  data-[state=active]:bg-transparent data-[state=active]:text-streamr-blue group"
              >
                <item.icon className="w-4 h-4 transition-colors group-data-[state=active]:text-streamr-blue" />
                <span className="transition-colors group-data-[state=active]:text-white text-streamr-gray">
                  {item.label}
                </span>
                {/* Subtle indicator line for active state */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 transition-transform origin-center 
                  group-data-[state=active]:scale-x-100 bg-streamr-blue opacity-70"></span>
                {/* Very subtle glow effect */}
                <span className="absolute inset-0 rounded-md opacity-0 group-data-[state=active]:opacity-10 
                  bg-streamr-blue blur-sm -z-10"></span>
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>
        
        {browseItems.map((item) => (
          <TabsContent key={item.id} value={item.value}>
            <SongList 
              title={`${item.label} Content`} 
              songs={getCategoryContent(item.value)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BrowseSection;
