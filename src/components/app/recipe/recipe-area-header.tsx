import { RecipeAreaControls } from "@/components/app/recipe/recipe-area-controls";
import { RecipeAreaTitle } from "@/components/app/recipe/recipe-area-title";
import { Badge } from "@/components/ui/badge";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { ManageRecipeState } from "@/types/hooks/use-recipe-store";
import { CookingPotIcon, EyeIcon, PencilIcon } from "lucide-react";

const RecipeAreaHeader = () => {
  const { activeRecipe, manageRecipeState } = useRecipeStore();

  return (
    <div className="flex w-full items-center justify-between border-gray-200 border-b px-8 py-3 dark:border-gray-800">
      <div className="flex min-w-48 items-center justify-between">
        <div className="flex items-center gap-x-2">
          <CookingPotIcon className="size-4" />
          <h1 className="font-medium">Recipe</h1>
        </div>
        {/* Badge to indicate the active recipe manage state */}
        {activeRecipe && (
          <Badge>
            {manageRecipeState === ManageRecipeState.View ? (
              <>
                <EyeIcon className="mr-1 size-3" />
                View Mode
              </>
            ) : (
              <>
                <PencilIcon className="mr-1 size-3" />
                Edit Mode
              </>
            )}
          </Badge>
        )}
      </div>
      <RecipeAreaTitle />
      <RecipeAreaControls />
    </div>
  );
};

export { RecipeAreaHeader };
