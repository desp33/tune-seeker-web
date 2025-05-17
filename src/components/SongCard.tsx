
import React from 'react';
import { Link } from 'react-router-dom';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverArt: string;
  duration: string;
}

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  return (
    <Link 
      to={`/song/${song.id}`} 
      className="block bg-streamr-dark-accent rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-lg hover:shadow-streamr-blue/20"
    >
      <div className="relative pb-[100%]">
        <img 
          src={song.coverArt} 
          alt={`${song.title} album art`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white truncate">{song.title}</h3>
        <p className="text-streamr-gray text-sm truncate">{song.artist}</p>
      </div>
    </Link>
  );
};

export default SongCard;
