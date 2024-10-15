import type { Recipe } from "@/types/recipe";

interface RecipeState {
  /* 
      Usage: initial source recipes are the fallback recipes that are displayed in the sidebar.
      These recipes are used when the user clears the search input.
    */
  initialRecipes: Recipe[];
  setInitialRecipes: (value: ((draft: Recipe[]) => void) | Recipe[]) => void;

  /* 
      Usage: recipes are the commands that are displayed in the sidebar.
    */
  recipes: Recipe[];
  setRecipes: (value: ((draft: Recipe[]) => void) | Recipe[]) => void;

  /* 
      Usage: filter commands is a function that filters the recipes based on the query.
      This function is used to filter the recipes based on the search input in the sidebar.  
    */
  filterRecipes: (query: string) => void;

  /* 
      Usage: active recipe is the recipe that is currently being viewed.
  */
  activeRecipe: Recipe | null;
  setActiveRecipe: (
    value: ((draft: Recipe | null) => void) | Recipe | null,
  ) => void;

  /* 
      Usage: previous active recipe is the recipe that was previously being viewed.
      This is used to determine if the active recipe has been modified.
  */
  previousActiveRecipe: Recipe | null;
  setPreviousActiveRecipe: (recipe: Recipe | null) => void;

  /* 
      Usage: take a guess bro
  */
  removeRecipe: (recipeId: string) => void;
}

export type { RecipeState };
