import { z } from "zod";

const CommandPreviewSchema = z.object({
  uuid: z.string(),
  preview: z.string(),
});

type CommandPreview = z.infer<typeof CommandPreviewSchema>;

export type {
  CommandPreviewSchema,
  CommandPreview
};
