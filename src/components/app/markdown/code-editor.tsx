import { Icons } from "@/components/ui/icons";
import {
  type BeforeMount,
  Editor,
  type OnMount,
  type OnChange,
} from "@monaco-editor/react";
import { useTheme } from "@/components/app/providers/theme-provider";
import type { CreateCommandDto } from "@/types/commands/command.dto";
import type { CommandEntity } from "@/types/commands/command.entity";
import GitHubDarkTheme from "@/lib/monaco-editor/themes/github-dark.json";
import GitHubLightTheme from "@/lib/monaco-editor/themes/github-light.json";
import { defaults } from "@/lib/defaults";

const getTheme = (theme: "light" | "dark" | "system" | undefined) => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return theme;
};

interface CodeEditorProps {
  draftCommand?: CreateCommandDto | null;
  revisedCommand?: CommandEntity | null;
  handleEditorChange?: OnChange;
  handleEditorWillMount?: BeforeMount;
  handleEditorDidMount?: OnMount;
}

const CodeEditor = ({
  draftCommand,
  revisedCommand,
  handleEditorChange,
  handleEditorWillMount,
  handleEditorDidMount,
}: CodeEditorProps) => {
  const { theme } = useTheme();

  return (
    // I have no fucking idea how to round the editor's corners - MY23-1
    <div className="col-span-3 bg-white dark:bg-[#24292e]">
      <Editor
        defaultLanguage="bat"
        defaultValue={
          draftCommand?.payload ??
          revisedCommand?.payload ??
          defaults.values.codeEditor
        }
        onChange={handleEditorChange}
        beforeMount={(monaco) => {
          // Define custom themes
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

          handleEditorWillMount?.(monaco);
        }}
        onMount={handleEditorDidMount}
        theme={
          getTheme(theme as "light" | "dark" | "system" | undefined) === "light"
            ? "GitHubLightTheme"
            : "GitHubDarkTheme"
        }
        options={{
          roundedSelection: true,
          padding: {
            top: 16,
            bottom: 16,
          },
          fontSize: 16,
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
        loading={<Icons.spinner className="size-4 animate-spin" />}
      />
    </div>
  );
};

export { type CodeEditorProps, CodeEditor };
