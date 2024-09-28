import { Input } from "@/components/ui/input";
import { useCommandStore } from "@/hooks/use-command-store";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

const CommandSearch = () => {
  const [query, setQuery] = useState("");
  const { filterCommands } = useCommandStore();

  useEffect(() => {
    filterCommands(query);
  }, [filterCommands, query]);

  return (
    <form className="flex w-full items-center justify-center gap-x-4">
      <div className="relative w-full">
        <SearchIcon className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          name="command-search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          placeholder="Filter commands..."
          className="w-full px-8"
        />
        {query && (
          <XIcon
            className="absolute top-2.5 right-2.5 h-4 w-4 cursor-pointer text-muted-foreground"
            onClick={() => {
              setQuery("");
            }}
          />
        )}
      </div>
    </form>
  );
};

export { CommandSearch };
