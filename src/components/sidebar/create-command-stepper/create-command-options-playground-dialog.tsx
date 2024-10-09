import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BoltIcon, RabbitIcon } from "lucide-react";
import type { Command } from "@/types/command";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import type { DraftFunction } from "use-immer";
import { Input } from "@/components/ui/input";
import type { ChangeEvent } from "react";

interface CreateCommandOptionsPlaygroundDialogProps {
  draftCommandCopy: Command | null;
  setDraftCommandCopy: (draftFunction: DraftFunction<Command | null>) => void;
}

const CreateCommandOptionsPlaygroundDialog = ({
  draftCommandCopy,
  setDraftCommandCopy,
}: CreateCommandOptionsPlaygroundDialogProps) => {
  const handleOptionParameterPayloadChange = (
    e: ChangeEvent<HTMLInputElement>,
    optionIndex: number,
    parameterIndex: number,
  ) => {
    const value = e.target.value;

    setDraftCommandCopy((draft) => {
      if (!draft?.options?.[optionIndex].parameters) {
        return draft;
      }

      draft.options[optionIndex].parameters[parameterIndex].payload = value;
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant="outline" className="w-[11.75rem]">
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
            {draftCommandCopy?.options &&
            draftCommandCopy.options.length !== 0 ? (
              draftCommandCopy.options?.map((option, optionIndex) => (
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
                          setDraftCommandCopy((draft: Command | null) => {
                            if (!draft?.options) {
                              return draft;
                            }

                            draft.options[optionIndex].enabled =
                              !option.enabled;
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
  type CreateCommandOptionsPlaygroundDialogProps,
  CreateCommandOptionsPlaygroundDialog,
};
