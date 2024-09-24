import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Command } from "@/types/command";
import { TerminalIcon } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import RecipeListItemPreviewDialogContent from "@/components/recipe/recipe-list-item-preview-dialog-content";

export interface RecipeListItemPreviewButtonProps {
  command: Command;
}

const RecipeListItemPreviewButton = ({
  command,
}: RecipeListItemPreviewButtonProps) => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild={true}>
            <TooltipTrigger asChild={true}>
              <Button variant="outline" size="icon">
                <TerminalIcon className="size-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Preview Command</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <RecipeListItemPreviewDialogContent command={command} />
    </Dialog>
  );
};

export default RecipeListItemPreviewButton;
