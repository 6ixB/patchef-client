import { z } from "zod";
import { CommandEntitySchema } from "@/types/commands/command.entity";

const RecipeEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  commands: z.array(CommandEntitySchema),
});

type RecipeEntity = z.infer<typeof RecipeEntitySchema>;

export { RecipeEntitySchema, type RecipeEntity };
