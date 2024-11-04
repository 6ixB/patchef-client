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
import { useCommandStore } from "@/hooks/use-command-store";
import { defaults } from "@/lib/defaults";
import { cn } from "@/lib/utils";
import { generateDefaultValues } from "@/services/commands.service";
import {
  type CommandParameterEntity,
  CommandParameterEntitySchema,
  CommandType,
} from "@/types/commands/command.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  RabbitIcon,
  XIcon,
} from "lucide-react";
import { type MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";

const EditCommandStep2 = ({ prev, next }: EditCommandStepProps) => {
  const { revisedCommand, setRevisedCommand } = useCommandStore();
  const [selectedParameter, setSelectedParameter] =
    useState<CommandParameterEntity | null>(null);

  const form = useForm<CommandParameterEntity>({
    resolver: zodResolver(CommandParameterEntitySchema),
    defaultValues: generateDefaultValues.commandParameter(),
  });

  // TODO: Reduce the complexity of this function
  const onSubmit = (values: CommandParameterEntity) => {
    if (!revisedCommand) {
      return;
    }

    const { id, name, description } = values;

    if (selectedParameter) {
      const updatedParameters = revisedCommand.parameters?.map((parameter) => {
        if (parameter.id === selectedParameter.id) {
          return {
            ...parameter,
            id,
            name,
            description,
          };
        }

        return parameter;
      });

      setRevisedCommand({
        ...revisedCommand,
        parameters: updatedParameters,
      });

      setSelectedParameter(null);
    } else {
      let nameAlreadyExists = false;

      for (const parameter of revisedCommand.parameters ?? []) {
        if (parameter.name === name) {
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
        parameters: [
          ...(revisedCommand.parameters ?? []),
          {
            id,
            name,
            description,
            payload: `[${name}]`, // Placeholder payload as default value
          },
        ],
      });
    }

    form.reset(generateDefaultValues.commandParameter());
  };

  const handleParameterClick = (parameter: CommandParameterEntity) => {
    if (selectedParameter?.id === parameter.id) {
      setSelectedParameter(null);
      form.reset(generateDefaultValues.commandParameter());
    } else {
      setSelectedParameter(parameter);
      form.reset({
        id: parameter.id,
        name: parameter.name,
        description: parameter.description,
      });
    }
  };

  const handleRemoveParameterClick = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();

    if (!revisedCommand) {
      return;
    }

    const filteredParameters = revisedCommand.parameters?.filter(
      (parameter) => parameter.id !== id,
    );

    // If there are no parameters left, remove the parameters key from the draft command
    if (filteredParameters?.length === 0) {
      setRevisedCommand({
        ...revisedCommand,
        parameters: undefined,
      });
    } else {
      setRevisedCommand({
        ...revisedCommand,
        parameters: filteredParameters,
      });
    }

    if (selectedParameter?.id === id) {
      setSelectedParameter(null);
      form.reset(generateDefaultValues.commandParameter());
    }
  };

  const isParameterSelected = selectedParameter !== null;
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
                        placeholder={
                          defaults.placeholders.commandParameter.name
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
                          defaults.placeholders.commandParameter.description
                        }
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={!(isBasicCommand && form.formState.isDirty)}
            >
              <PlusCircleIcon className="mr-2 size-4" />
              &nbsp;{isParameterSelected ? "Update" : "Add"} parameter
            </Button>
          </div>
          <div className="flex w-[36rem] flex-col gap-y-4">
            <h1 className="font-medium text-sm">
              Parameters (Click to see contents)
            </h1>
            <ScrollArea className="h-[24.5rem] w-full rounded-sm border bg-gray-100 p-2 dark:bg-[#171823]">
              <div className="flex flex-col gap-y-2">
                {revisedCommand?.parameters &&
                revisedCommand?.parameters?.length !== 0 ? (
                  revisedCommand?.parameters?.map((parameter) => (
                    <Card
                      key={parameter.id}
                      onClick={() => handleParameterClick(parameter)}
                      className={cn(
                        "flex cursor-pointer select-none items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground",
                        selectedParameter?.id === parameter.id &&
                          "inner-border-2 inner-border-primary",
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

export { EditCommandStep2 };
