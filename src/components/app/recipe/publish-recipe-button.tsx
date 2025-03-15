import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FolderIcon, CloudUploadIcon, FileTerminalIcon } from "lucide-react";
import { useCommandStore } from "@/hooks/use-command-store";
import {
  type PublishRecipeDto,
  PublishRecipeDtoSchema,
} from "@/types/recipes/recipe.dto";
import { PublishedRecipeErrorCode } from "@/types/recipes/recipe.entity";
import { publishRecipe as publishRecipeApi } from "@/api/recipe.api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const PublishRecipeButton = () => {
  const [overwriteConfirmationOpen, setOverwriteConfirmationOpen] =
    useState<boolean>(false);

  const { destinationCommands, commandPreviews, setCommandPreviews } =
    useCommandStore();

  const form = useForm<PublishRecipeDto>({
    resolver: zodResolver(PublishRecipeDtoSchema),
    defaultValues: {
      directoryName: "",
      fileName: "",
      /*
        This 'commands' attributes is ignored since we're going to use values from 'commandPreviews' instead, 
        so we set the form's noValidate attribute to true. -MY23-1
      */
      commands: [],
    },
  });

  const publishRecipeMutation = useMutation({
    mutationKey: ["publish-recipe"],
    mutationFn: publishRecipeApi,
  });

  const onSubmit = (values: PublishRecipeDto) => {
    const { directoryName, fileName } = values;

    if (!directoryName.trim()) {
      toast.error("Directory name is required!");
      return;
    }

    if (!fileName.trim()) {
      toast.error("File name is required!");
      return;
    }

    const commandStrings = commandPreviews.map((command) => command.preview);

    const publishRecipe = async () => {
      const publishedRecipe = await publishRecipeMutation.mutateAsync({
        directoryName: directoryName.trim(),
        fileName: fileName.trim(),
        overwrite: false,
        commands: commandStrings,
      });

      form.reset({
        directoryName: "",
        fileName: "",
        commands: [],
      });

      return publishedRecipe;
    };

    toast.promise(publishRecipe, {
      loading: "Publishing recipe...",
      success: () => {
        return "Recipe published successfully to remote repository!";
      },
      error: (error) => {
        console.error(`Failed to publish recipe, ${error.message}`);
        return `Failed to publish recipe, ${error.message}`;
      },
    });
  };

  const handleOverwriteClick = () => {
    const publishRecipe = async () => {
      const { directoryName, fileName } = form.getValues();
      const commandStrings = commandPreviews.map((command) => command.preview);

      const publishedRecipe = await publishRecipeMutation.mutateAsync({
        directoryName: directoryName.trim(),
        fileName: fileName.trim(),
        overwrite: true,
        commands: commandStrings,
      });

      form.reset({
        directoryName: "",
        fileName: "",
        commands: [],
      });

      return publishedRecipe;
    };

    toast.promise(publishRecipe, {
      loading: "Publishing recipe...",
      success: () => {
        return "Recipe published successfully to remote repository!";
      },
      error: (error) => {
        console.error(`Failed to publish recipe, ${error.message}`);
        return `Failed to publish recipe, ${error.message}`;
      },
    });
  };

  const isEmpty = destinationCommands.length === 0;

  useEffect(() => {
    if (
      publishRecipeMutation?.error?.name === PublishedRecipeErrorCode.FileExists
    ) {
      form.setError("fileName", {
        type: "manual",
        message: "File already exists",
      });

      setOverwriteConfirmationOpen(true);
    }
  }, [form.setError, publishRecipeMutation.error]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild={true}>
          <Button
            disabled={isEmpty}
            onClick={setCommandPreviews}
            className={cn(
              "transition-opacity duration-200",
              isEmpty ? "!opacity-0" : "opacity-100",
            )}
          >
            <CloudUploadIcon className="mr-2 size-4" />
            Publish
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <form
              noValidate={true}
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-y-2"
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Publish your recipe</AlertDialogTitle>
                <VisuallyHidden>
                  <AlertDialogDescription>
                    Your recipe will be published to a public directory located
                    at Zou server as batch script file.
                  </AlertDialogDescription>
                </VisuallyHidden>
                <div className="text-muted-foreground text-sm">
                  Your recipe will be published to a public directoy located
                  at&nbsp;
                  <Badge variant="outline">Zou</Badge> server as a batch script
                  file.
                </div>

                <FormField
                  control={form.control}
                  name="directoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Directory name</FormLabel>
                      <FormDescription>
                        The name of the directory where the recipe will be
                        published
                      </FormDescription>
                      <FormControl>
                        <div className="relative w-full">
                          <FolderIcon className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            autoComplete="off"
                            autoFocus={true}
                            placeholder="install-visual-studio-code"
                            {...field}
                            className="w-full px-8"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fileName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File name</FormLabel>
                      <FormDescription>
                        The name of the file including extension
                      </FormDescription>
                      <FormControl>
                        <div className="relative w-full">
                          <FileTerminalIcon className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            autoComplete="off"
                            placeholder="start.bat"
                            {...field}
                            className="w-full px-8"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Publish</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={overwriteConfirmationOpen}
        onOpenChange={(open) => {
          setOverwriteConfirmationOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              File already exists, are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently overwrite the
              file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleOverwriteClick}>
              Overwrite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { PublishRecipeButton };
