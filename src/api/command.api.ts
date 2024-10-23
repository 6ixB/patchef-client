import type { CreateCommandDto } from "@/types/commands/command.dto";
import {
  CommandEntitySchema,
  type CommandEntity,
} from "@/types/commands/command.entity";

const baseUrl = `${process.env.PUBLIC_SERVER_URL}/commands`;

async function createCommand(
  command: CreateCommandDto,
): Promise<CommandEntity> {
  console.info("Creating command...");

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
  console.info("Fetching commands...");

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
  console.info(`Fetching command with id: ${id}...`);

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

async function updateCommand(
  command: CreateCommandDto,
): Promise<CommandEntity> {
  console.info(`Updating command with id: ${command.id}...`);

  const response = await fetch(`${baseUrl}/${command.id}`, {
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
  console.info(`Removing command with id: ${command.originalId}...`);

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

export {
  createCommand,
  fetchCommands,
  fetchCommand,
  updateCommand,
  removeCommand,
};
