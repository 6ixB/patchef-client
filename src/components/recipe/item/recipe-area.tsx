import { RecipeAreaHeader } from "@/components/recipe/item/recipe-area-header";
import { RecipeDropZone } from "@/components/recipe/item/recipe-drop-zone";

const RecipeArea = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <RecipeAreaHeader />
      <RecipeDropZone />
    </div>
  );
};

export { RecipeArea };
