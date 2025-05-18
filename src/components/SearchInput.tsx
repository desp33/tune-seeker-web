
import React, { useState, useRef, useEffect } from 'react';
import { Search, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { Song } from '@/components/SongCard';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onFileUpload: (file: File) => void;
  allSongs: Song[];
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, onFileUpload, allSongs }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim().length >= 1) {
      // Filter songs based on query
      const filteredSongs = allSongs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSuggestions(filteredSongs);
      setOpen(filteredSongs.length > 0);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }, [query, allSongs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setOpen(false);
    }
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

  const handleSuggestionClick = (songTitle: string) => {
    setQuery(songTitle);
    onSearch(songTitle);
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-streamr-gray">
              <Search size={20} />
            </div>
            
            <input
              type="text"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a song..."
              className="w-full bg-streamr-dark-accent border border-gray-700 rounded-full py-3 pl-12 pr-24 text-white search-input focus:outline-none focus:ring-2 focus:ring-streamr-blue"
            />
            
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
              
              <Button
                type="submit"
                className="bg-streamr-blue hover:bg-streamr-blue/80 text-white rounded-full px-4 py-2 text-sm"
              >
                Search
              </Button>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[calc(100%-2rem)] max-w-2xl mx-auto bg-streamr-dark-accent border-gray-700" 
          align="start" 
          sideOffset={4}
        >
          {suggestions.length > 0 && (
            <Command className="bg-transparent">
              <CommandList>
                {suggestions.map((song) => (
                  <CommandItem
                    key={song.id}
                    onSelect={() => handleSuggestionClick(song.title)}
                    className="flex items-center py-3 px-4 cursor-pointer hover:bg-gray-800 text-white"
                  >
                    <div className="h-8 w-8 mr-3 rounded overflow-hidden">
                      <img src={song.cover} alt={song.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{song.title}</p>
                      <p className="text-xs text-streamr-gray">{song.artist}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </form>
  );
};

export default SearchInput;
