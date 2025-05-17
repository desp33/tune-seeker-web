
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongList from '@/components/SongList';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Library, ListMusic, Music, Folder } from 'lucide-react';
import { getAllSongs, getSongsByGenre } from '@/services/songService';
import { useNavigate } from 'react-router-dom';

type BrowseCategory = 'library' | 'playlists' | 'genres' | 'instruments';

interface BrowseItem {
  id: string;
  label: string;
  value: BrowseCategory;
  icon: React.ElementType;
}

const browseItems: BrowseItem[] = [
  { id: 'b1', label: 'Your Library', value: 'library', icon: Library },
  { id: 'b3', label: 'Playlists', value: 'playlists', icon: ListMusic },
  { id: 'b4', label: 'Genres', value: 'genres', icon: Music },
  { id: 'b5', label: 'Instruments', value: 'instruments', icon: Folder },
];

// Available genres
export const genres = [
  { id: 'g1', name: 'Jazz' },
  { id: 'g2', name: 'Hip Hop' },
  { id: 'g3', name: 'R&B' },
  { id: 'g4', name: 'Country' },
  { id: 'g5', name: 'Folk' },
  { id: 'g6', name: 'Rock' },
];

const BrowseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BrowseCategory>('library');
  const songs = getAllSongs();
  const navigate = useNavigate();

  const handleGenreClick = (genreId: string) => {
    navigate(`/genre/${genreId}`);
  };

  // Filter songs based on selected category
  const getCategoryContent = (category: BrowseCategory) => {
    switch (category) {
      case 'library':
        return songs.slice(0, 6);
      case 'playlists':
        return songs.slice(0, 5);
      case 'genres':
        return null; // We'll render genres differently
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
            {item.value === 'genres' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    className="bg-streamr-dark-accent p-4 rounded-lg transition-transform hover:scale-105 hover:bg-streamr-dark-accent/80 text-center"
                  >
                    <Music className="w-8 h-8 mx-auto mb-2 text-streamr-blue" />
                    <p className="text-white font-medium">{genre.name}</p>
                  </button>
                ))}
              </div>
            ) : (
              <SongList 
                title={`${item.label} Content`} 
                songs={getCategoryContent(item.value) || []}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BrowseSection;
