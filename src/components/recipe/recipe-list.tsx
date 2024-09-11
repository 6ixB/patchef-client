import { cn } from '@/lib/utils';
import { useCommandStore } from '@/hooks/use-command-store';
import { SortableContext } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import RecipeListItem from '@/components/recipe/recipe-list-item';
import { ScrollArea } from '@/components/ui/scroll-area';

const RecipeList = () => {
  const { destinationCommands } = useCommandStore();

  const destinationCommandIds = useMemo(
    () => destinationCommands.map((command) => command.id),
    [destinationCommands],
  );

  return (
    <ScrollArea
      className={cn(destinationCommands.length !== 0 && 'w-full h-full pe-8')}
    >
      <div className="w-full h-full flex flex-col gap-y-2 py-4">
        <SortableContext
          id="destination-commands"
          items={destinationCommandIds}
        >
          {destinationCommands.map((command) => (
            <RecipeListItem key={command.id} command={command} />
          ))}
        </SortableContext>
      </div>
    </ScrollArea>
  );
};

export default RecipeList;
