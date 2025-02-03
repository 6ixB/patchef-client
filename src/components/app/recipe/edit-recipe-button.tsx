import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { cn } from "@/lib/utils";
import { ManageRecipeState } from "@/types/hooks/use-recipe-store";
import { PencilIcon, SaveIcon } from "lucide-react";

const EditRecipeButton = () => {
  const { destinationCommands } = useCommandStore();
  const { activeRecipe, manageRecipeState, setManageRecipeState } =
    useRecipeStore();

  const noActiveRecipe =
    activeRecipe === null && destinationCommands.length === 0;

  return (
    activeRecipe && (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (manageRecipeState === ManageRecipeState.View) {
            setManageRecipeState(ManageRecipeState.Edit);
          } else {
            setManageRecipeState(ManageRecipeState.View);
          }
        }}
        className={cn(
          "cursor-pointer p-2.5 hover:bg-gray-200 dark:hover:bg-gray-800",
          noActiveRecipe ? "!opacity-0" : "opacity-100",
        )}
      >
        {manageRecipeState === ManageRecipeState.View ? (
          <PencilIcon className="size-4" />
        ) : (
          <SaveIcon className="size-4" />
        )}
      </Button>
    )
  );
};

export { EditRecipeButton };
