import type { CommandEntity } from "@/types/commands/command.entity";
import type { RecipeEntity } from "@/types/recipes/recipe.entity";

/*
  Usage: this function is used to check if the active recipe has been modified
*/
function isActiveRecipeModified(
  recipe: RecipeEntity,
  destinationCommands: CommandEntity[],
): boolean {
  if (recipe.commands.length !== destinationCommands.length) {
    return true;
  }

  for (let i = 0; i < recipe.commands.length; i++) {
    if (recipe.commands[i].name !== destinationCommands[i].name) {
      return true;
    }
  }

  return false;
}

/* 
  Usage: this function is used to compare the previous recipe with the destination commands
*/
function comparePreviousRecipeWithDestinationCommands(
  previousRecipe: RecipeEntity,
  commands: CommandEntity[],
) {
  if (previousRecipe.commands.length !== commands.length) {
    return false;
  }

  for (let i = 0; i < previousRecipe.commands.length; i++) {
    if (previousRecipe.commands[i].name !== commands[i].name) {
      return false;
    }
  }

  return true;
}

export { isActiveRecipeModified, comparePreviousRecipeWithDestinationCommands };
