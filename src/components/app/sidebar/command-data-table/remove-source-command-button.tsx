import { removeCommand as removeCommandApi } from "@/api/command.api";
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
import type { CommandEntity } from "@/types/commands/command.entity";
import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

interface RemoveSourceCommandButtonProps {
  command: CommandEntity;
}

const RemoveSourceCommandButton = ({
  command,
}: RemoveSourceCommandButtonProps) => {
  const { removeSourceCommand } = useCommandStore();

  const removeCommandMutation = useMutation({
    mutationKey: ["remove-command", command.originalId],
    mutationFn: removeCommandApi,
  });

  const handleSubmit = async () => {
    const removeCommand = async () => {
      const removedCommand = await removeCommandMutation.mutateAsync(command);
      removeSourceCommand(command.originalId);
      return removedCommand;
    };

    toast.promise(removeCommand, {
      loading: "Removing command...",
      success: (updatedCommand) => {
        return `Command removed successfully! - ${updatedCommand.name}`;
      },
      error: (error) => {
        console.error("An unexpected error occurred:", error);
        return "An error occurred while removing the command.";
      },
    });
  };

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
            This action cannot be undone. This will permanently delete the
            command.
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

export { type RemoveSourceCommandButtonProps, RemoveSourceCommandButton };
