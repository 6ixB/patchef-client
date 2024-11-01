import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCommandStore } from "@/hooks/use-command-store";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { GroupIcon } from "lucide-react";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import {
  createRecipe as createRecipeApi,
  updateRecipe as updateRecipeApi,
} from "@/api/recipe.api";

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

  const createRecipeMutation = useMutation({
    mutationKey: ["create-recipe"],
    mutationFn: createRecipeApi,
  });

  const updateRecipeMutation = useMutation({
    mutationKey: ["update-recipe", activeRecipe?.id],
    mutationFn: updateRecipeApi,
  });

  const submitRecipe = async () => {
    setIsInput(false);

    if (activeRecipe) {
      const recipeIndex = recipes.findIndex(
        (recipe) => recipe.id === activeRecipe.id,
      );
      const revisedRecipe = {
        ...recipes[recipeIndex],
        name: recipeName,
        commands: destinationCommands,
      };

      const updatedRecipe =
        await updateRecipeMutation.mutateAsync(revisedRecipe);

      setInitialRecipes((draft) => {
        draft[recipeIndex] = updatedRecipe;
      });
      setRecipes((draft) => {
        draft[recipeIndex] = updatedRecipe;
      });
      setActiveRecipe(updatedRecipe);
      toast.success(`Recipe updated successfully - ${recipeName}`);
      return;
    }

    // TODO: Add util function to create the draft recipe
    const draftRecipe = {
      name: recipeName,
      commands: destinationCommands.map((command) => ({
        originalId: command.originalId,
      })),
    };

    const createdRecipe = await createRecipeMutation.mutateAsync(draftRecipe);

    setInitialRecipes((draft) => {
      draft.push(createdRecipe);
    });
    setRecipes((draft) => {
      draft.push(createdRecipe);
    });
    setActiveRecipe(createdRecipe);
    toast.success(`Recipe created successfully - ${createdRecipe.name}`);
  };

  // -------- Modify Handlers --------
  const handleClick = () => {
    setIsInput(true);
    toast.info("Enter a recipe name and press Enter to save");
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