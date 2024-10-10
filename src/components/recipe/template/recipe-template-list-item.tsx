import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/types/recipe";
import { ArrowRightToLineIcon, CookingPotIcon, TrashIcon } from "lucide-react";

interface RecipeTemplateListItemProps {
  recipe: Recipe;
}

const RecipeTemplateListItem = ({ recipe }: RecipeTemplateListItemProps) => {
  return (
    <Card className="flex select-none items-center justify-between rounded-sm ps-4 pe-2 pt-4 pb-4">
      <div className="flex items-center gap-x-2">
        <CookingPotIcon className="size-4" />
        <CardTitle className="text-sm">{recipe.name}</CardTitle>
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon">
          <TrashIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <ArrowRightToLineIcon className="size-4" />
        </Button>
      </div>
    </Card>
  );
};

export { type RecipeTemplateListItemProps, RecipeTemplateListItem };
