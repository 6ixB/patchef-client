import type { Command, CommandParameter } from "@/types/command";
import { CommandPreview } from "@/types/command-preview";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* 
  Usage: this function is used to merge tailwind classes with classnames
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 
  Usage: this function is used to format parameters for a command
*/
export function formatParameters(parameters: CommandParameter[]): string {
  return parameters.map((param) => param.name).join(" ");
}

/* 
  Usage: this function is used to generate a command string
*/
export function generateCommandString(command: Command): string {
  let commandString = command.payload;

  if (command.parameters && command.parameters.length > 0) {
    const params = formatParameters(command.parameters);
    commandString += ` ${params}`;
  }

  if (command.options && command.options.length > 0) {
    for (const option of command.options) {
      commandString += ` ${option.payload}`;

      const delimiter = option.delimiter !== undefined ? option.delimiter : " ";
      commandString += delimiter;

      if (
        option.parameterRequired &&
        option.parameters &&
        option.parameters.length > 0
      ) {
        const optionParams = formatParameters(option.parameters);
        commandString += optionParams;
      }
    }
  }

  return commandString;
}

/* 
  Usage: this function is used to generate a markdown code block
*/
export function generateCodeMarkdown({
  codePayload,
  showLineNumbers = true,
}: {
  codePayload: string;
  showLineNumbers?: boolean;
}) {
  return `\`\`\`batch ${
    showLineNumbers && "showLineNumbers"
  }\n${codePayload}\n\`\`\``;
}

/* 
  Usage: this function is used to generate a script payload
*/
export function generateScriptPayload(
  commandPreviews: CommandPreview[]
): string {
  return commandPreviews
    .map((commandPreview) => commandPreview.preview)
    .join("\n");
}
