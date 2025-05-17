
import React from 'react';
import SongCard, { Song } from './SongCard';

interface SongListProps {
  title: string;
  songs: Song[];
}

const SongList: React.FC<SongListProps> = ({ title, songs }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default SongList;
