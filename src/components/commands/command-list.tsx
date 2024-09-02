import { ScrollArea } from "@/components/ui/scroll-area";
import CommandListItem from "@/components/commands/command-list-item";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { useCommandStore } from "@/hooks/use-command-store";

const CommandList = () => {
  const { sourceCommands } = useCommandStore();
  const sourceCommandIds = useMemo(
    () => sourceCommands.map((command) => command.id),
    [sourceCommands]
  );

  return (
    <ScrollArea className="w-full h-full px-8">
      <div className="w-full h-full flex flex-col gap-y-2">
        <SortableContext id="sidebar-commands" items={sourceCommandIds}>
          {sourceCommands.map((command) => (
            <CommandListItem key={command.id} command={command} />
          ))}
        </SortableContext>
      </div>
    </ScrollArea>
  );
};

export default CommandList;
