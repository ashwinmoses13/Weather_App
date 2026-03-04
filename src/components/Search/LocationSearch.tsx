import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useLocations } from '../../hooks/useWeather';
import { LocationResult } from '../../types/weather';

interface LocationSearchProps {
  onSelect: (location: string) => void;
  placeholder?: string;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelect,
  placeholder = 'Search for a city...',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useLocations(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: LocationResult) => {
    onSelect(location.name);
    setQuery(location.name);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="glass-input w-full pl-12 pr-12 py-4 text-lg"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 animate-spin" />
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card max-h-80 overflow-y-auto z-50">
          {data?.results && data.results.length > 0 ? (
            <ul className="space-y-1">
              {data.results.map((location) => (
                <li
                  key={location.id}
                  onClick={() => handleSelect(location)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <MapPin className="w-5 h-5 text-secondary-light flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-100">{location.name}</p>
                    <p className="text-sm text-slate-400">
                      {location.region}, {location.country}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-slate-400">
              {isLoading ? 'Searching...' : 'No locations found'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
