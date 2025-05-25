import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongList from '@/components/SongList';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Library, ListMusic, Music, Folder, Piano, Guitar, Mic2, Wind, Drumstick } from 'lucide-react';
import { getAllSongs, getAllPlaylists, getSongsFromPlaylist } from '@/services/songService';
import { Card, CardContent } from "@/components/ui/card";

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

export const genres = [
  { id: 'g1', name: 'Jazz' },
  { id: 'g2', name: 'Hip Hop' },
  { id: 'g3', name: 'R&B' },
  { id: 'g4', name: 'Country' },
  { id: 'g5', name: 'Folk' },
  { id: 'g6', name: 'Rock' },
];

export const instruments = [
  { id: 'i1', name: 'Guitar', icon: Guitar },
  { id: 'i2', name: 'Piano', icon: Piano },
  { id: 'i3', name: 'Drums', icon: Drumstick },
  { id: 'i4', name: 'Flute', icon: Wind },
  { id: 'i5', name: 'Vocals', icon: Mic2 },
  { id: 'i6', name: 'Sitar', icon: Guitar }, // fallback icon
];

const BrowseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BrowseCategory>('library');
  const navigate = useNavigate();
  const songs = getAllSongs();
  const playlists = getAllPlaylists();

  const handleGenreClick = (genreId: string) => {
    navigate(`/genre/${genreId}`);
  };

  const handleInstrumentClick = (instrumentId: string) => {
    navigate(`/instrument/${instrumentId}`);
  };

  const handleLibraryClick = () => {
    navigate('/library');
  };

  const getCategoryContent = (category: BrowseCategory) => {
    switch (category) {
      case 'library':
        return songs.slice(0, 6);
      case 'playlists':
        // Convert playlists to songs format for display
        return playlists.slice(0, 4).map(playlist => ({
          id: playlist.id,
          title: playlist.name,
          artist: `${getSongsFromPlaylist(playlist.id).length} songs`,
          album: 'Playlist',
          coverArt: playlist.coverArt,
          duration: '0:00', // Placeholder for playlists
          audioUrl: '',
          genreId: undefined,
          instrumentIds: []
        }));
      case 'genres':
        return null;
      case 'instruments':
        return null;
      default:
        return songs.slice(0, 6);
    }
  };

  // Base shadow class for all cards (minimal shadow at bottom only)
  const cardShadowClass = "shadow-[0_2px_6px_rgba(0,0,0,0.6)]";

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4 text-left">Browse</h2>

      <Tabs
        defaultValue="library"
        value={activeCategory}
        onValueChange={(value) => setActiveCategory(value as BrowseCategory)}
        className="w-full"
      >
        <ScrollArea className="w-full">
          <TabsList className="bg-transparent h-12 mb-6 flex w-full overflow-x-auto gap-6 justify-start">
            {browseItems.map(({ id, label, value, icon: Icon }) => (
              <TabsTrigger
                key={id}
                value={value}
                className="flex-shrink-0 flex items-center gap-2 bg-transparent border-0 relative px-0 transition-all
                  data-[state=active]:bg-transparent data-[state=active]:text-streamr-blue group"
              >
                <Icon className="w-4 h-4 transition-colors group-data-[state=active]:text-streamr-blue" />
                <span className="transition-colors group-data-[state=active]:text-white text-streamr-gray">
                  {label}
                </span>
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 transition-transform origin-center 
                  group-data-[state=active]:scale-x-100 bg-streamr-blue opacity-70"
                ></span>
                <span
                  className="absolute inset-0 rounded-md opacity-0 group-data-[state=active]:opacity-10 
                  bg-streamr-blue blur-sm -z-10"
                ></span>
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {browseItems.map(({ id, value, label }) => (
          <TabsContent key={id} value={value}>
            {value === 'genres' ? (
              <div className="flex flex-wrap gap-4">
                {genres.map((genre) => (
                  <div key={genre.id} className="w-[160px]">
                    <Card
                      className={`w-full bg-streamr-dark-accent border-0 ${cardShadowClass} cursor-pointer hover:scale-105 transition-transform`}
                      onClick={() => handleGenreClick(genre.id)}
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="aspect-square w-full bg-streamr-dark-accent/50 flex items-center justify-center">
                            <Music className="h-12 w-12 text-streamr-blue opacity-70" />
                          </div>
                          <div className="absolute top-2 right-2 bg-streamr-blue rounded-full p-1">
                            <Music className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-white truncate hover:text-streamr-blue transition-colors">
                            {genre.name}
                          </h3>
                          <p className="text-streamr-gray text-sm truncate mt-1">Genre</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-streamr-gray text-xs">Music</span>
                            <span className="text-streamr-gray text-xs">Browse</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : value === 'playlists' ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-lg">Your Playlists</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  {playlists.map((playlist) => (
                    <div 
                      key={playlist.id} 
                      className="w-[160px] bg-streamr-dark-accent rounded-lg overflow-hidden shadow-lg hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                      onClick={() => navigate(`/playlist/${playlist.slug}`)}
                    >
                      <img src={playlist.coverArt} alt={playlist.name} className="w-full h-40 object-cover" />
                      <div className="p-3 text-white">
                        <h4 className="truncate font-semibold">{playlist.name}</h4>
                        <p className="text-sm text-streamr-gray truncate">
                          {getSongsFromPlaylist(playlist.id).length} songs
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : value === 'instruments' ? (
              <div className="flex flex-wrap gap-4">
                {instruments.map((instrument) => {
                  const Icon = instrument.icon;
                  return (
                    <div key={instrument.id} className="w-[160px]">
                      <Card
                        className={`w-full bg-streamr-dark-accent border-0 ${cardShadowClass} cursor-pointer hover:scale-105 transition-transform`}
                        onClick={() => handleInstrumentClick(instrument.id)}
                      >
                        <CardContent className="p-0">
                          <div className="relative">
                            <div className="aspect-square w-full bg-streamr-dark-accent/50 flex items-center justify-center">
                              <Icon className="h-12 w-12 text-streamr-blue opacity-70" />
                            </div>
                            <div className="absolute top-2 right-2 bg-streamr-blue rounded-full p-1">
                              <Folder className="h-4 w-4 text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-white truncate hover:text-streamr-blue transition-colors">
                              {instrument.name}
                            </h3>
                            <p className="text-streamr-gray text-sm truncate mt-1">Instrument</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-streamr-gray text-xs">Music</span>
                              <span className="text-streamr-gray text-xs">Browse</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            ) : value === 'library' ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-lg">Your Library</h3>
                  <button
                    onClick={handleLibraryClick}
                    className="text-streamr-blue hover:text-white text-sm transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {getCategoryContent(value)?.map((song) => (
                    <div 
                      key={song.id} 
                      className="w-[160px] bg-streamr-dark-accent rounded-lg overflow-hidden shadow-lg hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                      onClick={() => navigate(`/song/${song.id}`)}
                    >
                      <img src={song.coverArt} alt={song.title} className="w-full h-40 object-cover" />
                      <div className="p-3 text-white">
                        <h4 className="truncate font-semibold">{song.title}</h4>
                        <p className="text-sm text-streamr-gray truncate">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <SongList title={`${label} Content`} songs={getCategoryContent(value) || []} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BrowseSection;