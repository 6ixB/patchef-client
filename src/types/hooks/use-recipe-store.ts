import type { RecipeEntity } from "@/types/recipes/recipe.entity";

interface RecipeState {
  /* 
      Usage: initial source recipes are the fallback recipes that are displayed in the sidebar.
      These recipes are used when the user clears the search input.
    */
  initialRecipes: RecipeEntity[];
  setInitialRecipes: (
    value: ((draft: RecipeEntity[]) => void) | RecipeEntity[],
  ) => void;

  /* 
      Usage: recipes are the commands that are displayed in the sidebar.
    */
  recipes: RecipeEntity[];
  setRecipes: (
    value: ((draft: RecipeEntity[]) => void) | RecipeEntity[],
  ) => void;

  /* 
      Usage: filter commands is a function that filters the recipes based on the query.
      This function is used to filter the recipes based on the search input in the sidebar.  
    */
  filterRecipes: (query: string) => void;

  /* 
      Usage: active recipe is the recipe that is currently being viewed.
  */
  activeRecipe: RecipeEntity | null;
  setActiveRecipe: (
    value: ((draft: RecipeEntity | null) => void) | RecipeEntity | null,
  ) => void;

  /* 
      Usage: previous active recipe is the recipe that was previously being viewed.
      This is used to determine if the active recipe has been modified.
  */
  previousActiveRecipe: RecipeEntity | null;
  setPreviousActiveRecipe: (recipe: RecipeEntity | null) => void;

  /* 
      Usage: take a guess bro
  */
  removeRecipe: (recipeId: string) => void;
}

export type { RecipeState };
