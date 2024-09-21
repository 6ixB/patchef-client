import { WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import { Icons } from "@/components/ui/icons";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ManageDialogContent from "@/components/sidebar/manage-dialog-content";
import { ManageState } from "@/types/use-command.store";

const ManageButton = () => {
  const { isManaging, setIsManaging, setManageState, setDraftCommand } =
    useCommandStore();

  return (
    <Dialog
      onOpenChange={(open) => {
        setIsManaging(!isManaging);

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
          {isManaging ? (
            <Icons.spinner className="size-4 animate-spin" />
          ) : (
            <>
              <WrenchIcon className="size-4" />
              Manage
            </>
          )}
        </Button>
      </DialogTrigger>
      <ManageDialogContent />
    </Dialog>
  );
};

export default ManageButton;
