import { createCommand as createCommandApi } from "@/api/command.api";
import { Code } from "@/components/markdown/code";
import { CreateCommandOptionsPlaygroundDialog } from "@/components/sidebar/create-command-stepper/create-command-options-playground-dialog";
import { CreateCommandParametersCombobox } from "@/components/sidebar/create-command-stepper/create-command-parameters-combobox";
import type { CreateCommandStepProps } from "@/components/sidebar/create-command-stepper/create-command-stepper";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useCommandStore } from "@/hooks/use-command-store";
import {
  copyDraftCommand,
  generateCodeMarkdown,
  generateCommandString,
} from "@/lib/utils";
import type {
  CreateCommandDto,
  CreateCommandParameterDto,
} from "@/types/commands/command.dto";
import type { CommandEntity } from "@/types/commands/command.entity";
import { ManageState } from "@/types/hooks/use-command.store";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeftIcon, BadgePlusIcon, TerminalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useImmer } from "use-immer";

const CreateCommandStep5 = ({ prev }: CreateCommandStepProps) => {
  const {
    draftCommand,
    setDraftCommand,
    sourceCommands,
    setInitialSourceCommands,
    setSourceCommands,
    setManageState,
  } = useCommandStore();

  /* 
    The preview is generated NOT from the command draft, but from a COPY of it.
    This is to prevent the actual command draft's parameters to be modified and have a payload value
    other than the default, since source commands should not have a custom payload value yet.
  */
  const [draftCommandCopy, setDraftCommandCopy] =
    useImmer<CreateCommandDto | null>(copyDraftCommand(draftCommand));

  const [open, setOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] =
    useState<CreateCommandParameterDto | null>(null);

  const createCommandMutation = useMutation({
    mutationKey: ["create-command", draftCommand?.name],
    mutationFn: createCommandApi,
  });

  const createCommandParametersComboboxProps = {
    draftCommandCopy,
    setDraftCommandCopy,
    open,
    setOpen,
    selectedParameter,
    setSelectedParameter,
  };

  const codePayload =
    draftCommandCopy && generateCommandString(draftCommandCopy);
  const codeMarkdown =
    codePayload &&
    generateCodeMarkdown({ codePayload, showLineNumbers: false });

  const addCommand = (createdCommand: CommandEntity) => {
    setSourceCommands([...sourceCommands, createdCommand]);
    setInitialSourceCommands([...sourceCommands, createdCommand]);
    setDraftCommand(null);
    setDraftCommandCopy(null);
  };

  const handleSubmit = async () => {
    if (!draftCommand) {
      return;
    }

    // TODO: Add validation for options with required parameters must be filled

    const createdCommand =
      await createCommandMutation.mutateAsync(draftCommand);

    const commandName = `${draftCommand.name}`;

    /* 
      Finally add the draft command to the source commands list.
    */
    addCommand(createdCommand);
    setManageState(ManageState.View);
    toast.success(`Command created successfully! - ${commandName}`);
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
          {draftCommand?.parameters && draftCommand?.options && (
            <div className="text-sm">Command Playground</div>
          )}
          {draftCommand?.parameters && draftCommand.parameters.length !== 0 && (
            <CreateCommandParametersCombobox
              {...createCommandParametersComboboxProps}
            />
          )}
          {draftCommand?.options && draftCommand.options.length !== 0 && (
            <CreateCommandOptionsPlaygroundDialog
              draftCommandCopy={draftCommandCopy}
              setDraftCommandCopy={setDraftCommandCopy}
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
          {createCommandMutation.isPending ? (
            <>
              <Icons.spinner className="mr-2 size-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <BadgePlusIcon className="mr-2 size-4" />
              Create
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export { CreateCommandStep5 };
