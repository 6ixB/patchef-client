import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Command } from "@/types/command";
import { generateCodeMarkdown, generateCommandString } from "@/lib/utils";
import { Code } from "@/components/ui/code";

export interface RecipeListItemPreviewDialogContentProps {
  command: Command;
}

const RecipeListItemPreviewDialogContent = ({
  command,
}: RecipeListItemPreviewDialogContentProps) => {
  const codePayload = generateCommandString(command);
  const codeMarkdown = generateCodeMarkdown({
    codePayload,
    showLineNumbers: false,
  });

  return (
    <DialogContent className="w-full max-w-4xl">
      <DialogHeader>
        <DialogTitle>Preview command</DialogTitle>
        <DialogDescription>
          The following is the generated command string based on your filled
          parameters and selected options.
        </DialogDescription>
      </DialogHeader>
      <Code codeMarkdown={codeMarkdown} />
    </DialogContent>
  );
};

export { RecipeListItemPreviewDialogContent };
