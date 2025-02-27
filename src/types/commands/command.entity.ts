import { z } from "zod";

enum CommandType {
  Basic = "BASIC",
  Advanced = "ADVANCED",
}

const errorMessages = {
  command: {
    name: "Command name must be filled",
    description: "Command description must be filled",
    payload: "Command payload must be filled",
    option: {
      name: "Option name must be filled",
      description: "Option description must be filled",
      payload: "Option payload must be filled",
    },
    parameter: {
      name: "Parameter name must be filled",
      description: "Parameter description must be filled",
      payload: "Parameter payload must be filled",
    },
  },
};

const CommandParameterEntitySchema = z.object({
  id: z.string(),
  name: z.string().min(1, errorMessages.command.parameter.name),
  description: z.string().min(1, errorMessages.command.parameter.description),
  payload: z
    .string()
    .min(1, errorMessages.command.parameter.payload)
    .optional(),
});

const CommandOptionEntitySchema = z.object({
  id: z.string(),
  name: z.string().min(1, errorMessages.command.option.name),
  description: z.string().min(1, errorMessages.command.option.description),
  payload: z.string().min(1, errorMessages.command.option.payload),
  parameterRequired: z.boolean(),
  delimiter: z.string().optional(),
  parameters: z.array(CommandParameterEntitySchema).optional(),
  enabled: z.boolean().optional(),
});

const CommandEntitySchema = z.object({
  id: z.string(),
  originalId: z.string(),
  type: z.enum([CommandType.Basic, CommandType.Advanced]),
  name: z.string().min(1, errorMessages.command.name),
  description: z.string().min(1, errorMessages.command.description),
  payload: z.string().min(1, errorMessages.command.payload),
  options: z.array(CommandOptionEntitySchema).optional(),
  parameters: z.array(CommandParameterEntitySchema).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const CommandEntityArraySchema = z.array(CommandEntitySchema);

type CommandParameterEntity = z.infer<typeof CommandParameterEntitySchema>;
type CommandOptionEntity = z.infer<typeof CommandOptionEntitySchema>;
type CommandEntity = z.infer<typeof CommandEntitySchema>;
type CommandEntityArray = z.infer<typeof CommandEntityArraySchema>;

export {
  CommandType,
  CommandParameterEntitySchema,
  CommandOptionEntitySchema,
  CommandEntitySchema,
  CommandEntityArraySchema,
  type CommandParameterEntity,
  type CommandOptionEntity,
  type CommandEntity,
  type CommandEntityArray,
};
