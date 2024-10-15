import { CloseRecipeButton } from "@/components/recipe/close-recipe-button";
import { CreateRecipeButton } from "@/components/recipe/create-recipe-button";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { useCommandStore } from "@/hooks/use-command-store";
import {
  comparePreviousRecipeWithDestinationCommands,
  isActiveRecipeModified,
} from "@/lib/utils";
import { useEffect } from "react";
import { useDocumentTitle } from "@uidotdev/usehooks";

const RecipeAreaTitle = () => {
  const { destinationCommands } = useCommandStore();
  const {
    activeRecipe,
    setActiveRecipe,
    previousActiveRecipe,
    setPreviousActiveRecipe,
  } = useRecipeStore();

  useDocumentTitle(activeRecipe ? `PatChef - ${activeRecipe.name}` : "PatChef");

  useEffect(() => {
    // If the active recipe exists and it has been modified
    if (
      activeRecipe &&
      isActiveRecipeModified(activeRecipe, destinationCommands)
    ) {
      setActiveRecipe(null);
      setPreviousActiveRecipe(activeRecipe);
    }

    // If the active recipe does not exist and the previous active recipe exists
    // and the previous active recipe is the same as the destination commands
    if (
      !activeRecipe &&
      previousActiveRecipe &&
      comparePreviousRecipeWithDestinationCommands(
        previousActiveRecipe,
        destinationCommands,
      )
    ) {
      setActiveRecipe(previousActiveRecipe);
    }
  }, [
    destinationCommands,
    activeRecipe,
    setActiveRecipe,
    previousActiveRecipe,
    setPreviousActiveRecipe,
  ]);

  return (
    <div className="flex items-center gap-x-1">
      <CreateRecipeButton />
      <CloseRecipeButton />
    </div>
  );
};

export { RecipeAreaTitle };
