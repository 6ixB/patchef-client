import { cn } from "@/lib/utils";
import { ArrowDownToLineIcon, CookingPotIcon } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { DndContextEventDataType, DndContextNodeId } from "@/types/dnd-context";
import { useCommandStore } from "@/hooks/use-command-store";
import RecipeList from "@/components/recipe/recipe-list";

const RecipeDropZone = () => {
  const { destinationCommands, isDragging } = useCommandStore();

  const { setNodeRef } = useDroppable({
    id: DndContextNodeId.RecipaAreaDropzone,
    data: {
      type: DndContextEventDataType.RecipeAreaDropzone,
    },
  });

  const isEmpty = destinationCommands.length === 0;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "h-full w-full overflow-y-hidden bg-gray-100 ps-8 dark:bg-[#171823]",
        isEmpty &&
          "flex flex-col items-center justify-center rounded-sm text-muted-foreground text-sm"
      )}
    >
      {isEmpty &&
        (isDragging ? (
          <div className="flex flex-col items-center justify-center">
            <ArrowDownToLineIcon className="size-4" />
            <p>Drop here</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CookingPotIcon className="size-4" />
            <p>Let us cook!</p>
            <p>Drag and drop your commands here</p>
          </div>
        ))}
      <RecipeList />
    </div>
  );
};

export default RecipeDropZone;
