import { SquareTerminalIcon } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { ContributorList } from "@/components/header/contributor-list";

const Header = () => {
  return (
    <header className="flex select-none items-center justify-between border-gray-200 border-b px-8 py-2 dark:border-gray-800">
      <div className="flex items-end gap-x-4">
        <div className="flex items-center justify-center gap-x-2">
          <SquareTerminalIcon className="size-6" />
          <h1 className="font-medium text-black text-xl dark:text-white">
            patchef
          </h1>
        </div>
        <Badge>Build version 1.0.0-dev</Badge>
      </div>
      <div className="flex items-center gap-x-8">
        <ContributorList />
        <ModeToggle />
      </div>
    </header>
  );
};

export { Header };
