import { CloseRecipeButton } from "@/components/app/recipe/close-recipe-button";
import { CreateRecipeButton } from "@/components/app/recipe/create-recipe-button";
import { useCommandStore } from "@/hooks/use-command-store";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import {
  comparePreviousRecipeWithDestinationCommands,
  isActiveRecipeModified,
} from "@/services/recipes.service";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { EditRecipeButton } from "@/components/app/recipe/edit-recipe-button";

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
    <div className="ml-12 flex items-center gap-x-1">
      <CreateRecipeButton />
      <EditRecipeButton />
      <CloseRecipeButton />
    </div>
  );
};

export { RecipeAreaTitle };
