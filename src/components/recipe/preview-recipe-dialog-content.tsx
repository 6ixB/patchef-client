import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCommandStore } from "@/hooks/use-command-store";
import { useMemo } from "react";
import { Code } from "@/components/markdown/code";
import { generateCodeMarkdown, generateScriptPayload } from "@/lib/utils";

const PreviewRecipeDialogContent = () => {
  const { commandPreviews } = useCommandStore();

  const scriptPayload = useMemo(() => {
    return generateScriptPayload(commandPreviews);
  }, [commandPreviews]);

  const scriptMarkdown = generateCodeMarkdown({ codePayload: scriptPayload });

  return (
    <DialogContent className="w-full max-w-4xl">
      <DialogHeader>
        <DialogTitle>Preview Recipe</DialogTitle>
        <DialogDescription>
          The following is the generated script based on the commands you have
          added.
        </DialogDescription>
      </DialogHeader>
      <Code codeMarkdown={scriptMarkdown} />
    </DialogContent>
  );
};

export { PreviewRecipeDialogContent };
