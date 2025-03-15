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

enum PublishedRecipeStatus {
  Success = "success",
  Failed = "failed",
}

enum PublishedRecipeErrorCode {
  Unknown = "UNKNOWN",
  FileTransferError = "FILE_TRANSFER_ERROR",
  FileExists = "FILE_EXISTS",
}

const PublishedRecipeEntitySchema = z
  .object({
    status: z.enum([
      PublishedRecipeStatus.Success,
      PublishedRecipeStatus.Failed,
    ]),
    errorCode: z
      .enum([
        PublishedRecipeErrorCode.FileTransferError,
        PublishedRecipeErrorCode.FileExists,
      ])
      .optional(),
    errorDescription: z.string().optional(),
    filePath: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === PublishedRecipeStatus.Success && !data.filePath) {
      ctx.addIssue({
        path: ["filePath"],
        message: "filePath is required when status is 'success'",
        code: "custom",
      });
    }

    if (data.status === PublishedRecipeStatus.Failed && !data.errorCode) {
      ctx.addIssue({
        path: ["errorCode"],
        message: "errorCode is required when status is 'failed'",
        code: "custom",
      });
    }

    if (
      data.status === PublishedRecipeStatus.Failed &&
      !data.errorDescription
    ) {
      ctx.addIssue({
        path: ["errorDescription"],
        message: "errorDescription is required when status is 'failed'",
        code: "custom",
      });
    }
  });

type RecipeEntity = z.infer<typeof RecipeEntitySchema>;
type PublishedRecipeEntity = z.infer<typeof PublishedRecipeEntitySchema>;

export {
  RecipeEntitySchema,
  PublishedRecipeEntitySchema,
  type RecipeEntity,
  type PublishedRecipeEntity,
  PublishedRecipeStatus,
  PublishedRecipeErrorCode,
};
