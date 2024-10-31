import { updateCommand as updateCommandApi } from "@/api/command.api";
import { Code } from "@/components/app/markdown/code";
import { EditCommandOptionsPlaygroundPopover } from "@/components/app/sidebar/edit-command-stepper/edit-command-options-playground-popover";
import { EditCommandParametersCombobox } from "@/components/app/sidebar/edit-command-stepper/edit-command-parameters-combobox";
import type { EditCommandStepProps } from "@/components/app/sidebar/edit-command-stepper/edit-command-stepper";
import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import {
  copyRevisedCommand,
  generateCodeMarkdown,
  generateCommandString,
} from "@/services/commands.service";
import type {
  CommandEntity,
  CommandParameterEntity,
} from "@/types/commands/command.entity";
import { ManageState } from "@/types/hooks/use-command.store";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeftIcon, BadgePlusIcon, TerminalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useImmer } from "use-immer";

const EditCommandStep5 = ({ prev }: EditCommandStepProps) => {
  const {
    revisedCommand,
    setRevisedCommand,
    setInitialSourceCommands,
    setSourceCommands,
    setManageState,
  } = useCommandStore();

  /* 
    The preview is generated NOT from the command draft, but from a COPY of it.
    This is to prevent the actual command draft's parameters to be modified and have a payload value
    other than the default, since source commands should not have a custom payload value yet.
  */
  const [revisedCommandCopy, setRevisedCommandCopy] =
    useImmer<CommandEntity | null>(copyRevisedCommand(revisedCommand));

  const [open, setOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] =
    useState<CommandParameterEntity | null>(null);

  const updateCommandMutation = useMutation({
    mutationKey: ["update-command", revisedCommand?.id],
    mutationFn: updateCommandApi,
  });

  const editCommandParametersComboboxProps = {
    revisedCommandCopy,
    setRevisedCommandCopy,
    open,
    setOpen,
    selectedParameter,
    setSelectedParameter,
  };

  const codePayload =
    revisedCommandCopy && generateCommandString(revisedCommandCopy);
  const codeMarkdown =
    codePayload &&
    generateCodeMarkdown({ codePayload, showLineNumbers: false });

  const saveUpdatedCommand = (draftCommand: CommandEntity) => {
    setSourceCommands((draft) => {
      const index = draft.findIndex(
        (command) => command.id === draftCommand.id,
      );
      draft[index] = draftCommand;
    });
    setInitialSourceCommands((draft) => {
      const index = draft.findIndex(
        (command) => command.id === draftCommand.id,
      );
      draft[index] = draftCommand;
    });
    setRevisedCommand(null);
    setRevisedCommandCopy(null);
  };

  const handleSubmit = async () => {
    if (!revisedCommand) {
      return;
    }

    await updateCommandMutation.mutateAsync(revisedCommand);

    const commandName = `${revisedCommand.name}`;

    /* 
      Finally add the draft command to the source commands list.
    */
    saveUpdatedCommand(revisedCommand);
    setManageState(ManageState.View);
    toast.success(`Command updated successfully! - ${commandName}`);
  };

  return (
    <div className="flex h-full w-full max-w-2xl flex-1 flex-col justify-between gap-y-4">
      <div className="flex flex-1 flex-col gap-y-4 text-sm">
        <div className="flex items-center gap-x-4">
          <TerminalIcon className="size-4" />
          Does the following command looks good to you?
        </div>
        <div className="flex flex-col gap-y-2">
          {/* Check using draft command but pass the value of copy of draft command */}
          {revisedCommand?.parameters && revisedCommand?.options && (
            <div className="text-sm">Command Playground</div>
          )}
          {revisedCommand?.parameters &&
            revisedCommand.parameters.length !== 0 && (
              <EditCommandParametersCombobox
                {...editCommandParametersComboboxProps}
              />
            )}
          {revisedCommand?.options && revisedCommand.options.length !== 0 && (
            <EditCommandOptionsPlaygroundPopover
              revisedCommandCopy={revisedCommandCopy}
              setRevisedCommandCopy={setRevisedCommandCopy}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-y-2">
          <h1 className="text-sm">Command Preview</h1>
          <p className="text-muted-foreground text-sm">
            Ensure the generated command works by executing it in your terminal.
          </p>
          {codeMarkdown && <Code codeMarkdown={codeMarkdown} />}
        </div>
      </div>
      <div className="flex items-center gap-x-4 self-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            prev();
          }}
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Previous
        </Button>
        <Button onClick={handleSubmit}>
          <BadgePlusIcon className="mr-2 size-4" />
          Save
        </Button>
      </div>
    </div>
  );
};

export { EditCommandStep5 };
