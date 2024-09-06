import { cn } from '@/lib/utils';
import { ArrowDownToLine, CookingPot } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { DndContextEventDataType, DndContextNodeId } from '@/types/dnd-context';
import { useCommandStore } from '@/hooks/use-command-store';
import RecipeList from '@/components/recipe/recipe-list';

const RecipeDropZone = () => {
  const { destinationCommands, isDragging } = useCommandStore();

  const { setNodeRef } = useDroppable({
    id: DndContextNodeId.RECIPE_AREA_DROPZONE,
    data: {
      type: DndContextEventDataType.RECIPE_AREA_DROPZONE,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'w-full h-full overflow-y-hidden ps-8 py-4',
        destinationCommands.length === 0 &&
          'rounded-sm flex flex-col items-center justify-center text-muted-foreground text-sm',
        destinationCommands.length === 0 &&
          isDragging &&
          'bg-gray-100 dark:bg-gray-900',
      )}
    >
      {destinationCommands.length === 0 &&
        (!isDragging ? (
          <div className="flex flex-col items-center justify-center">
            <CookingPot className="size-4" />
            <p>Let us cook!</p>
            <p>Drag and drop your commands here</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <ArrowDownToLine className="size-4" />
            <p>Drop here</p>
          </div>
        ))}
      <RecipeList />
    </div>
  );
};

export default RecipeDropZone;
