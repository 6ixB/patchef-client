import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import { SquareTerminalIcon, TrashIcon } from "lucide-react";
import { ClearAlertDialogContent } from "@/components/recipe/clear-alert-dialog-content";
import { PreviewRecipeDialogContent } from "@/components/recipe/preview-recipe-dialog-content";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const RecipeAreaControls = () => {
  const { destinationCommands, setCommandPreviews } = useCommandStore();

  const isEmpty = destinationCommands.length === 0;

  return (
    <div className="flex items-center gap-x-2">
      <AlertDialog>
        <AlertDialogTrigger asChild={true}>
          <Button disabled={isEmpty} variant="outline">
            <TrashIcon className="mr-2 size-4" />
            Clear
          </Button>
        </AlertDialogTrigger>
        <ClearAlertDialogContent />
      </AlertDialog>
      <Dialog>
        <DialogTrigger asChild={true}>
          <Button disabled={isEmpty} onClick={setCommandPreviews}>
            <SquareTerminalIcon className="mr-2 size-4" />
            Preview
          </Button>
        </DialogTrigger>
        <PreviewRecipeDialogContent />
      </Dialog>
    </div>
  );
};

export { RecipeAreaControls };
