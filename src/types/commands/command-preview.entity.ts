import { z } from "zod";

const CommandPreviewEntitySchema = z.object({
  id: z.string(),

  /* 
    Usage: this attribute is used to hold the actual complete command string.
    Example: 'mkdir "Hello World" /E /X /Y'
  */
  preview: z.string(),
});

type CommandPreviewEntity = z.infer<typeof CommandPreviewEntitySchema>;

export { CommandPreviewEntitySchema, type CommandPreviewEntity };
