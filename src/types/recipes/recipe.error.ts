import { PublishedRecipeErrorCode } from "@/types/recipes/recipe.entity";

class PublishedRecipeError extends Error {
  constructor(message?: string, code?: PublishedRecipeErrorCode) {
    super(message ?? "Failed to publish recipe");
    this.name = code ?? PublishedRecipeErrorCode.Unknown;
  }
}

export { PublishedRecipeError };
