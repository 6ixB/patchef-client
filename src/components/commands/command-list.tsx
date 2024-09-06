import { ScrollArea } from '@/components/ui/scroll-area';
import CommandListItem from '@/components/commands/command-list-item';
import { SortableContext } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { useCommandStore } from '@/hooks/use-command-store';
import { useDroppable } from '@dnd-kit/core';
import { DndContextEventDataType, DndContextNodeId } from '@/types/dnd-context';

const CommandList = () => {
  const { sourceCommands } = useCommandStore();
  const sourceCommandIds = useMemo(
    () => sourceCommands.map((command) => command.id),
    [sourceCommands],
  );

  const { setNodeRef } = useDroppable({
    id: DndContextNodeId.SIDEBAR_SOURCE_COMMANDS,
    data: {
      type: DndContextEventDataType.SIDEBAR_SOURCE_COMMANDS,
    },
  });

  return (
    <ScrollArea ref={setNodeRef} className="w-full h-full">
      <div className="px-8 pb-4 w-full h-full flex flex-col gap-y-2">
        <SortableContext id="source-commands" items={sourceCommandIds}>
          {sourceCommands.map((command) => (
            <CommandListItem key={command.id} command={command} />
          ))}
        </SortableContext>
      </div>
    </ScrollArea>
  );
};

export default CommandList;
