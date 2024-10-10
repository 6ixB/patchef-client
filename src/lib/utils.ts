import type { Command, CommandOption, CommandParameter } from "@/types/command";
import type { CommandPreview } from "@/types/command-preview";
import type { Recipe } from "@/types/recipe";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as generateUuidV4 } from "uuid";

/* 
  Usage: this function is used to merge tailwind classes with classnames
*/
function cn(...inputs: ClassValue[]): string {
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

  if (command.options && command.options.length > 0) {
    for (const option of command.options) {
      if (!option.enabled) {
        continue;
      }

      commandString += ` ${option.payload}`;

      if (
        option.parameterRequired &&
        option.parameters &&
        option.parameters.length > 0
      ) {
        const delimiter =
          option.delimiter !== undefined ? option.delimiter : " ";
        commandString += delimiter;

        const optionParams = formatParameters(option.parameters);
        commandString += optionParams;
      }
    }
  }

  commandString = commandString.trim();

  return commandString;
}

function copyDraftCommand(draftCommand: Command | null): Command | null {
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
  Usage: this function is used to check if all required parameters are filled
*/
function checkAllRequiredParametersAreFilled(command: Command): boolean {
  if (!command.parameters) {
    return true;
  }

  for (const parameter of command.parameters) {
    if (!parameter.payload || parameter.payload === `[${parameter.name}]`) {
      return false;
    }
  }

  return true;
}

/* 
  Usage: this function is used to check if all enabled option parameters are filled
*/
function checkAllEnabledOptionsParametersAreFilled(command: Command): boolean {
  if (!command.options || command.options.length === 0) {
    return true;
  }

  for (const option of command.options) {
    if (!(option.enabled && option.parameters)) {
      continue;
    }

    for (const parameter of option.parameters) {
      if (!parameter.payload || parameter.payload === `[${parameter.name}]`) {
        return false;
      }
    }
  }

  return true;
}

/* 
  Usage: this function is used to check if all required option parameters are filled
  when CREATING a new command
*/
function checkAllFillableOptionParametersAreFilled(
  command: Command | null,
): boolean {
  if (!command?.options) {
    return true;
  }

  for (const option of command.options) {
    if (
      option.parameterRequired &&
      (!option.parameters || option.parameters.length === 0)
    ) {
      return false;
    }
  }

  return true;
}

/* 
  Usage: this function is used to check if all required option parameters are filled
  when USING a command
*/
function checkAllRequiredOptionParametersAreFilled(
  option: CommandOption | undefined,
): boolean {
  if (!option?.parameters) {
    return true;
  }

  for (const parameter of option.parameters) {
    if (!parameter.payload || parameter.payload === `[${parameter.name}]`) {
      return false;
    }
  }

  return true;
}

/* 
  Usage: this function is used to format option parameters
*/
function formatOptionParameters(
  parameters: CommandParameter[] | undefined,
): string {
  if (!parameters) {
    return "";
  }

  return parameters
    .map((param) => `(${param.name}: ${param.payload})`)
    .join(", ");
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
}): string {
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

function createRecipe({
  name,
  description,
  commands,
}: {
  name: string;
  description: string;
  commands: Command[];
}): Recipe {
  return {
    id: generateUuidV4(),
    name: name,
    description: description,
    commands: commands,
  };
}

export {
  cn,
  formatParameters,
  generateCommandString,
  generateDefaultValues,
  checkAllRequiredParametersAreFilled,
  checkAllEnabledOptionsParametersAreFilled,
  checkAllFillableOptionParametersAreFilled,
  checkAllRequiredOptionParametersAreFilled,
  formatOptionParameters,
  generateCodeMarkdown,
  generateScriptPayload,
  copyDraftCommand,
  createRecipe,
};
