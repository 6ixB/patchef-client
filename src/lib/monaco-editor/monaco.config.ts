import type { Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

const editorStyleOptions: editor.IStandaloneEditorConstructionOptions = {
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
};

function addCommands(monaco: Monaco, editor: editor.IStandaloneCodeEditor) {
  // Register a custom command with Ctrl + Alt + X
  editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyX,
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
            position.column
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
        endColumn
      );

      // Set the selection to highlight only "PARAM_NAME"
      editor.setSelection(range);
      editor.focus();
    }
  );
}

function initMonaco(monaco: Monaco, editor: editor.IStandaloneCodeEditor) {
  addCommands(monaco, editor);
}

export { editorStyleOptions, initMonaco };
