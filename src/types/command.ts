import { z } from "zod";

const CommandParameterSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const CommandOptionSchema = z.object({
  name: z.string(),
  description: z.string(),
  payload: z.string(),
  parameterRequired: z.boolean(),
  delimiter: z.string().optional(),
  parameters: z.array(CommandParameterSchema).optional(),
});

const CommandSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  payload: z.string(),
  options: z.array(CommandOptionSchema),
  parameters: z.array(CommandParameterSchema),
});

type CommandParameter = z.infer<typeof CommandParameterSchema>;
type CommandOption = z.infer<typeof CommandOptionSchema>;
type Command = z.infer<typeof CommandSchema>;

export type {
  CommandParameterSchema,
  CommandOptionSchema,
  CommandSchema,
  CommandParameter,
  CommandOption,
  Command,
};
