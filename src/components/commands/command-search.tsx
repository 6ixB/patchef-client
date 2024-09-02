import { Input } from "@/components/ui/input";
import { useCommandStore } from "@/hooks/use-command-store";
import { Search } from "lucide-react";

const CommandSearch = () => {
  const { filterCommands } = useCommandStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterCommands(e.target.value);
  };

  return (
    <form className="w-full flex items-center justify-center gap-x-4">
      <div className="w-full relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          onChange={handleOnChange}
          placeholder="Search"
          className="pl-8 w-full"
        />
      </div>
    </form>
  );
};

export default CommandSearch;
