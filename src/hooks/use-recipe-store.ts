import type { RecipeState } from "@/types/use-recipe-store";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useRecipeStore = create<RecipeState>()(
  immer((set) => ({
    recipes: [],
    setRecipes: (recipes) =>
      set((state) => {
        state.recipes = recipes;
      }),
  })),
);

export { useRecipeStore };
