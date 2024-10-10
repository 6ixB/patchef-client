import type { Recipe } from "@/types/recipe";

interface RecipeState {
  initialRecipes: Recipe[];
  setInitialRecipes: (recipes: Recipe[]) => void;

  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;

  filterRecipes: (query: string) => void;
}

export type { RecipeState };
