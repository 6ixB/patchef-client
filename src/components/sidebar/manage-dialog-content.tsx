import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommandDataTable from "@/components/sidebar/command-data-table/command-data-table";
import { columns } from "@/components/sidebar/command-data-table/command-columns";
import { TerminalIcon, WandSparklesIcon } from "lucide-react";
import { useCommandStore } from "@/hooks/use-command-store";
import type { Command } from "@/types/command";
import { ManageState } from "@/types/use-command.store";
import CreateCommandStepper from "@/components/sidebar/create-command-stepper/create-command-stepper";

const renderHeader = (state: ManageState) => {
  const getTitle = () => {
    switch (state) {
      case ManageState.View:
        return "Manage commands";

      case ManageState.Edit:
        return "Edit command";

      case ManageState.Create:
        return "Create command wizard";

      default:
        return "Title: Something went wrong!";
    }
  };

  const getDescription = () => {
    switch (state) {
      case ManageState.View:
        return "View and manage all commands in the system.";

      case ManageState.Edit:
        return "Edit an existing command.";

      case ManageState.Create:
        return "Follow the wizard to create a new command.";

      default:
        return "Description: Something went wrong!";
    }
  };

  const getIcon = () => {
    switch (state) {
      case ManageState.View:
        return <TerminalIcon className="size-4" />;

      case ManageState.Edit:
        return <TerminalIcon className="size-4" />;

      case ManageState.Create:
        return <WandSparklesIcon className="size-4" />;

      default:
        return null;
    }
  };

  return (
    <DialogHeader>
      <div className="flex items-center gap-x-2">
        {getIcon()}
        <DialogTitle>{getTitle()}</DialogTitle>
      </div>
      <DialogDescription>{getDescription()}</DialogDescription>
    </DialogHeader>
  );
};

const renderContent = (state: ManageState, sourceCommands: Command[]) => {
  switch (state) {
    case ManageState.View:
      return <CommandDataTable columns={columns} data={sourceCommands} />;

    case ManageState.Edit:
      // TODO: Implement edit command stepper
      return null;

    case ManageState.Create:
      return <CreateCommandStepper />;

    default:
      return <div>Content: Something went wrong!</div>;
  }
};

const ManageDialogContent = () => {
  const { manageState, sourceCommands } = useCommandStore();

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
      className="w-full max-w-5xl p-8"
    >
      {renderHeader(manageState)}
      {renderContent(manageState, sourceCommands)}
    </DialogContent>
  );
};

export default ManageDialogContent;
