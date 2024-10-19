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
import { useCommandStore } from "@/hooks/use-command-store";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";

const ClearCommandsButton = () => {
  const { destinationCommands, clearDestinationCommands } = useCommandStore();
  const { activeRecipe } = useRecipeStore();

  const isEmpty = destinationCommands.length === 0 || activeRecipe !== null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={true}>
        <Button
          disabled={isEmpty}
          variant="outline"
          className={cn(
            "transition-opacity duration-200",
            isEmpty ? "!opacity-0" : "opacity-100",
          )}
        >
          <TrashIcon className="mr-2 size-4" />
          Clear
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all the
            commands in the recipe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={clearDestinationCommands}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ClearCommandsButton };
