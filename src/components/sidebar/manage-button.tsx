import { WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ManageDialogContent } from "@/components/sidebar/manage-dialog-content";
import { ManageState } from "@/types/use-command.store";

const ManageButton = () => {
  const { setManageState, setDraftCommand } = useCommandStore();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          /*
          Set the manage state to view when the dialog is opened
          to show the command data table by default
        */
          setManageState(ManageState.View);
        } else {
          /* 
          Reset the draft command when the dialog is closed
          to prevent the dialog from showing the previous command
        */
          setDraftCommand(null);
        }
      }}
    >
      <DialogTrigger asChild={true}>
        <Button className="flex items-center justify-center gap-x-2">
          <WrenchIcon className="size-4" />
          Manage
        </Button>
      </DialogTrigger>
      <ManageDialogContent />
    </Dialog>
  );
};

export { ManageButton };
