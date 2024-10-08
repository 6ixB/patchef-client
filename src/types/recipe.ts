import { z } from "zod";
import { CommandSchema } from "@/types/command";

const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  commands: z.array(CommandSchema),
});

type Recipe = z.infer<typeof RecipeSchema>;

export { RecipeSchema, type Recipe };
