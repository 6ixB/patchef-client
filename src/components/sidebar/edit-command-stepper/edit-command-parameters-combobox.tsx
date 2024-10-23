import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type {
  CommandParameterEntity,
  CommandEntity as CommandEntityType,
} from "@/types/commands/command.entity";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";

interface EditCommandParametersComboboxProps {
  revisedCommandCopy: CommandEntityType | null;
  setRevisedCommandCopy: (command: CommandEntityType | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedParameter: CommandParameterEntity | null;
  setSelectedParameter: (parameter: CommandParameterEntity | null) => void;
}

const EditCommandParametersCombobox = ({
  revisedCommandCopy,
  setRevisedCommandCopy,
  open,
  setOpen,
  selectedParameter,
  setSelectedParameter,
}: EditCommandParametersComboboxProps) => {
  const initialParameterIndex = revisedCommandCopy?.parameters?.findIndex(
    (parameter) => parameter.id === selectedParameter?.id,
  );

  const [parameterIndex, setParameterIndex] = useState(initialParameterIndex);

  const parameterPayload =
    parameterIndex !== undefined && parameterIndex !== -1
      ? revisedCommandCopy?.parameters?.[parameterIndex]?.payload
      : "";

  const handleParameterPayloadOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (
      !revisedCommandCopy?.parameters ||
      parameterIndex === -1 ||
      parameterIndex === undefined
    ) {
      return;
    }

    const modifiedCommandParameters = [...revisedCommandCopy.parameters];

    modifiedCommandParameters[parameterIndex] = {
      ...modifiedCommandParameters[parameterIndex],
      payload: value,
    };

    const modifiedDraftCommand: CommandEntityType = {
      ...revisedCommandCopy,
      parameters: [...modifiedCommandParameters],
    };

    setRevisedCommandCopy(modifiedDraftCommand);
  };

  return (
    <div className="flex items-center gap-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild={true}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[16rem] justify-between"
          >
            {selectedParameter
              ? revisedCommandCopy?.parameters?.find(
                  (parameter) => parameter.id === selectedParameter.id,
                )?.name
              : "Select parameter..."}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[11.5rem] p-0">
          <Command>
            <CommandInput placeholder="Search parameter..." />
            <CommandList>
              <CommandEmpty>No parameter found.</CommandEmpty>
              <CommandGroup>
                {revisedCommandCopy?.parameters?.map((parameter) => (
                  <CommandItem
                    key={parameter.id}
                    value={parameter.id}
                    onSelect={(currentParameterId) => {
                      setSelectedParameter(
                        currentParameterId === selectedParameter?.id
                          ? null
                          : parameter,
                      );

                      const newParameterIndex =
                        revisedCommandCopy?.parameters?.findIndex(
                          (parameter) => parameter.id === currentParameterId,
                        );

                      setParameterIndex(newParameterIndex);

                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedParameter?.id === parameter.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {parameter.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        autoComplete="off"
        name="edit-command-parameters-combobox-input"
        placeholder="Parameter payload"
        value={selectedParameter ? parameterPayload : ""}
        onChange={handleParameterPayloadOnChange}
        disabled={!selectedParameter}
      />
    </div>
  );
};

export {
  type EditCommandParametersComboboxProps,
  EditCommandParametersCombobox,
};
