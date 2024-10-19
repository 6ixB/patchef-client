import { RecipeList } from "@/components/recipe/item/recipe-list";
import { useCommandStore } from "@/hooks/use-command-store";
import { cn } from "@/lib/utils";
import { DndContextEventDataType, DndContextNodeId } from "@/types/dnd-context";
import { useDroppable } from "@dnd-kit/core";
import { ArrowDownToLineIcon, CookingPotIcon } from "lucide-react";

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
      )}
    >
      {isEmpty &&
        (isDragging ? (
          <div className="flex h-full w-full flex-col items-center justify-center py-4 pe-8">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-gray-200 text-muted-foreground text-sm dark:bg-gray-800">
              <ArrowDownToLineIcon className="size-4" />
              <p>Drop here</p>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-muted-foreground text-sm">
              <CookingPotIcon className="size-4" />
              <p>Let us cook!</p>
              <p>Drag and drop your commands here</p>
            </div>
          </div>
        ))}
      <RecipeList />
    </div>
  );
};

export { RecipeDropZone };
