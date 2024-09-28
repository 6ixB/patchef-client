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
import { v4 as generateUuidV4 } from "uuid";
import { type MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

const CreateCommandStep2 = ({ prev, next }: CreateCommandStepProps) => {
  const { draftCommand, setDraftCommand } = useCommandStore();
  const [selectedParameter, setSelectedParameter] =
    useState<CommandParameter | null>(null);

  const form = useForm<z.infer<typeof CommandParameterSchema>>({
    resolver: zodResolver(CommandParameterSchema),
    defaultValues: {
      id: generateUuidV4(),
      name: "",
      description: "",
    },
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
        },
      ],
    });

    form.reset({
      id: generateUuidV4(),
      name: "",
      description: "",
    });
  };

  const handleRemoveParameterClick = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();

    if (!draftCommand) {
      return;
    }

    setDraftCommand({
      ...draftCommand,
      parameters: draftCommand.parameters?.filter((item) => item.id !== id),
    });

    if (selectedParameter?.id === id) {
      setSelectedParameter(null);
      form.reset({
        id: generateUuidV4(),
        name: "",
        description: "",
      });
    }
  };

  const handleParameterClick = (parameter: CommandParameter) => {
    if (selectedParameter?.id === parameter.id) {
      setSelectedParameter(null);
      form.reset({
        id: generateUuidV4(),
        name: "",
        description: "",
      });
    } else {
      setSelectedParameter(parameter);
      form.setValue("name", parameter.name);
      form.setValue("description", parameter.description);
      form.setValue("id", parameter.id);
    }
  };

  const aParameterIsSelected = selectedParameter !== null;

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
                        readOnly={aParameterIsSelected}
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
                        readOnly={aParameterIsSelected}
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
            <Button type="submit" disabled={aParameterIsSelected}>
              <PlusCircleIcon className="mr-2 size-4" /> Add parameter
            </Button>
          </div>
          <div className="flex w-[36rem] flex-col gap-y-4">
            <div className="text-sm">Parameters (Click to see contents)</div>
            <ScrollArea className="h-[24.5rem] w-full rounded-sm border bg-gray-100 p-2 dark:bg-[#171823]">
              <div className="flex flex-col gap-y-2">
                {draftCommand?.parameters &&
                draftCommand?.parameters?.length !== 0 ? (
                  draftCommand?.parameters?.map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => handleParameterClick(item)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground",
                        selectedParameter?.id === item.id &&
                          "border-2 border-primary",
                      )}
                    >
                      {item.name}
                      <XIcon
                        onClick={(e) => {
                          handleRemoveParameterClick(e, item.id);
                        }}
                        className="size-4"
                      />
                    </Card>
                  ))
                ) : (
                  <Card className="flex cursor-pointer items-center justify-between rounded-md border p-2 text-sm">
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
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
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
