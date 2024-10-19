import { CommandSchema } from "@/types/command";
import { z } from "zod";

const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  commands: z.array(CommandSchema),
});

type Recipe = z.infer<typeof RecipeSchema>;

export { RecipeSchema, type Recipe };
