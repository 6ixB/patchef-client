import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import type { Recipe } from "@/types/recipe";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

interface RecipeTemplateListItemRemoveButtonProps {
  recipe: Recipe;
}

const RecipeTemplateListItemRemoveButton = ({
  recipe,
}: RecipeTemplateListItemRemoveButtonProps) => {
  const { removeRecipe } = useRecipeStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={true}>
        <Button variant="ghost" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            recipe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              removeRecipe(recipe.id);
              toast.success(`Recipe removed successfully - ${recipe.name}`);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export {
  type RecipeTemplateListItemRemoveButtonProps,
  RecipeTemplateListItemRemoveButton,
};
