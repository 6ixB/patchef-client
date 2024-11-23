import { z } from "zod";
import { CommandParameterEntitySchema } from "@/types/commands/command.entity";

const CreateRecipeCommandDtoSchema = z.object({
  originalId: z.string(),
  parameters: z.array(CommandParameterEntitySchema).optional(),
});

const CreateRecipeDtoSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  commands: z.array(CreateRecipeCommandDtoSchema),
});

const UpdateRecipeDtoSchema = CreateRecipeDtoSchema.partial().omit({
  commands: true,
});

type CreateRecipeDto = z.infer<typeof CreateRecipeDtoSchema>;
type CreateRecipeCommandDto = z.infer<typeof CreateRecipeCommandDtoSchema>;
type UpdateRecipeDto = z.infer<typeof UpdateRecipeDtoSchema>;

export {
  CreateRecipeDtoSchema,
  CreateRecipeCommandDtoSchema,
  UpdateRecipeDtoSchema,
  type CreateRecipeDto,
  type CreateRecipeCommandDto,
  type UpdateRecipeDto,
};
