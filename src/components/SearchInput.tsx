
import React, { useState } from 'react';
import { Search, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onFileUpload: (file: File) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, onFileUpload }) => {
  const [query, setQuery] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-streamr-gray">
          <Search size={20} />
        </div>
        
        <input
          type="text"
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
    </form>
  );
};

export default SearchInput;
