import type { CreateCommandStepProps } from "@/components/app/sidebar/create-command-stepper/create-command-stepper";
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
  type CreateCommandParameterDto,
  CreateCommandParameterDtoSchema,
} from "@/types/commands/command.dto";
import { CommandType } from "@/types/commands/command.entity";
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

const CreateCommandStep2 = ({ prev, next }: CreateCommandStepProps) => {
  const { draftCommand, setDraftCommand } = useCommandStore();
  const [selectedParameter, setSelectedParameter] =
    useState<CreateCommandParameterDto | null>(null);

  const form = useForm<CreateCommandParameterDto>({
    resolver: zodResolver(CreateCommandParameterDtoSchema),
    defaultValues: generateDefaultValues.commandParameter(),
  });

  // TODO: Reduce the complexity of this function
  const onSubmit = (values: CreateCommandParameterDto) => {
    if (!draftCommand) {
      return;
    }

    const { id, name, description } = values;

    if (selectedParameter) {
      const updatedParameters = draftCommand.parameters?.map((parameter) => {
        if (parameter.id === selectedParameter.id) {
          return {
            id,
            ...parameter,
            name,
            description,
            payload: `[${name}]`, // Placeholder payload as default value
          };
        }

        return parameter;
      });

      setDraftCommand({
        ...draftCommand,
        parameters: updatedParameters,
      });

      setSelectedParameter(null);
    } else {
      let nameAlreadyExists = false;

      for (const parameter of draftCommand.parameters ?? []) {
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
    }

    form.reset(generateDefaultValues.commandParameter());
  };

  const handleParameterClick = (parameter: CreateCommandParameterDto) => {
    form.clearErrors();

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
    id: string | undefined
  ) => {
    e.stopPropagation();

    if (!(draftCommand && id)) {
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
  const isBasicCommand = draftCommand?.type === CommandType.Basic;

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
                        readOnly={!isBasicCommand}
                        autoComplete="off"
                        autoFocus={true}
                        placeholder={
                          defaults.placeholders.command.parameter.name
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
                          defaults.placeholders.command.parameter.description
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
            <Button type="submit" disabled={!form.formState.isDirty}>
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
                      {isBasicCommand && (
                        <XIcon
                          onClick={(e) => {
                            handleRemoveParameterClick(e, parameter.id);
                          }}
                          className="size-4"
                        />
                      )}
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
