import type { Command, CommandParameter } from "@/types/command";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatParameters(parameters: CommandParameter[]): string {
  return parameters.map((param) => param.name).join(" ");
}

export function generateCommandString(command: Command): string {
  let commandString = command.payload;

  if (command.parameters && command.parameters.length > 0) {
    const params = formatParameters(command.parameters);
    commandString += ` ${params}`;
  }

  if (command.options && command.options.length > 0) {
    for (const option of command.options) {
      commandString += ` ${option.payload}`;

      const delimiter = (option.delimiter !== undefined) ? option.delimiter : " ";
      commandString += delimiter;

      if (option.parameterRequired && option.parameters && option.parameters.length > 0) {
        const optionParams = formatParameters(option.parameters);
        commandString += optionParams;
      }
    }
  }

  return commandString;
}