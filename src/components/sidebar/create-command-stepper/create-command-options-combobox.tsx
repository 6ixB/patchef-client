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
import { cn } from "@/lib/utils";
import type { CreateCommandOptionDto } from "@/types/commands/command.dto";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

interface CreateCommandOptionsComboboxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedOption: CreateCommandOptionDto | null;
  setSelectedOption: (option: CreateCommandOptionDto | null) => void;
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
                (option) => option.name === selectedOption.name,
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
                  key={option.name}
                  value={option.name}
                  onSelect={(currentOptionId) => {
                    setSelectedOption(
                      currentOptionId === selectedOption?.name ? null : option,
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOption?.name === option.name
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
