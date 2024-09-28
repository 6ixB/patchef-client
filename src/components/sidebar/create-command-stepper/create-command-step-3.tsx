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
import { CommandOptionSchema } from "@/types/command";
import type { CreateCommandStepProps } from "@/components/sidebar/create-command-stepper/create-command-stepper";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  RabbitIcon,
  VariableIcon,
  XIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const CreateCommandStep3 = ({ prev, next }: CreateCommandStepProps) => {
  const form = useForm<z.infer<typeof CommandOptionSchema>>({
    resolver: zodResolver(CommandOptionSchema),
    defaultValues: {
      name: "",
      description: "",
      payload: "",
      parameterRequired: false,
    },
  });

  const onSubmit = (values: z.infer<typeof CommandOptionSchema>) => {
    next();
  };

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
                        placeholder="Silent mode"
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
                        placeholder="Run the command in silent mode"
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
                        placeholder="/s"
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
            </div>
            <Button>
              <PlusCircleIcon className="mr-2 size-4" /> Add option
            </Button>
          </div>
          <div className="flex w-[36rem] flex-col gap-y-4">
            <div className="text-sm">Options (Click to see contents)</div>
            <ScrollArea className="h-[24.5rem] w-full rounded-sm border bg-gray-100 p-2 dark:bg-[#171823]">
              <div className="flex flex-col gap-y-2">
                <Card className="flex cursor-pointer items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground">
                  No options added
                  <RabbitIcon className="size-4" />
                </Card>
                {["Recursive", "Verbose"].map((item) => (
                  <Card
                    key={item}
                    className="flex cursor-pointer items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground"
                  >
                    {item}
                    <div className="flex items-center gap-x-2">
                      <VariableIcon className="size-4" />
                      <XIcon className="size-4" />
                    </div>
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

export { CreateCommandStep3 };
