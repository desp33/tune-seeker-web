
import React, { useState } from 'react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import SearchInput from '@/components/SearchInput';
import SongList from '@/components/SongList';
import FeaturedSongs from '@/components/FeaturedSongs';
import BrowseSection from '@/components/BrowseSection';
import YouMayLike from '@/components/YouMayLike';
import { searchSongs, getRecommendedSongs } from '@/services/songService';
import { Song } from '@/components/SongCard';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Song[] | null>(null);

  const handleSearch = (query: string) => {
    const results = searchSongs(query);
    setSearchResults(results);
    
    if (results.length === 0) {
      toast.info("No songs found matching your search.");
    }
  };

  const handleFileUpload = (file: File) => {
    // In a real app, we'd process the audio file here
    toast.success(`File "${file.name}" uploaded. Analyzing audio...`);
    
    // Mock response after "analysis"
    setTimeout(() => {
      const recommendedSongs = getRecommendedSongs();
      setSearchResults(recommendedSongs);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-streamr-dark text-white">
      <header className="py-6 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="lg" />
          <Button variant="outline" className="border-streamr-blue text-streamr-blue hover:bg-streamr-blue/10">
            <UserPlus size={18} className="mr-2" />
            Sign Up
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 lg:px-12 pb-16">
        <div className="flex flex-col items-center justify-center py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            Discover Your Next Favorite Song
          </h1>
          <p className="text-streamr-gray mb-8 text-center max-w-2xl">
            Search by typing, or upload an audio file to find similar music
          </p>
          <SearchInput onSearch={handleSearch} onFileUpload={handleFileUpload} />
        </div>

        {searchResults ? (
          <div className="mt-12">
            <SongList title="Search Results" songs={searchResults} />
          </div>
        ) : (
          <>
            <FeaturedSongs />
            <BrowseSection />
            <YouMayLike />
          </>
        )}
      </main>

      <footer className="py-8 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-4 text-center text-streamr-gray">
          <p>© {new Date().getFullYear()} StreamR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
