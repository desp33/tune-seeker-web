import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  duration: string;
  audioUrl: string;
  genreId?: string;
  instrumentIds?: string[];
}

interface SongListProps {
  title: string;
  songs: Song[];
  cardClassName?: string;  // Optional prop for card styling
}

const SongList: React.FC<SongListProps> = ({ title, songs, cardClassName }) => {
  const navigate = useNavigate();

  const handleSongClick = (songId: string) => {
    navigate(`/song/${songId}`);
  };

  return (
    <div>
      <h3 className="text-white text-lg mb-4">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {songs.map((song) => (
          <div 
            key={song.id} 
            className={`w-[160px] bg-streamr-dark-accent rounded-lg overflow-hidden shadow-lg hover:shadow-streamr-blue transition-all cursor-pointer hover:scale-105 ${cardClassName ?? ''}`}
            onClick={() => handleSongClick(song.id)}
          >
            <img 
              src={song.coverArt} 
              alt={song.title} 
              className="w-full h-40 object-cover" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/400/400';
              }}
            />
            <div className="p-3 text-white">
              <h4 className="truncate font-semibold">{song.title}</h4>
              <p className="text-sm text-streamr-gray truncate">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;