import { columns } from "@/components/app/sidebar/command-data-table/command-columns";
import { CommandDataTable } from "@/components/app/sidebar/command-data-table/command-data-table";
import { CreateCommandStepper } from "@/components/app/sidebar/create-command-stepper/create-command-stepper";
import { EditCommandStepper } from "@/components/app/sidebar/edit-command-stepper/edit-command-stepper";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCommandStore } from "@/hooks/use-command-store";
import type { CommandEntity } from "@/types/commands/command.entity";
import { ManageCommandState } from "@/types/hooks/use-command.store";
import { TerminalIcon, WandSparklesIcon } from "lucide-react";

const renderHeader = (state: ManageCommandState) => {
  const getTitle = () => {
    switch (state) {
      case ManageCommandState.View:
        return "Manage commands";

      case ManageCommandState.Edit:
        return "Edit command";

      case ManageCommandState.Create:
        return "Create command wizard";

      default:
        return "Title: Something went wrong!";
    }
  };

  const getDescription = () => {
    switch (state) {
      case ManageCommandState.View:
        return "View and manage all commands in the system.";

      case ManageCommandState.Edit:
        return "Edit an existing command.";

      case ManageCommandState.Create:
        return "Follow the wizard to create a new command.";

      default:
        return "Description: Something went wrong!";
    }
  };

  const getIcon = () => {
    switch (state) {
      case ManageCommandState.View:
        return <TerminalIcon className="size-4" />;

      case ManageCommandState.Edit:
        return <TerminalIcon className="size-4" />;

      case ManageCommandState.Create:
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

const renderContent = (
  state: ManageCommandState,
  sourceCommands: CommandEntity[],
) => {
  switch (state) {
    case ManageCommandState.View:
      return <CommandDataTable columns={columns} data={sourceCommands} />;

    case ManageCommandState.Create:
      return <CreateCommandStepper />;

    case ManageCommandState.Edit:
      return <EditCommandStepper />;

    default:
      return <div>Content: Something went wrong!</div>;
  }
};

const ManageDialogContent = () => {
  const { manageCommandState: manageState, sourceCommands } = useCommandStore();

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

export { ManageDialogContent };
