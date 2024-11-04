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
import { parseParameters } from "@/services/parser.service";
import type { CommandEntity } from "@/types/commands/command.entity";
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

interface CodeEditorDialogProps {
  form: UseFormReturn<CommandEntity>;
}

const EditCommandCodeEditorDialog = ({ form }: CodeEditorDialogProps) => {
  const monacoRef = useRef<Monaco | null>(null);
  const { revisedCommand, setRevisedCommand } = useCommandStore();

  const preventDefault = (e: Event) => {
    e.preventDefault();
  };

  const handleEditorWillMount: BeforeMount = (_monaco) => {
    console.info("Editor will mount");
  };

  const handleEditorDidMount: OnMount = (_editor, monaco) => {
    monacoRef.current = monaco;
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
        className="!rounded-md flex h-full max-h-[48rem] w-full max-w-7xl flex-col"
      >
        <DialogHeader>
          <DialogTitle>Advanced Payload Editor</DialogTitle>
          <DialogDescription>
            Write your custom code to generate the payload
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 grid-cols-4 gap-4">
          <div className="col-span-3 rounded-md border bg-white dark:bg-[#24292e]">
            <AdvancedPayloadCodeEditor
              revisedCommand={revisedCommand}
              handleEditorChange={handleEditorChange}
              handleEditorDidMount={handleEditorDidMount}
              handleEditorWillMount={handleEditorWillMount}
            />
          </div>
          <ScrollArea className="h-full w-full rounded-md border bg-gray-100 p-2 dark:bg-[#171823]">
            <div className="flex flex-col gap-y-2">
              {revisedCommand?.parameters &&
              revisedCommand?.parameters?.length !== 0 ? (
                revisedCommand?.parameters?.map((parameter) => (
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

export { type CodeEditorDialogProps, EditCommandCodeEditorDialog };
