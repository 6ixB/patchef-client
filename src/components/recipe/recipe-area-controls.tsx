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
import { SquareTerminal, Trash } from "lucide-react";

const RecipeAreaControls = () => {
  const { destinationCommands, clearDestinationCommands } = useCommandStore();

  return (
    <div className="flex items-center gap-x-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={destinationCommands.length === 0}
            variant="destructive"
            className="flex items-center justify-center gap-x-2"
          >
            <Trash className="size-4" />
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
      <Button
        disabled={destinationCommands.length === 0}
        className="flex items-center justify-center gap-x-2"
      >
        <SquareTerminal className="size-4" />
        Preview
      </Button>
    </div>
  );
};

export default RecipeAreaControls;
