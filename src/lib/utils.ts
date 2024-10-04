import type { Command, CommandParameter } from "@/types/command";
import type { CommandPreview } from "@/types/command-preview";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as generateUuidV4 } from "uuid";

/* 
  Usage: this function is used to merge tailwind classes with classnames
*/
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 
  Usage: this function is used to format parameters for a command
*/
function formatParameters(parameters: CommandParameter[]): string {
  return parameters.map((param) => param.payload).join(" ");
}

/* 
  Usage: this function is used to generate a command string
*/

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This function is fine as is - MY23-1
function generateCommandString(command: Command): string {
  let commandString = command.payload;

  if (command.parameters && command.parameters.length > 0) {
    const params = formatParameters(command.parameters);
    commandString += ` ${params}`;
  }

  commandString += " ";

  if (command.options && command.options.length > 0) {
    for (const option of command.options) {
      if (!option.enabled) {
        continue;
      }

      commandString += `${option.payload}`;

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

  commandString = commandString.trim();

  return commandString;
}

function copyDraftCommand(draftCommand: Command | null) {
  if (!draftCommand) {
    return null;
  }

  const draftCommandCopy = {
    ...draftCommand,
    parameters: draftCommand.parameters
      ? draftCommand.parameters.map((parameter) => ({
          ...parameter,
          payload: `[${parameter.name}]`,
        }))
      : [],
  };

  return draftCommandCopy;
}

/* 
  Usage: this function is used to generate default values for a command
*/
const generateDefaultValues = {
  command: (draftCommand: Command | null) => ({
    id: draftCommand?.id ?? generateUuidV4(),
    name: draftCommand?.name ?? "",
    description: draftCommand?.description ?? "",
    payload: draftCommand?.payload ?? "",
  }),

  commandParameter: () => ({
    id: generateUuidV4(),
    name: "",
    description: "",
  }),

  commandOption: () => ({
    id: generateUuidV4(),
    name: "",
    description: "",
    payload: "",
    parameterRequired: false,
    delimiter: " ", // Default delimiter is space
    enabled: false,
  }),
};

/* 
  Usage: this function is used to check if all required option parameters are filled
*/
function checkAllRequiredOptionParametersAreFilled(command: Command | null) {
  if (!command?.options) {
    return false;
  }

  for (const option of command.options) {
    if (
      option.parameterRequired &&
      (!option.parameters || option.parameters.length === 0)
    ) {
      return false;
    }
  }

  console.info("All required option parameters are filled");

  return true;
}

/* 
  Usage: this function is used to generate a markdown code block
*/
function generateCodeMarkdown({
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
function generateScriptPayload(commandPreviews: CommandPreview[]): string {
  return commandPreviews
    .map((commandPreview) => commandPreview.preview)
    .join("\n");
}

export {
  cn,
  formatParameters,
  generateCommandString,
  generateDefaultValues,
  checkAllRequiredOptionParametersAreFilled,
  generateCodeMarkdown,
  generateScriptPayload,
  copyDraftCommand,
};
