import { RecipeListItemFillParamsDialogContent } from "@/components/recipe/item/recipe-list-item-fill-params-dialog-content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CommandEntity } from "@/types/commands/command.entity";
import { VariableIcon } from "lucide-react";

interface RecipeListItemFillParamsButtonProps {
  command: CommandEntity;
  commandIndex: number;
}

const RecipeListItemFillParamsButton = ({
  command,
  commandIndex,
}: RecipeListItemFillParamsButtonProps) => {
  const hasNoParametersAndOptions = !(command.parameters || command.options);

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild={true}>
            <TooltipTrigger asChild={true}>
              <Button
                variant="outline"
                size="icon"
                disabled={hasNoParametersAndOptions}
              >
                <VariableIcon className="size-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Fill command parameters</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <RecipeListItemFillParamsDialogContent
        command={command}
        commandIndex={commandIndex}
      />
    </Dialog>
  );
};

export {
  type RecipeListItemFillParamsButtonProps,
  RecipeListItemFillParamsButton,
};
