import { RecipeTemplateListItemApplyButton } from "@/components/recipe/template/recipe-template-list-item-apply-button";
import { RecipeTemplateListItemRemoveButton } from "@/components/recipe/template/recipe-template-list-item-remove-button";
import { Card, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/types/recipe";
import { CookingPotIcon } from "lucide-react";

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
        <RecipeTemplateListItemRemoveButton recipe={recipe} />
        <RecipeTemplateListItemApplyButton recipe={recipe} />
      </div>
    </Card>
  );
};

export { type RecipeTemplateListItemProps, RecipeTemplateListItem };
