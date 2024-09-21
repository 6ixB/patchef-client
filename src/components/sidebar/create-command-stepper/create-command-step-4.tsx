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
import { CommandParameterSchema } from "@/types/command";
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
import CreateCommandOptionsCombobox from "@/components/sidebar/create-command-stepper/create-command-options-combobox";
import { useState } from "react";

const CreateCommandStep4 = ({ prev, next }: CreateCommandStepProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const createCommandOptionsComboboxProps = { open, setOpen, value, setValue };

  const form = useForm<z.infer<typeof CommandParameterSchema>>({
    resolver: zodResolver(CommandParameterSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof CommandParameterSchema>) {
    next();
  }

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
                <div className="text-sm">Option</div>
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
            <Button>
              <PlusCircleIcon className="mr-2 size-4" /> Add parameter
            </Button>
          </div>
          <div className="flex w-[36rem] flex-col gap-y-4">
            <div className="text-sm">Parameters</div>
            <ScrollArea className="h-[24.5rem] w-full rounded-sm border bg-gray-100 p-2 dark:bg-[#171823]">
              <div className="flex flex-col gap-y-2">
                <Card className="flex cursor-pointer items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground">
                  No parameters added
                  <RabbitIcon className="size-4" />
                </Card>
                {["Username", "Host", "Port"].map((item) => (
                  <Card
                    key={item}
                    className="flex cursor-pointer items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground"
                  >
                    {item}
                    <XIcon className="size-4" />
                  </Card>
                ))}
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
          <Button type="submit">
            Next
            <ArrowRightIcon className="ml-2 size-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateCommandStep4;
