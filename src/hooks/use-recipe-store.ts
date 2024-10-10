import { recipes } from "@/lib/recipes";
import type { RecipeState } from "@/types/use-recipe-store";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useRecipeStore = create<RecipeState>()(
  immer((set) => ({
    initialRecipes: recipes,
    setInitialRecipes: (recipes) =>
      set((state) => {
        state.initialRecipes = recipes;
      }),

    recipes: recipes,
    setRecipes: (recipes) =>
      set((state) => {
        state.recipes = recipes;
      }),

    filterRecipes: (query) =>
      set((state) => {
        if (!query) {
          state.recipes = state.initialRecipes;
        }

        const filteredRecipes = state.initialRecipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(query.toLowerCase()),
        );

        state.recipes = filteredRecipes;
      }),
  })),
);

export { useRecipeStore };
