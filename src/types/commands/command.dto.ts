import { z } from "zod";
import { CommandType } from "@/types/commands/command.entity";

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

const CreateCommandParameterDtoSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, errorMessages.command.parameter.name),
  description: z.string().min(1, errorMessages.command.parameter.description),
  payload: z
    .string()
    .min(1, errorMessages.command.parameter.payload)
    .optional(),
});

const CreateCommandOptionDtoSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, errorMessages.command.option.name),
  description: z.string().min(1, errorMessages.command.option.description),
  payload: z.string().min(1, errorMessages.command.option.payload),
  parameterRequired: z.boolean(),
  delimiter: z.string().optional(),
  parameters: z.array(CreateCommandParameterDtoSchema).optional(),
  enabled: z.boolean().optional(),
});

const CreateCommandDtoSchema = z.object({
  id: z.string().optional(),
  type: z.enum([CommandType.Basic, CommandType.Advanced]),
  name: z.string().min(1, errorMessages.command.name),
  description: z.string().min(1, errorMessages.command.description),
  payload: z.string().min(1, errorMessages.command.payload),
  options: z.array(CreateCommandOptionDtoSchema).optional(),
  parameters: z.array(CreateCommandParameterDtoSchema).optional(),
});

const UpdateCommandDtoSchema = CreateCommandDtoSchema.partial();

type CreateCommandParameterDto = z.infer<
  typeof CreateCommandParameterDtoSchema
>;
type CreateCommandOptionDto = z.infer<typeof CreateCommandOptionDtoSchema>;
type CreateCommandDto = z.infer<typeof CreateCommandDtoSchema>;
type UpdateCommandDto = z.infer<typeof UpdateCommandDtoSchema>;

export {
  CreateCommandParameterDtoSchema,
  CreateCommandOptionDtoSchema,
  CreateCommandDtoSchema,
  UpdateCommandDtoSchema,
  type CreateCommandParameterDto,
  type CreateCommandOptionDto,
  type CreateCommandDto,
  type UpdateCommandDto,
};
