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

const PublishRecipeDtoSchema = z.object({
  directoryName: z.string().min(1),
  fileName: z.string().min(1),
});

type CreateRecipeDto = z.infer<typeof CreateRecipeDtoSchema>;
type CreateRecipeCommandDto = z.infer<typeof CreateRecipeCommandDtoSchema>;
type UpdateRecipeDto = z.infer<typeof UpdateRecipeDtoSchema>;
type PublishRecipeDto = z.infer<typeof PublishRecipeDtoSchema>;

export {
  CreateRecipeDtoSchema,
  CreateRecipeCommandDtoSchema,
  UpdateRecipeDtoSchema,
  PublishRecipeDtoSchema,
  type CreateRecipeDto,
  type CreateRecipeCommandDto,
  type UpdateRecipeDto,
  type PublishRecipeDto,
};
