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
import {
  type CommandOption,
  type CommandParameter,
  CommandParameterSchema,
} from "@/types/command";
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
import { CreateCommandOptionsCombobox } from "@/components/sidebar/create-command-stepper/create-command-options-combobox";
import { type MouseEvent, useState } from "react";
import {
  checkAllFillableOptionParametersAreFilled,
  cn,
  generateDefaultValues,
} from "@/lib/utils";
import { useCommandStore } from "@/hooks/use-command-store";
import { toast } from "sonner";

const CreateCommandStep4 = ({ prev, next }: CreateCommandStepProps) => {
  const { draftCommand, setDraftCommand } = useCommandStore();
  const [selectedParameter, setSelectedParameter] =
    useState<CommandParameter | null>(null);

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<CommandOption | null>(
    null
  );
  const createCommandOptionsComboboxProps = {
    open,
    setOpen,
    selectedOption,
    setSelectedOption,
  };

  const form = useForm<z.infer<typeof CommandParameterSchema>>({
    resolver: zodResolver(CommandParameterSchema),
    defaultValues: generateDefaultValues.commandParameter(),
  });

  /* 
    Get the index of the selected option
    Note: option index can be 0 so we need to check for not found and undefined
  */
  const optionIndex = draftCommand?.options?.findIndex(
    (option) => option.id === selectedOption?.id
  );

  const onSubmit = (values: z.infer<typeof CommandParameterSchema>) => {
    if (!draftCommand) {
      return;
    }

    const { id, name, description } = values;

    if (optionIndex === -1 && optionIndex === undefined) {
      return;
    }

    setDraftCommand((draft) => {
      if (!draft?.options || optionIndex === undefined || optionIndex === -1) {
        return;
      }

      const newParameter = { id, name, description, payload: `[${name}]` }; // Placeholder payload as default value

      if (draft.options[optionIndex].parameters) {
        draft.options[optionIndex].parameters.push(newParameter);
      } else {
        draft.options[optionIndex].parameters = [newParameter];
      }
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

    setDraftCommand((draft) => {
      if (!draft?.options || optionIndex === undefined || optionIndex === -1) {
        return draft;
      }

      draft.options[optionIndex].parameters = draft.options[
        optionIndex
      ].parameters?.filter((parameter) => parameter.id !== id);
    });

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
          <div className="flex w-full flex-col justify-between gap-y-2">
            <div className="flex w-full flex-col gap-y-2">
              <div className="flex w-full flex-col gap-y-4">
                <h1 className="font-medium text-sm">Option</h1>
                <CreateCommandOptionsCombobox
                  {...createCommandOptionsComboboxProps}
                />
              </div>
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
                {optionIndex !== undefined &&
                draftCommand?.options &&
                draftCommand?.options[optionIndex]?.parameters?.length !== 0 ? (
                  draftCommand?.options[optionIndex]?.parameters?.map(
                    (parameter) => (
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
                    )
                  )
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
              // Check if all required option parameters are filled
              if (!checkAllFillableOptionParametersAreFilled(draftCommand)) {
                toast.error(
                  "Please fill out all required parameters for each option."
                );
                return;
              }

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

export { CreateCommandStep4 };
