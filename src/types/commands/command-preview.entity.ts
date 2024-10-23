import { z } from "zod";

const CommandPreviewEntitySchema = z.object({
  id: z.string(),
  preview: z.string(),
});

type CommandPreviewEntity = z.infer<typeof CommandPreviewEntitySchema>;

export { CommandPreviewEntitySchema, type CommandPreviewEntity };
