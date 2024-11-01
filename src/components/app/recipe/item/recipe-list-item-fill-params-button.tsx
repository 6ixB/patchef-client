import { RecipeListItemFillParamsPopoverContent } from "@/components/app/recipe/item/recipe-list-item-fill-params-popover-content";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import type { CommandEntity } from "@/types/commands/command.entity";
import { VariableIcon } from "lucide-react";

interface RecipeListItemFillParamsButtonProps {
  command: CommandEntity;
  commandIndex: number;
  setDisabled: (disabled: boolean) => void;
}

const RecipeListItemFillParamsButton = ({
  command,
  commandIndex,
  setDisabled,
}: RecipeListItemFillParamsButtonProps) => {
  const hasNoParametersAndOptions = !(command.parameters || command.options);

  return (
    <Popover
      onOpenChange={(open) => {
        if (open) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      }}
    >
      <PopoverTrigger asChild={true}>
        <Button
          variant="outline"
          size="icon"
          disabled={hasNoParametersAndOptions}
        >
          <VariableIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <RecipeListItemFillParamsPopoverContent
        command={command}
        commandIndex={commandIndex}
      />
    </Popover>
  );
};

export {
  type RecipeListItemFillParamsButtonProps,
  RecipeListItemFillParamsButton,
};
