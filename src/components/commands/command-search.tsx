import { Input } from '@/components/ui/input';
import { useCommandStore } from '@/hooks/use-command-store';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const CommandSearch = () => {
  const [query, setQuery] = useState('');
  const { filterCommands } = useCommandStore();

  useEffect(() => {
    filterCommands(query);
  }, [filterCommands, query]);

  return (
    <form className="w-full flex items-center justify-center gap-x-4">
      <div className="w-full relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
          value={query}
          placeholder="Search"
          className="px-8 w-full"
        />
        {query && (
          <X
            className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
            onClick={() => {
              setQuery('');
            }}
          />
        )}
      </div>
    </form>
  );
};

export default CommandSearch;
