import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCommandStore } from "@/hooks/use-command-store";
import { cn } from "@/lib/utils";
import { generateDefaultValues } from "@/services/commands.service";
import { parseParameters } from "@/services/parser.service";
import type { CreateCommandDto } from "@/types/commands/command.dto";
import type {
  BeforeMount,
  OnMount,
  OnChange,
  Monaco,
} from "@monaco-editor/react";
import { CodeIcon, RabbitIcon } from "lucide-react";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { v4 as generateUuidV4 } from "uuid";
import { AdvancedPayloadCodeEditor } from "../../markdown/advanced-payload-code-editor";
import { Badge } from "@/components/ui/badge";

interface CodeEditorDialogProps {
  form: UseFormReturn<CreateCommandDto>;
}

// TODO: Refactor redundant code, extract to a shared component/file
const CreateCommandCodeEditorDialog = ({ form }: CodeEditorDialogProps) => {
  const monacoRef = useRef<Monaco | null>(null);
  const { draftCommand, setDraftCommand } = useCommandStore();

  const preventDefault = (e: Event) => {
    e.preventDefault();
  };

  const handleEditorWillMount: BeforeMount = (_monaco) => {
    console.info("Editor will mount");
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco;

    const model = editor.getModel();

    if (model) {
      const lastLine = model.getLineCount();
      const lastColumn = model.getLineContent(lastLine).length + 1;
      editor.setPosition({ lineNumber: lastLine, column: lastColumn });
      editor.focus(); // Ensure the editor is focused so the cursor is visible
    }

    // Register a custom command with Ctrl + Shift + X
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyX,
      () => {
        const fullText = "{{PARAM_NAME}}";
        const paramText = "PARAM_NAME";
        const position = editor.getPosition(); // Get the current cursor position

        if (!position) {
          return;
        }

        // Insert the full text at the current position
        editor.executeEdits(null, [
          {
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column,
            ),
            text: fullText,
            forceMoveMarkers: true,
          },
        ]);

        // Define the range to select only "PARAM_NAME"
        const startColumn = position.column + 2; // Start after "{{"
        const endColumn = startColumn + paramText.length; // End after "PARAM_NAME"
        const range = new monaco.Range(
          position.lineNumber,
          startColumn,
          position.lineNumber,
          endColumn,
        );

        // Set the selection to highlight only "PARAM_NAME"
        editor.setSelection(range);
        editor.focus();
      },
    );
  };

  const handleEditorChange: OnChange = (value, _event) => {
    const rawValue = value ?? "";
    const parsedParameters = parseParameters(rawValue);

    form.setValue("payload", rawValue);
    setDraftCommand({
      ...(draftCommand ?? generateDefaultValues.draftCommand({ draftCommand })),
      payload: rawValue,
      parameters: parsedParameters.map((parameter) => ({
        id: generateUuidV4(),
        name: parameter,
        description: "None",
        payload: `[${parameter}]`,
      })),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button className="mt-1 w-fit">
          <CodeIcon className="mr-2 size-4" />
          Open Code Editor
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={preventDefault}
        onEscapeKeyDown={preventDefault}
        className="!rounded-md flex h-[48rem] w-full max-w-7xl flex-col"
      >
        <DialogHeader>
          <DialogTitle>Advanced Payload Editor</DialogTitle>
          <DialogDescription>
            Write your custom code to generate the payload
          </DialogDescription>
          <div className="text-muted-foreground text-sm">
            <Badge variant="secondary">Ctrl + Shift + X</Badge> to insert a
            parameter
          </div>
        </DialogHeader>
        <div className="grid flex-1 grid-cols-4 gap-4">
          <div className="col-span-3 rounded-md border bg-white dark:bg-[#24292e]">
            <AdvancedPayloadCodeEditor
              draftCommand={draftCommand}
              handleEditorChange={handleEditorChange}
              handleEditorDidMount={handleEditorDidMount}
              handleEditorWillMount={handleEditorWillMount}
            />
          </div>
          <ScrollArea className="h-full w-full rounded-md border bg-gray-100 p-2 dark:bg-[#171823]">
            <div className="flex flex-col gap-y-2">
              {draftCommand?.parameters &&
              draftCommand?.parameters?.length !== 0 ? (
                draftCommand?.parameters?.map((parameter) => (
                  <Card
                    key={parameter.id}
                    className={cn(
                      "flex select-none items-center justify-between rounded-md border p-2 text-sm",
                    )}
                  >
                    {parameter.name}
                  </Card>
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

export { type CodeEditorDialogProps, CreateCommandCodeEditorDialog };
