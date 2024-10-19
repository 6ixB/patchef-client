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
import type { Command } from "@/types/command";
import { TrashIcon } from "lucide-react";

interface RecipeListItemRemoveButtonProps {
  command: Command;
}

const RecipeListItemRemoveButton = ({
  command,
}: RecipeListItemRemoveButtonProps) => {
  const { removeDestinationCommand } = useCommandStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={true}>
        <Button variant="outline" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            command in the recipe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              removeDestinationCommand(command.id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { type RecipeListItemRemoveButtonProps, RecipeListItemRemoveButton };
