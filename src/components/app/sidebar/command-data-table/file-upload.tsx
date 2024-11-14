import { importCommands as importCommandsApi } from "@/api/command.api";
import { Input } from "@/components/ui/input";
import { useCommandStore } from "@/hooks/use-command-store";
import { CommandEntityArraySchema } from "@/types/commands/command.entity";
import { useMutation } from "@tanstack/react-query";
import { UploadIcon } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { z } from "zod";

interface FileUploadProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const FileUpload = ({ open, setOpen }: FileUploadProps) => {
  const { setSourceCommands, setInitialSourceCommands } = useCommandStore();

  const importCommandsMutation = useMutation({
    mutationKey: ["import-commands"],
    mutationFn: importCommandsApi,
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();

        reader.onabort = () => console.info("file reading was aborted");

        reader.onerror = () => console.error("file reading has failed");

        reader.onload = async () => {
          const importCommands = async () => {
            const fileContents = reader.result as string;
            const commands = JSON.parse(fileContents);

            const validatedCommands = CommandEntityArraySchema.parse(commands);

            const importedCommands =
              await importCommandsMutation.mutateAsync(validatedCommands);

            setSourceCommands(importedCommands);
            setInitialSourceCommands(importedCommands);

            return importedCommands;
          };

          toast.promise(importCommands, {
            loading: "Importing commands...",
            success: (importedCommands) => {
              if (open) {
                setOpen(false);
              }

              return `${importedCommands.length} commands imported successfully!`;
            },
            error: (error) => {
              if (error instanceof z.ZodError) {
                console.error("Validation errors:", error.errors);
                return "Validation failed! Please check the commands and try again.";
              }

              if (error instanceof SyntaxError) {
                console.error("Error parsing JSON:", error);
                return "Invalid JSON format! Please ensure the file contains valid JSON.";
              }

              console.error("An unexpected error occurred:", error);
              return "An error occurred while importing commands.";
            },
          });
        };

        reader.readAsText(file);
      }
    },
    [
      importCommandsMutation,
      setSourceCommands,
      setInitialSourceCommands,
      open,
      setOpen,
    ],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 py-6 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 hover:dark:bg-gray-900"
    >
      <div className="text-center text-gray-500">
        <div className="mx-auto max-w-min">
          <UploadIcon className="size-4" />
        </div>
        <p className="mt-2 text-sm">
          <span className="font-semibold">Drag file</span>
        </p>
        <p className="text-xs">Click to upload a JSON file</p>
      </div>
      <Input
        {...getInputProps()}
        id="dropzone-file"
        accept="application/json"
        type="file"
        multiple={false}
        className="hidden"
      />
    </div>
  );
};

export { type FileUploadProps, FileUpload };
