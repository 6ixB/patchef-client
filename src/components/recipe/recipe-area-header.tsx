import { RecipeAreaControls } from "@/components/recipe/recipe-area-controls";
import { CookingPotIcon } from "lucide-react";
import { CreateTemplateButton } from "@/components/recipe/create-template-button";

const RecipeAreaHeader = () => {
  return (
    <div className="flex w-full items-center justify-between border-gray-200 border-b px-8 py-3 dark:border-gray-800">
      <div className="flex min-w-32 items-center gap-x-2">
        <CookingPotIcon className="size-4" />
        <h1 className="font-medium">Recipe</h1>
      </div>
      <CreateTemplateButton />
      <RecipeAreaControls />
    </div>
  );
};

export { RecipeAreaHeader };
