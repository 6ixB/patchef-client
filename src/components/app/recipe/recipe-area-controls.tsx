import { ClearCommandsButton } from "@/components/app/recipe/clear-commands-button";
import { PreviewCommandsButton } from "@/components/app/recipe/preview-commands-button";
import { PublishRecipeButton } from "@/components/app/recipe/publish-recipe-button";

const RecipeAreaControls = () => {
  return (
    <div className="flex items-center gap-x-2">
      <ClearCommandsButton />
      <PreviewCommandsButton />
      <PublishRecipeButton />
    </div>
  );
};

export { RecipeAreaControls };
