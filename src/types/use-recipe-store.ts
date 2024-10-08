import type { Recipe } from "@/types/recipe";

interface RecipeState {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
}

export type { RecipeState };
