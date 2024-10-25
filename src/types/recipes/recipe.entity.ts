import { z } from "zod";
import { CommandEntitySchema } from "@/types/commands/command.entity";

const errorMessages = {
  recipe: {
    name: "Recipe name must be filled",
  },
};

const RecipeEntitySchema = z.object({
  id: z.string(),
  name: z.string().min(1, errorMessages.recipe.name),
  commands: z.array(CommandEntitySchema).optional(),
  createdAt: z.string().transform((s) => new Date(s)),
  updatedAt: z.string().transform((s) => new Date(s)),
});

type RecipeEntity = z.infer<typeof RecipeEntitySchema>;

export { RecipeEntitySchema, type RecipeEntity };
