import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommandStore } from "@/hooks/use-command-store";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import { cn } from "@/lib/utils";

const CloseRecipeButton = () => {
  const { destinationCommands, setDestinationCommands } = useCommandStore();
  const { activeRecipe, setActiveRecipe } = useRecipeStore();

  const handleClick = () => {
    setDestinationCommands([]);
    setActiveRecipe(null);
  };

  const noActiveRecipe =
    activeRecipe === null && destinationCommands.length === 0;

  return (
    activeRecipe && (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={cn(
          "cursor-pointer p-2.5 hover:bg-gray-200 dark:hover:bg-gray-800",
          noActiveRecipe ? "!opacity-0" : "opacity-100",
        )}
      >
        <XIcon className="size-4" />
      </Button>
    )
  );
};

export { CloseRecipeButton };
