import type { Command } from '@/types/command';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DndContextEventDataType } from '@/types/dnd-context';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import RecipeListItemRemoveButton from '@/components/recipe/recipe-list-item-remove-button';
import RecipeListItemFillParamsButton from '@/components/recipe/recipe-list-item-fill-params-button';
import RecipeListItemPreviewButton from '@/components/recipe/recipe-list-item-preview-button';
import { useMemo } from 'react';
import { useCommandStore } from '@/hooks/use-command-store';

export interface RecipeListItemProps {
  command: Command;
}

const RecipeListItem = ({ command }: RecipeListItemProps) => {
  const { destinationCommands } = useCommandStore();

  const index = useMemo(() => {
    return destinationCommands.findIndex((c) => c.id === command.id);
  }, [destinationCommands, command.id]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: command.id,
    data: {
      type: DndContextEventDataType.DESTINATION_COMMAND,
      command,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="select-none rounded-sm bg-gray-200 dark:bg-gray-800"
      >
        <CardHeader className="pb-2">
          <CardTitle className="opacity-0">{command.name}</CardTitle>
        </CardHeader>
        <CardContent className="opacity-0">
          <p>{command.description}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="select-none rounded-sm flex items-center justify-between px-4"
    >
      <div className="flex items-center">
        <div className="size-8 rounded border flex items-center justify-center shadow">
          {index + 1}
        </div>
        <div>
          <CardHeader className="pb-2">
            <CardTitle>{command.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{command.description}</p>
          </CardContent>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <RecipeListItemFillParamsButton />
        <RecipeListItemPreviewButton />
        <RecipeListItemRemoveButton command={command} />
        <div
          {...attributes}
          {...listeners}
          className="flex justify-center items-center p-2.5 rounded cursor-grab hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <GripVertical className="size-4" />
        </div>
      </div>
    </Card>
  );
};

export default RecipeListItem;
