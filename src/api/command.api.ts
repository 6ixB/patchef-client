import type { CreateCommandDto } from "@/types/commands/command.dto";
import {
  CommandEntityArraySchema,
  CommandEntitySchema,
  type CommandEntity,
} from "@/types/commands/command.entity";

const baseUrl = `${process.env.PUBLIC_SERVER_URL}/commands`;

async function createCommand(
  command: CreateCommandDto,
): Promise<CommandEntity> {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error("Failed to create command");
  }

  const data = await response.json();

  const validatedCommand = await CommandEntitySchema.safeParseAsync(data);

  if (!validatedCommand.success) {
    throw new Error("Failed to validate created command");
  }

  return validatedCommand.data;
}

async function fetchCommands(): Promise<CommandEntity[]> {
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch commands");
  }

  const data = await response.json();
  const validatedCommands =
    await CommandEntitySchema.array().safeParseAsync(data);

  if (!validatedCommands.success) {
    throw new Error("Failed to validate fetched commands");
  }

  return validatedCommands.data;
}

async function fetchCommand(id: string): Promise<CommandEntity> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch command");
  }

  const data = await response.json();
  const validatedCommand = await CommandEntitySchema.safeParseAsync(data);

  if (!validatedCommand.success) {
    throw new Error("Failed to validate fetched command");
  }

  return validatedCommand.data;
}

async function updateCommand(command: CommandEntity): Promise<CommandEntity> {
  const response = await fetch(`${baseUrl}/${command.originalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error("Failed to update command");
  }

  const data = await response.json();
  const validatedCommand = await CommandEntitySchema.safeParseAsync(data);

  if (!validatedCommand.success) {
    throw new Error("Failed to validate updated command");
  }

  return validatedCommand.data;
}

async function removeCommand(command: CommandEntity): Promise<CommandEntity> {
  const response = await fetch(`${baseUrl}/${command.originalId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove command");
  }

  const data = await response.json();
  const validatedCommand = await CommandEntitySchema.safeParseAsync(data);

  if (!validatedCommand.success) {
    throw new Error("Failed to validate removed command");
  }

  return validatedCommand.data;
}

async function importCommands(
  commands: CommandEntity[],
): Promise<CommandEntity[]> {
  const response = await fetch(`${baseUrl}/bulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });

  if (!response.ok) {
    throw new Error("Failed to import commands");
  }

  const data = await response.json();

  const validatedCommands = await CommandEntityArraySchema.safeParseAsync(data);

  if (!validatedCommands.success) {
    throw new Error("Failed to validate imported commands");
  }

  return validatedCommands.data;
}

export {
  createCommand,
  fetchCommands,
  fetchCommand,
  updateCommand,
  removeCommand,
  importCommands,
};
