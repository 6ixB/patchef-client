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
import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import type { RecipeEntity } from "@/types/recipes/recipe.entity";
import { useMutation } from "@tanstack/react-query";
import { ArrowRightToLineIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { v4 as generateUuidV4 } from "uuid";
import { removeRecipe as removeRecipeApi } from "@/api/recipe.api";

interface RecipeTemplateListItemApplyButtonProps {
  recipe: RecipeEntity;
}

const RecipeTemplateListItemApplyButton = ({
  recipe,
}: RecipeTemplateListItemApplyButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const { destinationCommands, setDestinationCommands } = useCommandStore();
  const { setActiveRecipe, removeRecipe } = useRecipeStore();

  const removeCommandMutation = useMutation({
    mutationKey: ["remove-recipe", recipe.id],
    mutationFn: removeRecipeApi,
  });

  const openDialog = useCallback(() => {
    setShowDialog(true);
  }, []);

  const applyRecipe = useCallback(() => {
    if (!recipe.commands) {
      const promise = () =>
        new Promise<void>((resolve) =>
          setTimeout(async () => {
            await removeCommandMutation.mutateAsync(recipe);
            removeRecipe(recipe.id);
            resolve();
          }, 3000),
        );

      toast.promise(promise, {
        loading: "Recipe has no commands, removing recipe...",
        success: () => {
          return `Recipe removed successfully - ${recipe.name}`;
        },
        error: "Error",
      });
      return;
    }

    /* 
      To prevent drag and drop issues, we need to create a new array of commands,
      with new ids for each command. Because the drag and drop library uses the id to
      identify the commands. If we don't change the id, the drag and drop library will
      drag the the source command not the destination command.
      - MY23-1
    */
    const sanitizedCommands = [...recipe.commands].map((command) => ({
      ...command,
      id: generateUuidV4(),
    }));
    setDestinationCommands([...sanitizedCommands]);
    setActiveRecipe(recipe);
  }, [
    recipe,
    setDestinationCommands,
    setActiveRecipe,
    removeRecipe,
    removeCommandMutation.mutateAsync,
  ]);

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
