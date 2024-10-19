import type { CreateCommandStepProps } from "@/components/sidebar/create-command-stepper/create-command-stepper";
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
import { cn, generateDefaultValues } from "@/lib/utils";
import { type CommandOption, CommandOptionSchema } from "@/types/command";
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
import type { z } from "zod";

const CreateCommandStep3 = ({ prev, next }: CreateCommandStepProps) => {
  const { draftCommand, setDraftCommand } = useCommandStore();
  const [selectedOption, setSelectedOption] = useState<CommandOption | null>(
    null,
  );

  const form = useForm<z.infer<typeof CommandOptionSchema>>({
    resolver: zodResolver(CommandOptionSchema),
    defaultValues: generateDefaultValues.commandOption(),
  });

  const onSubmit = (values: z.infer<typeof CommandOptionSchema>) => {
    if (!draftCommand) {
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
      const updatedOptions = draftCommand.options?.map((option) => {
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

      setDraftCommand({
        ...draftCommand,
        options: updatedOptions,
      });

      setSelectedOption(null);
    } else {
      setDraftCommand({
        ...draftCommand,
        options: [
          ...(draftCommand.options ?? []),
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

  const handleOptionClick = (option: CommandOption) => {
    if (selectedOption?.id === option.id) {
      setSelectedOption(null);
      form.reset(generateDefaultValues.commandOption());
    } else {
      setSelectedOption(option);
      form.setValue("id", option.id);
      form.setValue("name", option.name);
      form.setValue("description", option.description);
      form.setValue("payload", option.payload);
      form.setValue("parameterRequired", option.parameterRequired);
      form.setValue("delimiter", option.delimiter);
    }
  };

  const handleRemoveOptionClick = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();

    if (!draftCommand) {
      return;
    }

    const filteredOptions = draftCommand.options?.filter(
      (option) => option.id !== id,
    );

    // If there are no options left, remove the options key from the draft command
    if (filteredOptions?.length === 0) {
      setDraftCommand({
        ...draftCommand,
        options: undefined,
      });
    } else {
      setDraftCommand({
        ...draftCommand,
        options: filteredOptions,
      });
    }

    if (selectedOption?.id === id) {
      setSelectedOption(null);
      form.reset(generateDefaultValues.commandOption());
    }
  };

  const isOptionSelected = selectedOption !== null;

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
                        placeholder="Incognito mode"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
                        placeholder="Run the the browser in incognito mode"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
                        placeholder="--incognito"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
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
                        onValueChange={(value) => {
                          form.setValue(
                            "delimiter",
                            value === "none" ? "" : value,
                          );
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a delimiter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value=" ">Space</SelectItem>
                          <SelectItem value="none">Empty</SelectItem>
                          <SelectItem value="-">Hyphen</SelectItem>
                          <SelectItem value="#">Hash</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button type="submit">
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
                {draftCommand?.options && draftCommand.options.length !== 0 ? (
                  draftCommand.options.map((option) => (
                    <Card
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className={cn(
                        "flex cursor-pointer select-none items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground",
                        selectedOption?.id === option.id &&
                          "inner-border-2 inner-border-primary",
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

export { CreateCommandStep3 };
