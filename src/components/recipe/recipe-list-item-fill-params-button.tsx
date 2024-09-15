import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Command } from '@/types/command';
import { Variable } from 'lucide-react';

export interface RecipeListItemFillParamsButtonProps {
  command: Command;
}

const RecipeListItemFillParamsButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button variant="outline" size="icon">
            <Variable className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Fill command parameters</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RecipeListItemFillParamsButton;
