import { recipes } from "@/lib/recipes";
import type { RecipeState } from "@/types/use-recipe-store";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useRecipeStore = create<RecipeState>()(
  devtools(
    persist(
      immer((set) => ({
        initialRecipes: recipes,
        setInitialRecipes: (value) =>
          set((state) => {
            if (typeof value === "function") {
              state.initialRecipes = produce(state.initialRecipes, value);
            } else {
              state.initialRecipes = value;
            }
          }),

        recipes: recipes,
        setRecipes: (value) =>
          set((state) => {
            if (typeof value === "function") {
              state.recipes = produce(state.recipes, value);
            } else {
              state.recipes = value;
            }
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

        activeRecipe: null,
        setActiveRecipe: (value) =>
          set((state) => {
            if (typeof value === "function") {
              state.activeRecipe = produce(state.activeRecipe, value);
            } else {
              state.activeRecipe = value;
            }
          }),

        previousActiveRecipe: null,
        setPreviousActiveRecipe: (recipe) =>
          set((state) => {
            state.previousActiveRecipe = recipe;
          }),

        removeRecipe: (recipeId) =>
          set((state) => {
            state.recipes = state.recipes.filter(
              (recipe) => recipe.id !== recipeId,
            );
          }),
      })),
      {
        name: "recipe-store",
        partialize: (state) => ({
          activeRecipe: state.activeRecipe,
        }),
      },
    ),
  ),
);

export { useRecipeStore };
