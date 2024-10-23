import { fetchRecipes as fetchRecipesApi } from "@/api/recipe.api";
import { RecipeTemplateListItem } from "@/components/recipe/template/recipe-template-list-item";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { useQuery } from "@tanstack/react-query";
import { RabbitIcon, ServerCrashIcon } from "lucide-react";
import { useEffect } from "react";
import { RecipeTemplateListItemSkeleton } from "./recipe-template-list-item-skeleton";

const RecipeTemplateList = () => {
  const { recipes, setRecipes, setInitialRecipes } = useRecipeStore();

  const { status, data } = useQuery({
    queryKey: ["get-recipes"],
    queryFn: fetchRecipesApi,
  });

  useEffect(() => {
    if (data) {
      /* We must set the recipes and the initial recipes to the fetched data. */
      setRecipes(data);
      setInitialRecipes(data);
    }
  }, [data, setRecipes, setInitialRecipes]);

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-y-2 px-8 pb-4">
        {status === "success" ? (
          recipes.length !== 0 ? (
            recipes.map((recipe) => (
              <RecipeTemplateListItem key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <Card className="flex items-center gap-x-2 rounded-sm p-4">
              <RabbitIcon className="size-4" />
              <CardTitle className="text-sm">No recipes exist yet</CardTitle>
            </Card>
          )
        ) : status === "pending" ? (
          Array.from({ length: 10 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: It's just a skeleton (-_-) - MY23-1
            <RecipeTemplateListItemSkeleton key={index} />
          ))
        ) : (
          <Card className="flex items-center gap-x-2 rounded-sm p-4">
            <ServerCrashIcon className="size-4" />
            <CardTitle className="text-sm">
              Failed to fetch recipes :(
            </CardTitle>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};

export { RecipeTemplateList };
