import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCommandStore } from "@/hooks/use-command-store";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { cn, createRecipe } from "@/lib/utils";
import { GroupIcon } from "lucide-react";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useState,
} from "react";

const CreateRecipeButton = () => {
  const { destinationCommands } = useCommandStore();
  const {
    setInitialRecipes,
    recipes,
    setRecipes,
    activeRecipe,
    setActiveRecipe,
  } = useRecipeStore();
  const [isInput, setIsInput] = useState(false);
  const [recipeName, setRecipeName] = useState(activeRecipe?.name ?? "");

  const submitRecipe = () => {
    setIsInput(false);

    if (activeRecipe) {
      const recipeIndex = recipes.findIndex(
        (recipe) => recipe.id === activeRecipe.id,
      );
      const updatedRecipe = {
        ...recipes[recipeIndex],
        name: recipeName,
        commands: destinationCommands,
      };
      setInitialRecipes((draft) => {
        draft[recipeIndex] = updatedRecipe;
      });
      setRecipes((draft) => {
        draft[recipeIndex] = updatedRecipe;
      });
      setActiveRecipe(updatedRecipe);
      return;
    }

    const newRecipe = createRecipe({
      name: recipeName,
      commands: destinationCommands,
    });

    setInitialRecipes((draft) => {
      draft.push(newRecipe);
    });
    setRecipes((draft) => {
      draft.push(newRecipe);
    });
    setActiveRecipe(newRecipe);
  };

  // -------- Modify Handlers --------
  const handleClick = () => {
    setIsInput(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipeName(value);
  };
  // ---------------------------------

  // -------- Submit Handlers --------
  const handleBlur = () => {
    submitRecipe();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    submitRecipe();
  };
  // ---------------------------------

  const noActiveRecipe =
    activeRecipe === null && destinationCommands.length === 0;

  useEffect(() => {
    if (activeRecipe) {
      setRecipeName(activeRecipe.name);
      return;
    }

    setRecipeName("");
  }, [activeRecipe]);

  if (isInput) {
    return (
      <Input
        id="recipe-name"
        autoFocus={true}
        type="text"
        value={recipeName}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-[12rem] text-center font-medium focus-visible:ring-0"
      />
    );
  }

  return (
    <Button
      variant="ghost"
      disabled={noActiveRecipe}
      onClick={handleClick}
      className={cn(
        "w-[12rem] truncate shadow-none",
        noActiveRecipe ? "!opacity-0" : "opacity-100",
      )}
    >
      {activeRecipe ? (
        activeRecipe.name
      ) : (
        <>
          <GroupIcon className="mr-2 size-4" />
          Create into recipe
        </>
      )}
    </Button>
  );
};

export { CreateRecipeButton };
