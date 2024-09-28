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
import { CommandSchema } from "@/types/command";
import type { CreateCommandStepProps } from "@/components/sidebar/create-command-stepper/create-command-stepper";
import { v4 as generateUuidV4 } from "uuid";
import { useCommandStore } from "@/hooks/use-command-store";
import { ManageState } from "@/types/use-command.store";
import { ArrowRightIcon, XIcon } from "lucide-react";
import type { MouseEvent } from "react";

const CreateCommandStep1 = ({ next }: CreateCommandStepProps) => {
  const { setManageState, draftCommand, setDraftCommand } = useCommandStore();

  const form = useForm<z.infer<typeof CommandSchema>>({
    resolver: zodResolver(CommandSchema),
    defaultValues: {
      id: draftCommand?.id ?? generateUuidV4(),
      name: draftCommand?.name ?? "",
      description: draftCommand?.description ?? "",
      payload: draftCommand?.payload ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof CommandSchema>) => {
    const { id, name, description, payload } = values;

    setDraftCommand({
      ...draftCommand,
      id,
      name,
      description,
      payload,
    });

    next();
  };

  const handleCancelClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault();
    form.reset();
    setDraftCommand(null);
    setManageState(ManageState.View);
  };

  return (
    <Form {...form}>
      <form
        noValidate={true}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-2xl flex-col justify-between gap-y-4"
      >
        <div className="flex w-full flex-col gap-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormDescription>
                  The name of the command that users will use to trigger it
                </FormDescription>
                <FormControl>
                  <Input
                    autoComplete="off"
                    autoFocus={true}
                    placeholder="Secure Socket Shell"
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
                  A brief description of what the command does
                </FormDescription>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Connect to a remote machine via SSH"
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
                  The payload of the command that will be executed
                </FormDescription>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="ssh"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-x-4 self-end">
          <Button variant="outline" onClick={handleCancelClick}>
            <XIcon className="mr-2 size-4" />
            Cancel
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

export { CreateCommandStep1 };
