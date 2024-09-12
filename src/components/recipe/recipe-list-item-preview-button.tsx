import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Command } from '@/types/command';
import { Terminal } from 'lucide-react';

export interface RecipeListItemPreviewButtonProps {
  command: Command;
}

const RecipeListItemPreviewButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Terminal className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Preview command</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RecipeListItemPreviewButton;
