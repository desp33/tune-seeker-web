
import React from 'react';
import SongList from './SongList';
import { getRecommendedSongs } from '@/services/songService';

const YouMayLike: React.FC = () => {
  const recommendedSongs = getRecommendedSongs();
  
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-4">You May Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {recommendedSongs.map((song) => (
          <div key={song.id} className="bg-streamr-dark-accent p-3 rounded-lg transition-transform hover:scale-105">
            <div className="flex justify-center">
              <div className="w-[76%] aspect-square rounded overflow-hidden mb-2">
                <img 
                  src={song.coverArt} 
                  alt={song.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-white text-sm font-medium truncate">{song.title}</p>
              <p className="text-streamr-gray text-xs truncate">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouMayLike;
