import {
  ManageRecipeState,
  type RecipeState,
} from "@/types/hooks/use-recipe-store";
import { produce } from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/* 
  Usage: create a store for the recipe state.
  This store is used to manage the state of the recipes in the application.

  Note: immer is used to enable the use of mutable updates in the set function.
*/
const useRecipeStore = create<RecipeState>()(
  devtools(
    persist(
      immer((set) => ({
        initialRecipes: [],
        setInitialRecipes: (value) =>
          set((state) => {
            if (typeof value === "function") {
              state.initialRecipes = produce(state.initialRecipes, value);
            } else {
              state.initialRecipes = value;
            }
          }),

        recipes: [],
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

        manageRecipeState: ManageRecipeState.View,
        setManageRecipeState: (manageRecipeState) =>
          set((state) => {
            state.manageRecipeState = manageRecipeState;
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
