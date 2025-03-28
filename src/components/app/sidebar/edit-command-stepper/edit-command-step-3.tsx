import type { EditCommandStepProps } from "@/components/app/sidebar/edit-command-stepper/edit-command-stepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCommandStore } from "@/hooks/use-command-store";
import { defaults } from "@/lib/defaults";
import { cn } from "@/lib/utils";
import { generateDefaultValues } from "@/services/commands.service";
import { CommandOptionDelimiter } from "@/types/commands/command-option-delimiter";
import {
  type CommandOptionEntity,
  CommandOptionEntitySchema,
  CommandType,
} from "@/types/commands/command.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  RabbitIcon,
  VariableIcon,
  XIcon,
} from "lucide-react";
import { type MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";

const EditCommandStep3 = ({ prev, next }: EditCommandStepProps) => {
  const { revisedCommand, setRevisedCommand } = useCommandStore();
  const [selectedOption, setSelectedOption] =
    useState<CommandOptionEntity | null>(null);

  const form = useForm<CommandOptionEntity>({
    resolver: zodResolver(CommandOptionEntitySchema),
    defaultValues: generateDefaultValues.commandOption(),
  });

  // TODO: Reduce the complexity of this function
  const onSubmit = (values: CommandOptionEntity) => {
    if (!revisedCommand) {
      return;
    }

    const {
      id,
      name,
      description,
      payload,
      parameterRequired,
      delimiter,
      enabled,
    } = values;

    if (selectedOption) {
      const updatedOptions = revisedCommand.options?.map((option) => {
        if (option.id === selectedOption.id) {
          return {
            ...option,
            id,
            name,
            description,
            payload,
            parameterRequired,
            delimiter,
            enabled,
          };
        }

        return option;
      });

      setRevisedCommand({
        ...revisedCommand,
        options: updatedOptions,
      });

      setSelectedOption(null);
    } else {
      let nameAlreadyExists = false;

      for (const option of revisedCommand.options ?? []) {
        if (option.name === name) {
          nameAlreadyExists = true;
          break;
        }
      }

      if (nameAlreadyExists) {
        form.setError("name", {
          message: "Parameter already exists",
        });
        return;
      }

      setRevisedCommand({
        ...revisedCommand,
        options: [
          ...(revisedCommand.options ?? []),
          {
            id,
            name,
            description,
            payload,
            parameterRequired,
            delimiter,
            enabled,
          },
        ],
      });
    }

    form.reset(generateDefaultValues.commandOption());
  };

  const handleOptionClick = (option: CommandOptionEntity) => {
    if (selectedOption?.id === option.id) {
      setSelectedOption(null);
      form.reset(generateDefaultValues.commandOption());
    } else {
      setSelectedOption(option);
      form.reset({
        id: option.id,
        name: option.name,
        description: option.description,
        payload: option.payload,
        parameterRequired: option.parameterRequired,
        delimiter: option.delimiter,
        enabled: option.enabled,
      });
    }
  };

  const handleRemoveOptionClick = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();

    if (!revisedCommand) {
      return;
    }

    const filteredOptions = revisedCommand.options?.filter(
      (option) => option.id !== id
    );

    // If there are no options left, remove the options key from the draft command
    if (filteredOptions?.length === 0) {
      setRevisedCommand({
        ...revisedCommand,
        options: undefined,
      });
    } else {
      setRevisedCommand({
        ...revisedCommand,
        options: filteredOptions,
      });
    }

    if (selectedOption?.id === id) {
      setSelectedOption(null);
      form.reset(generateDefaultValues.commandOption());
    }
  };

  const isOptionSelected = selectedOption !== null;
  const isBasicCommand = revisedCommand?.type === CommandType.Basic;

  return (
    <Form {...form}>
      <form
        noValidate={true}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-2xl flex-col justify-between gap-y-4"
      >
        <div className="flex w-full gap-x-8">
          <div className="flex w-full flex-col justify-between gap-y-8">
            <div className="flex w-full flex-col gap-y-2">
              <FormField
                disabled={!isBasicCommand}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormDescription>
                      The name of the parameter to be used in the command
                    </FormDescription>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        autoFocus={true}
                        placeholder={defaults.placeholders.command.option.name}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={!isBasicCommand}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormDescription>
                      A brief description of the parameter
                    </FormDescription>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder={
                          defaults.placeholders.command.option.description
                        }
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={!isBasicCommand}
                control={form.control}
                name="payload"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payload</FormLabel>
                    <FormDescription>
                      The payload of the option to be used in the command
                    </FormDescription>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder={
                          defaults.placeholders.command.option.payload
                        }
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={!isBasicCommand}
                control={form.control}
                name="parameterRequired"
                render={({ field }) => (
                  <FormItem className="flex items-end justify-between gap-x-4">
                    <div>
                      <FormLabel>Require parameters?</FormLabel>
                      <FormDescription>
                        Does this option require parameters to be passed?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={!isBasicCommand}
                        name="parameterRequired"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.watch("parameterRequired") && (
                <FormField
                  disabled={!isBasicCommand}
                  control={form.control}
                  name="delimiter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delimiter</FormLabel>
                      <FormDescription>
                        The delimiter to be used to separate the option and its
                        parameters
                      </FormDescription>
                      <Select
                        name="edit-command-option-delimiter-select"
                        disabled={!isBasicCommand}
                        onValueChange={(value) => {
                          form.setValue(
                            "delimiter",
                            value === CommandOptionDelimiter.Empty ? "" : value
                          );
                        }}
                        defaultValue={
                          !!field.value === false && field.value !== undefined
                            ? CommandOptionDelimiter.Empty
                            : field.value
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                defaults.placeholders.command.option.delimiter
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={CommandOptionDelimiter.Space}>
                            Space
                          </SelectItem>
                          <SelectItem value={CommandOptionDelimiter.Empty}>
                            Empty
                          </SelectItem>
                          <SelectItem value={CommandOptionDelimiter.Hyphen}>
                            Hyphen
                          </SelectItem>
                          <SelectItem value={CommandOptionDelimiter.Hash}>
                            Hash
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button
              type="submit"
              disabled={!(isBasicCommand && form.formState.isDirty)}
            >
              <PlusCircleIcon className="mr-2 size-4" />
              &nbsp;{isOptionSelected ? "Update" : "Add"} option
            </Button>
          </div>
          <div className="flex w-[36rem] flex-col gap-y-4">
            <h1 className="font-medium text-sm">
              Options (Click to see contents)
            </h1>
            <ScrollArea className="h-[25.25rem] w-full rounded-sm border bg-gray-100 p-2 dark:bg-[#171823]">
              <div className="flex flex-col gap-y-2">
                {revisedCommand?.options &&
                revisedCommand.options.length !== 0 ? (
                  revisedCommand.options.map((option) => (
                    <Card
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className={cn(
                        "flex cursor-pointer select-none items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground",
                        selectedOption?.id === option.id &&
                          "inner-border-2 inner-border-primary"
                      )}
                    >
                      {option.name}
                      <div className="flex items-center gap-x-2">
                        {option.parameterRequired && (
                          <VariableIcon className="size-4" />
                        )}
                        <XIcon
                          onClick={(e) => {
                            handleRemoveOptionClick(e, option.id);
                          }}
                          className="size-4"
                        />
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="flex cursor-pointer items-center justify-between rounded-md border-none bg-transparent p-2 text-sm shadow-none outline-none">
                    No options added
                    <RabbitIcon className="size-4" />
                  </Card>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex items-center gap-x-4 self-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              prev();
            }}
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Previous
          </Button>
          <Button
            type="button"
            onClick={() => {
              next();
            }}
          >
            Next
            <ArrowRightIcon className="ml-2 size-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { EditCommandStep3 };
