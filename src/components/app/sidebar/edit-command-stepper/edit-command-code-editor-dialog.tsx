import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCommandStore } from "@/hooks/use-command-store";
import { cn } from "@/lib/utils";
import { parseParameters } from "@/services/parser.service";
import type {
  CommandEntity,
  CommandParameterEntity,
} from "@/types/commands/command.entity";
import type {
  BeforeMount,
  OnMount,
  OnChange,
  Monaco,
} from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { CodeIcon, RabbitIcon } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { v4 as generateUuidV4 } from "uuid";
import { CodeEditor } from "@/components/app/markdown/code-editor";
import { initMonaco } from "@/lib/monaco-editor/monaco.config";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface CodeEditorDialogProps {
  form: UseFormReturn<CommandEntity>;
}

// TODO: Refactor redundant code, extract to a shared component/file
const EditCommandCodeEditorDialog = ({ form }: CodeEditorDialogProps) => {
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { revisedCommand, setRevisedCommand } = useCommandStore();

  const preventDefault = (e: Event) => {
    e.preventDefault();
  };

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monacoRef.current = monaco;
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;
    editorRef.current = editor;

    const model = editor.getModel();

    if (model) {
      const lastLine = model.getLineCount();
      const lastColumn = model.getLineContent(lastLine).length + 1;
      editor.setPosition({ lineNumber: lastLine, column: lastColumn });
      editor.focus(); // Ensure the editor is focused so the cursor is visible
    }

    initMonaco(monaco, editor);
  };

  const handleEditorChange: OnChange = (value, _event) => {
    const rawValue = value ?? "";
    const parsedParameters = parseParameters(rawValue);

    form.setValue("payload", rawValue);

    if (revisedCommand) {
      setRevisedCommand({
        ...revisedCommand,
        payload: rawValue,
        parameters: parsedParameters.map((parameter) => ({
          id: generateUuidV4(),
          name: parameter,
          description: "None",
          payload: `[${parameter}]`,
        })),
      });
    }
  };

  const handleParameterClick = (parameter: CommandParameterEntity) => {
    const editor = editorRef.current;

    if (editor) {
      const model = editor.getModel();
      if (model) {
        const searchString = `{{${parameter.name}}}`;
        const matches = model.findMatches(
          searchString,
          true, // Search case-sensitive
          false, // Not a regex
          true, // Not matching whole words
          null, // Word definitions
          true, // Capture matches
        );

        if (matches.length > 0) {
          const match = matches[0].range; // Focus on the first match
          editor.setSelection(match); // Highlight the matching text
          editor.revealRangeInCenter(match); // Ensure the match is visible in the editor
          editor.focus(); // Ensure the editor is focused

          toast.success(`Parameter "${parameter.name}" selected in the editor`);
        } else {
          toast.error(`Parameter "${parameter.name}" not found in the editor`);
        }
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant="ringHover" className="mt-1 w-fit">
          <CodeIcon className="mr-2 size-4" />
          Open Code Editor
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={preventDefault}
        onEscapeKeyDown={preventDefault}
        className="!rounded-none flex w-full max-w-7xl flex-col p-0 sm:h-[32rem] md:h-[40rem] lg:h-[48rem] xl:h-[56rem]"
      >
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Advanced Payload Editor</DialogTitle>
            <DialogDescription>
              Use the code editor to create a more advanced command payload.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <div className="grid flex-1 grid-cols-4">
          <CodeEditor
            revisedCommand={revisedCommand}
            handleEditorChange={handleEditorChange}
            handleEditorDidMount={handleEditorDidMount}
            handleEditorWillMount={handleEditorWillMount}
          />
          <ScrollArea className="h-full w-full rounded-r-md rounded-l-none bg-gray-200 px-3 py-2 dark:bg-[#171823]">
            <div className="flex flex-col gap-y-2 px-1">
              <div className="mt-1 text-muted-foreground text-sm">
                <Badge variant="secondary">Ctrl + Shift + X</Badge> to insert a
                parameter
              </div>
              {revisedCommand?.parameters &&
              revisedCommand?.parameters?.length !== 0 ? (
                revisedCommand?.parameters?.map((parameter) => (
                  <Button
                    key={parameter.id}
                    onClick={() => handleParameterClick(parameter)}
                    variant="ringHover"
                    className={cn(
                      "flex cursor-pointer select-none items-center justify-between rounded-md border-none bg-gray-100 p-2 text-foreground text-sm shadow-none outline-none hover:bg-muted dark:bg-gray-800",
                    )}
                  >
                    {parameter.name}
                  </Button>
                ))
              ) : (
                <Card className="flex items-center justify-between rounded-md border-none bg-transparent p-2 text-sm shadow-none outline-none">
                  No parameters added
                  <RabbitIcon className="size-4" />
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { type CodeEditorDialogProps, EditCommandCodeEditorDialog };
