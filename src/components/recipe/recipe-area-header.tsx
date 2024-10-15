import { RecipeAreaControls } from "@/components/recipe/recipe-area-controls";
import { CookingPotIcon } from "lucide-react";
import { RecipeAreaTitle } from "@/components/recipe/recipe-area-title";

const RecipeAreaHeader = () => {
  return (
    <div className="flex w-full items-center justify-between border-gray-200 border-b px-8 py-3 dark:border-gray-800">
      <div className="flex min-w-32 items-center gap-x-2">
        <CookingPotIcon className="size-4" />
        <h1 className="font-medium">Recipe</h1>
      </div>
      <RecipeAreaTitle />
      <RecipeAreaControls />
    </div>
  );
};

export { RecipeAreaHeader };
