import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CommandIcon, InfoIcon, RabbitIcon } from "lucide-react";
import type { Command } from "@/types/command";
import { generateCodeMarkdown, generateCommandString } from "@/lib/utils";
import { Code } from "@/components/markdown/code";
import { Badge } from "@/components/ui/badge";

export interface CommandListItemInfoDialogProps {
  command: Command;
}

const CommandListItemInfoDialog = ({
  command,
}: CommandListItemInfoDialogProps) => {
  const commandString = generateCommandString(command);
  const commandCodeMarkdown = generateCodeMarkdown({
    codePayload: commandString,
    showLineNumbers: false,
  });

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button
          variant="ghost"
          className="cursor-pointer rounded p-2.5 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <InfoIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Command Information</DialogTitle>
          <DialogDescription>
            View information about this command.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md border bg-gray-100 p-4 dark:bg-[#171823]">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <CommandIcon className="size-4" />
                <h1 className="font-medium text-sm">{command.name}</h1>
              </div>
              <Badge>Command</Badge>
            </div>
            <p className="text-sm">{command.description}</p>
          </div>
        </div>
        <div className="flex w-full max-w-full flex-col gap-y-2">
          <p className="text-muted-foreground text-sm">Command Preview</p>
          <Code codeMarkdown={commandCodeMarkdown} />
        </div>
        <Tabs defaultValue="parameters">
          <TabsList className="rounded">
            <TabsTrigger value="parameters" className="rounded">
              Parameters
            </TabsTrigger>
            <TabsTrigger value="options" className="rounded">
              Options
            </TabsTrigger>
          </TabsList>
          <TabsContent value="parameters">
            <p className="text-muted-foreground text-sm">
              This command needs the following parameters to work
            </p>
            <div className="mt-2 flex flex-col gap-y-2">
              {command.parameters && command.parameters.length !== 0 ? (
                command.parameters?.map((parameter) => (
                  <div
                    key={parameter.id}
                    className="rounded-md border bg-gray-100 p-4 dark:bg-[#171823]"
                  >
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center justify-between">
                        <h1 className="font-medium text-sm">
                          {parameter.name}
                        </h1>
                        <Badge>Parameter</Badge>
                      </div>
                      <p className="text-sm">{parameter.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-md border bg-gray-100 p-4 dark:bg-[#171823]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      This command does not require any parameters
                    </p>
                    <RabbitIcon className="size-4" />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="options">
            <p className="text-muted-foreground text-sm">
              This command has the following options
            </p>
            <div className="mt-2 flex flex-col gap-y-2">
              {command.options && command.options.length !== 0 ? (
                command.options?.map((option) => (
                  <div
                    key={option.id}
                    className="flex flex-col gap-y-2 rounded-md border bg-gray-100 p-4 dark:bg-[#171823]"
                  >
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center justify-between">
                        <h1 className="font-medium text-sm">{option.name}</h1>
                        <Badge>Option</Badge>
                      </div>
                      <p className="text-sm">{option.description}</p>
                    </div>
                    {option.parameterRequired && (
                      <>
                        <p className="text-muted-foreground text-sm">
                          This option requires the following parameters
                        </p>
                        <div className="flex flex-col gap-y-2">
                          {option.parameters?.map((parameter) => (
                            <div
                              key={parameter.id}
                              className="rounded border bg-gray-50 p-4 dark:bg-muted"
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export { CommandListItemInfoDialog };
