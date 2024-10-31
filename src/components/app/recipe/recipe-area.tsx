import { RecipeAreaHeader } from "@/components/app/recipe/recipe-area-header";
import { RecipeDropZone } from "@/components/app/recipe/recipe-drop-zone";

const RecipeArea = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <RecipeAreaHeader />
      <RecipeDropZone />
    </div>
  );
};

export { RecipeArea };
