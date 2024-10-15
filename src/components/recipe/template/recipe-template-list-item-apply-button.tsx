import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import type { Recipe } from "@/types/recipe";
import { ArrowRightToLineIcon } from "lucide-react";
import { useCallback, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RecipeTemplateListItemApplyButtonProps {
  recipe: Recipe;
}

const RecipeTemplateListItemApplyButton = ({
  recipe,
}: RecipeTemplateListItemApplyButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const { destinationCommands, setDestinationCommands } = useCommandStore();
  const { setActiveRecipe } = useRecipeStore();

  const openDialog = useCallback(() => {
    setShowDialog(true);
  }, []);

  const applyRecipe = useCallback(() => {
    setDestinationCommands([...recipe.commands]);
    setActiveRecipe(recipe);
  }, [recipe, setDestinationCommands, setActiveRecipe]);

  const handleConfirm = useCallback(() => {
    applyRecipe();
    setShowDialog(false);
  }, [applyRecipe]);

  const handleCancel = useCallback(() => {
    setShowDialog(false);
  }, []);

  const handleApplyRecipeClick = () => {
    if (destinationCommands.length > 0) {
      openDialog();
      return;
    }

    applyRecipe();
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleApplyRecipeClick}>
        <ArrowRightToLineIcon className="size-4" />
      </Button>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Recipe area not empty, are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently replace all
              commands in the recipe area.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export {
  type RecipeTemplateListItemApplyButtonProps,
  RecipeTemplateListItemApplyButton,
};
