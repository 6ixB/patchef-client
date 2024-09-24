import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Command } from "@/types/command";
import { generateCodeMarkdown, generateCommandString } from "@/lib/utils";
import Code from "@/components/code";

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
          The following is the generated code based on the commands you have
          added.
        </DialogDescription>
      </DialogHeader>
      <Code codeMarkdown={codeMarkdown} />
    </DialogContent>
  );
};

export default RecipeListItemPreviewDialogContent;
