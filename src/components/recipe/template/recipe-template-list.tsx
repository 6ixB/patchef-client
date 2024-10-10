import { ScrollArea } from "@/components/ui/scroll-area";
import { RecipeTemplateListItem } from "@/components/recipe/template/recipe-template-list-item";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { Card, CardTitle } from "@/components/ui/card";
import { RabbitIcon } from "lucide-react";

const RecipeTemplateList = () => {
  const { recipes } = useRecipeStore();

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-y-2 px-8 pb-4">
        {recipes.length !== 0 ? (
          recipes.map((recipe) => (
            <RecipeTemplateListItem key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <Card className="flex items-center gap-x-2 rounded-sm p-4">
            <RabbitIcon className="size-4" />
            <CardTitle className="text-sm">No recipes exist yet</CardTitle>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};

export { RecipeTemplateList };
