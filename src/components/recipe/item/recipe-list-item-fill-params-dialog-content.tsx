import { RecipeListItemOptionControlsDialog } from "@/components/recipe/item/recipe-list-item-option-controls-dialog";
import { RecipeListItemParametersCombobox } from "@/components/recipe/item/recipe-list-item-parameters-combobox";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  CommandEntity,
  CommandParameterEntity,
} from "@/types/commands/command.entity";
import { useState } from "react";

interface RecipeListItemFillParamsDialogContentProps {
  command: CommandEntity;
  commandIndex: number;
}

const RecipeListItemFillParamsDialogContent = ({
  command,
  commandIndex,
}: RecipeListItemFillParamsDialogContentProps) => {
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
    <DialogContent className="w-full max-w-2xl">
      <DialogHeader>
        <DialogTitle>Fill parameters and options</DialogTitle>
        <DialogDescription>
          Fill in the parameters and options for this command.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-y-2">
        <RecipeListItemParametersCombobox
          {...RecipeListItemParametersComboboxProps}
        />
        {command.options && command.options.length !== 0 && (
          <RecipeListItemOptionControlsDialog
            command={command}
            commandIndex={commandIndex}
          />
        )}
      </div>
    </DialogContent>
  );
};

export {
  type RecipeListItemFillParamsDialogContentProps,
  RecipeListItemFillParamsDialogContent,
};
