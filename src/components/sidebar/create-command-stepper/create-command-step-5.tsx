import type { CreateCommandStepProps } from "@/components/sidebar/create-command-stepper/create-command-stepper";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, BadgePlusIcon, TerminalIcon } from "lucide-react";
import CreateCommandParametersCombobox from "@/components/sidebar/create-command-stepper/create-command-parameters-combobox";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Code from "@/components/code";
import { generateCodeMarkdown } from "@/lib/utils";

const CreateCommandStep5 = ({ prev }: CreateCommandStepProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("recursive");
  const createCommandParametersComboboxProps = {
    open,
    setOpen,
    value,
    setValue,
  };

  const codePayload = `start chrome --incognito "https://www.erulynx.net"\nxcopy /eihry "C:\\source-folder" "D:\\destination-folder"\nmkdir "~\\hello-world"\ng++ -o hello-world.exe hello-world.cpp`;
  const codeMarkdown = generateCodeMarkdown({ codePayload });

  return (
    <div className="flex h-full w-full max-w-2xl flex-1 flex-col justify-between gap-y-4">
      <div className="flex flex-1 flex-col gap-y-4 text-sm">
        <div className="flex items-center gap-x-4">
          <TerminalIcon className="size-4" />
          Does the following command looks good to you?
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-sm">Parameter Playground</div>
          <div className="flex items-center gap-x-4">
            <CreateCommandParametersCombobox
              {...createCommandParametersComboboxProps}
            />
            <Input
              name="create-command-parameters-combobox-input"
              placeholder="Parameter value"
              defaultValue='"C:\source-folder"'
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-y-2">
          <div className="text-sm">Command Preview</div>
          <Code codeMarkdown={codeMarkdown} />
        </div>
      </div>
      <div className="flex items-center gap-x-4 self-end">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            prev();
          }}
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Previous
        </Button>
        <Button type="submit">
          <BadgePlusIcon className="mr-2 size-4" />
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateCommandStep5;
