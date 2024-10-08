import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Command, CommandParameter } from "@/types/command";
import { RecipeListItemParametersCombobox } from "@/components/recipe/recipe-list-item-parameters-combobox";
import { useState } from "react";
import { RecipeListItemOptionControlsDialog } from "@/components/recipe/recipe-list-item-option-controls-dialog";

export interface RecipeListItemFillParamsDialogContentProps {
  command: Command;
  commandIndex: number;
}

const RecipeListItemFillParamsDialogContent = ({
  command,
  commandIndex,
}: RecipeListItemFillParamsDialogContentProps) => {
  const [open, setOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] =
    useState<CommandParameter | null>(null);

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

export { RecipeListItemFillParamsDialogContent };
