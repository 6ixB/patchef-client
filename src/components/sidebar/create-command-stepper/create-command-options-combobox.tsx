import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCommandStore } from "@/hooks/use-command-store";
import type { CommandOption } from "@/types/command";

interface CreateCommandOptionsComboboxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedOption: CommandOption | null;
  setSelectedOption: (option: CommandOption | null) => void;
}

const CreateCommandOptionsCombobox = ({
  open,
  setOpen,
  selectedOption,
  setSelectedOption,
}: CreateCommandOptionsComboboxProps) => {
  const { draftCommand } = useCommandStore();

  const optionsWithRequiredParameters = draftCommand?.options?.filter(
    (option) => option.parameterRequired,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild={true}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption
            ? optionsWithRequiredParameters?.find(
                (option) => option.id === selectedOption.id,
              )?.name
            : "Select option..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[21.5rem] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {optionsWithRequiredParameters?.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id}
                  onSelect={(currentOptionId) => {
                    setSelectedOption(
                      currentOptionId === selectedOption?.id ? null : option,
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOption?.id === option.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { type CreateCommandOptionsComboboxProps, CreateCommandOptionsCombobox };
