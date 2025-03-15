import type {
  CreateRecipeDto,
  PublishRecipeDto,
  UpdateRecipeDto,
} from "@/types/recipes/recipe.dto";
import {
  type PublishedRecipeEntity,
  PublishedRecipeEntitySchema,
  RecipeEntitySchema,
  type RecipeEntity,
  PublishedRecipeStatus,
} from "@/types/recipes/recipe.entity";
import { PublishedRecipeError } from "@/types/recipes/recipe.error";

const baseUrl = `${process.env.PUBLIC_SERVER_URL}/recipes`;

async function createRecipe(recipe: CreateRecipeDto): Promise<RecipeEntity> {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to create recipe");
  }

  const data = await response.json();
  const validatedRecipe = await RecipeEntitySchema.safeParseAsync(data);

  if (!validatedRecipe.success) {
    throw new Error("Failed to validate created recipe");
  }

  return validatedRecipe.data;
}

async function fetchRecipes(): Promise<RecipeEntity[]> {
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await response.json();
  const validatedRecipes =
    await RecipeEntitySchema.array().safeParseAsync(data);

  if (!validatedRecipes.success) {
    throw new Error("Failed to validate fetched recipes");
  }

  return validatedRecipes.data;
}

async function fetchRecipe(id: string): Promise<RecipeEntity> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data = await response.json();
  const validatedRecipe = await RecipeEntitySchema.safeParseAsync(data);

  if (!validatedRecipe.success) {
    throw new Error("Failed to validate fetched recipe");
  }

  return validatedRecipe.data;
}

async function updateRecipe(recipe: UpdateRecipeDto): Promise<RecipeEntity> {
  const response = await fetch(`${baseUrl}/${recipe.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to update recipe");
  }

  const data = await response.json();
  const validatedRecipe = await RecipeEntitySchema.safeParseAsync(data);

  if (!validatedRecipe.success) {
    throw new Error("Failed to validate updated recipe");
  }

  return validatedRecipe.data;
}

async function removeRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
  const response = await fetch(`${baseUrl}/${recipe.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove recipe");
  }

  const data = await response.json();
  const validatedRecipe = await RecipeEntitySchema.safeParseAsync(data);

  if (!validatedRecipe.success) {
    throw new Error("Failed to validate removed recipe");
  }

  return validatedRecipe.data;
}

const publishRecipe = async (
  recipe: PublishRecipeDto,
): Promise<PublishedRecipeEntity> => {
  const response = await fetch(`${baseUrl}/publish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to publish recipe");
  }

  const data = await response.json();
  const validatedPublishedRecipe =
    await PublishedRecipeEntitySchema.safeParseAsync(data);

  if (!validatedPublishedRecipe.success) {
    throw new Error("Failed to validate published recipe, Error:");
  }

  if (validatedPublishedRecipe.data.status === PublishedRecipeStatus.Failed) {
    throw new PublishedRecipeError(
      validatedPublishedRecipe.data.errorDescription,
      validatedPublishedRecipe.data.errorCode,
    );
  }

  return validatedPublishedRecipe.data;
};

export {
  createRecipe,
  fetchRecipes,
  fetchRecipe,
  updateRecipe,
  removeRecipe,
  publishRecipe,
};
