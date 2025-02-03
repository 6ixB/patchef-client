import { ManageDialogContent } from "@/components/app/sidebar/manage-dialog-content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useCommandStore } from "@/hooks/use-command-store";
import { ManageCommandState } from "@/types/hooks/use-command.store";
import { WrenchIcon } from "lucide-react";

const ManageButton = () => {
  const { setManageCommandState: setManageState, setDraftCommand } =
    useCommandStore();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          /*
          Set the manage state to view when the dialog is opened
          to show the command data table by default
        */
          setManageState(ManageCommandState.View);
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
        <Button>
          <WrenchIcon className="mr-2 size-4" />
          Manage
        </Button>
      </DialogTrigger>
      <ManageDialogContent />
    </Dialog>
  );
};

export { ManageButton };
