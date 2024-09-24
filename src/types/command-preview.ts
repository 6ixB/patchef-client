import { z } from "zod";

const CommandPreviewSchema = z.object({
  id: z.string(),
  preview: z.string(),
});

type CommandPreview = z.infer<typeof CommandPreviewSchema>;

export type { CommandPreviewSchema, CommandPreview };
