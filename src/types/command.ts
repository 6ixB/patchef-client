import { z } from "zod";

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

const CommandParameterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, errorMessages.command.parameter.name),
  description: z.string().min(1, errorMessages.command.parameter.description),
  payload: z
    .string()
    .min(1, errorMessages.command.parameter.payload)
    .optional(),
});

const CommandOptionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, errorMessages.command.option.name),
  description: z.string().min(1, errorMessages.command.option.description),
  payload: z.string().min(1, errorMessages.command.option.payload),
  parameterRequired: z.boolean(),
  delimiter: z.string().optional(),
  parameters: z.array(CommandParameterSchema).optional(),
});

const CommandSchema = z.object({
  id: z.string(),
  name: z.string().min(1, errorMessages.command.name),
  description: z.string().min(1, errorMessages.command.description),
  payload: z.string().min(1, errorMessages.command.payload),
  options: z.array(CommandOptionSchema).optional(),
  parameters: z.array(CommandParameterSchema).optional(),
});

type CommandParameter = z.infer<typeof CommandParameterSchema>;
type CommandOption = z.infer<typeof CommandOptionSchema>;
type Command = z.infer<typeof CommandSchema>;

export {
  CommandParameterSchema,
  CommandOptionSchema,
  CommandSchema,
  type CommandParameter,
  type CommandOption,
  type Command,
};
