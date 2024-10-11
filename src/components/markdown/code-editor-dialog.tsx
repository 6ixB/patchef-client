import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CodeIcon, RabbitIcon, XIcon } from "lucide-react";
import Editor, {
  type BeforeMount,
  type OnMount,
  type OnChange,
  type Monaco,
} from "@monaco-editor/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import GitHubLightTheme from "@/lib/monaco-editor-themes/github-light.json";
import GitHubDarkTheme from "@/lib/monaco-editor-themes/github-dark.json";
import { useTheme } from "@/components/providers/theme-provider";

const getTheme = (theme: "light" | "dark" | "system" | undefined) => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return theme;
};

const CodeEditorDialog = () => {
  const { theme } = useTheme();
  const monacoRef = useRef<Monaco | null>(null);
  const [code, setCode] = useState<string>(`REM Start your patching journey now!
@echo off
echo Hello, World!
pause`);

  const preventDefault = (e: Event) => {
    e.preventDefault();
  };

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    monaco.editor.defineTheme("GitHubLightTheme", {
      base: "vs-dark",
      inherit: true,
      ...GitHubLightTheme,
    });
    monaco.editor.defineTheme("GitHubDarkTheme", {
      base: "vs-dark",
      inherit: true,
      ...GitHubDarkTheme,
    });
  };

  const handleEditorDidMount: OnMount = (_editor, monaco) => {
    monacoRef.current = monaco;
  };

  const handleEditorChange: OnChange = (value, _event) => {
    setCode(value ?? "");
  };

  console.info(code);

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
        className="!rounded-md h-full max-h-[48rem] w-full max-w-7xl"
      >
        <DialogHeader>
          <DialogTitle>Advanced Payload Editor</DialogTitle>
          <DialogDescription>
            Write your custom code to generate the payload
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="grid flex-1 grid-cols-3 gap-4">
            <div className="col-span-2 rounded-md border">
              <Editor
                defaultLanguage="bat"
                defaultValue={code}
                onChange={handleEditorChange}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                theme={
                  getTheme(theme as "light" | "dark" | "system" | undefined) ===
                  "light"
                    ? "GitHubLightTheme"
                    : "GitHubDarkTheme"
                }
                options={{
                  fontSize: 14,
                  fontFamily: "Geist Mono",
                  fontLigatures: true,
                  wordWrap: "on",
                  minimap: {
                    enabled: false,
                  },
                  bracketPairColorization: {
                    enabled: true,
                  },
                  cursorBlinking: "phase",
                  cursorStyle: "block-outline",
                  formatOnPaste: true,
                  mouseWheelZoom: true,
                  cursorSmoothCaretAnimation: "on",
                  smoothScrolling: true,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
            <ScrollArea className="h-full w-full rounded-md border bg-gray-100 p-2 dark:bg-[#171823]">
              <div className="flex flex-col gap-y-2">
                <Card className="flex cursor-pointer items-center justify-between rounded-md border-none bg-transparent p-2 text-sm shadow-none outline-none">
                  No parameters added
                  <RabbitIcon className="size-4" />
                </Card>
                <Card
                  className={cn(
                    "flex cursor-pointer select-none items-center justify-between rounded-md border p-2 text-sm hover:bg-muted hover:text-foreground",
                  )}
                >
                  Parameter Name
                  <XIcon className="size-4" />
                </Card>
              </div>
            </ScrollArea>
          </div>
          <div className="flex items-center justify-end gap-x-2">
            <Button variant="outline" className="mt-4">
              Cancel
            </Button>
            <Button className="mt-4">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { CodeEditorDialog };
