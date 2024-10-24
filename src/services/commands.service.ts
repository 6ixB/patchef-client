import type {
  CreateCommandDto,
  CreateCommandParameterDto,
} from "@/types/commands/command.dto";
import {
  type CommandEntity,
  type CommandOptionEntity,
  type CommandParameterEntity,
  CommandType,
} from "@/types/commands/command.entity";
import type { CommandPreviewEntity } from "@/types/commands/command-preview.entity";
import { v4 as generateUuidV4 } from "uuid";

/* 
  Usage: this function is used to format parameters for a command
*/
function formatParameters(parameters: CreateCommandParameterDto[]): string {
  return parameters.map((param) => param.payload).join(" ");
}

/* 
  Usage: this function is used to generate a command string
*/

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This function is fine as is - MY23-1
function generateCommandString(command: CreateCommandDto): string {
  switch (command.type) {
    case CommandType.Basic: {
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

    case CommandType.Advanced: {
      let commandString = command.payload;

      if (command.parameters) {
        for (const parameter of command.parameters) {
          if (parameter.payload) {
            commandString = commandString.replace(
              new RegExp(`{{${parameter.name}}}`, "g"),
              parameter?.payload,
            );
          }
        }
      }

      return commandString;
    }

    // TODO: Implement a better return value for this default case
    default:
      return "";
  }
}

/* 
  Usage: this function is used to copy a draft command
*/
function copyDraftCommand(
  draftCommand: CreateCommandDto | null,
): CreateCommandDto | null {
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
  Usage: this function is used to copy a revised command
*/
function copyRevisedCommand(
  revisedCommand: CommandEntity | null,
): CommandEntity | null {
  if (!revisedCommand) {
    return null;
  }

  const draftCommandCopy = {
    ...revisedCommand,
    parameters: revisedCommand.parameters
      ? revisedCommand.parameters.map((parameter) => ({
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
  draftCommand: ({
    draftCommand,
    generateId = true,
  }: {
    /* 
      If the user has not created the command but the draft command is not null,
      then the draft command is returned as is. Otherwise, a new command is created.
    */
    draftCommand?: CreateCommandDto | null;
    generateId?: boolean;
  }) => ({
    id: draftCommand?.id ?? generateId ? generateUuidV4() : undefined,
    type: draftCommand?.type ?? CommandType.Basic,
    name: draftCommand?.name ?? "",
    description: draftCommand?.description ?? "",
    payload: draftCommand?.payload ?? "",
  }),

  revisedCommand: (revisedCommand: CommandEntity | null) => ({
    ...revisedCommand,
  }),

  commandParameter: ({
    generateId = true,
  }: {
    generateId?: boolean;
  } = {}) => ({
    id: generateId ? generateUuidV4() : undefined,
    name: "",
    description: "",
  }),

  commandOption: ({
    generateId = true,
  }: {
    generateId?: boolean;
  } = {}) => ({
    id: generateId ? generateUuidV4() : undefined,
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
function checkAllRequiredParametersAreFilled(command: CommandEntity): boolean {
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
function checkAllEnabledOptionsParametersAreFilled(
  command: CommandEntity,
): boolean {
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
  command: CreateCommandDto | null,
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
  option: CommandOptionEntity | undefined,
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
  parameters: CommandParameterEntity[] | undefined,
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
function generateScriptPayload(
  commandPreviews: CommandPreviewEntity[],
): string {
  return commandPreviews
    .map((commandPreview) => commandPreview.preview)
    .join("\n");
}

export {
  formatParameters,
  generateCommandString,
  generateDefaultValues,
  checkAllRequiredParametersAreFilled,
  checkAllEnabledOptionsParametersAreFilled,
  checkAllFillableOptionParametersAreFilled,
  checkAllRequiredOptionParametersAreFilled,
  formatOptionParameters,
  copyDraftCommand,
  copyRevisedCommand,
  generateCodeMarkdown,
  generateScriptPayload,
};
