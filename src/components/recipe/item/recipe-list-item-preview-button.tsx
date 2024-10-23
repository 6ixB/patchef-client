import { RecipeListItemPreviewDialogContent } from "@/components/recipe/item/recipe-list-item-preview-dialog-content";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CommandEntity } from "@/types/commands/command.entity";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { TerminalIcon } from "lucide-react";

interface RecipeListItemPreviewButtonProps {
  command: CommandEntity;
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

export { type RecipeListItemPreviewButtonProps, RecipeListItemPreviewButton };
