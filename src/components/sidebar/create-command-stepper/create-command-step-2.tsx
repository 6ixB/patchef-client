import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { type CommandParameter, CommandParameterSchema } from "@/types/command";
import type { CreateCommandStepProps } from "@/components/sidebar/create-command-stepper/create-command-stepper";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  RabbitIcon,
  XIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCommandStore } from "@/hooks/use-command-store";
import { type MouseEvent, useState } from "react";
import { cn, generateDefaultValues } from "@/lib/utils";

const CreateCommandStep2 = ({ prev, next }: CreateCommandStepProps) => {
  const { draftCommand, setDraftCommand } = useCommandStore();
  const [selectedParameter, setSelectedParameter] =
    useState<CommandParameter | null>(null);

  const form = useForm<z.infer<typeof CommandParameterSchema>>({
    resolver: zodResolver(CommandParameterSchema),
    defaultValues: generateDefaultValues.commandParameter(),
  });

  const onSubmit = (values: z.infer<typeof CommandParameterSchema>) => {
    if (!draftCommand) {
      return;
    }

    const { id, name, description } = values;

    setDraftCommand({
      ...draftCommand,
      parameters: [
        ...(draftCommand.parameters ?? []),
        {
          id,
          name,
          description,
          payload: `[${name}]`, // Placeholder payload as default value
        },
      ],
    });

    form.reset(generateDefaultValues.commandParameter());
  };

  const handleParameterClick = (parameter: CommandParameter) => {
    if (selectedParameter?.id === parameter.id) {
      setSelectedParameter(null);
      form.reset(generateDefaultValues.commandParameter());
    } else {
      setSelectedParameter(parameter);
      form.setValue("id", parameter.id);
      form.setValue("name", parameter.name);
      form.setValue("description", parameter.description);
    }
  };

  const handleRemoveParameterClick = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();

    if (!draftCommand) {
      return;
    }

    const filteredParameters = draftCommand.parameters?.filter(
      (parameter) => parameter.id !== id
    );

    // If there are no parameters left, remove the parameters key from the draft command
    if (filteredParameters?.length === 0) {
      setDraftCommand({
        ...draftCommand,
        parameters: undefined,
      });
    } else {
      setDraftCommand({
        ...draftCommand,
        parameters: filteredParameters,
      });
    }

    if (selectedParameter?.id === id) {
      setSelectedParameter(null);
      form.reset(generateDefaultValues.commandParameter());
    }
  };

  const isParameterSelected = selectedParameter !== null;

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
                        readOnly={isParameterSelected}
                        placeholder="Connection string"
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
                        readOnly={isParameterSelected}
                        placeholder="Connection string with format: user@host"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isParameterSelected}>
              <PlusCircleIcon className="mr-2 size-4" /> Add parameter
            </Button>
          </div>
          <div className="flex w-[36rem] flex-col gap-y-4">
            <h1 className="font-medium text-sm">
              Parameters (Click to see contents)
            </h1>
            <ScrollArea className="h-[24.5rem] w-full rounded-sm border bg-gray-100 p-2 dark:bg-[#171823]">
              <div className="flex flex-col gap-y-2">
                {draftCommand?.parameters &&
                draftCommand?.parameters?.length !== 0 ? (
                  draftCommand?.parameters?.map((parameter) => (
                    <Card
                      key={parameter.id}
                      onClick={() => handleParameterClick(parameter)}
                      className={cn(
                        "flex cursor-pointer select-none items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground",
                        selectedParameter?.id === parameter.id &&
                          "inner-border-2 inner-border-primary"
                      )}
                    >
                      {parameter.name}
                      <XIcon
                        onClick={(e) => {
                          handleRemoveParameterClick(e, parameter.id);
                        }}
                        className="size-4"
                      />
                    </Card>
                  ))
                ) : (
                  <Card className="flex cursor-pointer items-center justify-between rounded-md border-none bg-transparent p-2 text-sm shadow-none outline-none">
                    No parameters added
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

export { CreateCommandStep2 };
