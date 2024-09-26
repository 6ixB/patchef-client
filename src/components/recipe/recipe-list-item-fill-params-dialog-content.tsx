import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Command } from "@/types/command";

export interface RecipeListItemFillParamsDialogContentProps {
  command: Command;
}

const RecipeListItemFillParamsDialogContent = () => {
  return (
    <DialogContent className="w-full max-w-4xl">
      <DialogHeader>
        <DialogTitle>Fill Parameters</DialogTitle>
        <DialogDescription>
          Fill in the parameters for this command.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default RecipeListItemFillParamsDialogContent;
