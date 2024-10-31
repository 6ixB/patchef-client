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
import type { RecipeEntity } from "@/types/recipes/recipe.entity";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { removeRecipe as removeRecipeApi } from "@/api/recipe.api";
import { useMutation } from "@tanstack/react-query";

interface RecipeTemplateListItemRemoveButtonProps {
  recipe: RecipeEntity;
}

const RecipeTemplateListItemRemoveButton = ({
  recipe,
}: RecipeTemplateListItemRemoveButtonProps) => {
  const { removeRecipe } = useRecipeStore();

  const removeCommandMutation = useMutation({
    mutationKey: ["remove-recipe", recipe.id],
    mutationFn: removeRecipeApi,
  });

  const handleSubmit = async () => {
    await removeCommandMutation.mutateAsync(recipe);

    removeRecipe(recipe.id);
    toast.success(`Recipe removed successfully - ${recipe.name}`);
  };

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
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export {
  type RecipeTemplateListItemRemoveButtonProps,
  RecipeTemplateListItemRemoveButton,
};
