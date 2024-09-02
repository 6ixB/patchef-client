import { SquareTerminal } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className="px-8 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 select-none">
      <div className="flex items-center justify-center gap-x-2">
        <SquareTerminal className="size-6" />
        <h1 className="text-black text-xl dark:text-white font-medium">
          patchef
        </h1>
      </div>
      <ModeToggle />
    </header>
  );
};

export default Header;
