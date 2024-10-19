import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCommandStore } from "@/hooks/use-command-store";
import type { Command } from "@/types/command";
import { BoltIcon, RabbitIcon } from "lucide-react";
import type { ChangeEvent } from "react";

interface RecipeListItemOptionControlsDialogProps {
  command: Command;
  commandIndex: number;
}

const RecipeListItemOptionControlsDialog = ({
  command,
  commandIndex,
}: RecipeListItemOptionControlsDialogProps) => {
  const { setDestinationCommands } = useCommandStore();

  const handleOptionParameterPayloadChange = (
    e: ChangeEvent<HTMLInputElement>,
    optionIndex: number,
    parameterIndex: number,
  ) => {
    const value = e.target.value;

    setDestinationCommands((draft) => {
      if (!draft?.[commandIndex].options?.[optionIndex].parameters) {
        return draft;
      }

      draft[commandIndex].options[optionIndex].parameters[
        parameterIndex
      ].payload = value;
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant="outline" className="w-[11.5rem]">
          <BoltIcon className="mr-2 size-4" />
          Configure options
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure enabled options</DialogTitle>
          <DialogDescription>
            Configure the options that will be enabled for this command
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className="text-muted-foreground text-sm">
            This command has the following options
          </p>
          <div className="mt-2 flex flex-col gap-y-2">
            {command?.options && command.options.length !== 0 ? (
              command.options?.map((option, optionIndex) => (
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
                          setDestinationCommands((draft) => {
                            const commandIndex = draft.findIndex(
                              (c) => c.id === command.id,
                            );

                            if (
                              commandIndex === -1 ||
                              !draft[commandIndex].options
                            ) {
                              return draft;
                            }

                            const previousValue =
                              draft[commandIndex].options[optionIndex].enabled;

                            draft[commandIndex].options[optionIndex].enabled =
                              !previousValue;
                          });
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
                        {option.parameters?.map((parameter, parameterIndex) => (
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
                              <p className="text-sm">{parameter.description}</p>
                              {option.enabled && (
                                <Input
                                  placeholder="Parameter payload"
                                  value={parameter.payload}
                                  onChange={(e) =>
                                    handleOptionParameterPayloadChange(
                                      e,
                                      optionIndex,
                                      parameterIndex,
                                    )
                                  }
                                  className="bg-gray-100 dark:bg-[#171823]"
                                />
                              )}
                            </div>
                          </div>
                        ))}
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
      </DialogContent>
    </Dialog>
  );
};

export {
  type RecipeListItemOptionControlsDialogProps,
  RecipeListItemOptionControlsDialog,
};
