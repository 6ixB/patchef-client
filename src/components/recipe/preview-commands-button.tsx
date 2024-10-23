import { Code } from "@/components/markdown/code";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCommandStore } from "@/hooks/use-command-store";
import { cn } from "@/lib/utils";
import {
  generateCodeMarkdown,
  generateScriptPayload,
} from "@/services/commands.service";
import { SquareTerminalIcon } from "lucide-react";
import { useMemo } from "react";

const PreviewCommandsButton = () => {
  const { destinationCommands, commandPreviews, setCommandPreviews } =
    useCommandStore();

  const scriptPayload = useMemo(() => {
    return generateScriptPayload(commandPreviews);
  }, [commandPreviews]);

  const scriptMarkdown = generateCodeMarkdown({ codePayload: scriptPayload });

  const isEmpty = destinationCommands.length === 0;

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button
          disabled={isEmpty}
          onClick={setCommandPreviews}
          className={cn(
            "transition-opacity duration-200",
            isEmpty ? "!opacity-0" : "opacity-100",
          )}
        >
          <SquareTerminalIcon className="mr-2 size-4" />
          Preview
        </Button>
      </DialogTrigger>
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
    </Dialog>
  );
};

export { PreviewCommandsButton };
