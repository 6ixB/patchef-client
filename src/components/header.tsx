import { Heart, SquareTerminal } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="px-8 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 select-none">
      <div className="flex items-center justify-center gap-x-2">
        <SquareTerminal className="size-6" />
        <h1 className="text-black text-xl dark:text-white font-medium">
          patchef
        </h1>
      </div>
      <div className="flex items-center gap-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.instagram.com/jermyst"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <div className="flex items-center text-xs font-medium">
                    Made with&nbsp;
                    <Heart className="size-3 fill-red-400 stroke-none" />
                    &nbsp;by MY
                  </div>
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Di follow dulu yuk!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
