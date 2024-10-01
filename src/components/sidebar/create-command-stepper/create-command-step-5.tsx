import { useState } from "react";
import type { CreateCommandStepProps } from "@/components/sidebar/create-command-stepper/create-command-stepper";
import { ArrowLeftIcon, BadgePlusIcon, TerminalIcon } from "lucide-react";
import { CreateCommandParametersCombobox } from "@/components/sidebar/create-command-stepper/create-command-parameters-combobox";
import { CreateCommandOptionsPlaygroundDialog } from "@/components/sidebar/create-command-stepper/create-command-options-playground-dialog";
import { Code } from "@/components/markdown/code";
import { Button } from "@/components/ui/button";
import {
  copyDraftCommand,
  generateCodeMarkdown,
  generateCommandString,
} from "@/lib/utils";
import type { Command, CommandParameter } from "@/types/command";
import { useCommandStore } from "@/hooks/use-command-store";
import { ManageState } from "@/types/use-command.store";
import { toast } from "sonner";

const CreateCommandStep5 = ({ prev }: CreateCommandStepProps) => {
  const {
    draftCommand,
    setDraftCommand,
    sourceCommands,
    setSourceCommands,
    setManageState,
  } = useCommandStore();

  /* 
    The preview is generated NOT from the command draft, but from a COPY of it.
    This is to prevent the draft's parameters to have a payload value other than the default,
    since source commands should not have a custom payload value yet.
  */
  const [draftCommandCopy, setDraftCommandCopy] = useState<Command | null>(
    copyDraftCommand(draftCommand)
  );

  const [open, setOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] =
    useState<CommandParameter | null>(null);

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

  const handleSubmit = () => {
    if (!draftCommand) {
      return;
    }

    /* 
      Finally add the draft command to the source commands list.
    */
    setSourceCommands([...sourceCommands, draftCommand]);
    setDraftCommand(null);
    setManageState(ManageState.View);
    toast.success("Command created successfully!");
  };

  return (
    <div className="flex h-full w-full max-w-2xl flex-1 flex-col justify-between gap-y-4">
      <div className="flex flex-1 flex-col gap-y-4 text-sm">
        <div className="flex items-center gap-x-4">
          <TerminalIcon className="size-4" />
          Does the following command looks good to you?
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-sm">Command Playground</div>
          <CreateCommandParametersCombobox
            {...createCommandParametersComboboxProps}
          />
          <CreateCommandOptionsPlaygroundDialog />
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
          Create
        </Button>
      </div>
    </div>
  );
};

export { CreateCommandStep5 };
