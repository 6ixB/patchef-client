import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import type { CommandEntity } from "@/types/commands/command.entity";
import { BoltIcon, RabbitIcon } from "lucide-react";
import type { ChangeEvent } from "react";
import type { DraftFunction } from "use-immer";

interface EditCommandOptionsPlaygroundPopoverProps {
  revisedCommandCopy: CommandEntity | null;
  setRevisedCommandCopy: (
    draftFunction: DraftFunction<CommandEntity | null>
  ) => void;
}

const EditCommandOptionsPlaygroundPopover = ({
  revisedCommandCopy,
  setRevisedCommandCopy,
}: EditCommandOptionsPlaygroundPopoverProps) => {
  const handleOptionParameterPayloadChange = (
    e: ChangeEvent<HTMLInputElement>,
    optionIndex: number,
    parameterIndex: number
  ) => {
    const value = e.target.value;

    setRevisedCommandCopy((draft) => {
      if (!draft?.options?.[optionIndex].parameters) {
        return draft;
      }

      draft.options[optionIndex].parameters[parameterIndex].payload = value;
    });
  };

  const hasNoOptions = !revisedCommandCopy?.options?.length;

  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button
          variant="outline"
          disabled={hasNoOptions}
          className="w-[11.75rem]"
        >
          <BoltIcon className="mr-2 size-4" />
          Configure options
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[32rem]">
        <ScrollArea>
          <div className="flex h-fit max-h-[32rem] flex-col gap-y-4">
            <div>
              <p className="text-muted-foreground text-sm">
                This command has the following options
              </p>
              <div className="mt-2 flex flex-col gap-y-2">
                {revisedCommandCopy?.options &&
                revisedCommandCopy.options.length !== 0 ? (
                  revisedCommandCopy.options?.map((option, optionIndex) => (
                    <div
                      key={option.id}
                      className="flex flex-col gap-y-2 rounded-md border bg-gray-100 p-4 dark:bg-[#171823]"
                    >
                      <div className="flex flex-col gap-y-2">
                        <div className="flex items-center justify-between">
                          <h1 className="font-medium text-sm">{option.name}</h1>
                          <Badge>Option</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">{option.description}</p>
                          <Switch
                            checked={option.enabled}
                            onCheckedChange={() => {
                              setRevisedCommandCopy(
                                (draft: CommandEntity | null) => {
                                  if (!draft?.options) {
                                    return draft;
                                  }

                                  draft.options[optionIndex].enabled =
                                    !option.enabled;
                                }
                              );
                            }}
                          />
                        </div>
                      </div>
                      {option.parameterRequired && (
                        <>
                          <p className="text-muted-foreground text-sm">
                            This option requires the following parameters
                          </p>
                          <div className="flex flex-col gap-y-2">
                            {option.parameters?.map(
                              (parameter, parameterIndex) => (
                                <div
                                  key={parameter.id}
                                  className="rounded border bg-muted p-4"
                                >
                                  <div className="flex flex-col gap-y-2">
                                    <div className="flex items-center justify-between">
                                      <h1 className="font-medium text-sm">
                                        {parameter.name}
                                      </h1>
                                      <Badge>Parameter</Badge>
                                    </div>
                                    <p className="text-sm">
                                      {parameter.description}
                                    </p>
                                    {option.enabled && (
                                      <Input
                                        name={`option-${optionIndex}-parameter-${parameterIndex}-payload`}
                                        placeholder="Parameter payload"
                                        value={parameter.payload}
                                        onChange={(e) =>
                                          handleOptionParameterPayloadChange(
                                            e,
                                            optionIndex,
                                            parameterIndex
                                          )
                                        }
                                        className="bg-gray-100 dark:bg-[#171823]"
                                      />
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-md border bg-gray-100 p-4 dark:bg-[#171823]">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        This command does not have any options
                      </p>
                      <RabbitIcon className="size-4" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export {
  type EditCommandOptionsPlaygroundPopoverProps,
  EditCommandOptionsPlaygroundPopover,
};
