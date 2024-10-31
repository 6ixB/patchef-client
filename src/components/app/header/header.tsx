import { ContributorList } from "@/components/app/header/contributor-list";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "@tanstack/react-router";
import { ExternalLinkIcon, SquareTerminalIcon } from "lucide-react";

const DocsLink = () => (
  <Link to="/docs">
    <Badge className="gap-x-1">
      Docs
      <ExternalLinkIcon className="size-3" />
    </Badge>
  </Link>
);

const Header = () => {
  return (
    <header className="flex select-none items-center justify-between border-gray-200 border-b px-8 py-2 dark:border-gray-800">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center justify-center gap-x-2">
          <SquareTerminalIcon className="size-6" />
          <h1 className="font-bold text-black dark:text-white">PatChef</h1>
        </div>
        <DocsLink />
      </div>
      <div className="flex items-center gap-x-8">
        <ContributorList />
        <ModeToggle />
      </div>
    </header>
  );
};

export { Header };
