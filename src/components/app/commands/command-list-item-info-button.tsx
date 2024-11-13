import { Code } from "@/components/app/markdown/code";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  generateCodeMarkdown,
  generateCommandString,
} from "@/services/commands.service";
import type { CommandEntity } from "@/types/commands/command.entity";
import { CommandIcon, InfoIcon, RabbitIcon } from "lucide-react";

interface CommandListItemInfoButtonProps {
  command: CommandEntity;
  setDisabled: (disabled: boolean) => void;
}

const CommandListItemInfoButton = ({
  command,
  setDisabled,
}: CommandListItemInfoButtonProps) => {
  const commandString = generateCommandString({
    ...command,
    options: command.options?.map((option) => ({ ...option, enabled: true })),
  });
  const commandCodeMarkdown = generateCodeMarkdown({
    codePayload: commandString,
    showLineNumbers: false,
  });

  return (
    <Popover
      onOpenChange={(open) => {
        if (open) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      }}
    >
      <PopoverTrigger asChild={true}>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer rounded p-2.5 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <InfoIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[32rem]">
        <ScrollArea>
          <div className="flex h-fit max-h-[32rem] flex-col gap-y-4">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="font-semibold text-lg leading-none tracking-tight">
                Command Information
              </h2>
              <p className="text-muted-foreground text-sm">
                View information about this command.
              </p>
            </div>
            <div className="rounded-md border bg-gray-100 p-4 dark:bg-[#171823]">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <CommandIcon className="size-4 min-h-4 min-w-4" />
                    <h1 className="font-medium text-sm">{command.name}</h1>
                  </div>
                  <Badge>Command</Badge>
                </div>
                <p className="text-sm">{command.description}</p>
              </div>
            </div>
            <div className="flex w-full max-w-full flex-col gap-y-2">
              <p className="text-muted-foreground text-sm">Command Payload</p>
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
                            <h1 className="font-medium text-sm">
                              {option.name}
                            </h1>
                            <Badge>Option</Badge>
                          </div>
                          <p className="text-sm">{option.description}</p>
                          <Badge variant="secondary" className="w-fit">
                            {option.payload}
                          </Badge>
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
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export { type CommandListItemInfoButtonProps, CommandListItemInfoButton };
