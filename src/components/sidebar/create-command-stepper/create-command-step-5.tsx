import type { CreateCommandStepProps } from "@/components/sidebar/create-command-stepper/create-command-stepper";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, BadgePlusIcon, TerminalIcon } from "lucide-react";
import CreateCommandParametersCombobox from "@/components/sidebar/create-command-stepper/create-command-parameters-combobox";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const CreateCommandStep5 = ({ prev }: CreateCommandStepProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const createCommandParametersComboboxProps = {
    open,
    setOpen,
    value,
    setValue,
  };

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
              defaultValue='"C:source folder"'
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-y-2">
          <div className="text-sm">Command Preview</div>
          <code className="h-full flex-1 rounded-md bg-gray-100 p-4 dark:bg-[#171823]">
            xcopy /s "C:\source folder" "D:\destination folder"
          </code>
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
