import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Command } from "@/types/command";
import { VariableIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RecipeListItemFillParamsDialogContent } from "@/components/recipe/recipe-list-item-fill-params-dialog-content";

export interface RecipeListItemFillParamsButtonProps {
  command: Command;
}

const RecipeListItemFillParamsButton = () => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild={true}>
            <TooltipTrigger asChild={true}>
              <Button variant="outline" size="icon">
                <VariableIcon className="size-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Fill command parameters</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <RecipeListItemFillParamsDialogContent />
    </Dialog>
  );
};

export { RecipeListItemFillParamsButton };
