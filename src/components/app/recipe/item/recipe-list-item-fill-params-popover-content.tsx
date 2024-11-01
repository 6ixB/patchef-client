import { RecipeListItemOptionControlsPopover } from "@/components/app/recipe/item/recipe-list-item-option-controls-popover";
import { RecipeListItemParametersCombobox } from "@/components/app/recipe/item/recipe-list-item-parameters-combobox";
import { PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {
  CommandEntity,
  CommandParameterEntity,
} from "@/types/commands/command.entity";
import { useState } from "react";

interface RecipeListItemFillParamsPopoverContentProps {
  command: CommandEntity;
  commandIndex: number;
}

const RecipeListItemFillParamsPopoverContent = ({
  command,
  commandIndex,
}: RecipeListItemFillParamsPopoverContentProps) => {
  const [open, setOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] =
    useState<CommandParameterEntity | null>(null);

  const RecipeListItemParametersComboboxProps = {
    command,
    commandIndex,
    open,
    setOpen,
    selectedParameter,
    setSelectedParameter,
  };

  return (
    <PopoverContent className="w-full max-w-2xl">
      <ScrollArea>
        <div className="flex max-h-[40rem] flex-col gap-y-4 p-0.5">
          <div className="flex flex-col gap-y-2">
            <RecipeListItemParametersCombobox
              {...RecipeListItemParametersComboboxProps}
            />
            <RecipeListItemOptionControlsPopover
              command={command}
              commandIndex={commandIndex}
            />
          </div>
        </div>
      </ScrollArea>
    </PopoverContent>
  );
};

export {
  type RecipeListItemFillParamsPopoverContentProps,
  RecipeListItemFillParamsPopoverContent,
};
