'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { destinations, type Destination } from '@/lib/destinations';
import { Search } from 'lucide-react';

export default function DestinationSearch() {
  const [query, setQuery] = useState('');
  
  const filteredDestinations = useMemo(() => {
    if (!query) {
      return [];
    }
    return destinations
      .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5); // Limit to 5 suggestions
  }, [query]);

  const handleSelect = () => {
    // Reset query after selection, or navigate, etc.
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="e.g., Tokyo, Japan"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 text-lg"
          />
        </div>
        <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90">
          Search
        </Button>
      </div>
      {filteredDestinations.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-md border bg-background shadow-lg z-10">
          <ul>
            {filteredDestinations.map((destination) => (
              <li key={destination.id} className="border-b last:border-b-0">
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="block p-4 hover:bg-accent/50"
                  onClick={handleSelect}
                >
                  <p className="font-semibold">{destination.name}</p>
                  <p className="text-sm text-muted-foreground">{destination.shortDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
