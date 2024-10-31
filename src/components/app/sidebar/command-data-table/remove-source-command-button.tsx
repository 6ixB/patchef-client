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
    await removeCommandMutation.mutateAsync(command);

    removeSourceCommand(command.originalId);
    toast.success(`Command removed successfully - ${command.name}`);
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
