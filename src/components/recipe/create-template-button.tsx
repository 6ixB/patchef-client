import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import { cn, createRecipe } from "@/lib/utils";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { toast } from "sonner";
import { CircleFadingPlusIcon } from "lucide-react";

const CreateTemplateButton = () => {
  const { destinationCommands } = useCommandStore();
  const { recipes, setInitialRecipes, setRecipes } = useRecipeStore();

  const handleCreateTemplate = () => {
    const commands = [...destinationCommands];
    const recipe = createRecipe({
      name: "New Recipe",
      description: "Example description",
      commands,
    });

    setInitialRecipes([...recipes, recipe]);
    setRecipes([...recipes, recipe]);
    toast.success("Recipe created successfully!");
  };

  const isEmpty = destinationCommands.length === 0;

  return (
    <Button
      variant="ghost"
      disabled={isEmpty}
      onClick={handleCreateTemplate}
      className={cn(
        "transition-opacity duration-200",
        isEmpty ? "!opacity-0" : "opacity-100",
      )}
    >
      <CircleFadingPlusIcon className="mr-2 size-4" />
      Create into template
    </Button>
  );
};

export { CreateTemplateButton };
