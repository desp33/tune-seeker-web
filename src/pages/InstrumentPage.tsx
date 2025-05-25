import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import SongList from '@/components/SongList';
import { getSongsByInstrument } from '@/services/songService';
import { instruments } from '@/components/BrowseSection';

const InstrumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [instrumentName, setInstrumentName] = useState<string>('');
  const [instrumentIcon, setInstrumentIcon] = useState<React.ElementType | null>(null);
  
  useEffect(() => {
    if (id) {
      const instrument = instruments.find(i => i.id === id);
      if (instrument) {
        setInstrumentName(instrument.name);
        setInstrumentIcon(instrument.icon);
      } else {
        toast.error("Instrument not found");
      }
    }
  }, [id]);
  
  // Get songs for this instrument
  const instrumentSongs = id ? getSongsByInstrument(id) : [];
  
  // Fallback for getSongsByInstrument if not finding any results
  const getSongsByInstrumentFallback = () => {
    return [
      { id: 's1', title: `${instrumentName} Solo 1`, artist: 'Various Artists', album: 'Instrument Collection', coverArt: '/api/placeholder/400/400', duration: '3:45', audioUrl: '' },
      { id: 's2', title: `${instrumentName} Solo 2`, artist: 'Various Artists', album: 'Instrument Collection', coverArt: '/api/placeholder/400/400', duration: '4:21', audioUrl: '' },
      { id: 's3', title: `${instrumentName} Ensemble`, artist: 'Various Artists', album: 'Instrument Collection', coverArt: '/api/placeholder/400/400', duration: '5:12', audioUrl: '' },
    ];
  };

  const displaySongs = instrumentSongs.length > 0 ? instrumentSongs : getSongsByInstrumentFallback();
  
  return (
    <div className="min-h-screen bg-streamr-dark text-white">
      <header className="py-6 px-4 md:px-8 lg:px-12">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="md" />
          <Link
            to="/"
            className="flex items-center text-streamr-gray hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 lg:px-12 pb-32">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {instrumentIcon && React.createElement(instrumentIcon as React.ElementType, { 
              size: 32, 
              className: "text-streamr-blue" 
            })}
            <h1 className="text-3xl md:text-4xl font-bold">{instrumentName}</h1>
          </div>
          <p className="text-streamr-gray">
            Explore the best music featuring {instrumentName} in our collection
          </p>
        </div>

        {displaySongs.length > 0 ? (
          <SongList title={`Top ${instrumentName} Tracks`} songs={displaySongs} />
        ) : (
          <div className="text-center py-12">
            <p className="text-streamr-gray">No songs found for this instrument</p>
          </div>
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

export default InstrumentPage;
