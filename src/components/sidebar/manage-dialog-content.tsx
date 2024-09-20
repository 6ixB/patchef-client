import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommandDataTable from "@/components/sidebar/command-data-table/command-data-table";
import { columns } from "@/components/sidebar/command-data-table/command-columns";
import { Terminal } from "lucide-react";
import { useCommandStore } from "@/hooks/use-command-store";

const ManageDialogContent = () => {
  const { sourceCommands } = useCommandStore();

  const preventDefault = (e: Event) => {
    e.preventDefault();
  };

  return (
    <DialogContent
      /* 
        Prevents closing the dialog when clicking outside of it or pressing the escape key.
      */
      onInteractOutside={preventDefault}
      onEscapeKeyDown={preventDefault}
      className="max-w-7xl p-8"
    >
      <DialogHeader>
        <div className="flex items-center gap-x-2">
          <Terminal className="size-4" />
          <DialogTitle>Manage commands</DialogTitle>
        </div>
        <DialogDescription>
          View and manage all commands in the system.
        </DialogDescription>
      </DialogHeader>
      <CommandDataTable columns={columns} data={sourceCommands} />
    </DialogContent>
  );
};

export default ManageDialogContent;
