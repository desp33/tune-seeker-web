import React, { useRef } from 'react';
import { Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Song } from '@/components/SongCard';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onFileUpload: (file: File) => void;
  allSongs: Song[];
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, onFileUpload, allSongs }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map songs to the format expected by ReactSearchAutocomplete
  const items = allSongs.map((song) => ({
    id: song.id,
    name: `${song.title} - ${song.artist}`,
    ...song,
  }));

  const handleOnSelect = (item: any) => {
    onSearch(item.name);
  };

  const handleOnSearch = (string: string, results: any[]) => {
    // Optional: handle search input changes
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="relative flex items-center">
        <div className="w-full">
         <ReactSearchAutocomplete
  items={items}
  onSearch={handleOnSearch}
  onSelect={handleOnSelect}
  autoFocus
  placeholder="Search for a song..."
  styling={{
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    fontSize: "16px",
    iconColor: "#aaa",
    placeholderColor: "#777",
    clearIconMargin: "3px 8px 0 0",
    searchIconMargin: "0 0 0 16px",
    border: "1px solid #333",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
    zIndex: 100,
    height: "48px",
    lineColor: "#444",
    hoverBackgroundColor: "#292929"
  }}
/>

        </div>

        <div className="absolute right-4 flex items-center">
          <Button
            type="button"
            onClick={triggerFileInput}
            variant="ghost"
            size="icon"
            className="text-streamr-gray hover:text-white mr-2"
          >
            <Paperclip size={20} />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
